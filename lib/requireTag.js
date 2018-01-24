'use strict';

const nunjucks = require('nunjucks');
const RE_SCRIPT = /\.(?:js|jsx)$/;
const RE_STYLE = /\.(?:css|less|styl|scss|sass)$/;

function RequireExtension(options) {
  options = options || {};
  this.tags = [ 'require' ];
  this.parse = (parser, nodes) => {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, 'run', args, null);
  };
  this.run = options.run || function(context, path) {
    let html;
    if (options.resolve) {
      path = options.resolve(context, path);
    }
    if (isScriptFile(path)) {
      html = `<script type="text/javascript" src="${path.replace(RE_SCRIPT, '.js')}"></script>`;
    } else if (isStyleFile(path)) {
      html = `<link charset="utf-8" rel="stylesheet" type="text/css" href="${path.replace(RE_STYLE, '.css')}"/>`;
    } else {
      html = '';
    }
    return new nunjucks.runtime.SafeString(html);
  };
}

function isScriptFile(fileName) {
  return RE_SCRIPT.test(fileName);
}

function isStyleFile(fileName) {
  return RE_STYLE.test(fileName);
}

module.exports = RequireExtension;
