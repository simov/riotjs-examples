
app.router = function (page) {
  if (page == 'loop') {
    app.tag('loop')
  }
  else if (page == 'selects') {
    app.tag('selects')
  }
  else if (page == 'checkbox') {
    app.tag('checkbox')
  }
  else {
    r.route('loop')
  }
}
