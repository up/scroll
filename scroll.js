/**
  * Smooth HTML5 Scroller
  * Copyright (c) 2010 Uli Preuss
*/

(function() {

  var nav = document.getElementsByTagName('nav')[0],
    links = nav.getElementsByTagName('a'),
    articles = document.getElementsByTagName('article'), 
    dd = document.documentElement, db = document.body,
    _obj, _offsetTop, startY, stopY, distance, speed, step, leapY, timer, link, i;


  function posYStart() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
      return self.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (dd && dd.scrollTop) {
      return dd.scrollTop;
    }
    // Internet Explorer 6-8
    if (db.scrollTop) {
      return db.scrollTop;
    }
    return 0;
  }

  function posYEnd(_id) {
    _obj = document.getElementById(_id);
    _offsetTop = _obj.offsetTop;
    while (_obj.offsetParent && _obj.offsetParent != db) {
      _obj = _obj.offsetParent;
      _offsetTop += _obj.offsetTop;
    }
    return _offsetTop;
  }

  function smoothScroll(_id) {
    startY = posYStart();
    stopY = posYEnd(_id);
    distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    speed = Math.round(distance / 100);
    if (speed >= 20) {
      speed = 20;
    }
    step = Math.round(distance / 25);
    leapY = stopY > startY ? startY + step : startY - step;
    timer = 0;
    if (stopY > startY) {
      for (i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
        };
        timer++;
      }
      location.hash = _id;
      return;
    }
    for (i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) {
        leapY = stopY;
      };
      timer++;
    }
    location.hash = _id;
  }

  for (i = 0; i < links.length; i++) {
    links[i].onclick = function() {
      smoothScroll(this.href.split('#')[1]);
      return false;
    };
  }

  for (i = 0; i < articles.length; i++) {
    link = document.createElement('a');
    link.innerHTML = 'Back to top';
    link.className = 'top';
    link.onclick = function() {
      smoothScroll('top');
      return false;
    };
    articles[i].insertBefore(link, articles[i].firstChild);
  }

} ());
