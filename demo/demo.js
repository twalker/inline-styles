/**
 * RequireJS configuration
 */
require.config({
  paths: {
    text: '../bower_components/requirejs-text/text',
    'inline-styles': '../inline-styles'
  }
});

require(['inline-styles', 'text!../test/fixture.html'], function(inlineStyles, fixture){

  var iframe = document.getElementById('iframe');
  var form = document.querySelector('form');
  var src = form.querySelector('[name="src"]');
  src.value = fixture;

  src.addEventListener('input', function(e){
    console.log('input', iframe);
    //iframe.src = 'data:text/html,' + e.currentTarget.value;
    iframe.srcdoc = e.currentTarget.value;
  })

  iframe.srcdoc = fixture;

  var onSubmit = function(e){
    e.preventDefault();
    var doc = iframe.contentDocument;

    inlineStyles(doc);
    form.querySelector('[name="dest"]').value = doc.head.outerHTML + '\n' + doc.body.outerHTML;

  };
  form.addEventListener('submit', onSubmit)
});
