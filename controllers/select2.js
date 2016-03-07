
app.controller.select2 = function (opts) {
  function handleResponse (res) {
    this.single = res.tables
    this.item = localStorage.getItem('item')
    this.multiple = res.tables
    this.items = localStorage.getItem('items') || []
    this.update()

    jq.singleAll()
    jq.multipleAll()
  }

  $.ajax({
    type: 'GET',
    url: 'index-of',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.changeSingle = function (e) {
    console.log(e)
    if (e.currentTarget.selectedIndex === 0) {
      this.item = ''
      localStorage.setItem('item', '')
    }
    else {
      this.item = this.single[e.currentTarget.selectedIndex-1].verbose
      localStorage.setItem('item', this.item)
    }
  }

  this.changeMultiple = function (e) {
    console.log(e)
    var items = []
    for (var i=0; i < e.currentTarget.selectedOptions.length; i++) {
      var index = e.currentTarget.selectedOptions[i].index
      items.push(this.multiple[index].verbose)
    }
    this.items = items
    localStorage.setItem('items', this.items)
  }

  var jq = {
    singleAll: function () {
      $('.single-all').select2({
        allowClear: true,
        placeholder: 'Choose'
      })
    },
    multipleAll: function () {
      $('.multiple-all').select2({
        placeholder: 'Choose'
      })
    }
  }
}
