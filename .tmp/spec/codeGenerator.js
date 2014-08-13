(function() {
  describe('CodeGenerator', function() {
    it('returns a code of length 4', function() {
      var code, gen;
      gen = new CodeGenerator;
      code = gen.createCode();
      return expect(code.length).toBe(4);
    });
    return it('validates digits in code', function() {
      var code, count, gen, value, _i, _len;
      gen = new CodeGenerator;
      code = gen.createCode();
      count = 0;
      for (_i = 0, _len = code.length; _i < _len; _i++) {
        value = code[_i];
        if (value < 10) {
          count++;
        }
      }
      return expect(count).toBe(code.length);
    });
  });

}).call(this);
