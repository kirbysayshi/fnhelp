fnhelp
======

Get some fn' help from your functions (parse for comments!). This is an experiment in making JS more self-explanatory while playing around, similar to R's `?something` or python's docblock.

This might be a horrible idea.

Examples
--------

Somewhere in your code...

```js
function Corgi() {

  /**
   * This class does some cool stuff, and is apparently complicated enough
   * that comments are useful.
   */

  this.shedding = 'all the time';
}

Corgi.prototype.croissant = function() {

  // It's just really quite ridiculous. He forms nearly an entire circle.
  // Long dog is long.
  var isLong = true;

  // At the end are where the tail should be but isn't.
}
```

And then maybe from a repl?

```
> Function.prototype.help = require('fnhelp');
[Function: help]
> Corgi.help()
' This class does some cool stuff, and is apparently complicated enough\n that comments are useful.'
> Corgi.prototype.croissant.help()
' It\'s just really quite ridiculous. He forms nearly an entire circle.\n Long dog is long.'
> var c = new Corgi; c.croissant.help();
' It\'s just really quite ridiculous. He forms nearly an entire circle.\n Long dog is long.'
> c.croissant.help(true);
' It\'s just really quite ridiculous. He forms nearly an entire circle.\n Long dog is long.\n At the end are where the tail should be but isn\'t.'
```

Usage
-----

### `fnhelp()`

Calls `toString()` on the current `this` and returns the first comments it finds.

### `fnhelp(true)`

Calls `toString()` on the current `this` and returns _all_ comments it finds.

### `fnhelp(thing)`

Calls `toString()` on `thing` and returns the first comments it finds.

### `fnhelp(thing, true)`

Calls `toString()` on `thing` and returns _all_ comments it finds.

For ease of use this might be neat:

```js
Function.prototype.help = require('fnhelp');
```

More Details
------------

fnhelp is a function that will `toString` another function and then do minimal parsing to grab the comments. By default it returns the first set of comments it finds. If given a single truthy argument, it will return _all_ the comments it finds in the function.

By default, fnhelp supports the following styles of comments:

- Double slash:
  - `// This is a comment`
- Multiline
  - `/** This is a comment */`
  - `/***** what
      * this is fine too */`
  - `/*
      * this is fine too
      */`
  - `/*****
      * this is fine too
      *****/`
  - `/*
        this is fine too
      */`

fnhelp will also strip leading `*` if within a multiline comment, and strip `//` if within a single line comment.

