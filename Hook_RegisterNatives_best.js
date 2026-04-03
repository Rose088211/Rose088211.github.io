//hook检测函数有奇效
//包含so加载-> class -> methods -> base address -> offset address.
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require("core-js/library/fn/object/define-property");
},{"core-js/library/fn/object/define-property":5}],2:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],3:[function(require,module,exports){
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{"../core-js/object/define-property":1}],4:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],5:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":8,"../../modules/es6.object.define-property":22}],6:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":18}],8:[function(require,module,exports){
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],9:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":6}],10:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":13}],11:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":14,"./_is-object":18}],12:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":8,"./_ctx":9,"./_global":14,"./_has":15,"./_hide":16}],13:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],14:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],15:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],16:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":10,"./_object-dp":19,"./_property-desc":20}],17:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":10,"./_dom-create":11,"./_fails":13}],18:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],19:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":7,"./_descriptors":10,"./_ie8-dom-define":17,"./_to-primitive":21}],20:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],21:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":18}],22:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":10,"./_export":12,"./_object-dp":19}],23:[function(require,module,exports){
"use strict";
/**
 * author: dmemory
 * desc: 本项目是利用 frida 获取 Jni RegisterNatives 动态注册的函数，并将其函数地址和对应的 so 打印出来
 */

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

(0, _defineProperty["default"])(exports, "__esModule", {
  value: true
});

var dmlog_1 = require("./utils/dmlog");

var tag = 'fridaRegstNtv';

function getModuleInfoByPtr(fnPtr) {
  var modules = Process.enumerateModules();
  var modname = null,
      base = null;
  modules.forEach(function (mod) {
    if (mod.base <= fnPtr && fnPtr.toInt32() <= mod.base.toInt32() + mod.size) {
      modname = mod.name;
      base = mod.base;
      return false;
    }
  });
  return [modname, base];
}

function hook_registNatives() {
  var env = Java.vm.getEnv();
  var handlePointer = env.handle.readPointer();
  console.log("handle: " + handlePointer);
  var nativePointer = handlePointer.add(215 * Process.pointerSize).readPointer();
  console.log("register: " + nativePointer);
  /**
   typedef struct {
      const char* name;
      const char* signature;
      void* fnPtr;
   } JNINativeMethod;
   jint RegisterNatives(JNIEnv* env, jclass clazz, const JNINativeMethod* methods, jint nMethods)
   */

  Interceptor.attach(nativePointer, {
    onEnter: function onEnter(args) {
      var env = Java.vm.getEnv();
      var p_size = Process.pointerSize;
      var methods = args[2];
      var methodcount = args[3].toInt32();
      var name = env.getClassName(args[1]);
      console.log("==== class: " + name + " ====");
      console.log("==== methods: " + methods + " nMethods: " + methodcount + " ====");

      for (var i = 0; i < methodcount; i++) {
        var idx = i * p_size * 3;
        var fnPtr = methods.add(idx + p_size * 2).readPointer();
        var infoArr = getModuleInfoByPtr(fnPtr);
        var modulename = infoArr[0];
        var modulebase = infoArr[1];
        var logstr = "name: " + methods.add(idx).readPointer().readCString() + ", signature: " + methods.add(idx + p_size).readPointer().readCString() + ", fnPtr: " + fnPtr + ", modulename: " + modulename + " -> base: " + modulebase;

        if (null != modulebase) {
          logstr += ", offset: " + fnPtr.sub(modulebase);
        }

        dmlog_1.DMLog.i(tag, logstr);
      }
    }
  });
}

function main() {
  dmlog_1.DMLog.i(tag, 'hello, i am loaded');
  hook_registNatives();
}

if (Java.available) {
  Java.perform(function () {
    main();
  });
}

},{"./utils/dmlog":24,"@babel/runtime-corejs2/core-js/object/define-property":1,"@babel/runtime-corejs2/helpers/interopRequireDefault":4}],24:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

(0, _defineProperty["default"])(exports, "__esModule", {
  value: true
});

var DMLog = /*#__PURE__*/function () {
  function DMLog() {
    (0, _classCallCheck2["default"])(this, DMLog);
  }

  (0, _createClass2["default"])(DMLog, null, [{
    key: "d",
    value: function d(tag, str) {
      DMLog.log_('DEBUG', tag, str);
    }
  }, {
    key: "i",
    value: function i(tag, str) {
      DMLog.log_('INFO', tag, str);
    }
  }, {
    key: "e",
    value: function e(tag, str) {
      DMLog.log_('ERROR', tag, str);
    }
  }, {
    key: "log_",
    value: function log_(leval, tag, str) {
      console.log('[' + leval + '][' + tag + ']: ' + str);
    }
  }]);
  return DMLog;
}();

exports.DMLog = DMLog;

},{"@babel/runtime-corejs2/core-js/object/define-property":1,"@babel/runtime-corejs2/helpers/classCallCheck":2,"@babel/runtime-corejs2/helpers/createClass":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":4}]},{},[23])
