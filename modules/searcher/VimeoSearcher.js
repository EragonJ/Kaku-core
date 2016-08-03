var Vimeo = require('vimeo').Vimeo;
var VimeoTrack = require('../../models/track/VimeoTrack');

function VimeoSearcher(config) {
  config = config || {};
  var clientId = config.clientId;
  var clientSecret = config.clientSecret;

  if (!clientId || !clientSecret) {
    throw new Error('no passed clientId or clientSecret');
  }

  this._accessToken = '';
  this._scope = ['public'];
  this._clientId = clientId;
  this._clientSecret = clientSecret;

  this._vimeo = new Vimeo(this._clientId, this._clientSecret);
  this._initRequest = this._init();
}

VimeoSearcher.prototype._ready = function() {
  return this._initRequest.catch((error) => {
    console.log(error);
  });
};

VimeoSearcher.prototype._init = function() {
  var promise = new Promise((resolve, reject) => {
    this._vimeo.generateClientCredentials(
      this._scope, (error, accessToken) => {
        if (error) {
          reject(error);
        }
        else {
          this._accessToken = accessToken.access_token;
          this._scope = accessToken.scope;
          this._vimeo.access_token = this._accessToken;
          resolve();
        }
    });
  });
  return promise;
};

VimeoSearcher.prototype.search = function(keyword, limit) {
  limit = limit || 50;
  return this._ready().then(() => {
    limit = (limit >= 50) ? 50 : limit;
    var promise = new Promise((resolve, reject) => {
      this._vimeo.request({
        path: '/videos',
        query: {
          page: 1,
          per_page: limit,
          query: keyword,
          sort: 'relevant'
        }
      }, (error, body, statusCode, headers) => {
        if (error) {
          reject(error);
        }
        else {
          var rawTracks = body.data;
          var vimeoTracks = rawTracks.map((rawTrack) => {
            var track = new VimeoTrack();
            track.init(rawTrack);
            return track;
          });
          resolve(vimeoTracks);
        }
      });
    });
    return promise;
  });
};

module.exports = VimeoSearcher;
