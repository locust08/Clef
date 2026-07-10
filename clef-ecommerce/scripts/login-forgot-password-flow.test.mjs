import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import ts from 'typescript';

const require = createRequire(import.meta.url);

function loadTsxComponent(componentPath) {
  const source = fs.readFileSync(path.resolve(componentPath), 'utf8');
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

      return require(id);
    },
  });

  return module.exports.default;
}

function getText(node) {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getText).join('');
  }

  return getText(node.props?.children);
}

function findElement(root, predicate) {
  if (root === null || root === undefined || typeof root !== 'object') {
    return null;
  }

  if (predicate(root)) {
    return root;
  }

  const children = React.Children.toArray(root.props?.children);

  for (const child of children) {
    const match = findElement(child, predicate);

    if (match) {
      return match;
    }
  }

  return null;
}

const LoginSectionSignIn1 = loadTsxComponent('src/components/sign-in/LoginSectionSignIn1.tsx');
let forgotPasswordClicked = false;
const loginForm = LoginSectionSignIn1({
  onForgotPassword: () => {
    forgotPasswordClicked = true;
  },
});

const forgotPasswordButton = findElement(
  loginForm,
  (node) => node.type === 'button' && getText(node).trim() === 'Forgot password?',
);

if (!forgotPasswordButton) {
  throw new Error('Expected login form to render a Forgot password? button.');
}

if (forgotPasswordButton.props.type !== 'button') {
  throw new Error('Forgot password? control must be a button with type="button".');
}

if (typeof forgotPasswordButton.props.onClick !== 'function') {
  throw new Error('Forgot password? button must call the supplied onForgotPassword handler.');
}

forgotPasswordButton.props.onClick();

if (!forgotPasswordClicked) {
  throw new Error('Expected clicking Forgot password? to trigger onForgotPassword.');
}

const LoginSectionSignIn4 = loadTsxComponent('src/components/sign-in/LoginSectionSignIn4.tsx');
let backToLoginClicked = false;
const forgotPasswordForm = LoginSectionSignIn4({
  onBackToLogin: () => {
    backToLoginClicked = true;
  },
});

const backToLoginButton = findElement(
  forgotPasswordForm,
  (node) => node.type === 'button' && getText(node).includes('Back to sign in'),
);

if (!backToLoginButton) {
  throw new Error('Expected forgot password form to render a Back to sign in button.');
}

if (backToLoginButton.props.type !== 'button') {
  throw new Error('Back to sign in control must be a button with type="button".');
}

if (typeof backToLoginButton.props.onClick !== 'function') {
  throw new Error('Back to sign in button must call the supplied onBackToLogin handler.');
}

backToLoginButton.props.onClick();

if (!backToLoginClicked) {
  throw new Error('Expected clicking Back to sign in to trigger onBackToLogin.');
}

const loginPageSource = fs.readFileSync(path.resolve('src/pages/login.tsx'), 'utf8');

for (const expected of [
  'useState',
  'showForgotPassword',
  'setShowForgotPassword(true)',
  'setShowForgotPassword(false)',
  'onForgotPassword',
  'onBackToLogin',
]) {
  if (!loginPageSource.includes(expected)) {
    throw new Error(`Expected login page to include ${expected}.`);
  }
}

if (!loginPageSource.includes('showForgotPassword ?')) {
  throw new Error('Expected login page to render forgot password section conditionally.');
}

console.log('Login forgot password flow contract is present.');
