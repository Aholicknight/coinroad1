"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dom = {
  buildings: document.querySelector('.buildings'),
  player: document.querySelector('gorilla-player.player'),
  cpu: document.querySelector('gorilla-player.cpu'),
  start: document.querySelector('.start'),
  intro: document.querySelector('.intro'),
  screen: document.querySelector('.screen'),
  banana: document.querySelector('banana-missil'),
  sun: document.querySelector('.sun')
};
var sounds = {
  hit: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/gorillas/armhit.mp3']
  }),
  intro: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/gorillas/intro.mp3']
  }),
  scream: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/goku-transform.mp3']
  }),
  charging: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/charging.mp3'],
    loop: true
  }),
  event: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/gorillas/event.mp3?4']
  }),
  explode: new Howl({
    src: ['https://manzdev.github.io/cursos-assets/js/gorillas/explode.mp3']
  })
};
var NUMBUILDINGS = 5 + ~~(Math.random() * 4);

var switchLight = function switchLight(win) {
  win.classList.toggle('on');
  win.classList.toggle('off');
  sounds.event.play();
};

for (var i = 0; i < NUMBUILDINGS; i++) {
  var div = document.createElement('div');

  for (var w = 0; w < 75; w++) {
    var win = document.createElement('div');
    var state = ~~(Math.random() * 2);
    win.className = "window ".concat(['on', 'off'][state]);
    win.addEventListener('click', switchLight.bind(void 0, win));
    div.appendChild(win);
  }

  var type = 1 + ~~(Math.random() * 3);
  div.className = "building type".concat(type);
  div.style.height = 100 + ~~(Math.random() * 300) + 'px';
  dom.buildings.appendChild(div);
}

var GorillaPlayer =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(GorillaPlayer, _HTMLElement);

  function GorillaPlayer() {
    var _this;

    _classCallCheck(this, GorillaPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GorillaPlayer).call(this));
    _this.armsUp = false;
    _this.innerHTML = "\n      <div class=\"head\">\n        <div class=\"brows\"></div>\n      </div>\n      <div class=\"body\">\n        <div class=\"left arm\"></div>\n        <div class=\"chest\"></div>\n        <div class=\"right arm\"></div>\n      </div>\n      <div class=\"legs\">\n        <div class=\"left leg\"></div>\n        <div class=\"right leg\"></div>\n      </div>\n";
    return _this;
  }

  _createClass(GorillaPlayer, [{
    key: "moveTo",
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
      this.style.left = "".concat(x, "px");
      this.style.top = "".concat(y, "px");
    }
  }, {
    key: "placeAtBuilding",
    value: function placeAtBuilding() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var building = document.querySelector(".building:nth-child(".concat(n, ")"));
      var coords = {
        x: building.offsetLeft + building.offsetWidth / 2 - 25,
        y: building.offsetTop - 51
      };
      this.moveTo(coords.x, coords.y);
    }
  }, {
    key: "dance",
    value: function dance() {
      var _this2 = this;

      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
      var sound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(function () {
        _this2.armsUp = !_this2.armsUp;

        _this2.style.setProperty('--left-arm', "".concat(_this2.armsUp ? -18 : 0, "px"));

        _this2.style.setProperty('--right-arm', "".concat(!_this2.armsUp ? -18 : 0, "px"));

        if (sound) sounds.hit.play();
      }, speed);
      setTimeout(function () {
        clearInterval(_this2.timer);

        _this2.style.setProperty('--left-arm', 0);

        _this2.style.setProperty('--right-arm', 0);

        _this2.armsUp = false;
      }, speed * n);
    }
  }]);

  return GorillaPlayer;
}(_wrapNativeSuper(HTMLElement));

customElements.define('gorilla-player', GorillaPlayer);

var BananaMissil =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(BananaMissil, _HTMLElement2);

  function BananaMissil() {
    _classCallCheck(this, BananaMissil);

    return _possibleConstructorReturn(this, _getPrototypeOf(BananaMissil).call(this));
  }

  _createClass(BananaMissil, [{
    key: "shoot",
    value: function shoot(player) {
      var _this3 = this;

      this.hidden = false;
      this.enableRotate();
      this.x = player.x + 16;
      this.y = player.y - 32;
      this.moveTo(this.x, this.y);
      sounds.charging.play();
      player.classList.add('charging');
      setTimeout(function () {
        sounds.scream.play();
      }, 2000);
      setTimeout(function () {
        _this3.disableRotate();

        _this3.hidden = true;
        sounds.charging.pause();
        sounds.explode.play();
        player.classList.remove('charging');
      }, 5000);
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.style.top = "".concat(this.y, "px");
      this.style.left = "".concat(this.x, "px");
    }
  }, {
    key: "enableRotate",
    value: function enableRotate() {
      this.classList.add('spin');
    }
  }, {
    key: "disableRotate",
    value: function disableRotate() {
      this.classList.remove('spin');
    }
  }]);

  return BananaMissil;
}(_wrapNativeSuper(HTMLElement));

customElements.define('banana-missil', BananaMissil); // Phase 1

dom.start.addEventListener('click', function () {
  dom.start.hidden = true;
  dom.intro.hidden = false;
  dom.player.hidden = false;
  dom.cpu.hidden = false;
  dom.player.moveTo(450, 325);
  dom.cpu.moveTo(525, 325);
  dom.player.dance(8, false, 1400);
  dom.cpu.dance(8, false, 1400);
  sounds.intro.play();
  setTimeout(function () {
    dom.player.dance(8, false, 325);
    dom.cpu.dance(8, false, 325);
  }, 11200); // Phase 2

  setTimeout(function () {
    dom.intro.hidden = true;
    dom.screen.hidden = false;
    dom.player.placeAtBuilding(2);
    dom.cpu.placeAtBuilding(NUMBUILDINGS - 1); // Fun events

    dom.player.addEventListener('click', function () {
      this.dance();
    });
    dom.player.addEventListener('dblclick', function () {
      dom.banana.shoot(this);
    });
    dom.cpu.addEventListener('click', function () {
      this.dance();
    });
    dom.sun.addEventListener('click', function () {
      this.classList.toggle('surprised');
    });
  }, 14000);
});