'use strict';

var renderer = require('cef-renderer'),
    path = require('path');


var RendererBrowser = function (baseBrowserDecorator, processLauncher) {
  baseBrowserDecorator(this);

  var dir = path.dirname(renderer.karma);
  this._getOptions = function(url) {
    return [
      '-c',
      [
        'LD_LIBRARY_PATH=' + dir,
        renderer.karma,
        '-logtostderr',
        '-url', url,
        '-locales_dir_path', path.join(dir, 'locales'),
        '-resources_dir_path', dir,
      ].join(' '),
    ];
  };
};

RendererBrowser.$inject = ['baseBrowserDecorator'];


RendererBrowser.prototype = {
  name: 'Renderer',

  DEFAULT_CMD: {
    linux: '/bin/sh',
  },
  ENV_CMD: 'RENDERER_BIN',
};


module.exports = {
  'launcher:Renderer': ['type', RendererBrowser]
};
