/**
 * RequireJS configuration
 */
require.config({
  paths: {
    style2style: '../style2style'
  }
});

require(['style2style'], function(style2style){

  var form = document.querySelector('form');
  var onSubmit = function(e){
    e.preventDefault();
    console.log('click');
    var iframe = document.createElement('iframe');
    iframe.src = 'data:text/html,' + form.querySelector('[name="src"]').value;
    document.body.appendChild(iframe);
    style2style(iframe.ownerDocument);
    form.querySelector('[name="dest"]').value = iframe.body.innerHTML;

  };
  form.addEventListener('submit', onSubmit)
});
