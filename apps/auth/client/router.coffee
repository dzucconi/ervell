Backbone = require 'backbone'
AuthFormView = require './form_view.coffee'

module.exports = class AuthRouter extends Backbone.Router
  routes:
    'log_in': 'logIn'
    'sign_up': 'signUp'
    'forgot_password': 'forgotPassword'
    'reset_password': 'resetPassword'

  initialize: ->
    #

  logIn: ->
    view = new AuthFormView el: $('.js-form')
    view.postRender()

  signUp: ->
    #

  forgotPassword: ->
    #

  resetPassword: ->
    #
