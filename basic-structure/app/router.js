
app.router = function (page) {
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
}
