var EventEmitter = require('events').EventEmitter;
var BaseModule = require('../modules/BaseModule');
var YTDL = require('./YoutubeDL').YoutubeDL;
var ytdl = new YTDL();

var TrackInfoFetcher = function() {
  EventEmitter.call(this);

  this._userOptions = {};
  this._defaultOptions = [
    '--no-check-certificate',
    '--no-cache-dir',
  ];
  this._supportedTrackFormats = [
    {
      l10nId: 'settings_option_best_video_format',
      value: 'best'
    },
    {
      l10nId: 'settings_option_best_audio_format',
      value: 'bestaudio'
    }
  ];
};

TrackInfoFetcher.prototype = Object.create(EventEmitter.prototype);
TrackInfoFetcher.constructor = TrackInfoFetcher;

/**
 * setOptions({
 *   '-f': 'bestaudio'
 *   '--no-cache-dir': ''
 * })
 */
TrackInfoFetcher.prototype.setOptions = function(options) {
  this._userOptions = {};
  for (var key in options) {
    this._userOptions[key] = options[key];
  }
};

TrackInfoFetcher.prototype.changeFormat = function(format) {
  this.setOptions({
    '-f': format
  });
  this.emit('format-changed', format);
};

TrackInfoFetcher.prototype.setPath = function(userPath) {
  ytdl.setPath(userPath);
};

TrackInfoFetcher.prototype.getOptions = function() {
  var options = this._defaultOptions.slice();

  for (var key in this._userOptions) {
    // we can't override default options
    if (options.indexOf(key) !== -1) {
      continue;
    }
    else {
      // [ '-f bestaudio', '--no-cache-dir  ', ... ]
      var option = key + ' ' + this._userOptions[key];
      options.push(option);
    }
  }

  return options;
};

TrackInfoFetcher.prototype.getSupportedFormats = function() {
  return this._supportedTrackFormats;
};

TrackInfoFetcher.prototype.getInfo = function(url) {
  var options = this.getOptions();
  return ytdl.getInfo(url, options)
};

module.exports = new TrackInfoFetcher();
