module.exports = {
  main: {
    port: 3000
  },

  auth: {
    service: {
      twitter: {
        key:     "TWITTER_KEY",
        secret:  "TWITTER_SECRET",
        urlhost: "http://localhost:3000"
      },
      facebook: {
        key:     "FACEBOOK_ID",
        secret:  "FACEBOOK_SECRET",
        urlhost: "http://localhost:3000"
      }
    }
  }
}
