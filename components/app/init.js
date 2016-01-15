
Object.keys(app.controller).forEach(function (name) {
  if (typeof app.controller[name].cleanup !== 'function') {
    app.controller[name].cleanup = function () {}
  }
})

$(function () {
  r.route(app.router)
  r.route.exec(app.router)
  r.route.start()
})
