
var fs = require('fs')
var path = require('path')
var express = require('express')
var logger = require('morgan')
var serveStatic = require('serve-static')

var base  = fs.readFileSync(path.resolve(__dirname, 'base.html'), 'utf8')
var app = express()

app.use(logger('dev'))
app.use(serveStatic(path.join(__dirname, 'app')))
app.use(serveStatic(path.join(__dirname, 'components')))
app.use(serveStatic(path.join(__dirname, 'controllers')))

// basics

app.get('/set-timeout', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({
    a: (Math.floor(Math.random() * 999999) + 1).toString(),
    b: (Math.floor(Math.random() * 999999) + 1).toString(),
    c: (Math.floor(Math.random() * 999999) + 1).toString()
  }))
})

// templating

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

app.get('/class', function (req, res) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify([
    {type: 'centered'},
    {type: 'stretched'},
    {type: 'condensed'}
  ]))
})

// events

app.get('/index-of', function (req, res) {
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
  res.writeHead(200, {'content-type': 'text/html'})
  res.end(base)
})

app.listen(3000, function () {
  console.log('Express server listening on port', 3000)
})
