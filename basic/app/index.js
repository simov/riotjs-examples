
var r = riot

var app = {
  tags: {},
  tag: function (name, options) {
    if (app.tags[name]) {
      if (!app.tags[name].isMounted) {
        app.tags[name] = r.mount(name, options)[0]
        app.controller[name].cleanup()
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
          r.tag(name, html, app.controller[name])
          app.tags[name] = r.mount(name, options)[0]
          app.controller[name].cleanup()
        }
      })
    }
  },
  router: function (page) {
    if (page == 'home') {
      app.tag('content', {title: 'home'})
      app.tag('news')
    }
    else if (page == 'blog') {
      app.tag('content', {title: 'blog'})
      app.tag('news')
    }
    else if (page == 'about') {
      app.tag('content', {title: 'about'})
      if (app.tags.news) {
        app.tags.news.unmount(true)
      }
    }
    else {
      r.route('home')
    }
  },
  controller: {
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
  }
}

app.controller.content.cleanup = function () {}
app.controller.news.cleanup = function () {
  app.tags.news.one('unmount', function () {
    clearInterval(this.timer)
    this.isMounted = false
  })
}

$(function () {
  r.route(app.router)
  r.route.exec(app.router)
})
