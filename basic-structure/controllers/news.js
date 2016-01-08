
app.controller.news = function (args) {
  var self = this
  this.timer = setInterval(function () {
    $.ajax({
      type: 'GET',
      url: 'api',
      dataType: 'json',
      success: function (json) {
        self.json = json
        self.update()
      }
    })
  }, 1000)
}

app.controller.news.cleanup = function () {
  app.tags.news.one('unmount', function () {
    clearInterval(this.timer)
    this.isMounted = false
  })
}
