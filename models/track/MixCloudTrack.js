const BaseTrack = require('./BaseTrack');

function MixCloudTrack(options) {
  BaseTrack.call(this, options);

  this.trackType = 'MixCloudTrack';
  this._trackUrlPrefix = 'https://www.mixcloud.com/';
}

MixCloudTrack.prototype = Object.create(BaseTrack.prototype);

MixCloudTrack.prototype.constructor = MixCloudTrack;

MixCloudTrack.prototype.init = function(options) {
  if (!options.url) {
    console.error('MixCloudTrack');
    console.error(options);
  } else {
    this.platformId = options.url.replace(this._trackUrlPrefix, '');

    if (options.name) {
      this.title = options.name;
    }

    if (options.user && options.user.username) {
      this.artist = options.user.name;
    }

    if (options.pictures) {
      this.covers.default = options.pictures['320wx320h'];
      this.covers.large = this.covers.default;
      this.covers.medium = options.pictures.large;
    }
  }
};

module.exports = MixCloudTrack;
