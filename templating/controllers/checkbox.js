
app.controller.checkbox = function (opts) {

  function handleResponse (res) {
    this.items = res
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'checkbox',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.onChange = function (e) {
    this.items[e.item.key] = !e.item.value
  }
}
