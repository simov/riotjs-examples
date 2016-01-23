
app.router = function (page) {
  if (page == 'on-key-up') {
    app.tag('on-key-up')
  }
  else if (page == 'two-way-binding') {
    app.tag('two-way-binding')
  }
  else if (page == 'index-of') {
    app.tag('index-of')
  }
  else if (page == 'select2') {
    app.tag('select2')
  }
  else {
    r.route('on-key-up')
  }
}
