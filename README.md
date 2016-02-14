# fixed-thead
[![npm version](https://badge.fury.io/js/fixed-thead.svg)](https://badge.fury.io/js/fixed-thead)
[![Build Status](https://travis-ci.org/sunya9/fixed-thead.svg?branch=master)](https://travis-ci.org/sunya9/fixed-thead)

fixed-thead is a simple library that fix the thead when window is scrolled.

## Installation

* npm: `npm install --save fixed-thead`

## How to use

```javascript
// basis
var fixedThead = new FixedThead('table');

// option
fixedThead = new FixedThead('table', {
  offsetLeft: 0, // px only(default is 0)
  offsetTop: 50, // px only(default is 0)
  enabled: false // boolean(default is true)
});

// property
fixedThead.enabled = false; // true or false
```