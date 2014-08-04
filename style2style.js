/**
 * style2style
 * Inlines styles from style tags to style attributes
 *
 * TODO:
 *
 * x link tags (use stylesheets collection instead)
 * - media rules MEDIA_RULE = 4;
 * - pseudo selectors (2nd arg to getComputedStyle)
 *
 *
 *
 */
// UMD's amdWeb pattern
(function (root, factory) {
  if (typeof define === 'function' && define.amd){
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.style2style = factory();
  }
}(this, function(){

  function removeElement(el){
    return el.parentNode.removeChild(el);
  }

  function inlineRule(el, rule){
    //console.log('setting', el, rule.style)
    // OMG: window.getMatchedCSSRules(document.body)
    //console.log('cssText', rule.cssText);
    //console.log('style', rule.style);
    var computed =  window.getComputedStyle(el);
    for(var i = 0; i < rule.style.length; i++){
      var prop = rule.style.item(i);
      var computedVal = computed.getPropertyValue(prop);
      // if element's style attribute doesn't have this property,
      // then seit it to the computed value
      if(el.style.getPropertyValue(prop) === null){
        el.style.setProperty(prop, computedVal);
      }
    }
  }
  /*MEDIA_RULE = 4;
  function inlineStyle(elStyle){
    //console.log('elStyle', elStyle)
    var doc = elStyle.ownerDocument;
    var rules = [].slice.call(elStyle.sheet.cssRules);
    // loop through rules,
    // select targeted els,
    // set their inline style attribute with calulated properties
    rules
      // only STYLE_RULEs
      // see: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
      .filter(function(r){ return r.type == 1;})
      .forEach(function(rule){
      var els = [].slice.call(doc.querySelectorAll(rule.selectorText));
      els.forEach(function(el){
        inlineRule(el, rule);
      })
    })
  }
  */

  function inlineSheet(doc, sheet){
    //console.log('elStyle', elStyle)
    var rules = [].slice.call(sheet.cssRules);
    // loop through rules,
    // select targeted els,
    // set their inline style attribute with calulated properties
    rules
      // only STYLE_RULEs
      // see: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Properties
      .filter(function(r){ return r.type == 1;})
      .forEach(function(rule){
        var els = [].slice.call(doc.querySelectorAll(rule.selectorText));
        els.forEach(function(el){ inlineRule(el, rule); })
    })
  }


  return function inliner(doc, options){
    // TODO:
    // - technique for getting window: iframe src=text/html? createDocument? docFragment?
    // - options: {removeStyle, clone, window?}
    var dest = doc;//doc.cloneNode(true);
    options || (options = {remove: true});
    // loop through style tags
    // var tags = [].slice.call(dest.querySelectorAll('style'));
    // tags.forEach(inlineStyle);
    //if(options.removeStyle) tags.forEach(removeElement)

    // links
    var sheets = doc.styleSheets;
    console.log('sheets', sheets)
    for(var i = 0, len = sheets.length; i < len; i++){
      console.log('sheet', sheets.item(i))
      inlineSheet(doc, sheets.item(i))
    }
    // cleanup
    // TODO: be mindful of media-queries and other styling to keep in the head
    if(options.remove) {
      // remove all style tags and links
      [].slice.call(doc.querySelectorAll('style,link[rel="stylesheet"]'))
      .forEach(removeElement);

      // remove all classNames
      [].slice.call(doc.querySelectorAll('[class]'))
        .forEach(function(el){
          el.removeAttribute('class');
        });
    }

    return dest;
  };

}));
