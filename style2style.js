/**
 * style2style
 * Inilines styles from style tags to style attributes
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

  // get elements for selector
  // convert elements 2 array
  // set attr
  //
  //
  // select4Rule: function(rule) {
  //   return rule.querySelectorAll(rule.selectorText);
  // }
  //
  function inlineRule(el, rule){
    //console.log('setting', el, rule.style)
    // OMG: window.getMatchedCSSRules(document.body)
    //console.log('cssText', rule.cssText);
    //console.log('style', rule.style);
    var computed =  window.getComputedStyle(el);
    for(var i = 0; i < rule.style.length; i++){
      var prop = rule.style.item(i);
      var computedVal = computed.getPropertyValue(prop);
      // if element's style doesn't have the property it it's attribute,
      // then seit it to the computed value
      if(el.style.getPropertyValue(prop) === null){
        el.style.setProperty(prop, computedVal);
      }
    }
  }

  function inline(elStyle){
    //console.log('elStyle', elStyle)
    var doc = elStyle.ownerDocument;
    var rules = [].slice.call(elStyle.sheet.cssRules);
    // loop through rules,
    // select targeted els,
    // set their inline style attribute with calulated properties
    rules
      // only STYLE_RULEs
      // see: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Properties
      .filter(function(r){ return r.type == 1;})
      .forEach(function(rule){
      var els = [].slice.call(doc.querySelectorAll(rule.selectorText));
      els.forEach(function(el){
        inlineRule(el, rule);
      })
    })
  }

  /*
  // finds a CSSStyleRule for the provided selector text
  getRule: function(key){
    var rules = [].slice.call(this.target.sheet.cssRules),
        found;
    rules.forEach(function(rule){
      if(rule.selectorText === key) found = rule;
    })
    return found;
  },
  */
  return function(doc, options){
    // TODO:
    // - technique for getting window: iframe src=text/html? createDocument? docFragment?
    // - options: {removeStyle, clone, window?}
    var dest = doc//= doc.cloneNode(true);
    // loop through style tags
    var tags = [].slice.call(dest.querySelectorAll('style'));
    tags.forEach(inline);

    return dest;
  };

}));
