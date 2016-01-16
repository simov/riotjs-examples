
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
  else if (page == 'class') {
    app.tag('class')
  }
  else {
    r.route('loop')
  }
}
