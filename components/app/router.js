
app.router = function (page) {
  if (page == 'external') {
    app.tag('external', {name: 'External'})
  }
  else if (page == 'inline') {
    app.tag('inline', {name: 'Inline'}, true)
  }
  else {
    r.route('external')
  }
}
