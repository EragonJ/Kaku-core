module.exports = {
  Playlist: {
    BasePlaylist: require('./playlist/BasePlaylist')
  },

  Track: {
    BaseTrack: require('./track/BaseTrack'),
    SoundCloudTrack: require('./track/SoundCloudTrack'),
    VimeoTrack: require('./track/VimeoTrack'),
    YoutubeTrack: require('./track/YoutubeTrack'),
    MixCloudTrack: require('./track/MixCloudTrack'),
    AudiusTrack: require('./track/AudiusTrack')
  }
};
