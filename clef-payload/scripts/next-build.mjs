import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const args = [path.join('node_modules', 'next', 'dist', 'bin', 'next'), 'build']
const nextPackage = JSON.parse(
  readFileSync(path.join('node_modules', 'next', 'package.json'), 'utf8'),
)
const nextMajorVersion = Number.parseInt(nextPackage.version, 10)

if (
  process.env.DEPLOYMENT_TARGET === 'cloudflare-workers' &&
  nextMajorVersion >= 16
) {
  args.push('--webpack')
}

const result = spawnSync(process.execPath, args, { stdio: 'inherit' })
process.exit(result.status ?? 1)
