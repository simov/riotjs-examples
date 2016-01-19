
app.controller['on-key-up'] = function (opts) {

  function handleResponse (res) {
    this.tables = res.tables
    this.update()

    var filter = localStorage.getItem('filter')
    if (filter) {
      this.input.value = filter
      this.filter()
    }
  }

  $.ajax({
    type: 'GET',
    url: 'api',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.filter = function (e) {
    var value = this.input.value

    this.tables.forEach(function (table) {
      if (table.verbose.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        table.show = true
      }
      else {
        table.show = false
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
