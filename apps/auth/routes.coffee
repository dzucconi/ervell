User = require '../../models/user'
cache = require '../../lib/cache'
url = require 'url'

clearCache = (user) ->
  user = new User user.attributes
  cache.del "#{user.url()}{}"

internalReferer = (req) ->
  refererURI = url.parse req.headers.referer or ''
  refererURI.href if refererURI.host is req.get('host')

getRedirectTo = (req) ->
  req.query['redirect-to'] or internalReferer(req) or '/'

@logIn = (req, res) ->
  redirectTo = getRedirectTo req

  formURL = if redirectTo?
    "/me/sign_in?redirect-to=#{redirectTo}"
  else
    '/me/sign_in'

  res.locals.sd.REFERER = req.headers.referer
  res.locals.sd.INTERNAL_REFERER = internalReferer req
  res.locals.sd.REDIRECT_TO = redirectTo

  res.render 'log_in',
    mode: 'log_in'
    form_url: 'formURL'

@signUp = (req, res) ->
  res.render 'sign_up',
    mode: 'sign_up'

@forgot = (req, res) ->
  res.render 'forgot_password',
    mode: 'forgot'

@logout = (req, res, next) ->
  req.logout()
  next()

@refresh = (req, res, next) ->
  return res.redirect('/') unless req.user
  req.user.fetch
    error: next
    success: ->
      req.login req.user, (error) ->
        if error
          next error
        else
          clearCache req.user
          res.json req.user.attributes

@resetPassword = (req, res, next) ->
  return next() if req.user
  res.locals.sd.TOKEN = req.params.token
  res.render 'reset_password'

@redirectBack = (req, res) ->
  res.redirect getRedirectTo(req)

@redirect = (req, res) ->
  url = req.body['redirect-to'] or req.query['redirect-to']
  res.redirect url

@flushall = (req, res, next) ->
  return @next() unless req.user?.id is 15
  cache.flushall()
  res.redirect '/'
