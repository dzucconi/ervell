Backbone = require 'backbone'
Promise = require 'bluebird-q'
Serializer = require '../../../components/form/serializer.coffee'

module.exports = class AuthFormView extends Backbone.View
  events:
    'submit': 'submit'

  submit: (e) ->
    e.preventDefault()

    serializer = new Serializer @$el

    label = @dom.submit.text()

    @dom.submit
      .prop 'disabled', true
      .text 'Saving...' # Determine dynamically

    Promise $.ajax
      url: @$el.attr 'action'
      method: @$el.attr 'method'
      data: serializer.data()

    .then ->
      # window.location = '?redirect-to='
      console.log arguments...

    .then ->
      @dom.submit.text 'Success'

    .catch (err) ->
      @dom.errors
        .show()
        .html """
          #{err.responseJSON.message}<br>
          #{err.responseJSON.description}
        """

      @dom.submit
        .prop 'disabled', false
        .text 'Error'

      setTimeout (=> @dom.submit.text label), 2500

  postRender: ->
    @dom =
      errors: @$('.js-errors')
      submit: @$('.js-submit')

  render: ->
    @postRender()
    this
