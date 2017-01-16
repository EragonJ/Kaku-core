const request = require('request');
const MixCloudTrack = require('../../models/track/MixCloudTrack');

function MixCloudSearcher() {
  //
}

MixCloudSearcher.prototype.search = function(keyword, limit = 20) {
  keyword = encodeURIComponent(keyword);
  let type = 'cloudcast';
  let queryURL =
    `https://api.mixcloud.com/search/?limit=${limit}&q=${keyword}&type=${type}`;

  return new Promise((resolve, reject) => {
    request(queryURL, (err, response, body) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
        const rawTracks = JSON.parse(body);
        const mixCloudTracks = rawTracks['data'].map(rawTrack => {
          const track = new MixCloudTrack();
          track.init(rawTrack);

          return track;
        });

        resolve(mixCloudTracks);
      }
    });
  });
}

module.exports = MixCloudSearcher;
