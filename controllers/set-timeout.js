
app.controller['set-timeout'] = function (opts) {
  this.title = opts.title

  this.timer = setInterval(() => {
    $.ajax({
      type: 'GET',
      url: 'set-timeout',
      dataType: 'json',
      success: (res) => {
        this.items = res
        this.update()
      }
    })
  }, 1000)

  this.one('unmount', function () {
    clearInterval(this.timer)
  })
}
