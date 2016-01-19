
app.router = function (page) {
  if (page == 'example1') {
    app.tag('example1')
  }
  else if (page == 'two-way-binding') {
    app.tag('two-way-binding')
  }
  else {
    r.route('example1')
  }
}
