class CodeGenerator
  createCode: ->
    code = [
      @randomNumber(),
      @randomNumber(),
      @randomNumber(),
      @randomNumber()
    ]

  randomNumber: ->
    Math.floor(Math.random() * 10)

window.CodeGenerator = CodeGenerator
