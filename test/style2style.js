/**
 * RequireJS configuration
 */
require.config({
  paths: {
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai',
    'style2style': '../style2style'
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

  function createFixture(){
    var el = document.createElement('section');
    el.setAttribute('id', 'fixture');
    el.innerHTML = '<h1>hello</h1><p><a href="#">world</a><i>!</i></p>';
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

      assert.isObject(style2style);

    });

  });

  mocha.run();
});
