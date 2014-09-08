(function() {
  var Game, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Game = (function(_super) {
    __extends(Game, _super);

    function Game() {
      _ref = Game.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Game;

  })(Backbone.Model);

  window.Game = Game;

}).call(this);
