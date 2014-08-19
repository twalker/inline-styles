/**
 * RequireJS configuration
 */
require.config({
  paths: {
    text: '../bower_components/requirejs-text/text',
    'inline-styles': '../inline-styles'
  }
});

require(['inline-styles', 'text!example.html'], function(inlineStyles, fixture){

  var iframe = document.getElementById('iframe');
  var form = document.querySelector('form');
  var src = form.querySelector('[name="src"]');
  src.value = fixture;

  src.addEventListener('input', function(e){
    //console.log('input', iframe);
    //iframe.src = 'data:text/html,' + e.currentTarget.value;
    iframe.srcdoc = e.currentTarget.value;
  })

  iframe.srcdoc = fixture;

  var onSubmit = function(e){
    e.preventDefault();
    var doc = iframe.contentDocument;
    console.time('inlineStyles');
    inlineStyles(doc);
    console.timeEnd('inlineStyles')
    form.querySelector('[name="dest"]').value = doc.head.outerHTML + '\n' + doc.body.outerHTML;

    var inputLength = form.querySelector('[name="src"]').value.length
    var outputLength = form.querySelector('[name="dest"]').value.length
    console.log('length difference:', outputLength - inputLength, 'characters' )

  };
  form.addEventListener('submit', onSubmit)
});
