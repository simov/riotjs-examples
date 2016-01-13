
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

app.get('/', function (req, res) {
  res.render('base', {})
})

app.listen(3000, function () {
  console.log('Express server listening on port', 3000)
})
