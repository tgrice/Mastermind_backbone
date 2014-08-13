(function() {
  var CodeGenerator;

  CodeGenerator = (function() {
    function CodeGenerator() {}

    CodeGenerator.prototype.createCode = function() {
      var code;
      return code = [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()];
    };

    CodeGenerator.prototype.randomNumber = function() {
      return Math.floor(Math.random() * 10);
    };

    return CodeGenerator;

  })();

  window.CodeGenerator = CodeGenerator;

}).call(this);
