import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const componentPath = path.resolve(
  'src/components/custom-components/AllSkincareSectionCustomComponents3.tsx',
);
const source = fs.readFileSync(componentPath, 'utf8');

const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
  },
});

const module = { exports: {} };

vm.runInNewContext(outputText, {
  exports: module.exports,
  module,
  require: (id) => {
    if (id === 'react') {
      return React;
    }

    if (id === '../layout/HeaderIconActions') {
      return {
        __esModule: true,
        default: () => React.createElement(React.Fragment),
      };
    }

    return require(id);
  },
});

const Component = module.exports.default;
const html = renderToStaticMarkup(React.createElement(Component));
const visibleDrawerClass = 'class="fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50"';

if (html.includes(visibleDrawerClass)) {
  throw new Error('Expected the mobile menu drawer to be closed before the menu button is clicked.');
}

console.log('Menu is closed by default.');
