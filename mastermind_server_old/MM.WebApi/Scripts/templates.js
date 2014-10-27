this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/GameSetup.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p data-id=\'rules\'>\nTry to guess the pattern, in both order and number, within a selected number of turns. Each guess is made by typing your 4 digit guess into the guess box. Once placed, the computer provides feedback by placing from zero to four B and/or W\'s. A \'B\' is placed for each digit which is correct in both number and position. A \'W\' indicates the existence of a correct number placed in the wrong position.\n\nIf there are duplicate numbers in the guess, they cannot all be awarded a response unless they correspond to the same number of duplicate numbers in the hidden code. For example, if the hidden code is 1122 and the player guesses 1112, the computer will award two \'B\'s for the two correct 1\'s, nothing for the third 1 as there is not a third 1 in the code, and a \'B\' for the 2. No indication is given of the fact that the code also includes a second 2.\n\nOnce feedback is provided, another guess is made; guesses and feedback continue to alternate until either the player guesses correctly, or the player runs out of turns/gusses.\n</p>\n\n<select data-id=\'turn-select\'>Turns\n  <options value=5> 5 </options>\n  <options value=8> 8 </options>\n  <options value=10> 10 </options>\n  <options value=12> 12 </options>\n  <options value=14> 14 </options>\n  <options value=16> 16 </options>\n</select>\n<button data-id=\'play\' type=\'button\'>Play</button>\n';

}
return __p
};

this["JST"]["app/scripts/templates/Guess_input.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '  <form name=\'mm-form\' data-id=\'mm-form\'>\n    <input data-id=\'guess-input\' name=\'guess-input\'/>\n  </form>\n  <div data-id="click-buttons">\n    <button data-id=\'guess-button\' type=\'button\'>Guess</button>\n  </div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/Mastermind_template.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-id=\'game-setup\'></div.\n\n<div data-id=\'game-board\'></div.\n\n<div data-id=\'game-input\'></div.\n';

}
return __p
};