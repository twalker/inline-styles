/**
 * RequireJS configuration
 */
require.config({
  paths: {
    text: '../bower_components/requirejs-text/text',
    style2style: '../style2style'
  }
});

require(['style2style', 'text!../test/fixture.html'], function(style2style, fixture){

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

    style2style(doc);
    form.querySelector('[name="dest"]').value = doc.head.outerHTML + '\n' + doc.body.outerHTML;

  };
  form.addEventListener('submit', onSubmit)
});
