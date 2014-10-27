(function() {
  $(function() {
    return $('[data-id=container]').html(new Mastermind_Template_View().render().el);
  });

}).call(this);
