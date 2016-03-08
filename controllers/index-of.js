
app.controller['index-of'] = function (opts) {

  function handleResponse (res) {
    this.items = res
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'index-of',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.remove = function (e) {
    var index = this.items.indexOf(e.item)
    this.items.splice(index, 1)
  }
}
