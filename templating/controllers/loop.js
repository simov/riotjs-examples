
app.controller.loop = function (opts) {

  function handleResponse (res) {
    this.res = res
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'api',
    dataType: 'json',
    success: handleResponse.bind(this)
  })
}
