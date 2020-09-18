var AudiusTrack = require('../../models/track/AudiusTrack');

function AudiusSearcher() {
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]
  fetch('https://api.audius.co')
    .then(r => r.json())
    .then(j => j.data)
    .then(d => this._endpoint = random(d))
}

AudiusSearcher.prototype.search = function(query, limit = 0) {
  return new Promise((resolve, reject) => {
    try {
      fetch(`${this._endpoint}/v1/tracks/search?query=${query}&app_name=kaku`)
        .then(r => r.json())
        .then(j => {
          var audiusTracks = j.data.map(t => {
            var track = new AudiusTrack();
            track.init(t);
            return track;
          });
          resolve(audiusTracks);
        })
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = AudiusSearcher;
