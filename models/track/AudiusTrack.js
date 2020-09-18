var BaseTrack = require('./BaseTrack');

function AudiusTrack(options) {
  BaseTrack.call(this, options);

  this.trackType = 'AudiusTrack';
  this._trackUrlPrefix = 'https://audius.co/';
}

AudiusTrack.prototype = Object.create(BaseTrack.prototype);

AudiusTrack.prototype.constructor = AudiusTrack;

AudiusTrack.prototype.init = function(data) {
  // Reference:
  // https://audiusproject.github.io/api-docs/#search-tracks
  //
  this.platformId = data.id

  if (data.title) {
    this.title = data.title;
  }

  if (data.description) {
    this.description = data.description;
  }

  if (data.user && data.user.name) {
    this.artist = data.user.name;
  }

  if (data.artwork) {
    this.covers.default = data.artwork['1000x1000'];
    this.covers.large = this.covers.default;
    this.covers.medium = data.artwork['480x480']
  }
};

module.exports = AudiusTrack;
