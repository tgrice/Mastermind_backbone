(function() {
  var GameSetupView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GameSetupView = (function(_super) {
    __extends(GameSetupView, _super);

    function GameSetupView() {
      _ref = GameSetupView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GameSetupView.prototype.template = JST['app/scripts/templates/GameSetup.ejs'];

    GameSetupView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    GameSetupView.prototype.events = {
      'click [data-id=play]': 'triggerStartGame'
    };

    GameSetupView.prototype.triggerStartGame = function() {
      var turns;
      turns = this.$('[data-id=turn-select]').val();
      return this.trigger('triggerStartGame', turns);
    };

    return GameSetupView;

  })(Backbone.View);

  window.GameSetupView = GameSetupView;

}).call(this);
