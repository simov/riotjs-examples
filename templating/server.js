
var path = require('path')
var express = require('express')
var logger = require('morgan')
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

app.get('/loops', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({
    arr: [{a: 1, b: 2}, {a: 3, b: 4}],
    obj: {a: 1, b: 2, c: 3, d: 4}
  }))
})

app.get('/select', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify([
    {text: 'Car', value: 'car'},
    {text: 'Game', value: 'game'},
    {text: 'Gender', value: 'gender'},
    {text: 'Member', value: 'member'},
    {text: 'Team', value: 'team'},
    {text: 'User', value: 'user'}
  ]))
})

app.get('/checkbox', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({
    name: true,
    price: false,
    total: true,
    notes: false
  }))
})

app.get('/', function (req, res) {
  res.render('base', {})
})

app.listen(3000, function () {
  console.log('Express server listening on port', 3000)
})
