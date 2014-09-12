/**
 * cleanArtifacts
 * Removes editor artifacts: edit attributes, schemaless URLs
 *
 * @example
 * cleanArtifacts(window.document)
 */

(function(root, factory){
  if(typeof define === 'function' && define.amd){
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.cleanArtifacts = factory();
  }
}(this, function(){


  // create an array from arrayish lists
  function arrayFrom(nodelist){return [].slice.call(nodelist);}

  // removes an attribute from all elements with that attribute
  function removeAttribute(doc, attr){
    arrayFrom(doc.querySelectorAll('[' + attr +']'))
      .forEach(function(el){
        el.removeAttribute(attr);
      })
  }

  // removes all the wf* attributes used by the editor.
  function removeAttributes(doc){
    var editorAttrs = 'data-wfcb data-wflabel data-wfcz data-wfedit data-wfstyle draggable data-dnd'.split(' ');
    editorAttrs.forEach(function(attr){
      removeAttribute(doc, attr);
    });
  }

  // qualify schemaless img src's to use http
  // e.g. //media.wordfly.com/foo.png => http://media.wordfly.com/foo.png
  function qualifyUrls(doc){
    // transform image src attributes
    arrayFrom(doc.querySelectorAll('img[src^="//"]')).forEach(function(img){
      img.src = img.src.replace(/^\/\//, 'http://');
    });
    // transform video poster attributes
    arrayFrom(doc.querySelectorAll('video[poster^="//"]')).forEach(function(video){
      video.setAttribute('poster', video.getAttribute('poster').replace(/^\/\//, 'http://'));
    });
  }

  // export function to clean editor artifacts
  return function cleanArtifacts(document){
    // remove editor attributes
    removeAttributes(document);
    // qualify media urls
    qualifyUrls(document);
    return document;
  }


}));

