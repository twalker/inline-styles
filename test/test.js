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
    var el = document.createElement('iframe')
    el.setAttribute('id', 'fixture')
    el.src = 'fixture.html'
    el.addEventListener('load', function(e){
      done()
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

    it('should be a function', function(){
      assert.isFunction(inlineStyles);
    })

    it('should apply style tag/link rules to style attributes', function(){
      var doc = getFixture().contentDocument
      var elReg = doc.querySelector('p')
      var elSuper = doc.querySelector('p.super')
      var elPara = doc.getElementById('para')
      var elInline = doc.querySelector('p[style]')
      var elSection = doc.querySelector('section')

      inlineStyles(doc)

      assert.equal(elReg.style.color, 'rgb(0, 0, 255)')
      assert.equal(elSuper.style.color, 'rgb(255, 0, 0)')
      assert.equal(elPara.style.color, 'rgb(0, 255, 0)')
      assert.equal(elInline.style.color, 'purple')
      assert.equal(elReg.style.textTransform, 'uppercase')
      assert.equal(elSection.style.width, '50%')
    })

    it('should remove style and link tags', function(){
      var doc = getFixture().contentDocument

      inlineStyles(doc)

      assert.equal(doc.querySelectorAll('style, link').length, 0)
    })

    it('should NOT apply rules of a style/link when `data-inline-options="ignore"`', function(){
      var doc = getFixture().contentDocument
      var elReg = doc.querySelector('p')
      doc.querySelector('link[rel="stylesheet"]').setAttribute('data-inline-options', 'ignore')

      inlineStyles(doc)

      assert.notEqual(elReg.style.textTransform, 'uppercase')

    })

    it('should NOT remove style/link elements when `data-inline-options="preserve"`', function(){
      var doc = getFixture().contentDocument
      doc.querySelector('style').setAttribute('data-inline-options', 'preserve')

      inlineStyles(doc)

      assert.equal(doc.querySelectorAll('style, link').length, 1)

    })

    it('should move remaining style/link elements in the head, to the body', function(){
      var doc = getFixture().contentDocument
      var style = doc.querySelector('style')
      style.setAttribute('data-inline-options', 'preserve')

      inlineStyles(doc)

      assert.equal(style.parentNode, doc.body)

    })

  });

  mocha.run();
});
