angular-slidenav.js
===================

A simple slideout nav built for angularjs

Demo
====

http://sthomp.github.io/angular-slidenav.js

Instructions
============

### Import the slidenav module

```javascript
angular.module('myapp',['slidenav']);
```

### CSS

1. slidenav.css

### HTML

```html
<slidenav>
  <slidenav-menu>
    <div>My Navbar Content</div>
  </slidenav-menu>

  <slidenav-content>
    <div>My Meny Content</div>
  </slidenav-content>
</slidenav>
```

### Using the service to toggle the nav

Inject slidenav into your controller. The slivenav service has 2 methods:

```javascript
slidenav.open();
slidenav.close();
slidenav.isOpen();
```

