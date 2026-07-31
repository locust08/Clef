[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('set', 'delete', 'check')]
  [string]$Action,

  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[A-Z][A-Z0-9_]*$')]
  [string]$Name,

  [string]$Project = 'locus-t-ai-backend',
  [string]$Config = 'prd'
)

$ErrorActionPreference = 'Stop'

function Invoke-DopplerQuietly {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments,

    [AllowNull()]
    [string]$StandardInput
  )

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    if ($null -eq $StandardInput) {
      $null = & doppler @Arguments 2>&1
    } else {
      $null = $StandardInput | & doppler @Arguments 2>&1
    }
    $dopplerExitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  if ($dopplerExitCode -ne 0) {
    throw "Doppler command failed with exit code $dopplerExitCode. Sensitive output was suppressed."
  }
}

switch ($Action) {
  'set' {
    $secureValue = Read-Host "Enter the replacement value for $Name" -AsSecureString
    $valuePointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)

    try {
      $plainValue = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($valuePointer)
      if ([string]::IsNullOrWhiteSpace($plainValue)) {
        throw 'The replacement value must not be empty.'
      }

      Invoke-DopplerQuietly -Arguments @(
        'secrets', 'set', $Name,
        '--project', $Project,
        '--config', $Config,
        '--no-interactive',
        '--silent'
      ) -StandardInput $plainValue
    } finally {
      if ($valuePointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($valuePointer)
      }
      $plainValue = $null
      $secureValue = $null
    }

    Write-Output "$Name updated without printing its value."
  }

  'delete' {
    Invoke-DopplerQuietly -Arguments @(
      'secrets', 'delete', $Name,
      '--project', $Project,
      '--config', $Config,
      '--yes',
      '--silent'
    )
    Write-Output "$Name deleted without printing its value."
  }

  'check' {
    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
      $null = & doppler secrets get $Name --project $Project --config $Config --plain --silent 2>&1
      $dopplerExitCode = $LASTEXITCODE
    } finally {
      $ErrorActionPreference = $previousErrorActionPreference
    }

    if ($dopplerExitCode -eq 0) {
      Write-Output "$Name is present; its value was not printed."
    } else {
      Write-Output "$Name is absent; its value was not printed."
    }
  }
}
