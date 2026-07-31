import fs from 'node:fs'
import path from 'node:path'

const handlerPath = path.join(
  process.cwd(),
  '.open-next',
  'server-functions',
  'default',
  'handler.mjs',
)
const absoluteBundlePrefix = `${process.cwd().replace(/\\/g, '/')}/.open-next/server-functions/default/`
const source = fs.readFileSync(handlerPath, 'utf8')
const relativeImports = source.split(absoluteBundlePrefix).join('./')
const wasmLoaderPattern =
  /async function loadWasmChunk\(chunkPath\)\{[\s\S]*?default:throw new Error\(`Unknown wasm chunk: \$\{chunkPath\}`\)\}\}/g
const bundledWasmLoader =
  'async function loadWasmChunk(chunkPath){if(chunkPath.endsWith("resvg.wasm"))return resvg_wasm;if(chunkPath.endsWith("yoga.wasm"))return yoga_wasm;throw new Error(`Unknown wasm chunk: ${chunkPath}`)}'
const patched = relativeImports.replace(wasmLoaderPattern, bundledWasmLoader)

if (patched === source) {
  throw new Error('OpenNext Windows WASM import paths were not found in the generated handler.')
}

fs.writeFileSync(handlerPath, patched)
console.log('Normalized OpenNext Windows WASM import paths.')
