var Youtube = require('youtube-node');
var YoutubeTrack = require('../../models/track/YoutubeTrack');

function YoutubeSearcher(config) {
  config = config || {};
  var apiKey = config.apiKey;

  if (!apiKey) {
    throw new Error('no passed apiKey');
  }

  this._apiKey = config.apiKey;
  this._youtube = new Youtube();
  this._youtube.setKey(apiKey);
};

YoutubeSearcher.prototype.search = function(keyword, limit) {
  limit = limit || 25;
  var promise = new Promise((resolve, reject) => {
    this._youtube.search(keyword, limit, function(error, result) {
      if (error) {
        console.error(error);
        reject();
      }
      else {
        var tracks = [];
        result.items.forEach((rawTrack) => {
          // NOTE
          // there are results mixing with youtube#channel so we have to
          // ignore them
          if (rawTrack.id && rawTrack.id.kind === 'youtube#video') {
            var youtubeTrack = new YoutubeTrack();
            youtubeTrack.initYoutubeResult(rawTrack);
            tracks.push(youtubeTrack);
          }
        });
        resolve(tracks);
      }
    });
  });
  return promise;
};

module.exports = YoutubeSearcher;
