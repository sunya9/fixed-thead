// Fixed-thead 1.0.0
// https://github.com/sunya9/fixed-thead
// (c) 2016 sunya9(_X_y_z_)
 
!function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.FixedThead = factory();
  }
}(this, function () {
  'use strict';

  // shortcuts
  var forEach = Array.prototype.forEach;
  var map = Array.prototype.map;
  var $$ = document.querySelectorAll.bind(document);

  var tables, fixedTheads;
  var offsetLeft,
    offsetTop,
    backgroundImage,
    backgroundColor,
    enabled;

  function eachInit(table) {
    var table, thead, cloneThead;

    if(table.nodeName !== 'TABLE') {
      throw new Error('Target selectors must be a table element.');
    }
    thead = table.querySelector('thead');
    if(!thead) {
      throw new Error('Table must have a thead.');
    }

    cloneThead = thead.cloneNode(true);
    table.insertBefore(cloneThead, table.firstChild);
    cloneThead.style.display = 'none';
    cloneThead.style.position = 'fixed';

    cloneThead.style.top = offsetTop + 'px';
    cloneThead.style.marginLeft = -parseInt(getStyle(table, 'border-spacing')) + offsetLeft + 'px';
    forEach.call(cloneThead.children, function(tr) {
      forEach.call(tr.children, function(cell) {
        cell.style.boxSizing = 'border-box';
      });
    });

    if(backgroundColor)
      cloneThead.style.backgroundColor = backgroundColor;
    if(backgroundImage)
      cloneThead.style.backgroundImage = backgroundImage;

    window.addEventListener('scroll', scrollEvent);
    window.addEventListener('resize', debounce(computeWidth, 500));

    function computeWidth() {
      forEach.call(thead.children, function(tr, trIndex) {
        forEach.call(tr.children, function(cell, cellIndex) {
          cloneThead.children[trIndex].children[cellIndex].style.width = cell.clientWidth + 'px';
        });
      });
    }

    function scrollEvent() {
      if(!enabled) return;
      var isShown = table.offsetTop - offsetTop - window.scrollY > 0 || table.offsetTop - offsetTop + table.clientHeight - thead.clientHeight < window.scrollY;
      var enterTable = cloneThead.getAttribute('data-fixed-thead') === null
      var leaveTable = cloneThead.getAttribute('data-fixed-thead') === '';
      if (isShown && leaveTable)
        disableFixed();
      else if (!isShown && enterTable)
        enableFixed();
    }

    function disableFixed() {
      cloneThead.removeAttribute('data-fixed-thead');
      cloneThead.style.display = 'none';
    }

    function enableFixed() {
      computeWidth();
      cloneThead.setAttribute('data-fixed-thead', '');
      cloneThead.style.display = 'table-header-group';
    }

    function changeStatus() {
      enabled ? scrollEvent() : disableFixed();
    }

    this.changeStatus = changeStatus;

    return this;
  }

  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      var callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function getStyle(element, styleProp){
    if (element.currentStyle)
      var y = element.currentStyle[styleProp];
    else if (window.getComputedStyle)
      var y = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
    return y;
  }

  function FixedThead(selector, option) {
    tables = $$(selector);
    option = option || {};
    offsetLeft = option.offsetLeft || 0;
    offsetTop = option.offsetTop || 0;
    enabled = typeof option.enabled !== 'undefined' ? option.enabled : true;
    backgroundImage = option.backgroundImage;
    backgroundColor = option.backgroundColor || '#fff';
    fixedTheads = map.call(tables, function(table) {
      return new eachInit(table);
    });
    Object.defineProperty(this, 'enabled', {
      get: function() {
        return enabled;
      },
      set: function(bool) {
        enabled = bool;
        fixedTheads.forEach(function(fixedThead) {
          fixedThead.changeStatus();
        });
      }
    });
  };
  return FixedThead;
});