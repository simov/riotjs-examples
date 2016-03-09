
app.controller.class = function (opts) {

  var setType = function (name) {
    this.types.forEach(function (type) {
      type.active = (type.type === name)
    })
  }.bind(this)

  function handleResponse (res) {
    this.types = res

    var type = localStorage.getItem('type') || 'stretched'
    setType(type)

    this.update()
  }

  $.ajax({
    type: 'GET',
    url: 'class',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.sync = function (e) {
    localStorage.setItem('type', e.item.type)
    setType(e.item.type)
  }
}
