'use strict';

const mock = require('egg-mock');

describe('test/view-nunjucks-require.test.js', () => {
  describe('local env', () => {
    let app;
    before(() => {
      mock.env('local');
      app = mock.app({
        baseDir: 'apps/view-nunjucks-require',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('local env should work', () => {
      return app.httpRequest()
        .get('/')
        .expect('<html>\n  <head>\n    <link charset="utf-8" rel="stylesheet" type="text/css" href="/assets_index.css"/>\n  </head>\n  <body>\n    <script type="text/javascript" src="/assets_index.js"></script>\n  </body>\n</html>')
        .expect(200);
    });

    it('view script url should render ok', () => {
      app.config.staticlocal = {
        staticServer: 'http://127.0.0.1:1234',
      };
      return app.httpRequest()
        .get('/')
        .expect('<html>\n  <head>\n    <link charset="utf-8" rel="stylesheet" type="text/css" href="http://127.0.0.1:1234/assets_index.css"/>\n  </head>\n  <body>\n    <script type="text/javascript" src="http://127.0.0.1:1234/assets_index.js"></script>\n  </body>\n</html>')
        .expect(200);
    });
  });

  describe('prod env', () => {
    let app;
    before(() => {
      mock.env('prod');
      app = mock.app({
        baseDir: 'apps/view-nunjucks-require',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('local env should work', () => {
      return app.httpRequest()
        .get('/')
        .expect('<html>\n  <head>\n    <link charset="utf-8" rel="stylesheet" type="text/css" href="http://xxx.demo.com/assets_index-001.css"/>\n  </head>\n  <body>\n    <script type="text/javascript" src="http://xxx.demo.com/assets_index-001.js"></script>\n  </body>\n</html>')
        .expect(200);
    });
  });

  describe('subapp work well', () => {
    describe('local', () => {
      let app;
      before(() => {
        mock.env('local');
        app = mock.app({
          baseDir: 'apps/subapp',
        });
        return app.ready();
      });

      after(() => app.close());
      afterEach(mock.restore);

      it('local env should work', () => {
        return app.httpRequest()
          .get('/')
          .set('Cookie', '__app=demo.subapp.com')
          .expect('<html>\n  <head>\n    <link charset="utf-8" rel="stylesheet" type="text/css" href="/demo.subapp.com_assets_index.css"/>\n  </head>\n  <body>\n    <script type="text/javascript" src="/demo.subapp.com_assets_index.js"></script>\n  </body>\n</html>')
          .expect(200);
      });
    });

    describe('prod', () => {
      let app;
      before(() => {
        mock.env('test');
        app = mock.app({
          baseDir: 'apps/subapp',
        });
        return app.ready();
      });

      after(() => app.close());
      afterEach(mock.restore);

      it('local env should work', () => {
        return app.httpRequest()
          .get('/')
          .set('Cookie', '__app=demo.subapp.com')
          .expect('<html>\n  <head>\n    <link charset="utf-8" rel="stylesheet" type="text/css" href="http://xxx.demo.com/demo.subapp.com_assets_index.css-001.css"/>\n  </head>\n  <body>\n    <script type="text/javascript" src="http://xxx.demo.com/demo.subapp.com_assets_index-001.js"></script>\n  </body>\n</html>')
          .expect(200);
      });
    });
  });
});
