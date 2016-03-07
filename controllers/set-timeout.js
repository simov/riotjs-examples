
app.controller['set-timeout'] = function (opts) {
  this.title = opts.title

  var self = this
  this.timer = setInterval(() => {
    $.ajax({
      type: 'GET',
      url: 'set-timeout',
      dataType: 'json',
      success: (res) => {
        self.res = res
        self.update()
      }
    })
  }, 1000)

  this.one('unmount', () => {
    clearInterval(this.timer)
  })
}
