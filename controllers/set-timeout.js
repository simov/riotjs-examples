
app.controller['set-timeout'] = function (opts) {
  this.title = opts.title

  var self = this
  this.timer = setInterval(function () {
    $.ajax({
      type: 'GET',
      url: 'set-timeout',
      dataType: 'json',
      success: function (res) {
        self.items = res
        self.update()
      }
    })
  }, 1000)

  this.one('unmount', function () {
    clearInterval(this.timer)
  })
}
