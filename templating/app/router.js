
app.router = function (page) {
  if (page == 'loop') {
    app.tag('loop')
  }
  else {
    r.route('loop')
  }
}
