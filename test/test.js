/**
 * RequireJS configuration
 */
require.config({
  paths: {
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai',
    'inline-styles': '../inline-styles'
  },

  shim: {
    mocha: {
      exports: 'mocha'
    }
  }
});

require(['mocha', 'chai', 'inline-styles'], function(mocha, chai, inlineStyles){
  var assert = chai.assert
  mocha.setup('bdd');


  function createFixture(done){
    var el = document.createElement('iframe');
    el.setAttribute('id', 'fixture');
    el.src = 'fixture.html';
    el.addEventListener('load', function(e){
      done();
    })
    document.body.appendChild(el);
  }

  function getFixture(){
    return document.getElementById('fixture');
  }

  function destroyFixture(){
    var fixture = document.getElementById('fixture');
    fixture.parentNode.removeChild(fixture);
  }

  describe('inlineStyles(doc)', function(){

    beforeEach(createFixture);
    afterEach(destroyFixture);

    it('should exist', function(){
      var doc = getFixture().contentDocument;
      assert.isFunction(inlineStyles);

      console.log(inlineStyles(doc, {remove: true}).body.innerHTML);
      console.log(doc.head.innerHTML)

    });

  });

  mocha.run();
});
