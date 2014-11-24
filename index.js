'use strict';

var renderer = require('cef-renderer');


var RendererBrowser = function (baseBrowserDecorator, processLauncher) {
  baseBrowserDecorator(this);
  
  this._getOptions = function(url) {
    return [
      '-logtostderr',
      '-url', url,
    ];
  };
};

RendererBrowser.$inject = ['baseBrowserDecorator'];


RendererBrowser.prototype = {
  name: 'Renderer',

  DEFAULT_CMD: {
    linux: renderer.path,
  },
  ENV_CMD: 'RENDERER_BIN',
};


module.exports = {
  'launcher:Renderer': ['type', RendererBrowser]
};
