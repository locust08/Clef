import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const scriptPath = path.resolve('public/js/1298071.js');
const source = fs.readFileSync(scriptPath, 'utf8');

const wrapper = {
  addEventListener() {},
  querySelector(selector) {
    if (selector === '.video-player') {
      return null;
    }

    if (selector === '.video-overlay') {
      return {
        classList: {
          add() {},
          remove() {},
        },
      };
    }

    return null;
  },
};

const document = {
  readyState: 'complete',
  addEventListener() {},
  querySelectorAll(selector) {
    return selector === '.video-wrapper' ? [wrapper] : [];
  },
};

vm.runInNewContext(source, {
  document,
});

console.log('Video wrapper script tolerates non-video embeds.');
