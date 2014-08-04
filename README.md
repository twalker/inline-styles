inline-styles
=============

Inline styles from style tags to style attributes, **in the browser**.

```html
<html>
  <head>
    <link rel="stylesheet" href="example.css" />
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

inlineStyles(window.document);

```html
<html>
  <head></head>
  <body>
    <p class="super" style="font-weight: normal; color: rgb(255, 0, 0); text-align: right; margin: 15px 5px 5px;">super</p>
    <p style="font-weight: bold; color: rgb(0, 0, 255); margin: 5px;">blue and bold</p>
  </body>
</html>
```


-----------------------------------------------
TODO:

* R&D for pseudo selectors (2nd arg to getComputedStyle)
