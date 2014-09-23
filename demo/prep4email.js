/**
 * prep4email is a PhantomJS script that applies inline-styles to a document.
 *
 * @example
 * phantomjs --config=prep4email-config.json prep4email.js http://localhost:3000/demo/example.html
 *
 */
var system = require('system');
var page = require('webpage').create();

var url = system.args[1];
if(!/^http/.test(url)){
  system.stdout.writeLine('Usage: prep4email URL');
  phantom.exit(0)
}

page.onConsoleMessage = function(msg){console.log(msg);};

page.open(url, function (status) {
  if (status !== 'success') {
    system.stderr.writeLine('Unable to access the URL');
    phantom.exit(1);
  } else {

    // modify phantom document and obtain the outerHTML.
    page.injectJs('../inline-styles.js');
    var out = page.evaluate(function onEvaluate(){
      // inline styles
      inlineStyles(document);
      // return modified phantom document as html string
      return document.head.outerHTML + '\n' + document.body.outerHTML;
    });

    system.stdout.writeLine(out)

    phantom.exit(0);
  }
})