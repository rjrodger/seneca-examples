module.exports = {
  main: {
    port: 3000
  },
  "facebook" : {
    "appId" : "FB_ID",
    "appSecret" : "FB_SECRET",
    "urlhost" : "http://localhost:3000",
    "serviceParams": {
      "scope" : [
        "email"
      ]
    }
  },
  "twitter" : {
    "apiKey" : "TWITTER_KEY",
    "apiSecret" : "TWITTER_SECRET",
    "urlhost" : "http://localhost:3000"
  }

}
