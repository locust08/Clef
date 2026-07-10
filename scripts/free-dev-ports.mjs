import { execFileSync } from 'node:child_process';

const ports = [3000, 3001, 9000];
const root = process.cwd().toLowerCase().replaceAll('/', '\\');
const allowedAppPaths = [
  `${root}\\clef-ecommerce\\`,
  `${root}\\clef-payload\\`,
  `${root}\\clef-medusa\\`,
];

function runPowerShell(command) {
  return execFileSync('powershell.exe', ['-NoProfile', '-Command', command], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function asArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getListeners() {
  const portList = ports.join(',');
  const output = runPowerShell(
    `$connections = @(Get-NetTCPConnection -LocalPort ${portList} -State Listen -ErrorAction SilentlyContinue); ` +
      '$connections | Select-Object LocalPort,OwningProcess | ConvertTo-Json -Compress; exit 0'
  );

  return asArray(output ? JSON.parse(output) : []);
}

function getCommandLine(pid) {
  const output = runPowerShell(
    `Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}" | ` +
      'Select-Object ProcessId,CommandLine | ConvertTo-Json -Compress; exit 0'
  );
  const processInfo = output ? JSON.parse(output) : null;

  return processInfo?.CommandLine ?? '';
}

function isClefProcess(commandLine) {
  const normalized = commandLine.toLowerCase().replaceAll('/', '\\');

  return allowedAppPaths.some((appPath) => normalized.includes(appPath));
}

function stopProcess(pid) {
  runPowerShell(`Stop-Process -Id ${pid} -Force -ErrorAction SilentlyContinue; exit 0`);
}

const listeners = getListeners();
const listenersByPid = new Map();

for (const listener of listeners) {
  const pid = Number(listener.OwningProcess);
  const port = Number(listener.LocalPort);

  if (!listenersByPid.has(pid)) {
    listenersByPid.set(pid, { pid, ports: [], commandLine: getCommandLine(pid) });
  }

  listenersByPid.get(pid).ports.push(port);
}

const blockedByOtherApps = [];

for (const listener of listenersByPid.values()) {
  if (!isClefProcess(listener.commandLine)) {
    blockedByOtherApps.push(listener);
    continue;
  }

  console.log(
    `Freeing port${listener.ports.length > 1 ? 's' : ''} ${listener.ports.join(', ')} from existing Clef dev process ${listener.pid}.`
  );
  stopProcess(listener.pid);
}

if (blockedByOtherApps.length > 0) {
  console.error('Cannot start Clef dev apps because these ports are used by non-Clef processes:');

  for (const listener of blockedByOtherApps) {
    console.error(`- port(s) ${listener.ports.join(', ')}: PID ${listener.pid}`);
    console.error(`  ${listener.commandLine || '(command line unavailable)'}`);
  }

  process.exit(1);
}
