/**
 * RequireJS configuration
 */
require.config({
  paths: {
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai',
    style2style: '../style2style'
  },

  shim: {
    mocha: {
      exports: 'mocha'
    }
  }
});

require(['mocha', 'chai', 'style2style'], function(mocha, chai, style2style){
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

  describe('style2style(doc)', function(){

    beforeEach(createFixture);
    afterEach(destroyFixture);

    it('should exist', function(){
      var doc = getFixture().contentDocument;
      assert.isFunction(style2style);

      console.log(style2style(doc, {remove: true}).body.innerHTML);
      console.log(doc.head.innerHTML)

    });

  });

  mocha.run();
});
