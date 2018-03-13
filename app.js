'use strict';

const fs = require('fs');
const path = require('path');
const RequireExtension = require('./lib/requireTag');

module.exports = app => {
  let assetsMapJson = {};
  const assetsMapPath = path.join(app.baseDir, 'config', 'map.json');
  if (fs.existsSync(assetsMapPath)) {
    assetsMapJson = require(assetsMapPath);
  }

  const assetsUrl = (app.config.assetsUrl || '').replace(/\/$/, '');
  const resolve = (context, path) => {
    const { _subAppName } = context.ctx;
    if (_subAppName) {
      // assets/a.js => {assetsUrl}/{subAppName}_assets_a.js
      path = `${_subAppName}_${path.replace(/\//g, '_')}`;
    } else {
      // assets/a.js => {assetsUrl}/assets_a.js
      path = `${path.replace(/\//g, '_')}`;
    }
    const getHost = () => {
      if (app.config.env === 'local') {
        return app.config.staticlocal && app.config.staticlocal.assertServer || '';
      }
      return assetsUrl;
    };
    return app.config.env === 'local' ? `${getHost()}/${path}` : `${getHost()}/${assetsMapJson[path]}`;
  };

  // 添加require扩展
  app.nunjucks.addExtension('RequireExtension', new RequireExtension({
    resolve: app.config.nunjucksRequire.resolve || resolve,
    run: app.config.nunjucksRequire.run || null,
  }));
};
