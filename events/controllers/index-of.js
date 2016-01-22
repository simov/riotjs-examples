
app.controller['index-of'] = function (opts) {
  function handleResponse (res) {
    this.tables = res.tables
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'api',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.remove = function (e) {
    var index = this.tables.indexOf(e.item)
    this.tables.splice(index, 1)
  }
}
