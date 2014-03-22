var test = require('tape');
var fnhelp = require('./');

Function.prototype.help = fnhelp;

test('fnhelp on passed function', function(t) {

  function fixture() {
    // Yep!
    var a;
    // Indeed.
  }

  t.equal(fnhelp(fixture), ' Yep!');
  t.equal(fnhelp(fixture, true), ' Yep!\n Indeed.');
  t.end();
})

test('fnhelp on local object', function(t) {
  var fixture = {
    toString: function() {
      return '// comment';
    },
    help: fnhelp
  }

  t.equal(fixture.help(), ' comment');
  t.end();
})

test('fnhelp on Function', function(t) {

  function fixture() {
    // comment
  }

  t.equal(fixture.help(), ' comment');
  t.end();
})

test('grab the first cpp', function(t) {

  function fixture() {
    var h = 'what';
    /**
     * I'm the first
     */
    // I'm further.
  }

  t.equal(fixture.help(), ' I\'m the first');
  t.end();
})

test('grab the first multi slashes', function(t) {

  function fixtureA() {
    // The first
    // But more follow
    // maybe even a few more.

    // I'm further.
  }

  function fixtureB() {
    // The first
    // But more follow
    // maybe even a few more.

    var h = 'what';
    // I'm further.
  }

  t.equal(fixtureA.help(), ''
    + ' The first\n'
    + ' But more follow\n'
    + ' maybe even a few more.\n'
    + ' I\'m further.');

  t.equal(fixtureB.help(), ''
    + ' The first\n'
    + ' But more follow\n'
    + ' maybe even a few more.');

  t.end();
})

test('single line multi', function(t) {
  function fixture() {
    /** but it's only one line */
  }

  t.equal(fixture.help(), ' but it\'s only one line ');
  t.end();
})

test('super case', function(t) {

  fnhelp();

  var exp1 = ''
    + ' This is text, something about whatever, but multiline strings\n'
    + ' are not a problem.\n'
    + ' >    |\n'
    + '  >   |\n'
    + '   >  |\n'
    + '    > |\n'
    + '     >|'

  t.equal(fixture1.help(), exp1);

  var rest = ''
    + ' Single line multi... \n'
    + 'oh gawd what about these?\n'
    + ' And how\n'
    + ' And Then...\n'
    + ' And what? you? manybe more than one\n'
    + 'These are comments within but without leading *.\n'
    + 'And it contains a *, just incase that messes with things.\n'
    + 'Also a //.'


  t.equal(fixture1.help(true), exp1 + '\n' + rest);
  t.end();
})

function fixture1() {
  /**
   * This is text, something about whatever, but multiline strings
   * are not a problem.
   * >    |
   *  >   |
   *   >  |
   *    > |
   *     >|
   **/

  /* Single line multi... */
  var how = 'does this even work';

  function yo() {
    /*
      oh gawd what about these?
    */
  }

  // And how
  // And Then...
  // And what? you? manybe more than one
  var what = 'how';
  /*
    These are comments within but without leading *.
    And it contains a *, just incase that messes with things.
    Also a //.
   */

  return what;
}
