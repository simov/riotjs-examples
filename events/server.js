
var path = require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var consolidate = require('consolidate')
var hogan = require('hogan.js')

var app = express()

app.use(logger('dev'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.set('view cache', false)
app.engine('html', consolidate.hogan)
app.use(serveStatic(path.join(__dirname, 'app')))
app.use(serveStatic(path.join(__dirname, 'components')))
app.use(serveStatic(path.join(__dirname, 'controllers')))
app.use(serveStatic(path.join(__dirname, 'public')))
app.use(serveStatic(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({
    tables: [
      {verbose: 'Car'},
      {verbose: 'Game'},
      {verbose: 'Gender'},
      {verbose: 'Member'},
      {verbose: 'Team'},
      {verbose: 'User'}
    ]
  }))
})

app.get('/two-way-binding', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({
    columns: [
      {name: 'text', text: true},
      {name: 'select', select: true, options: [
        {text: 'Car', value: 0},
        {text: 'Game', value: 1},
        {text: 'Gender', value: 2},
        {text: 'Member', value: 3}
      ]},
      {name: 'radio', radio: true, options: [
        {text: 'True', value: 1},
        {text: 'False', value: 0}
      ]},
      {name: 'number', number: true},
      {name: 'date', date: true},
      {name: 'textarea', textarea: true}
    ]
  }))
})

app.post('/two-way-binding', function (req, res) {
  console.log(JSON.stringify(req.body, null, 2))
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({ok: true}))
})

app.get('/', function (req, res) {
  res.render('base', {})
})

app.listen(3000, function () {
  console.log('Express server listening on port', 3000)
})
