
module.exports = function help(fn, all) {

  switch(arguments.length) {
    case 0:
      fn = this;
      break;

    case 1:
      if (typeof fn !== 'function') {
        all = fn;
        fn = this;
      }
      break;
  }

  var reStarts = /^(\s*)(?:(\/\*+)|(\*+\/)|(\*)|(\/\/))?(.*?)(\*+\/)?$/mg;

  var str = fn.toString();
  var buffer = [];
  var withincpp = false;
  var done = false;

  str.replace(reStarts, function(m, w, cppstart, cppend, star, slashes, rest, cppendline) {

    if (done) return;

    var startLength = buffer.length;

    // These are useful for debugging...
    //console.log('match', m);
    //console.log('w', w);
    //console.log('cppstart', cppstart);
    //console.log('cppend', cppend);
    //console.log('star', star);
    //console.log('slashes', slashes);
    //console.log('rest', rest);
    //console.log('cppendline', cppendline);

    if (cppstart && cppendline) {
      buffer.push(rest);
      return;
    }

    if (cppstart) {
      withincpp = true;
      buffer.push(rest);
    }

    if (cppend && withincpp) {
      withincpp = false;
      buffer.push(rest);
      if (!all) { done = true; }
    }

    if (withincpp) {
      buffer.push(rest);
    }

    if (slashes) {
      buffer.push(rest);
    }

    if (buffer.length === startLength && buffer.length > 0 && !all) {
      // Nothing was added, and we should stop.
      done = true;
    }
  });

  return buffer.filter(function(line) { return line }).join('\n');
};
