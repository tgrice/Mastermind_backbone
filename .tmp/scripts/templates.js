this["JST"] = this["JST"] || {};

this["JST"]["scripts/templates/Mastermind_template.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div> \n  <table class=\'game\' id=\'game_table\'>\n    <tr>\n      <th>Guess</th>\n      <th>Feedback</th>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-9\'></td>\n      <td class=\'feedback\' data-id=\'feedback-9\'></td>\n      <td id=\'reveal\' hidden=true></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-8\'></td>\n      <td class=\'feedback\' data-id=\'feedback-8\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-7\'></td>\n      <td class=\'feedback\' data-id=\'feedback-7\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-6\'></td>\n      <td class=\'feedback\' data-id=\'feedback-6\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-5\'></td>\n      <td class=\'feedback\' data-id=\'feedback-5\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-4\'></td>\n      <td class=\'feedback\' data-id=\'feedback-4\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-3\'></td>\n      <td class=\'feedback\' data-id=\'feedback-3\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-2\'></td>\n      <td class=\'feedback\' data-id=\'feedback-2\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-1\'></td>\n      <td class=\'feedback\' data-id=\'feedback-1\'></td>\n    </tr>\n    <tr>\n      <td class=\'guess\' data-id=\'guess-0\'></td>\n      <td class=\'feedback\' data-id=\'feedback-0\'></td>\n    </tr>\n  </table>\n  <form name=\'mm_form\' id=\'mm_form\' onkeypress="return event.keyCode != 13;">\n    <input id=\'guess_input\' name=\'guess_input\'/>\n  </form>\n  <div id="click_buttons">\n    <button data-id=\'guess_button\' type=\'button\'>Guess</button>\n    <button data-id=\'reset-button\' type=\'button\'>New Game</button>\n  </div>\n</div>\n';

}
return __p
};