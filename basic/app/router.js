
app.router = function (page) {
  if (page == 'home') {
    app.tag('home', {title: 'home'})
  }
  else if (page == 'blog') {
    app.tag('blog', {title: 'blog'})
  }
  else if (page == 'about') {
    app.tag('about', {title: 'about'})
  }
  else {
    r.route('home')
  }
}
