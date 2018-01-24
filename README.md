# egg-view-nunjucks-require

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-view-nunjucks-require.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-view-nunjucks-require
[travis-image]: https://img.shields.io/travis/yongbo000/egg-view-nunjucks-require.svg?style=flat-square
[travis-url]: https://travis-ci.org/yongbo000/egg-view-nunjucks-require
[codecov-image]: https://img.shields.io/codecov/c/github/yongbo000/egg-view-nunjucks-require.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yongbo000/egg-view-nunjucks-require?branch=master
[david-image]: https://img.shields.io/david/yongbo000/egg-view-nunjucks-require.svg?style=flat-square
[david-url]: https://david-dm.org/yongbo000/egg-view-nunjucks-require
[snyk-image]: https://snyk.io/test/npm/egg-view-nunjucks-require/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-view-nunjucks-require
[download-image]: https://img.shields.io/npm/dm/egg-view-nunjucks-require.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-view-nunjucks-require

## 安装

```
npm i egg-view-nunjucks-require --save
```

## 使用场景

如nunjucks模版如下

```html
<html>
  <body>
    {% require 'assets/index.js' %}
  </body>
</html>
```

本地开发将输出如下：

```html
<html>
  <body>
    <script type="text/javascript" src="/assets_index.js"></script>
  </body>
</html>
```

正式线上将输出如下：

```html
<html>
  <body>
    <script type="text/javascript" src="http://xxx.demo.com/assets_index-hash.js"></script>
  </body>
</html>
```

搭配 [egg-staticlocal](https://github.com/yongbo000/egg-staticlocal) 使用提升研发效率

## 依赖的插件

- [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks)

## 开启插件

```js
// config/plugin.js
exports.nunjucksRequire = {
  enable: true,
  package: 'egg-view-nunjucks-require',
};
```

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 提问交流

请到 [egg-view-nunjucks-require issues](https://github.com/yongbo000/egg-view-nunjucks-require/issues) 异步交流。

## License

[MIT](LICENSE)
