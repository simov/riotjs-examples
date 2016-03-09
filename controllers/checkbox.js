
app.controller.checkbox = function (opts) {

  function handleResponse (res) {
    var items = localStorage.getItem('checkbox')
    if (items) {
      this.items = JSON.parse(items)
    }
    else {
      this.items = res
    }
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'checkbox',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.sync = function (e) {
    this.items[e.item.key] = !e.item.value
    localStorage.setItem('checkbox', JSON.stringify(this.items))
  }
}
