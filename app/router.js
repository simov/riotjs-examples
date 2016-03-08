
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
  else if (page === 'class') {
    app.tag('class')
  }

  // events
  else if (page === 'index-of') {
    app.tag('index-of')
  }

  // controls
  else if (page === 'selects') {
    app.tag('selects')
  }
  else if (page === 'checkbox') {
    app.tag('checkbox')
  }
  else if (page === 'text') {
    app.tag('text')
  }

  // advanced
  else if (page === 'select2') {
    app.tag('select2')
  }
  else if (page === 'two-way-binding') {
    app.tag('two-way-binding')
  }

  // default
  else {
    r.route('set-timeout')
  }
}
