
app.router = function (page) {
  if (page == 'home') {
    if (app.tags.blog) {
      app.tags.blog.unmount(true)
    }
    if (app.tags.about) {
      app.tags.about.unmount(true)
    }
    app.tag('home', {title: 'home'})
  }
  else if (page == 'blog') {
    if (app.tags.home) {
      app.tags.home.unmount(true)
    }
    if (app.tags.about) {
      app.tags.about.unmount(true)
    }
    app.tag('blog', {title: 'blog'})
  }
  else if (page == 'about') {
    if (app.tags.home) {
      app.tags.home.unmount(true)
    }
    if (app.tags.blog) {
      app.tags.blog.unmount(true)
    }
    app.tag('about', {title: 'about'})
  }
  else {
    r.route('home')
  }
}
