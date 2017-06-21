Backbone = require 'backbone'
AuthRouter = require './router.coffee'

module.exports = ->
  new AuthRouter
  Backbone.history.start pushState: true
