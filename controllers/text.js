
app.controller.text = function (opts) {

  function handleResponse (res) {
    this.items = res
    this.update()

    var filter = localStorage.getItem('filter')
    if (filter) {
      this.input.value = filter
      this.filter()
    }
  }

  $.ajax({
    type: 'GET',
    url: 'text',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.filter = function (e) {
    var value = this.input.value

    this.items.forEach(function (item) {
      if (item.verbose.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        item.show = true
      }
      else {
        item.show = false
      }
    })

    localStorage.setItem('filter', value)
    this.update()
  }

  this.clear = function (e) {
    localStorage.setItem('filter', '')
    this.input.value = ''
    this.filter()
  }
}
