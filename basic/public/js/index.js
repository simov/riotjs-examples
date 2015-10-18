
var r = riot

var app = {
  tags: {},
  controllers: {
    content: function (opts) {
      this.title = opts.title
    },
    news: function (opts) {
      var self = this
      this.timer = setInterval(function () {
        $.ajax({
          type: 'GET',
          url: 'api',
          dataType: 'json',
          success: function (json) {
            self.json = json
            self.update()
          }
        })
      }, 1000)
    }
  },
  router: {
    process: function (page) {
      if (page == 'home') {
        getTag('content', {title: 'home'})
        getTag('news')
      }
      else if (page == 'blog') {
        getTag('content', {title: 'blog'})
        getTag('news')
      }
      else if (page == 'about') {
        getTag('content', {title: 'about'})
        if (app.tags.news) {
          app.tags.news.unmount(true)
        }
      }
      else {
        r.route('home')
      }
    }
  },
  cleanup: {
    content: function () {},
    news: function () {
      app.tags.news.one('unmount', function () {
        clearInterval(this.timer)
        this.isMounted = false
      })
    }
  }
}

function getTag (name, options) {
  if (app.tags[name]) {
    if (!app.tags[name].isMounted) {
      app.tags[name] = r.mount(name, options)[0]
      app.cleanup[name]()
    }
    else {
      app.tags[name].update(options)
    }
  }
  else {
    $.ajax({
      type: 'GET',
      url: name + '.html',
      dataType: 'text',
      success: function (html) {
        r.tag(name, html, app.controllers[name])
        app.tags[name] = r.mount(name, options)[0]
        app.cleanup[name]()
      }
    })
  }
}


$(function () {
  r.route(app.router.process)
  r.route.exec(app.router.process)
})