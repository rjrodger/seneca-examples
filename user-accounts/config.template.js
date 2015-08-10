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
  },
  "auth": {
    // redirects after login are needed for traditional multi-page web apps
    redirect:{
      // * when using multi-page web apps always should be true to allow redirects
      // * when using single-page web apps always should be false to disable redirects
      //   except for register - when callback is called from external auth sources - facebook/twitter/others
      always: true,
      login: {
        win:  '/account',
        fail: '/login#failed'
      },
      logout: {
        win:  '/',
        fail: '/'
      },
      register: {
        always: true,
        win:  '/account',
        fail: '/#failed'
      }
    }
  }
}
