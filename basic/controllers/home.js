
app.controller.home = function (opts) {
  this.title = opts.title

  var self = this
  this.timer = setInterval(function () {
    $.ajax({
      type: 'GET',
      url: 'api',
      dataType: 'json',
      success: function (res) {
        self.res = res
        self.update()
      }
    })
  }, 1000)
}

app.controller.home.cleanup = function () {
  app.tags.home.one('unmount', function () {
    clearInterval(this.timer)
  })
}
