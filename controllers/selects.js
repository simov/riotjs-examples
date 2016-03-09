
app.controller.selects = function (opts) {

  function handleResponse (res) {
    this.items = res
    this.current = localStorage.getItem('item')
    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'select',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.sync = function (e) {
    if (e.target.selectedIndex === 0) {
      this.current = ''
    }
    else {
      this.current = this.items[e.target.selectedIndex-1].value
    }
    localStorage.setItem('item', this.current)
  }
}
