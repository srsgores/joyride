  /*
 * jQuery Foundation Joyride Plugin 2.0.3
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
'use strict';

window.matchMedia = window.matchMedia || (function( doc, undefined ) {

  "use strict";

  var bool,
      docElem = doc.documentElement,
      refNode = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement( "body" ),
      div = doc.createElement( "div" );

  div.id = "mq-test-1";
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  return function(q){

    div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

    docElem.insertBefore( fakeBody, refNode );
    bool = div.offsetWidth === 42;
    docElem.removeChild( fakeBody );

    return {
      matches: bool,
      media: q
    };

  };

}( document ));

var joyride = {
  version : '3.0',

  cache : {},

  init : function (scope, method, options) {
    this.scope = scope || this.scope;

    // bind events

    this.cache_stops();
    console.log(this.cache);

  },

  cache_stops : function () {
    var ride = $('[data-joyride]'),
        stops = ride.find('li'),
        stop_count = stops.length,
        cache = {};

    for (var i=0; i < stop_count; i++) {
      var stop = stops[i],
          $stop = stops.eq(i),
          popup = this.find_or_create_popup($stop);

      cache[i] = {
        // settings : this.data_options(stops[i]),
        target : $('[data-joyride-target="' + $stop.data('joyride-target') + '"]').not($stop)[0],
        popup : popup,
        stop : stop
      }
    }

    $.extend(this.cache, cache);
  },

  find_or_create_popup : function (stop) {
    var popup = $('[data-joyride-popup="' + stop.data('joyride-target') + '"]');

    if (popup.length > 0) {
      return popup[0];
    }

    return this.create(stop)[0];
  },

  create : function (stop) {
    var popup = $('<div data-joyride-popup="' + stop.data('joyride-target') + '" />');
    popup.html(stop.html()).attr('css', stop.attr('css'));
    // TODO: modify the helper elements timer, back, prev, close as necessary here
    // TODO: would be nice to append all new popups at once
    return popup.appendTo('body');
  }
}

$.fn.joyride = function () {
  var args = Array.prototype.slice.call(arguments, 0);

  return this.each(function () {
    joyride.init.apply(joyride, [this].concat(args));
    return this;
  });
};
