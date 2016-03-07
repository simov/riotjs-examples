
app.router = (page) => {

  // basics
  if (page === 'set-timeout') {
    app.tag('set-timeout', {title: 'setTimeout'})
  }
  else if (page === 'inline-tag') {
    app.tag('inline-tag', {name: 'Inline Tag'}, true)
  }

  // templating
  else if (page === 'loop') {
    app.tag('loop')
  }
  else if (page === 'selects') {
    app.tag('selects')
  }
  else if (page === 'checkbox') {
    app.tag('checkbox')
  }
  else if (page === 'class') {
    app.tag('class')
  }

  // events
  else if (page === 'on-key-up') {
    app.tag('on-key-up')
  }
  else if (page === 'two-way-binding') {
    app.tag('two-way-binding')
  }
  else if (page === 'index-of') {
    app.tag('index-of')
  }
  else if (page === 'select2') {
    app.tag('select2')
  }

  // default
  else {
    r.route('set-timeout')
  }
}
