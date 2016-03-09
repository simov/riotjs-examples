
app.controller['two-way-binding'] = function (opts) {
  function handleResponse (res) {
    console.log('res', res)

    this.controls = res
    this.update()

    jq.initChosen()
    jq.initDatetimePicker()
    jq.initCKEditor()
  }

  $.ajax({
    type: 'GET',
    url: 'two-way-binding',
    dataType: 'json',
    success: handleResponse.bind(this)
  })

  this.sync = function (e) {
    console.log('sync', e)

    e.item.value = (function (c) {
      if (c.multiple) {
        // selectize
        return Object.keys(e.currentTarget.childNodes).map(function (key) {
          return e.currentTarget.childNodes[key].value
        })
      }
      else if (c.select) {
        // regular select
        var index = e.currentTarget.selectedIndex-1
        return (index < 0) ? '' : e.item.options[index].value
        // selectize
        // return e.currentTarget.value
      }
      else if (c.date || c.time || c.datetime || c.year || c.textarea) {
        return e.currentTarget.value
      }
      else if (c.text || c.radio || c.number || c.file) {
        return e.srcElement.value
      }
    })(e.item.control)

    console.log('value', e.item.value)
  }

  this.send = function () {
    console.log('send', this.controls)

    function handleResponse (res) {
      console.log('res', res)
      this.update()
    }

    function send () {
      $.ajax({
        type: 'POST',
        url: 'two-way-binding',
        data: this.controls,
        dataType: 'json',
        success: handleResponse.bind(this)
      })
    }

    setTimeout(send.bind(this), 150)
  }

  var jq = {
    initChosen: function () {
      $('.chosen').chosen({
        allow_single_deselect: true,
        no_results_text: 'No results matched!<br /> <a href="#">Click to add</a> ',
        width: '100%'
      })
    },
    initDatetimePicker: function () {
      $('.datetime').datetimepicker({
        weekStart: 1, autoclose: 1, todayHighlight: 1,
        keyboardNavigation: 0, forceParse: 0, viewSelect: 'decade',
        language: 'en',
        format: 'yyyy-mm-dd',
        formatViewType: 'date', startView: 2, minView: 2, maxView: 4
      })
    },
    initCKEditor: function () {
      function init () {
        $('.ckeditor').each(function () {
          if ($(this).next().attr('type') === 'hidden') {
            var instance = $(this).ckeditor({
              toolbarGroups: [
                {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
                {name: 'paragraph',   groups: ['list', 'indent', 'blocks', 'align']},
                '/',
                {name: 'styles'},
                {name: 'colors'},
                {name: 'insert'}
              ],
              removeButtons: 'Smiley,SpecialChar,PageBreak,Iframe,CreateDiv,Table,Flash,HorizontalRule',
              language: 'en'
            })
            instance.editor.on('blur', function (e) {
              var id = '#cke_' + e.editor.name
              var hidden = $(id).next()
              hidden.val(e.editor.getData())
              hidden[0].onchange({})
            })
          }
        })
      }
      if (timeout) {
        return
      }
      var timeout = setTimeout(function () {
        init()
        clearTimeout(timeout)
      }, 100)
    }
  }
}
