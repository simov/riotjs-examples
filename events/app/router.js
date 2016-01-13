
app.router = function (page) {
  if (page == 'example1') {
    app.tag('example1')
  }
  else {
    r.route('example1')
  }
}
