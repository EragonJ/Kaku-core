var SoundCloud = require('node-soundcloud');
var SoundCloudTrack = require('../../models/track/SoundCloudTrack');

function SoundCloudSearcher(config) {
  config = config || {};
  var clientId = config.clientId;
  var clientSecret = config.clientSecret;

  if (!clientId || !clientSecret) {
    throw new Error('no passed clientId or clientSecret');
  }

  this._clientId = clientId;
  this._clientSecret = clientSecret;

  // this library is designed to be used as singleton
  SoundCloud.init({
    id: this._clientId,
    secret: this._clientSecret,
    uri: ''
  });
}

SoundCloudSearcher.prototype.search = function(keyword, limit) {
  limit = limit || 200;

  var promise = new Promise((resolve, reject) => {
    SoundCloud.get('/tracks', {
      limit: limit,
      q: keyword
    }, (error, rawTracks) => {
      if (error) {
        reject(error);
      }
      else {
        var soundCloudTracks = rawTracks.map((rawTrack) => {
          var track = new SoundCloudTrack();
          track.init(rawTrack);
          return track;
        });
        resolve(soundCloudTracks);
      }
    });
  });

  return promise;
};

module.exports = SoundCloudSearcher;
