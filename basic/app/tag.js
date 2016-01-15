
app.tag = function (name, options, inline) {
  Object.keys(app.tags).forEach(function (tag) {
    if (tag !== name) {
      app.tags[tag].unmount(true)
    }
  })
  if (app.tags[name]) {
    if (!app.tags[name].isMounted) {
      app.tags[name] = r.mount(name, options)[0]
      app.controller[name].cleanup()
    }
    else {
      app.tags[name].update(options)
    }
  }
  else {
    if (inline) {
      r.tag(name, window[name].innerHTML, app.controller[name])
      app.tags[name] = r.mount(name, options)[0]
    }
    else {
      $.ajax({
        type: 'GET',
        url: name + '.html',
        dataType: 'text',
        success: function (html) {
          r.tag(name, html, app.controller[name])
          app.tags[name] = r.mount(name, options)[0]
          app.controller[name].cleanup()
        }
      })
    }
  }
}
