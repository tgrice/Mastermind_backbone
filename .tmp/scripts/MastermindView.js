(function() {
  var MastermindView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      return MastermindView.__super__.constructor.apply(this, arguments);
    }

    MastermindView.prototype.template = JST['Mastermind_backbone/scripts/Mastermind_template.ejs'];

    MastermindView.prototype.render = function() {
      return this.$el.html(this.template);
    };

    return MastermindView;

  })(Backbone.View);

}).call(this);
