
app.controller['two-way-binding'] = function (opts) {
  function handleResponse (res) {
    console.log(res)
    this.columns = res.columns
    this.update()

    jq.initChosen()
    jq.initDatetimePicker()
    jq.initCkeditor()
  }

  $.ajax({
    type: 'GET',
    url: 'two-way-binding',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.sync = function (e) {
    console.log(e)

    if (e.item.select) {
      var index = e.currentTarget.selectedIndex-1
      var value = (index < 0) ? '' : e.item.options[index].value
      e.item.value = value
    }
    else if (e.item.radio) {
      var value = e.srcElement.value
      e.item.value = value
    }
    else if (e.item.date || e.item.textarea) {
      var value = e.currentTarget.value
      e.item.value = value
    }
    else {
      var value = e.srcElement.value
      e.item.value = value
    }

    console.log(value)
  }

  this.send = function () {
    console.log(this.columns)

    function handleResponse (res) {
      console.log(res)
      this.update()
    }

    function send () {
      $.ajax({
        type: 'POST',
        url: 'two-way-binding',
        data: {columns: this.columns},
        dataType: 'json',
        success: handleResponse.bind(this)
      })
    }

    setTimeout(send.bind(this), 150)
  }

  var jq = {
    initChosen: function () {
      var options = {
        allow_single_deselect: true,
        no_results_text: 'No results matched!<br /> <a href="#">Click to add</a> ',
        width: '100%'
      }
      $('.chosen').chosen(options)
    },
    initDatetimePicker: function () {
      var options = {
        weekStart: 1, autoclose: 1, todayHighlight: 1,
        keyboardNavigation: 0, forceParse: 0, viewSelect: 'decade',
        language: 'en',
        format: 'yyyy-mm-dd',
        formatViewType: 'date', startView: 2, minView: 2, maxView: 4
      }
      $('.datetime').datetimepicker(options)
    },
    initCkeditor: function () {
      $('.ckeditor').ckeditor({
        toolbarGroups: [
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
          '/',
          { name: 'styles' },
          { name: 'colors' },
          { name: 'insert' }
        ],
        removeButtons: 'Smiley,SpecialChar,PageBreak,Iframe,CreateDiv,Table,Flash,HorizontalRule',
        language: 'en'
      })
      var name = $('.ckeditor').attr('name')
      CKEDITOR.instances[name].on('blur', function (e) {
        var id = '#cke_' + e.editor.name
        var hidden = $(id).next()
        hidden.val(e.editor.getData())
        hidden[0].onchange({})
      })
    }
  }
}
