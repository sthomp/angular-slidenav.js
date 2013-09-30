angular-slidenav.js
===================

A simple slideout nav that is an angularized version of the one found here: http://tympanus.net/Development/SidebarTransitions

Instructions
============

### Import the slidenav module

```javascript
angular.module('myapp',['slidenav']);
```

### HTML

```html
<slidenav>
  <slidenav-nav>
    <div>My Navbar Content</div>
  </slidenav-nav>

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
```

Animation Effects
=================

This wrapper will only work with effects that allow the menu to be outside the 'pusher'. This includes effects 1,2,4,5,9,10,11,12,13.
