inline-styles
=============

Transplants styles from style/link tags to style attributes using the browser's computedStyles. Useful when preparing a document to be sent via email, since email clients like their styles inline.

A few server-side libraries inline CSS styles quite well. 
But, CSS algorithms and specificity can get a bit tricky to properly emulate.
Why emulate when current browsers are the masters of CSS?
Let's make them do the css inlining work.


before:
```html
<html>
  <head>
    <link rel="stylesheet" href="example.css" />
    <link rel="stylesheet" href="advanced.css" data-inline-options="preserve, ignore" />
    <style>
      p.super {
        color: red;
        text-align: right;
        margin-top: 15px;
        font-weight: normal;
      }
      p {
        color: blue;
        margin: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <p class="super">super</p>
    <p>blue and bold</p>
  </body>
</html>
```

`inlineStyles(window.document);`

transformed:
```html
<html>
  <head></head>
  <body>
    <link rel="stylesheet" href="advanced.css" />
    <p class="super" style="font-weight: normal; color: rgb(255, 0, 0); text-align: right; margin: 15px 5px 5px;">super</p>
    <p style="font-weight: bold; color: rgb(0, 0, 255); margin: 5px;">blue and bold</p>
  </body>
</html>
```

## options

By default, `style`/`link` elements are removed from the document. 
Also, all `style`/`link` elements are active during `window.getComputedStyle`. These behaviors can be overridden on individual elements.

```html
<style data-inline-options="preserve, ignore">
  /* 
  media queries, pseudo selectors, and other rules 
  that either cannot be inlined, or will taint the 
  computed style.
  */
</style>
```

`preserve` will be inlined, but not removed from the document.  
`ignore` will be disabled during inlining.

Any preserved `style`/`link` elements will also be moved inside the `body` tag and have the `data-inline-options` attribute removed.

-----------------------------------------------

