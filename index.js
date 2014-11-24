'use strict';

var renderer = require('cef-renderer'),
    spawn = require('child_process').spawn;
    path = require('path');


var RendererBrowser = function (baseBrowserDecorator, processLauncher) {
  var that = this;

  baseBrowserDecorator(this);
  
  this._getOptions = function(url) {
    return [
      '-logtostderr',
      '-url', url,
    ];
  };

  this._execCommand = function(cmd, args) {
    if (!cmd) {
      console.log('No binary for ' + this.name + ' browser on your platform.\n  ' +
                'Please, set "' + this.ENV_CMD + '" env variable.');

      this._retryLimit = -1; // disable restarting

      return this._clearTempDirAndReportDone('no binary');
    }

    cmd = this._normalizeCommand(cmd);

    console.log(cmd + ' ' + args.join(' '));
    this._process = spawn(cmd, args, {
      cwd: path.dirname(renderer.karma),
    });

    var errorOutput = '';

    this._process.on('close', function(code) {
      that._onProcessExit(code, errorOutput);
    });

    this._process.on('error', function(err) {
      if (err.code === 'ENOENT') {
        that._retryLimit = -1;
        errorOutput = 'Can not find the binary ' + cmd + '\n\t' +
                      'Please set env variable ' + that.ENV_CMD;
      } else {
        errorOutput += err.toString();
      }
    });

    // Node 0.8 does not emit the error
    if (process.versions.node.indexOf('0.8') === 0) {
      this._process.stderr.on('data', function(data) {
        var msg = data.toString();

        if (msg.indexOf('No such file or directory') !== -1) {
          that._retryLimit = -1;
          errorOutput = 'Can not find the binary ' + cmd + '\n\t' +
                        'Please set env variable ' + that.ENV_CMD;
        } else {
          errorOutput += msg;
        }
      });
    }
  };
};

RendererBrowser.$inject = ['baseBrowserDecorator'];


RendererBrowser.prototype = {
  name: 'Renderer',

  DEFAULT_CMD: {
    linux: renderer.karma,
  },
  ENV_CMD: 'RENDERER_BIN',
};


module.exports = {
  'launcher:Renderer': ['type', RendererBrowser]
};
