import React__default, { useContext, useState, useRef, useEffect, createElement } from 'react';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var consoleLogger = {
  type: 'logger',
  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  _createClass(Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.forward(args, 'log', '', true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.forward(args, 'warn', '', true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.forward(args, 'error', '');
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, _objectSpread({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }, this.options));
    }
  }]);

  return Logger;
}();

var baseLogger = new Logger();

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;

      events.split(' ').forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];

        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event]) return;

      if (!listener) {
        delete this.observers[event];
        return;
      }

      this.observers[event] = this.observers[event].filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }

      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);

        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);

  return EventEmitter;
}();

function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  var value = getPath(data, key);

  if (value !== undefined) {
    return value;
  }

  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}
var isIE10 = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;

var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };

    _classCallCheck(this, ResourceStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceStore).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.data = data || {};
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    return _this;
  }

  _createClass(ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);

      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var path = [lng, ns];
      if (key && typeof key !== 'string') path = path.concat(key);
      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }

      return getPath(this.data, path);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = '.';
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };

      for (var m in resources) {
        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }

      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};

      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread({}, pack, resources);
      }

      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }

      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return _objectSpread({}, {}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);

  return ResourceStore;
}(EventEmitter);

var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

var checkedLoadedFor = {};

var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translator).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    _this.logger = baseLogger.create('translator');
    return _this;
  }

  _createClass(Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS;

      if (nsSeparator && key.indexOf(nsSeparator) > -1) {
        var m = key.match(this.interpolator.nestingRegexp);

        if (m && m.length > 0) {
          return {
            key: key,
            namespaces: namespaces
          };
        }

        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }

      if (typeof namespaces === 'string') namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options, lastKey) {
      var _this2 = this;

      if (_typeof(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }

      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
          key = _this$extractFromKey.key,
          namespaces = _this$extractFromKey.namespaces;

      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          return namespace + nsSeparator + key;
        }

        return key;
      }

      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';

      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
        if (!options.returnObjects && !this.options.returnObjects) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
        }

        if (keySeparator) {
          var resTypeIsArray = resType === '[object Array]';
          var copy$$1 = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;

          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy$$1[m] = this.translate(deepKey, _objectSpread({}, options, {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy$$1[m] === deepKey) copy$$1[m] = res[m];
            }
          }

          res = copy$$1;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;

        if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
          usedDefault = true;

          if (options.count !== undefined) {
            var suffix = this.pluralResolver.getSuffix(lng, options.count);
            res = options["defaultValue".concat(suffix)];
          }

          if (!res) res = options.defaultValue;
        }

        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }

        var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;

        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

          if (keySeparator) {
            var fk = this.resolve(key, _objectSpread({}, options, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }

          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);

          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }

          var send = function send(l, k) {
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            }

            _this2.emit('missingKey', l, namespace, k, res);
          };

          if (this.options.saveMissing) {
            var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';

            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (l) {
                var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

                plurals.forEach(function (p) {
                  return send([l], p);
                });
              });
            } else {
              send(lngs, key);
            }
          }
        }

        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
      }

      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved, lastKey) {
      var _this3 = this;

      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(_objectSpread({}, options, {
          interpolation: _objectSpread({}, this.options.interpolation, options.interpolation)
        }));
        var skipOnVariables = options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        var nestBef;

        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }

        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = _objectSpread({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }

        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));

            return null;
          }

          return _this3.translate.apply(_this3, args.concat([key]));
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }

      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread({
          i18nResolved: resolved
        }, options) : options, this);
      }

      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === 'string') keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;

        var extracted = _this4.extractFromKey(k, options);

        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;

          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;

            _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }

          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKey = key;
            var finalKeys = [finalKey];

            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);
              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling) finalKeys.push(finalKey += "".concat(_this4.options.contextSeparator).concat(options.context));
              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
            }

            var possibleKey;

            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }]);

  return Translator;
}(EventEmitter);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;
    this.whitelist = this.options.supportedLngs || false;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }

  _createClass(LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');

        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }

        return p.join('-');
      }

      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isWhitelisted",
    value: function isWhitelisted(code) {
      this.logger.deprecate('languageUtils.isWhitelisted', 'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.');
      return this.isSupportedCode(code);
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }

      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;

      if (!codes) return null;
      var found;
      codes.forEach(function (code) {
        if (found) return;

        var cleanedLng = _this.formatLanguageCode(code);

        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });

      if (!found && this.options.supportedLngs) {
        codes.forEach(function (code) {
          if (found) return;

          var lngOnly = _this.getLanguagePartFromCode(code);

          if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = _this.options.supportedLngs.find(function (supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
          });
        });
      }

      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;

      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];

      var addCode = function addCode(c) {
        if (!c) return;

        if (_this2.isSupportedCode(c)) {
          codes.push(c);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };

      if (typeof code === 'string' && code.indexOf('-') > -1) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === 'string') {
        addCode(this.formatLanguageCode(code));
      }

      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);

  return LanguageUtil;
}();

var sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    this.rules = createRules();
  }

  _createClass(PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var rule = this.getRule(code);
      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      var _this = this;

      var ret = [];
      var rule = this.getRule(code);
      if (!rule) return ret;
      rule.numbers.forEach(function (n) {
        var suffix = _this.getSuffix(code, n);

        ret.push("".concat(key).concat(suffix));
      });
      return ret;
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var _this2 = this;

      var rule = this.getRule(code);

      if (rule) {
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];

        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }

        var returnSuffix = function returnSuffix() {
          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
        };

        if (this.options.compatibilityJSON === 'v1') {
          if (suffix === 1) return '';
          if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
          return returnSuffix();
        } else if (this.options.compatibilityJSON === 'v2') {
          return returnSuffix();
        } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          return returnSuffix();
        }

        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
      }

      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
  }]);

  return PluralResolver;
}();

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = baseLogger.create('interpolator');
    this.options = options;

    this.format = options.interpolation && options.interpolation.format || function (value) {
      return value;
    };

    this.init(options);
  }

  _createClass(Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, 'g');
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;

      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

      function regexSafe(val) {
        return val.replace(/\$/g, '$$$$');
      }

      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) {
          var path = getPathWithDefaults(data, defaultData, key);
          return _this.alwaysFormat ? _this.format(path, undefined, lng) : path;
        }

        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, options);
      };

      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val) {
          return regexSafe(val);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val) {
          return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
        }
      }];
      todos.forEach(function (todo) {
        replaces = 0;

        while (match = todo.regex.exec(str)) {
          value = handleFormat(match[1].trim());

          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = typeof temp === 'string' ? temp : '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(match[1], " for interpolating ").concat(str));

              value = '';
            }
          } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
            value = makeString(value);
          }

          str = str.replace(match[0], todo.safeValue(value));
          todo.regex.lastIndex = 0;
          replaces++;

          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;

      var clonedOptions = _objectSpread({}, options);

      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;

      function handleHasOptions(key, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        optionsString = optionsString.replace(/'/g, '"');

        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = _objectSpread({}, inheritedOptions, clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }

        delete clonedOptions.defaultValue;
        return key;
      }

      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        var doReduce = false;

        if (match[0].includes(this.formatSeparator) && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(function (elem) {
            return elem.trim();
          });
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }

        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== 'string') return value;
        if (typeof value !== 'string') value = makeString(value);

        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }

        if (doReduce) {
          value = formatters.reduce(function (v, f) {
            return _this2.format(v, f, options.lng, options);
          }, value.trim());
        }

        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }

      return str;
    }
  }]);

  return Interpolator;
}();

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Connector).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');
    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }

    return _this;
  }

  _createClass(Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;

      var toLoad = [];
      var pending = [];
      var toLoadLanguages = [];
      var toLoadNamespaces = [];
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = "".concat(lng, "|").concat(ns);

          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0) pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0) pending.push(name);
            if (toLoad.indexOf(name) < 0) toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces) toLoadLanguages.push(lng);
      });

      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }

      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);

      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }

      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err) q.errors.push(err);

        if (q.pending.length === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = [];

            if (q.loaded[l].length) {
              q.loaded[l].forEach(function (ns) {
                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
              });
            }
          });
          q.done = true;

          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;

      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 350;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      return this.backend[fcName](lng, ns, function (err, data) {
        if (err && data && tried < 5) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }

        callback(err, data);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;

      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }

      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string') namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);

      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }

      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
        if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);

        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }

      if (key === undefined || key === null || key === '') return;

      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key, fallbackValue, null, _objectSpread({}, options, {
          isUpdate: isUpdate
        }));
      }

      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);

  return Connector;
}(EventEmitter);

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    whitelist: false,
    nonExplicitWhitelist: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (_typeof(args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];

      if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }

      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: false
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  if (options.whitelist) {
    if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
      options.whitelist = options.whitelist.concat(['cimode']);
    }

    options.supportedLngs = options.whitelist;
  }

  if (options.nonExplicitWhitelist) {
    options.nonExplicitSupportedLngs = options.nonExplicitWhitelist;
  }

  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }

  return options;
}

function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, I18n);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(I18n).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };

    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);

        return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
      }

      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }

    return _this;
  }

  _createClass(I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.whitelist && !options.supportedLngs) {
        this.logger.deprecate('whitelist', 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.');
      }

      if (options.nonExplicitWhitelist && !options.nonExplicitSupportedLngs) {
        this.logger.deprecate('whitelist', 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.');
      }

      this.options = _objectSpread({}, get(), this.options, transformOptions(options));
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;

      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      }

      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }

        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });

        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }

        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }

        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }

      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }

      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;

          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store2;

          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);

          return _this2;
        };
      });
      var deferred = defer();

      var load = function load() {
        _this2.changeLanguage(_this2.options.lng, function (err, t) {
          _this2.isInitialized = true;
          if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);

          _this2.emit('initialized', _this2.options);

          deferred.resolve(t);
          callback(err, t);
        });
      };

      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }

      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources(language) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === 'string' ? language : this.language;
      if (typeof language === 'function') usedCallback = language;

      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
        var toLoad = [];

        var append = function append(lng) {
          if (!lng) return;

          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);

          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(usedLng);
        }

        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }

        this.services.backendConnector.load(toLoad, this.options.ns, usedCallback);
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');

      if (module.type === 'backend') {
        this.modules.backend = module;
      }

      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }

      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }

      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }

      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }

      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }

      return this;
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;

      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);

      var done = function done(err, l) {
        if (l) {
          _this4.language = l;
          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);

          _this4.translator.changeLanguage(l);

          _this4.isLanguageChangingTo = undefined;

          _this4.emit('languageChanged', l);

          _this4.logger.log('languageChanged', l);
        } else {
          _this4.isLanguageChangingTo = undefined;
        }

        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };

      var setLng = function setLng(lngs) {
        var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);

        if (l) {
          if (!_this4.language) {
            _this4.language = l;
            _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
          }

          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
        }

        _this4.loadResources(l, function (err) {
          done(err, l);
        });
      };

      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }

      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns) {
      var _this5 = this;

      var fixedT = function fixedT(key, opts) {
        var options;

        if (_typeof(opts) !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }

          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = _objectSpread({}, opts);
        }

        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        return _this5.t(key, options);
      };

      if (typeof lng === 'string') {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }

      fixedT.ns = ns;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;

      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;

      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace(ns) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }

      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }

      var lng = this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;

      var loadNotPending = function loadNotPending(l, n) {
        var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];

        return loadState === -1 || loadState === 2;
      };

      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }

      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this7 = this;

      var deferred = defer();

      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }

      if (typeof ns === 'string') ns = [ns];
      ns.forEach(function (n) {
        if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === 'string') lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });

      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }

      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
    }
  }, {
    key: "createInstance",
    value: function createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var mergedOptions = _objectSpread({}, this.options, options, {
        isClone: true
      });

      var clone = new I18n(mergedOptions);
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(function (m) {
        clone[m] = _this8[m];
      });
      clone.services = _objectSpread({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }]);

  return I18n;
}(EventEmitter);

var i18next = new I18n();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty$1;

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck$1;

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass$1;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true
};
var i18nInstance;
var I18nContext = React__default.createContext();
function setDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defaultOptions = _objectSpread$1(_objectSpread$1({}, defaultOptions), options);
}
function getDefaults() {
  return defaultOptions;
}
var ReportNamespaces = function () {
  function ReportNamespaces() {
    classCallCheck(this, ReportNamespaces);

    this.usedNamespaces = {};
  }

  createClass(ReportNamespaces, [{
    key: "addUsedNamespaces",
    value: function addUsedNamespaces(namespaces) {
      var _this = this;

      namespaces.forEach(function (ns) {
        if (!_this.usedNamespaces[ns]) _this.usedNamespaces[ns] = true;
      });
    }
  }, {
    key: "getUsedNamespaces",
    value: function getUsedNamespaces() {
      return Object.keys(this.usedNamespaces);
    }
  }]);

  return ReportNamespaces;
}();
function setI18n(instance) {
  i18nInstance = instance;
}
function getI18n() {
  return i18nInstance;
}
var initReactI18next = {
  type: '3rdParty',
  init: function init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

function warn() {
  if (console && console.warn) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'string') args[0] = "react-i18next:: ".concat(args[0]);

    (_console = console).warn.apply(_console, args);
  }
}
var alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn.apply(void 0, args);
}
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, function () {
    if (i18n.isInitialized) {
      cb();
    } else {
      var initialized = function initialized() {
        setTimeout(function () {
          i18n.off('initialized', initialized);
        }, 0);
        cb();
      };

      i18n.on('initialized', initialized);
    }
  });
}
function hasLoadedNamespace(ns, i18n) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }

  var lng = i18n.languages[0];
  var fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  var lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === 'cimode') return true;

  var loadNotPending = function loadNotPending(l, n) {
    var loadState = i18n.services.backendConnector.state["".concat(l, "|").concat(n)];
    return loadState === -1 || loadState === 2;
  };

  if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useTranslation(ns) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var i18nFromProps = props.i18n;

  var _ref = useContext(I18nContext) || {},
      i18nFromContext = _ref.i18n,
      defaultNSFromContext = _ref.defaultNS;

  var i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();

  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using initReactI18next');

    var notReadyT = function notReadyT(k) {
      return Array.isArray(k) ? k[k.length - 1] : k;
    };

    var retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }

  var i18nOptions = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, getDefaults()), i18n.options.react), props);

  var useSuspense = i18nOptions.useSuspense;
  var namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  var ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(function (n) {
    return hasLoadedNamespace(n, i18n, i18nOptions);
  });

  function getT() {
    return {
      t: i18n.getFixedT(null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0])
    };
  }

  var _useState = useState(getT()),
      _useState2 = slicedToArray(_useState, 2),
      t = _useState2[0],
      setT = _useState2[1];

  var isMounted = useRef(true);
  useEffect(function () {
    var bindI18n = i18nOptions.bindI18n,
        bindI18nStore = i18nOptions.bindI18nStore;
    isMounted.current = true;

    if (!ready && !useSuspense) {
      loadNamespaces(i18n, namespaces, function () {
        if (isMounted.current) setT(getT());
      });
    }

    function boundReset() {
      if (isMounted.current) setT(getT());
    }

    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return function () {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach(function (e) {
        return i18n.off(e, boundReset);
      });
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(function (e) {
        return i18n.store.off(e, boundReset);
      });
    };
  }, [namespaces.join()]);
  var ret = [t.t, i18n, ready];
  ret.t = t.t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(function (resolve) {
    loadNamespaces(i18n, namespaces, function () {
      resolve();
    });
  });
}

// TODO: move them in a JSON file and import them

var resources = {};
i18next.use(initReactI18next) // passes i18n down to react-i18next
.init({
  interpolation: {
    escapeValue: false // react already safes from xss

  },
  keySeparator: false,
  // we do not use keys in form messages.welcome
  lng: 'en',
  resources: resources
});

var ConfigContext = /*#__PURE__*/React__default.createContext({});

function ConfigProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;

  if (config.assetPath) {
    var path = config.assetPath; // ensure the provided path both starts and ends with a slash

    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (!path.endsWith('/')) {
      path = path + '/';
    } // allow consumers to tell webpack where to load code split/lazy loaded files from, as they may not be
    // hosting our JS from /assets/ (the default path)


    __webpack_public_path__ = path;
  }

  return /*#__PURE__*/React__default.createElement(ConfigContext.Provider, {
    value: {
      config: config
    }
  }, children);
}

function useHawkConfig() {
  var context = useContext(ConfigContext);

  if (!context.config) {
    throw new Error('No HawkSearchConfig is available, did you forget to wrap your components in a ConfigProvider component?');
  }

  return context;
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies$1.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults_1, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FacetSelectionState;

(function (FacetSelectionState) {
  FacetSelectionState[FacetSelectionState["NotSelected"] = 0] = "NotSelected";
  FacetSelectionState[FacetSelectionState["Selected"] = 1] = "Selected";
  FacetSelectionState[FacetSelectionState["Negated"] = 2] = "Negated";
})(FacetSelectionState || (FacetSelectionState = {}));

var SearchStore = /*#__PURE__*/function () {
  /** This represents the next search request that will be executed. */

  /**
   * Whether or not the next search request will perform history actions (pushing the search into browser
   * history).
   */

  /** Whether or not a search request is waiting for completion. */

  /** The results of the last search request, if one has been performed. Otherwise, `undefined`. */
  function SearchStore(initial) {
    _classCallCheck(this, SearchStore);

    _defineProperty(this, "pendingSearch", void 0);

    _defineProperty(this, "doHistory", void 0);

    _defineProperty(this, "isLoading", void 0);

    _defineProperty(this, "searchResults", void 0);

    _defineProperty(this, "requestError", void 0);

    Object.assign(this, initial);
  }
  /**
   * Returns whether or not this is the initial load of the search results.
   */


  _createClass(SearchStore, [{
    key: "isFacetSelected",

    /**
     * Determines whether or not the given facet and facet value is selected, and returns info regarding the selection.
     * @param facet The facet for which the facet value will be checked for selection.
     * @param facetValue The facet value that will be checked for selection.
     */
    value: function isFacetSelected(facet, facetValue) {
      var facetName = typeof facet === 'string' ? facet : facet.Name;
      var facetField = typeof facet === 'string' ? facet : facet.selectionField;
      var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
      var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

      if (!valueValue) {
        console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
        return {
          state: FacetSelectionState.NotSelected
        };
      }

      var facetSelections = this.pendingSearch.FacetSelections;

      if (!facetSelections || !facetSelections[facetField]) {
        return {
          state: FacetSelectionState.NotSelected
        };
      }

      var selectionIdx = facetSelections[facetField].indexOf(valueValue);
      var negationIdx = facetSelections[facetField].indexOf("-".concat(valueValue));

      if (selectionIdx !== -1) {
        // if the exact facet value exists, then we're normally selected
        return {
          state: FacetSelectionState.Selected,
          selectedValue: valueValue,
          selectionIndex: selectionIdx
        };
      } else if (negationIdx !== -1) {
        // if the facet value is selected but prefixed with a -, then we're negated
        return {
          state: FacetSelectionState.Negated,
          selectedValue: "-".concat(valueValue),
          selectionIndex: negationIdx
        };
      }

      return {
        state: FacetSelectionState.NotSelected
      };
    }
    /**
     * Returns an object containing the selections that have been made in both the next search request and also
     * in the previous search request. This should be used when iterating selections instead of pulling the values
     * out from the search result or pending search - as this will merge the values together and provide an accurate
     * view of all facet selections.
     */

  }, {
    key: "findMatchingValue",
    value: function findMatchingValue(selectionValue, facetValues) {
      var matchingValue = null;

      if (!facetValues || facetValues.length === 0) {
        return null;
      }

      var _iterator = _createForOfIteratorHelper(facetValues),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var facetValue = _step.value;
          var isMatchingVal = facetValue.Value === selectionValue || "-".concat(facetValue.Value) === selectionValue; // loop through children

          if (!isMatchingVal) {
            matchingValue = this.findMatchingValue(selectionValue, facetValue.Children);
          } else {
            matchingValue = facetValue;
          }

          if (matchingValue) {
            return matchingValue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return matchingValue;
    }
  }, {
    key: "isInitialLoad",
    get: function get() {
      return this.isLoading && !this.searchResults;
    }
  }, {
    key: "facetSelections",
    get: function get() {
      var _this = this;

      var _this$pendingSearch = this.pendingSearch,
          clientSelections = _this$pendingSearch.FacetSelections,
          SearchWithin = _this$pendingSearch.SearchWithin,
          searchResults = this.searchResults;
      var selections = {};

      if (!clientSelections && !SearchWithin) {
        return selections;
      } // if we've made selections on the client, transform these into more detailed selections.
      // the client-side selections are just facet fields and values without any labels - so we
      // need to combine this information with the list of facets received from the server in the
      // previous search in order to return a rich list of selections


      var facets = searchResults ? searchResults.Facets : null;

      if (!facets) {
        // but we can only do this if we've received facet information from the server. without this
        // info we can't determine what labels should be used
        return selections;
      } // manually handle the `searchWithin` selection, as this doesn't usually behave like a normal facet selection
      // but instead a field on the search request


      if (SearchWithin) {
        var facet = facets.find(function (f) {
          return f.selectionField === 'searchWithin';
        });

        if (facet) {
          selections.searchWithin = {
            facet: facet,
            label: facet.Name,
            items: [{
              label: SearchWithin,
              value: SearchWithin
            }]
          };
        }
      }

      if (!clientSelections) {
        return selections;
      }

      Object.keys(clientSelections).forEach(function (fieldName) {
        var selectionValues = clientSelections[fieldName];

        if (!selectionValues) {
          // if this selection has no values, it's not really selected
          return;
        }

        var facet = facets.find(function (f) {
          return f.selectionField === fieldName;
        });

        if (!facet) {
          // if there's no matching facet from the server, we can't show this since we'll have no labels
          return;
        }

        var items = [];

        if (facet.FieldType === 'range') {
          // if the facet this selection is for is a range, there won't be a matching value and thus there won't be a label.
          // so because of this we'll just use the selection value as the label
          selectionValues.forEach(function (selectionValue) {
            items.push({
              label: selectionValue,
              value: selectionValue
            });
          });
        } else if (facet.FieldType === 'tab') {
          // do not return the selection value for tab facet
          return;
        } else {
          // for other types of facets, try to find a matching value
          selectionValues.forEach(function (selectionValue) {
            var matchingVal = _this.findMatchingValue(selectionValue, facet.Values);

            if (!matchingVal || !matchingVal.Label) {
              // if there's no matching value from the server, we cannot display because there would
              // be no label - same if there's no label at all
              return;
            }

            items.push({
              label: matchingVal.Label,
              value: selectionValue
            });
          });
        }

        selections[fieldName] = {
          facet: facet,
          label: facet.Name,
          items: items
        };
      });
      return selections;
    }
  }]);

  return SearchStore;
}();

var AuthToken = /*#__PURE__*/function () {
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  function AuthToken() {
    _classCallCheck(this, AuthToken);

    _defineProperty(this, "refreshToken", void 0);

    _defineProperty(this, "accessToken", void 0);
  }
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */


  _createClass(AuthToken, [{
    key: "setTokens",
    value: function setTokens(accessToken, refreshToken) {
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken
      };
    }
  }], [{
    key: "getInstance",
    value: function getInstance(url) {
      if (!AuthToken.instance) {
        AuthToken.instance = new AuthToken();
      }

      return AuthToken.instance;
    }
  }]);

  return AuthToken;
}();

_defineProperty(AuthToken, "instance", void 0);

var AuthToken$1 = AuthToken.getInstance();

var HawkClient = /*#__PURE__*/function () {
  function HawkClient(config) {
    var _this = this;

    _classCallCheck(this, HawkClient);

    _defineProperty(this, "baseUrl", void 0);

    _defineProperty(this, "searchUrl", void 0);

    _defineProperty(this, "dashboardUrl", void 0);

    _defineProperty(this, "autocompleteUrl", void 0);

    _defineProperty(this, "compareItemsURL", void 0);

    _defineProperty(this, "refreshTokenURL", void 0);

    _defineProperty(this, "pinItemURL", void 0);

    _defineProperty(this, "updatePinOrderURL", void 0);

    _defineProperty(this, "axiosInstance", axios$1.create());

    this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
    this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
    this.searchUrl = config.searchUrl || '/api/v2/search';
    this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
    this.refreshTokenURL = config.refreshTokenURL || '/api/internal-preview/refresh-token/';
    this.pinItemURL = config.pinItemURL || '/api/pinning/set-pinning/';
    this.updatePinOrderURL = config.updatePinOrderURL || '/api/pinning/update-pin-order/';
    this.axiosInstance.interceptors.request.use(function (conf) {
      var accessToken = AuthToken$1.getTokens().accessToken;

      if ((conf.url || '').indexOf('refresh-token') !== -1 || !accessToken) {
        delete conf.headers.common.Authorization;
        delete conf.headers.common.ClientGuid;
      } else {
        conf.headers.Authorization = "Bearer ".concat(accessToken);
        conf.headers.ClientGuid = config.clientGuid;
      }

      return conf;
    }, function (error) {
      Promise.reject(error);
    });
    this.axiosInstance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      var originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        var token = AuthToken$1.getTokens();
        return _this.axiosInstance.post(new URL(_this.refreshTokenURL, _this.baseUrl).href, {
          ClientGuid: config.clientGuid,
          Token: token.accessToken,
          RefreshToken: token.refreshToken
        }).then(function (res) {
          if (res.status === 200) {
            AuthToken$1.setTokens(res.data.Token, res.data.RefreshToken);
            _this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + res.data.Token;
            return _this.axiosInstance(originalRequest);
          }

          return;
        });
      }

      return Promise.reject(error);
    });
  }

  _createClass(HawkClient, [{
    key: "pinItem",
    value: function () {
      var _pinItem = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.axiosInstance.post(new URL(this.pinItemURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result.data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function pinItem(_x, _x2) {
        return _pinItem.apply(this, arguments);
      }

      return pinItem;
    }()
  }, {
    key: "updatePinOrder",
    value: function () {
      var _updatePinOrder = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.axiosInstance.post(new URL(this.updatePinOrderURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result.data);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updatePinOrder(_x3, _x4) {
        return _updatePinOrder.apply(this, arguments);
      }

      return updatePinOrder;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.axiosInstance.post(new URL(this.searchUrl, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result.data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x5, _x6) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "autocomplete",
    value: function () {
      var _autocomplete = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return axios$1.post(new URL(this.autocompleteUrl, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result.data);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function autocomplete(_x7, _x8) {
        return _autocomplete.apply(this, arguments);
      }

      return autocomplete;
    }()
  }]);

  return HawkClient;
}();

var Pagination =
/** Number of total items in the result set. */

/** The page number returned. */

/** The number of items returned for the page. */

/** The total number of pages for the result set - with the current @see MaxPerPage. */

/** Set of pagination options */
function Pagination(init) {
  _classCallCheck(this, Pagination);

  _defineProperty(this, "NofResults", void 0);

  _defineProperty(this, "CurrentPage", void 0);

  _defineProperty(this, "MaxPerPage", void 0);

  _defineProperty(this, "NofPages", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new PaginationItem(i);
  });
};
var PaginationItem =
/** Display label for user's pagination option (i.e. 24 per page). */

/** The maximum number of items that will be returned per page when this option is selected. */

/** Indicates if this is the option selected. Only one pagination item will have this set to `true`. */

/** Indicates if this is the default option. Only one pagination item will have this set to `true`. */
function PaginationItem(init) {
  _classCallCheck(this, PaginationItem);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "PageSize", void 0);

  _defineProperty(this, "Selected", void 0);

  _defineProperty(this, "Default", void 0);

  Object.assign(this, init);
};

var Result = /*#__PURE__*/function () {
  _createClass(Result, [{
    key: "getDocumentValue",

    /** Unique identifier for this search result item. */

    /** Calculated relevancy score. */

    /**
     * Contains the fields for the search result item, as an object of string keys to an array
     * of string values. The keys correspond to the name of the field within the hawk dashboard,
     * and the value of the map is an array of strings for each of the values for that field.
     */

    /**
     * Returns a single document value, by the given field name. If the field does not exist in
     * the document, or has no values, then `undefined` is returned instead.
     * @param field The field within the result document to retrieve the value of.
     */
    value: function getDocumentValue(field) {
      if (this.Document) {
        var values = this.Document[field];

        if (values && values.length > 0) {
          return values[0];
        }
      }

      return undefined;
    }
  }]);

  function Result(init) {
    _classCallCheck(this, Result);

    _defineProperty(this, "DocId", void 0);

    _defineProperty(this, "Score", void 0);

    _defineProperty(this, "Document", void 0);

    _defineProperty(this, "Explain", void 0);

    _defineProperty(this, "IsPin", void 0);

    _defineProperty(this, "BestFragment", void 0);

    Object.assign(this, init);
  }

  return Result;
}();

var Sorting =
/** The sorting items. */
function Sorting(init) {
  _classCallCheck(this, Sorting);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new SortingItem(i);
  });
};
var SortingItem =
/** Name of the sorting option. This is the label to display to users. */

/**
 * The value to be used to specify the sort order once user selects it. This value is passed in the @see Request.SortBy
 * field in the @see Request object.
 */

/** Indicates if this sorting option was configured to be the default. */

/** Indicates if this sorting option is currently being used for the current result set. */
function SortingItem(init) {
  _classCallCheck(this, SortingItem);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "IsDefault", void 0);

  _defineProperty(this, "Selected", void 0);

  Object.assign(this, init);
};

var Selections = function Selections(init) {
  var _this = this;

  _classCallCheck(this, Selections);

  Object.assign(this, init);
  Object.keys(init).forEach(function (key) {
    var selFacet = init[key];
    _this[key] = new SelectionFacet(selFacet);
  });
};
var SelectionFacet =
/** Display name for facet. */

/** Will contain an entry for each selection made within the facet. */
function SelectionFacet(init) {
  _classCallCheck(this, SelectionFacet);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new SelectionFacetValue(i);
  });
};
var SelectionFacetValue =
/** Display label for facet value. */

/** Value for facet value. */
function SelectionFacetValue(init) {
  _classCallCheck(this, SelectionFacetValue);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  Object.assign(this, init);
};

var Value =
/** Label of the value to display. */

/** Value to use when setting the facet value selection. */

/** Number of results in current set that have this facet value. */

/** Indicates if this facet value has been selected. */

/**
 * Used for displaying the slider facet. @see RangeStart indicates what the starting point of the range
 * to display, either on basis of what the user selected by sliding the slider, or if they have no
 * selection it reflects the lowest price product.
 */

/**
 * Used for displaying the slider facet. @see RangeEnd indicates what the end point of the range to
 * display is, either on basis of what the user selected by sliding the slider, or if they have no
 * selection, it reflects the highest price product.
 */

/**
 * Used for displaying the slider facet. @see RangeMin indicates lowest value for the range in the list
 * of products displayed.
 */

/**
 * Used for displaying the slider facet. @see RangeMax indicates highest value for the range in the list
 * of products displayed.
 */

/** Used for nested facets. */

/** Set of pagination options */
function Value(init) {
  _classCallCheck(this, Value);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "Count", void 0);

  _defineProperty(this, "Selected", void 0);

  _defineProperty(this, "RangeStart", void 0);

  _defineProperty(this, "RangeEnd", void 0);

  _defineProperty(this, "RangeMin", void 0);

  _defineProperty(this, "RangeMax", void 0);

  _defineProperty(this, "Path", void 0);

  _defineProperty(this, "Children", void 0);

  _defineProperty(this, "Level", void 0);

  Object.assign(this, init);
};

var Swatch =
/** Match this value to the @see Value object in the @see Values array of @see Facet. */

/** Name of the asset. */

/** URL of the asset. */

/** Indicates if value is the default. */

/** Color of the asset. */
function Swatch(init) {
  _classCallCheck(this, Swatch);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "AssetName", void 0);

  _defineProperty(this, "AssetUrl", void 0);

  _defineProperty(this, "IsDefault", void 0);

  _defineProperty(this, "Color", void 0);

  Object.assign(this, init);
};

var Range =
/** Label of the value to display. */

/** Value to use when setting the facet value selection. */

/** Indicates if the values are numeric. */

/** Lower value of the range. */

/** Upper value of the range. */

/** Asset Url */
function Range(init) {
  _classCallCheck(this, Range);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "IsNumeric", void 0);

  _defineProperty(this, "LBound", void 0);

  _defineProperty(this, "UBound", void 0);

  _defineProperty(this, "AssetFullUrl", void 0);

  Object.assign(this, init);
};

var Facet = /*#__PURE__*/function () {
  _createClass(Facet, [{
    key: "shouldTruncate",

    /** Unique identifier of the facet. */

    /** Display name of the facet. */

    /** The name of the field that is linked to this facet. */

    /** Indicates the maximum number of facet values that are returned. */

    /** Indicates the minimum number of results each facet value needs to have in order to be returned. */

    /**
     * If this is set, it is to be used as the facet name if passed in the `FacetSelections`. If not set,
     * the value of the Field object would be used. (This is only applicable when a slider and range
     * facets are both configured for the same field.)
     */

    /**
     * Indicates the sorting logic that is used for this facet???s values. The possible values for this
     * are the parameters for sorting set options that are configured in "Workbench > Data Configuration
     * > Sorting/Pagination".
     */

    /** Indicates if the user should be able to apply more than one filter value from this facet. */

    /** Indicates if facet values are numeric. */

    /** Indicates if facet values are currency (and should be displayed appropriately). */

    /** Indicates currency symbol in case of currency type facets */

    /** Indicates if the facet can be collapsed and expanded by the user. */

    /** If @see IsCollapsible is `true`, this indicates if the facet should initially be collapsed or expanded. */

    /** Indicates if the facet is set to be visible. */

    /**
     * Indicates if search is enabled for this facet. If it is enabled, a search box should be available for
     * users to filter the facet values by typing in the search box.
     */

    /**
     * If facet display type is Scrolling, this value is the height in pixels for the window inside scroll box.
     * Only to be used if @see DisplayType is `"scrolling"`.
     */

    /**
     * If the number of facet values exceeds this number and @see DisplayType is `"scrolling"`, then the facet
     * should be displayed as scrolling list; if not, display as `"default"`.
     */

    /**
     * If the number of facet values exceeds this number and @see DisplayType is `"truncate"`, then the facet
     * should be displayed as truncated list; if not, display as `"default"`.
     */

    /**
     * To be used if @see IsSearch is `true`. The number of facet values must be this number or higher for the
     * facet search box to display.
     */

    /** Text to display when user hovers over a help icon. */

    /**
     * If `false`, indicates that sometimes this facet will not be returned. The conditions that trigger its
     * display are maintained in the Workbench.
     */

    /**
     * The display order of the facet in the facet list.
     */

    /** This is maximum number of values that could be returned for the facet. */

    /** Will be included if @see FacetType is `"swatch"`. */

    /** Indicates type of facet range display. */

    /** Indicates if setting in Workbench is set to On or Off. */

    /**
     * To be used if @see FacetType is `"slider"`. If @see ShowSliderInputs is `true`, input boxes should be
     * available for user to enter values.
     */

    /** Always present, but will only be populated if the facet is numeric and not a slider. */

    /** The values for this facet. */
    // Data type for datetime facet type

    /** Whether or not the facet should be rendered as truncated. */
    get: function get() {
      // the facet does truncated listing of values if configured for truncating and we have too many facets
      return this.DisplayType === 'truncating' && this.Values.length > this.TruncateThreshold;
    }
    /** Whether or not the facet should have a quick lookup search input. */

  }, {
    key: "shouldSearch",
    get: function get() {
      // the facet should have a search box if configured to do so, and the number of facet values is greater
      // than the threshold
      return this.IsSearch && this.Values.length > this.SearchThreshold;
    }
    /**
     * Returns the name of the key when using this facet for a selection. This will take into consideration
     * @see ParamName and @see Field in determining which value should be returned.
     */

  }, {
    key: "selectionField",
    get: function get() {
      return this.ParamName ? this.ParamName : this.Field;
    }
  }]);

  function Facet(init) {
    _classCallCheck(this, Facet);

    _defineProperty(this, "FacetId", void 0);

    _defineProperty(this, "Name", void 0);

    _defineProperty(this, "Field", void 0);

    _defineProperty(this, "FieldType", void 0);

    _defineProperty(this, "FacetType", void 0);

    _defineProperty(this, "DisplayType", void 0);

    _defineProperty(this, "MaxCount", void 0);

    _defineProperty(this, "MinHitCount", void 0);

    _defineProperty(this, "ParamName", void 0);

    _defineProperty(this, "SortBy", void 0);

    _defineProperty(this, "ExpandSelection", void 0);

    _defineProperty(this, "IsNumeric", void 0);

    _defineProperty(this, "IsCurrency", void 0);

    _defineProperty(this, "CurrencySymbol", void 0);

    _defineProperty(this, "IsCollapsible", void 0);

    _defineProperty(this, "IsCollapsedDefault", void 0);

    _defineProperty(this, "IsVisible", void 0);

    _defineProperty(this, "IsSearch", void 0);

    _defineProperty(this, "ScrollHeight", void 0);

    _defineProperty(this, "ScrollThreshold", void 0);

    _defineProperty(this, "TruncateThreshold", void 0);

    _defineProperty(this, "SearchThreshold", void 0);

    _defineProperty(this, "Tooltip", void 0);

    _defineProperty(this, "AlwaysVisible", void 0);

    _defineProperty(this, "SortOrder", void 0);

    _defineProperty(this, "NofVisible", void 0);

    _defineProperty(this, "SwatchData", void 0);

    _defineProperty(this, "FacetRangeDisplayType", void 0);

    _defineProperty(this, "PreloadChildren", void 0);

    _defineProperty(this, "ShowSliderInputs", void 0);

    _defineProperty(this, "Ranges", void 0);

    _defineProperty(this, "Values", void 0);

    _defineProperty(this, "DataType", void 0);

    Object.assign(this, init);
    this.SwatchData = init.SwatchData.map(function (s) {
      return new Swatch(s);
    });
    this.Ranges = init.Ranges.map(function (r) {
      return new Range(r);
    });
    this.Values = init.Values.map(function (v) {
      return new Value(v);
    });
  }

  return Facet;
}();

var Rule = function Rule(init) {
  _classCallCheck(this, Rule);

  _defineProperty(this, "RuleType", void 0);

  _defineProperty(this, "Field", void 0);

  _defineProperty(this, "Condition", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "Operator", void 0);

  _defineProperty(this, "Rules", void 0);

  _defineProperty(this, "Parent", void 0);

  Object.assign(this, init);

  if (init.Parent) {
    this.Parent = new Rule(init.Parent);
  }

  this.Rules = init.Rules ? init.Rules.map(function (i) {
    return new Rule(i);
  }) : [];
};
var RuleType;

(function (RuleType) {
  RuleType[RuleType["Group"] = 0] = "Group";
  RuleType[RuleType["Eval"] = 1] = "Eval";
})(RuleType || (RuleType = {}));

var RuleOperatorType;

(function (RuleOperatorType) {
  RuleOperatorType[RuleOperatorType["All"] = 0] = "All";
  RuleOperatorType[RuleOperatorType["Any"] = 1] = "Any";
  RuleOperatorType[RuleOperatorType["None"] = 2] = "None";
})(RuleOperatorType || (RuleOperatorType = {}));

var BannerTrigger = function BannerTrigger(init) {
  _classCallCheck(this, BannerTrigger);

  _defineProperty(this, "BannerGroupId", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "SortOrder", void 0);

  _defineProperty(this, "Rule", void 0);

  Object.assign(this, init);
  this.Rule = new Rule(this.Rule);
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var FeaturedItems = function FeaturedItems(init) {
  _classCallCheck(this, FeaturedItems);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);

  if (init && init.Items) {
    this.Items = init.Items.map(function (i) {
      return new FeaturedItem(i);
    });
  }
};
var Merchandising = function Merchandising(init) {
  _classCallCheck(this, Merchandising);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);

  if (init && init.Items) {
    this.Items = init.Items.map(function (i) {
      return new MerchandisingItem(i);
    });
  }
};
var PageContentItem = function PageContentItem(init) {
  _classCallCheck(this, PageContentItem);

  _defineProperty(this, "Zone", void 0);

  _defineProperty(this, "ContentType", void 0);

  _defineProperty(this, "ImageUrl", void 0);

  _defineProperty(this, "AltTag", void 0);

  _defineProperty(this, "ForwardUrl", void 0);

  _defineProperty(this, "Output", void 0);

  _defineProperty(this, "WidgetArgs", void 0);

  _defineProperty(this, "Title", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "DateFrom", void 0);

  _defineProperty(this, "DateTo", void 0);

  _defineProperty(this, "IsMobile", void 0);

  _defineProperty(this, "MobileContentType", void 0);

  _defineProperty(this, "MobileImageUrl", void 0);

  _defineProperty(this, "MobileOutput", void 0);

  _defineProperty(this, "MobileWidgetArgs", void 0);

  _defineProperty(this, "IsTrackingEnabled", void 0);

  _defineProperty(this, "MobileIsTrackingEnabled", void 0);

  _defineProperty(this, "FeaturedItems", void 0);

  _defineProperty(this, "Items", void 0);

  _defineProperty(this, "Target", void 0);

  _defineProperty(this, "MobileTarget", void 0);

  _defineProperty(this, "MobileAltTag", void 0);

  _defineProperty(this, "MobileForwardUrl", void 0);

  _defineProperty(this, "MobileWidth", void 0);

  _defineProperty(this, "MobileHeight", void 0);

  _defineProperty(this, "Trigger", void 0);

  Object.assign(this, init);

  if (init.FeaturedItems) {
    this.FeaturedItems = init.FeaturedItems.map(function (i) {
      return new Result(i);
    });
  }

  if (init.Trigger) {
    this.Trigger = new BannerTrigger(init.Trigger);
  }
};
var FeaturedItem = /*#__PURE__*/function (_PageContentItem) {
  _inherits(FeaturedItem, _PageContentItem);

  var _super = _createSuper(FeaturedItem);

  function FeaturedItem(init) {
    var _this;

    _classCallCheck(this, FeaturedItem);

    _this = _super.call(this, init);

    _defineProperty(_assertThisInitialized(_this), "Items", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    _this.Items = init.Items.map(function (i) {
      return new Result(i);
    });
    return _this;
  }

  return FeaturedItem;
}(PageContentItem);
var MerchandisingItem = /*#__PURE__*/function (_PageContentItem2) {
  _inherits(MerchandisingItem, _PageContentItem2);

  var _super2 = _createSuper(MerchandisingItem);

  function MerchandisingItem(init) {
    var _this2;

    _classCallCheck(this, MerchandisingItem);

    _this2 = _super2.call(this, init);
    Object.assign(_assertThisInitialized(_this2), init);
    return _this2;
  }

  return MerchandisingItem;
}(PageContentItem);

var PageContent = function PageContent(init) {
  _classCallCheck(this, PageContent);

  _defineProperty(this, "ZoneName", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new PageContentItem(i);
  });
};

var Response =
/** Indicates if request was successful. */

/** Summary of pagination details and a set of pagination options. */

/**
 * The Keyword value that was sent to Hawksearch in the request. If no Keyword was set in the
 * request, the value will be empty.
 */

/**
 * If this is populated, it indicates that the Keyword value returned 0 results, but the results
 * in this response are from this AdjustedKeyword.  A message should be displayed to the user
 * informing them that their search was corrected to this string.
 *
 * This is the result of Auto Correct, which is configured in the Workbench > Keyword Search >
 * Did You Mean.
 */

/** An entry in the array for each item returned in search results. */

/**
 * Will contain an entry for each facet that has one or more selections. Will be empty if no facet
 * selections have been made.
 */

/**
 * If any strings are returned in the array, they should be displayed to the user as suggested
 * search terms.
 *
 * This is the result of Did You Mean, which is configured in the Workbench > Keyword Search >
 * Did You Mean.
 */

/**
 * Merchandising can be placed by using Campaigns in the Hawksearch Workbench. The Campaign will
 * determine if the content should appear and in what zone.
 */
// TODO: merchandising object
// TODO: featured items object

/**
 * Properties that gets populated when user requests landing page related results
 *
 */
// end of landing page related fields
function Response(init) {
  _classCallCheck(this, Response);

  _defineProperty(this, "Success", void 0);

  _defineProperty(this, "Pagination", void 0);

  _defineProperty(this, "Keyword", void 0);

  _defineProperty(this, "AdjustedKeyword", void 0);

  _defineProperty(this, "Results", void 0);

  _defineProperty(this, "Facets", void 0);

  _defineProperty(this, "Selections", void 0);

  _defineProperty(this, "Sorting", void 0);

  _defineProperty(this, "DidYouMean", void 0);

  _defineProperty(this, "Merchandising", void 0);

  _defineProperty(this, "FeaturedItems", void 0);

  _defineProperty(this, "SearchDuration", void 0);

  _defineProperty(this, "DocExplain", void 0);

  _defineProperty(this, "Breadcrumb", void 0);

  _defineProperty(this, "CustomHtml", void 0);

  _defineProperty(this, "HeaderTitle", void 0);

  _defineProperty(this, "MetaDescription", void 0);

  _defineProperty(this, "MetaKeywords", void 0);

  _defineProperty(this, "MetaRobots", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "Next", void 0);

  _defineProperty(this, "Prev", void 0);

  _defineProperty(this, "PageHeading", void 0);

  _defineProperty(this, "PageContent", void 0);

  _defineProperty(this, "RelCanonical", void 0);

  _defineProperty(this, "PageLayoutId", void 0);

  _defineProperty(this, "TrackingId", void 0);

  _defineProperty(this, "VisitorTargets", void 0);

  _defineProperty(this, "Redirect", void 0);

  Object.assign(this, init);
  this.Pagination = new Pagination(init.Pagination);
  this.Merchandising = new Merchandising(init.Merchandising);
  this.FeaturedItems = new FeaturedItems(init.FeaturedItems);
  this.Results = init.Results.map(function (r) {
    return new Result(r);
  });
  this.Facets = init.Facets.map(function (f) {
    return new Facet(f);
  });
  this.PageContent = init.PageContent ? init.PageContent.map(function (p) {
    return new PageContent(p);
  }) : [];
  this.Selections = new Selections(init.Selections);
  this.Sorting = new Sorting(init.Sorting);
};

var ContentType;

(function (ContentType) {
  ContentType["Image"] = "image";
  ContentType["Widget"] = "widget";
  ContentType["Featured"] = "featured";
  ContentType["Custom"] = "custom";
  ContentType["LandingPage"] = "landingPage";
})(ContentType || (ContentType = {}));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useMergableState(initialValue, typeConstructor) {
  var _useState = useState(new typeConstructor(initialValue)),
      _useState2 = _slicedToArray$1(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  function setStateAndMerge(value) {
    if (typeof value === 'function') {
      // if we're being passed a function, we're setting state in the form of setState(prevState => ...).
      setState(function (prevState) {
        // so we derive the new state from the previous state
        var newState = value(prevState); // and then set the new merged state

        return new typeConstructor(_objectSpread$3(_objectSpread$3({}, prevState), newState));
      });
      return;
    } // otherwise, the new state was simply passed in


    setState(function (prevState) {
      // merge state together and set it
      return new typeConstructor(_objectSpread$3(_objectSpread$3({}, prevState), value));
    });
  }

  return [state, setStateAndMerge];
}

var getVisitorExpiry = function getVisitorExpiry() {
  var d = new Date(); // 1 year

  d.setTime(d.getTime() + 360 * 24 * 60 * 60 * 1000);
  return d.toUTCString();
};
var getVisitExpiry = function getVisitExpiry() {
  var d = new Date(); // 4 hours

  d.setTime(d.getTime() + 4 * 60 * 60 * 1000);
  return d.toUTCString();
};
var createGuid = function createGuid() {
  var s = [];
  var hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // tslint:disable-next-line: no-bitwise

  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

  s[8] = s[13] = s[18] = s[23] = '-';
  var uuid = s.join('');
  return uuid;
};
var getCookie = function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';'); // tslint:disable-next-line: prefer-for-of

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};
var setCookie = function setCookie(name, value, expiry) {
  var expires;

  if (expiry) {
    expires = '; expires=' + expiry;
  } else {
    expires = '';
  }

  document.cookie = name + '=' + value + expires + '; path=/';
};

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useHawkState(initialSearch) {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var client = new HawkClient(config);

  var _useMergableState = useMergableState(new SearchStore({
    pendingSearch: initialSearch || {
      FacetSelections: {}
    },
    isLoading: true
  }), SearchStore),
      _useMergableState2 = _slicedToArray$1(_useMergableState, 2),
      store = _useMergableState2[0],
      setStore = _useMergableState2[1];

  useEffect(function () {
    // when the pending search changes, trigger a search
    var cts = axios$1.CancelToken.source();
    search(cts.token);
    return function () {
      cts.cancel();
    };
  }, [store.pendingSearch]);
  /**
   * Performs a search with the currently configured pending search request. The search request can be
   * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
   * the `StoreProvider` component will usually trigger searches directly in response to calls to
   * `setSearch`.
   * @returns A promise that resolves when the search request has been completed.
   */

  function search(_x) {
    return _search.apply(this, arguments);
  }

  function _search() {
    _search = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(cancellationToken) {
      var searchResults, searchParams, visitId, visitorId, updatedRequest;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setStore({
                isLoading: true
              });
              searchResults = null;
              searchParams = _objectSpread$4(_objectSpread$4({}, store.pendingSearch), {}, {
                // pass parameter for extended response
                IsInPreview: config.isInPreview,
                // and override some of the request fields with config values
                ClientGuid: config.clientGuid,
                Keyword: store.pendingSearch.Keyword ? decodeURIComponent(store.pendingSearch.Keyword || '') : store.pendingSearch.Keyword
              }); // The index name in the configuration takes priority over the one supplied from the URL

              if (config.indexName) {
                Object.assign(searchParams, {
                  IndexName: config.indexName
                });
              } // If the index name is required and no value is provided from the config or the URL, the request is canceled


              if (!(config.indexNameRequired && !searchParams.IndexName)) {
                _context.next = 7;
                break;
              }

              setStore({
                isLoading: false
              });
              return _context.abrupt("return");

            case 7:
              // Fill clientdata
              visitId = getCookie('hawk_visit_id');
              visitorId = getCookie('hawk_visitor_id');

              if (!visitId) {
                setCookie('hawk_visit_id', createGuid(), getVisitExpiry());
                visitId = getCookie('hawk_visit_id');
              }

              if (!visitorId) {
                setCookie('hawk_visitor_id', createGuid(), getVisitorExpiry());
                visitorId = getCookie('hawk_visitor_id');
              }

              updatedRequest = _objectSpread$4({
                ClientData: {
                  VisitorId: visitorId || '',
                  VisitId: visitId || '',
                  UserAgent: navigator.userAgent,
                  PreviewBuckets: store.searchResults ? store.searchResults.VisitorTargets.map(function (v) {
                    return v.Id;
                  }) : []
                }
              }, searchParams);
              _context.prev = 12;
              _context.next = 15;
              return client.search(updatedRequest, cancellationToken);

            case 15:
              searchResults = _context.sent;
              _context.next = 24;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](12);

              if (!axios$1.isCancel(_context.t0)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return");

            case 22:
              console.error('Search request error:', _context.t0);
              setStore({
                requestError: true
              });

            case 24:
              setStore({
                isLoading: false
              });

              if (searchResults) {
                if (!searchResults.Success) {
                  console.error('Search result error:', searchResults);
                  setStore({
                    requestError: true
                  });
                } else {
                  setStore({
                    searchResults: new Response(searchResults),
                    requestError: false
                  });
                }
              }

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 18]]);
    }));
    return _search.apply(this, arguments);
  }

  function pinItem(_x2, _x3) {
    return _pinItem.apply(this, arguments);
  }

  function _pinItem() {
    _pinItem = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(request, cancellationToken) {
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return client.pinItem(request, cancellationToken);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _pinItem.apply(this, arguments);
  }

  function updatePinOrder(_x4, _x5) {
    return _updatePinOrder.apply(this, arguments);
  }
  /**
   * Configures the next search request that will be executed. This will also execute a search in response to
   * the next search request changing.
   * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
   * @param doHistory Whether or not this search request will push a history entry into the browser. If
   * 					not specified, the default is `true`.
   */


  function _updatePinOrder() {
    _updatePinOrder = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(request, cancellationToken) {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return client.updatePinOrder(request, cancellationToken);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _updatePinOrder.apply(this, arguments);
  }

  function setSearch(pendingSearch, doHistory) {
    if (doHistory === undefined) {
      doHistory = true;
    }

    setStore(function (prevState) {
      var newState = {
        pendingSearch: _objectSpread$4(_objectSpread$4({}, prevState.pendingSearch), pendingSearch),
        doHistory: doHistory
      };

      if (newState.pendingSearch.Keyword === '') {
        newState.pendingSearch.Keyword = undefined;
      }

      return newState;
    });
  }
  /**
   * Sets the facet selections and search within configuration for the next search request. This will also
   * clear the page number of the next request to display the first page of results.
   * @param selections The facet selections to set.
   * @param searchWithin The search within value to set.
   */


  function setSearchSelections(selections, searchWithin) {
    setSearch({
      FacetSelections: selections,
      SearchWithin: searchWithin,
      // when we change facet selections, also clear the current page so that we navigate
      // back to the first page of results
      PageNo: undefined
    });
  }
  /**
   * Toggles a facet value for the next search request that will be executed. Internally, this will call
   * `setSearch` to configure the next search with this selected facet.
   * @param facet The facet for which the value is being selected.
   * @param facetValue The facet value being selected.
   * @param negate  Whether or not this selection is considered a negation.
   */


  function toggleFacetValue(facet, facetValue, negate) {
    if (negate === undefined) {
      negate = false;
    }

    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
    var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

    if (!valueValue) {
      console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
      return;
    }

    var facetSelections = store.pendingSearch.FacetSelections; // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.

    if (facetField === 'searchWithin') {
      // set the search within to the facet value provided
      setSearchSelections(facetSelections,
      /* searchWithin */
      valueValue);
      return;
    }

    if (!facetSelections) {
      facetSelections = {};
    }

    if (!facetSelections[facetField]) {
      facetSelections[facetField] = [];
    }

    var _store$isFacetSelecte = store.isFacetSelected(facet, facetValue),
        selState = _store$isFacetSelecte.state,
        selectionIndex = _store$isFacetSelecte.selectionIndex;

    if (selState === FacetSelectionState.Selected || selState === FacetSelectionState.Negated) {
      // we're selecting this facet, and it's already selected
      // first, remove it from our selections
      facetSelections[facetField].splice(selectionIndex, 1);

      if (selState === FacetSelectionState.Selected && negate || selState === FacetSelectionState.Negated && !negate) {
        // if we're toggling from negation to non-negation or vice versa, then push the new selection
        facetSelections[facetField].push(negate ? "-".concat(valueValue) : valueValue);
      }
    } else {
      // not selected, so we want to select it
      facetSelections[facetField].push(negate ? "-".concat(valueValue) : valueValue);
    }

    if (facetSelections[facetField].length === 0) {
      // clean up any facets that no longer have any selected facet values
      delete facetSelections[facetField];
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }

  function setFacetValues(facet, facetValues) {
    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var facetSelections = store.pendingSearch.FacetSelections;

    if (!facetSelections) {
      facetSelections = {};
    }

    facetSelections[facetField] = [];

    var _iterator = _createForOfIteratorHelper$1(facetValues),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _facetValue = _step.value;
        var valueValue = typeof _facetValue === 'string' ? _facetValue : _facetValue.Value;
        var valueLabel = typeof _facetValue === 'string' ? _facetValue : _facetValue.Label;

        if (!valueValue) {
          console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
          return;
        }

        facetSelections[facetField].push(valueValue);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Entirely clears all the values of the given facet from the current selection.
   * @param facet The facet to clear.
   */


  function clearFacet(facet) {
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var facetSelections = store.pendingSearch.FacetSelections; // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.

    if (facetField === 'searchWithin') {
      // set searchWithin to undefined to clear it
      setSearchSelections(facetSelections,
      /* searchWithin */
      undefined);
      return;
    }

    if (!facetSelections || !facetSelections[facetField]) {
      // if there are no facet selections or the facet isn't selected at all, there's nothing to clear
      return;
    }

    delete facetSelections[facetField];
    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Clears a given facet value of the given facet from the current selection.
   * @param facet The facet to clear.
   * @param facetValue The facet value to clear.
   */


  function clearFacetValue(facet, facetValue) {
    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
    var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

    if (!valueValue) {
      console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
      return;
    } // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.


    if (facetField === 'searchWithin') {
      // set searchWithin to undefined to clear it
      setSearchSelections(store.pendingSearch.FacetSelections,
      /* searchWithin */
      undefined);
      return;
    }

    var _store$isFacetSelecte2 = store.isFacetSelected(facet, facetValue),
        selState = _store$isFacetSelecte2.state,
        selectionIndex = _store$isFacetSelecte2.selectionIndex;

    if (selState === FacetSelectionState.NotSelected) {
      // if there are no facet selections or the facet isn't selected at all, there's nothing to clear
      return;
    }

    var facetSelections = store.pendingSearch.FacetSelections; // remove it from the selections

    facetSelections[facetField].splice(selectionIndex, 1);

    if (facetSelections[facetField].length === 0) {
      // clean up any facets that no longer have any selected facet values
      delete facetSelections[facetField];
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Clears all selected facets from the current selection.
   */


  function clearAllFacets() {
    setSearchSelections(undefined, undefined);
  }

  var actor = {
    search: search,
    setSearch: setSearch,
    toggleFacetValue: toggleFacetValue,
    setFacetValues: setFacetValues,
    clearFacet: clearFacet,
    clearFacetValue: clearFacetValue,
    clearAllFacets: clearAllFacets,
    pinItem: pinItem,
    updatePinOrder: updatePinOrder
  };
  return [store, actor];
}

var HawkContext = /*#__PURE__*/React__default.createContext({});

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
function StoreProvider(_ref) {
  var initialSearch = _ref.initialSearch,
      children = _ref.children;

  var _useHawkState = useHawkState(initialSearch),
      _useHawkState2 = _slicedToArray$1(_useHawkState, 2),
      store = _useHawkState2[0],
      actor = _useHawkState2[1];

  return /*#__PURE__*/React__default.createElement(HawkContext.Provider, {
    value: {
      store: store,
      actor: actor
    }
  }, children);
}
/**
 * Retrieves the global hawk store for use within a component.
 */


function useHawkSearch() {
  return useContext(HawkContext);
}

function HawkSearch(props) {
  return /*#__PURE__*/React__default.createElement(ConfigProvider, {
    config: props.config
  }, /*#__PURE__*/React__default.createElement(StoreProvider, {
    initialSearch: props.initialSearch
  }, props.children));
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SuggestionType;

(function (SuggestionType) {
  SuggestionType["Product"] = "product";
  SuggestionType["Category"] = "category";
  SuggestionType["Content"] = "content";
  SuggestionType["Popular"] = "popular";
})(SuggestionType || (SuggestionType = {}));

var Suggestion = function Suggestion(suggestionType) {
  _classCallCheck(this, Suggestion);

  _defineProperty(this, "SuggestionType", void 0);

  this.SuggestionType = suggestionType;
};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Category = /*#__PURE__*/function (_Suggestion) {
  _inherits(Category, _Suggestion);

  var _super = _createSuper$1(Category);

  /** Display name of category (example: Men &raquo; Jackets). */

  /**
   * URL for displaying contents of the category, ex:
   * http://dev.hawksearch.net/sites/elasticdemo?department_nest=Jackets_4
   */
  function Category(init) {
    var _this;

    _classCallCheck(this, Category);

    _this = _super.call(this, SuggestionType.Category);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Category;
}(Suggestion);
var CategoryStrategy = /*#__PURE__*/function () {
  function CategoryStrategy() {
    _classCallCheck(this, CategoryStrategy);
  }

  _createClass(CategoryStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return CategoryStrategy;
}();

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Product = /*#__PURE__*/function (_Suggestion) {
  _inherits(Product, _Suggestion);

  var _super = _createSuper$2(Product);

  /** Name of the item (if applicable). */

  /* Sku of the item (if applicable). */

  /** URL of image of the item (if applicable). */

  /** URL of product page (if applicable). */

  /** HTML to display the item in autocomplete. */

  /**
   * This will only be populated if the request parameter @see Request.DisplayFullResponse is sent
   * as `true`.
   */
  function Product(init) {
    var _this;

    _classCallCheck(this, Product);

    _this = _super.call(this, SuggestionType.Product);

    _defineProperty(_assertThisInitialized(_this), "ProductName", void 0);

    _defineProperty(_assertThisInitialized(_this), "Sku", void 0);

    _defineProperty(_assertThisInitialized(_this), "Thumb", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    _defineProperty(_assertThisInitialized(_this), "Html", void 0);

    _defineProperty(_assertThisInitialized(_this), "Results", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Product;
}(Suggestion);
var ProductStrategy = /*#__PURE__*/function () {
  function ProductStrategy() {
    _classCallCheck(this, ProductStrategy);
  }

  _createClass(ProductStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.ProductName : '';
    }
  }]);

  return ProductStrategy;
}();

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Content = /*#__PURE__*/function (_Suggestion) {
  _inherits(Content, _Suggestion);

  var _super = _createSuper$3(Content);

  /** Display label for the content item in Autocomplete. */

  /** The URL for the link created. */

  /** The display label in HTML format, if applicable. */
  function Content(init) {
    var _this;

    _classCallCheck(this, Content);

    _this = _super.call(this, SuggestionType.Content);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    _defineProperty(_assertThisInitialized(_this), "Html", void 0);

    _defineProperty(_assertThisInitialized(_this), "Results", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Content;
}(Suggestion);
var ContentStrategy = /*#__PURE__*/function () {
  function ContentStrategy() {
    _classCallCheck(this, ContentStrategy);
  }

  _createClass(ContentStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return ContentStrategy;
}();

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Popular = /*#__PURE__*/function (_Suggestion) {
  _inherits(Popular, _Suggestion);

  var _super = _createSuper$4(Popular);

  /** Display label for the popular search term. */

  /** The URL for the link created. */
  function Popular(init) {
    var _this;

    _classCallCheck(this, Popular);

    _this = _super.call(this, SuggestionType.Popular);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Popular;
}(Suggestion);
var PopularStrategy = /*#__PURE__*/function () {
  function PopularStrategy() {
    _classCallCheck(this, PopularStrategy);
  }

  _createClass(PopularStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return PopularStrategy;
}();

var Response$1 =
/** Number of products that would be in search results if search was executed. */

/** Number of content items that would be in search results if search was executed.  */

/**
 * Pairs of display values and URLs for matching category names.  The number of categories returned
 * is configured in the Hawksearch Workbench unless overridden by the request parameters.
 */

/**
 * A set of objects for each content item returned. The number returned is configured in the
 * Hawksearch Workbench > Keyword Search > Auto-complete > Update Top Content.
 */

/**
 * A set of Value and Url for each popular search term. The definition of Popular can be defined in
 * the Hawksearch Workbench > Keyword Search > Auto-complete > Update Popular Searches.
 */

/** Search website URL to be used to complete links. */

/** The name of the parameter used to pass the keyword entered by user. */

/**
 * Will be included in the response if there are results to display. The `CategoryHeading` contains
 * the text to display above the list of categories to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ContentHeading` contains
 * the text to display above the list of content items to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ProductHeading` contains
 * the text to display above the list of products to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `PopularHeading` contains
 * the text to display above the list of popular search terms to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ViewAllButtonLabel` contains
 * the text to display for the link to return all results from searching with the term entered.
 */
function Response(init) {
  _classCallCheck(this, Response);

  _defineProperty(this, "Count", void 0);

  _defineProperty(this, "ContentCount", void 0);

  _defineProperty(this, "Categories", void 0);

  _defineProperty(this, "Products", void 0);

  _defineProperty(this, "Content", void 0);

  _defineProperty(this, "Popular", void 0);

  _defineProperty(this, "SearchWebsiteUrl", void 0);

  _defineProperty(this, "KeywordField", void 0);

  _defineProperty(this, "CategoryHeading", void 0);

  _defineProperty(this, "ContentHeading", void 0);

  _defineProperty(this, "ProductHeading", void 0);

  _defineProperty(this, "PopularHeading", void 0);

  _defineProperty(this, "ViewAllButtonLabel", void 0);

  Object.assign(this, init);
  this.Categories = init.Categories.map(function (r) {
    return new Category(r);
  });
  this.Products = init.Products.map(function (r) {
    return new Product(r);
  });
  this.Popular = init.Popular.map(function (r) {
    return new Popular(r);
  });
  this.Content = init.Content.map(function (r) {
    return new Content(r);
  });
};

function hasAllEmpty(popular, categories, products, content) {
  var hasPopular = popular && popular.length === 0;
  var hasCategories = categories && categories.length === 0;
  var hasProducts = products && products.length === 0;
  var hasContent = content && content.length === 0;
  return hasPopular && hasCategories && hasProducts && hasContent;
}

function SearchSuggestionsList(_ref) {
  var isLoading = _ref.isLoading,
      searchResults = _ref.searchResults,
      downshift = _ref.downshift,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;
  var popular = searchResults.Popular,
      categories = searchResults.Categories,
      products = searchResults.Products,
      content = searchResults.Content;
  var isRecordEmpty = hasAllEmpty(popular, categories, products, content);

  if (isRecordEmpty) {
    return null;
  }

  return SuggestionList ? /*#__PURE__*/React__default.createElement(SuggestionList, {
    isLoading: isLoading,
    downshift: downshift,
    searchResults: searchResults,
    onViewMatches: onViewMatches
  }) : null;
}

function SearchSuggestions(_ref) {
  var query = _ref.query,
      downshift = _ref.downshift,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var client = new HawkClient(config);

  var _useState = useState({}),
      _useState2 = _slicedToArray$1(_useState, 2),
      results = _useState2[0],
      setResults = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1]; // debounce the input search string so that we only do an autocomplete query every so often


  useEffect(function () {
    // default to 200ms if not specified
    var debounceMs = config.autocompleteDebounce || 200;
    var cts = axios$1.CancelToken.source();
    var timeout = setTimeout(function () {
      return doAutocomplete(query, cts.token);
    }, debounceMs);
    return function () {
      cts.cancel();
      clearTimeout(timeout);
    };
  }, [query, config.autocompleteDebounce]);
  /**
   * Performs an autocomplete request to the Hawk API and populates the result set of this component.
   * @param input The user entered search string that results will be autocompleted for.
   */

  function doAutocomplete(_x, _x2) {
    return _doAutocomplete.apply(this, arguments);
  }

  function _doAutocomplete() {
    _doAutocomplete = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(input, cancellationToken) {
      var response;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              response = null;
              _context.prev = 2;
              _context.next = 5;
              return client.autocomplete({
                ClientGuid: config.clientGuid,
                Keyword: decodeURIComponent(input),
                IndexName: config.indexName,
                DisplayFullResponse: true
              }, cancellationToken).then(function (o) {
                // ensure, returned object will return response
                // since by default, axios uses JSON.parse to parse an object,
                // it doesn't recognize it as Response type - this line is to prevent it
                return Object.assign(new Response$1(o));
              });

            case 5:
              response = _context.sent;
              _context.next = 13;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);

              if (!axios$1.isCancel(_context.t0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              console.error('Autocomplete request error:', _context.t0);

            case 13:
              setIsLoading(false);

              if (response) {
                setResults(response);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    }));
    return _doAutocomplete.apply(this, arguments);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "autosuggest-menu"
  }, /*#__PURE__*/React__default.createElement(SearchSuggestionsList, {
    onViewMatches: onViewMatches,
    downshift: downshift,
    isLoading: isLoading,
    searchResults: results,
    SuggestionList: SuggestionList
  }));
}

/**
 * Plus SVG
 *
 * @returns
 */
function PlusSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"
  }));
}

/**
 * Minus SVG
 *
 * @returns
 */
function MinusSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"
  }));
}

/**
 * Questionmark SVG
 *
 * @returns
 */
function QuestionmarkSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M 10.976562 14.785156 C 10.976562 15.324219 10.539062 15.761719 10 15.761719 C 9.460938 15.761719 9.023438 15.324219 9.023438 14.785156 C 9.023438 14.246094 9.460938 13.808594 10 13.808594 C 10.539062 13.808594 10.976562 14.246094 10.976562 14.785156 Z M 10.976562 14.785156 "
  }), /*#__PURE__*/createElement("path", {
    d: "M 10 0 C 4.472656 0 0 4.472656 0 10 C 0 15.527344 4.472656 20 10 20 C 15.527344 20 20 15.527344 20 10 C 20 4.472656 15.527344 0 10 0 Z M 10 18.4375 C 5.335938 18.4375 1.5625 14.664062 1.5625 10 C 1.5625 5.335938 5.335938 1.5625 10 1.5625 C 14.664062 1.5625 18.4375 5.335938 18.4375 10 C 18.4375 14.664062 14.664062 18.4375 10 18.4375 Z M 10 18.4375 "
  }), /*#__PURE__*/createElement("path", {
    d: "M 10 5.019531 C 8.277344 5.019531 6.875 6.421875 6.875 8.144531 C 6.875 8.574219 7.226562 8.925781 7.65625 8.925781 C 8.085938 8.925781 8.4375 8.574219 8.4375 8.144531 C 8.4375 7.28125 9.136719 6.582031 10 6.582031 C 10.863281 6.582031 11.5625 7.28125 11.5625 8.144531 C 11.5625 9.007812 10.863281 9.707031 10 9.707031 C 9.570312 9.707031 9.21875 10.058594 9.21875 10.488281 L 9.21875 12.441406 C 9.21875 12.871094 9.570312 13.222656 10 13.222656 C 10.429688 13.222656 10.78125 12.871094 10.78125 12.441406 L 10.78125 11.171875 C 12.128906 10.824219 13.125 9.597656 13.125 8.144531 C 13.125 6.421875 11.722656 5.019531 10 5.019531 Z M 10 5.019531 "
  }));
}

var FacetContext = /*#__PURE__*/React__default.createContext({});

function Facet$1(_ref) {
  var facet = _ref.facet,
      children = _ref.children;

  var _useHawkSearch = useHawkSearch(),
      searchActor = _useHawkSearch.actor;

  var wrapperRef = useRef(null);

  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var _useState3 = useState(facet.shouldTruncate),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isTruncated = _useState4[0],
      setTruncated = _useState4[1];

  var _useState5 = useState(facet.IsCollapsible && facet.IsCollapsedDefault),
      _useState6 = _slicedToArray$1(_useState5, 2),
      isCollapsed = _useState6[0],
      setCollapsed = _useState6[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function selectFacet(facetValue) {
    setFilter('');
    searchActor.toggleFacetValue(facet, facetValue);
  }

  function setFacets(values) {
    setFilter('');
    searchActor.setFacetValues(facet, values);
  }

  function negateFacet(facetValue) {
    setFilter('');
    searchActor.toggleFacetValue(facet, facetValue,
    /* negate */
    true);
  }

  function renderTruncation() {
    // only show the toggle button if the facet is configured for truncation and we're not filtering
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, facet.shouldTruncate && !filter && /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return actor.setTruncated(!isTruncated);
      },
      className: "hawk-facet-rail__show-more-btn"
    }, isTruncated ? "(+) Show ".concat(remainingFacets, " More") : '(-) Show Less'));
  } // TODO: sort facet values


  var facetValues = facet.Values; // first, perform any filtering if enabled and a filter has been typed in

  if (facet.shouldSearch && filter) {
    facetValues = facet.Values.filter(function (val) {
      if (!val.Label) {
        // if a facet value doesn't have a label, we can't really filter down to it
        // so exclude it
        return false;
      }

      return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  } // next, handle truncation


  var remainingFacets = 0;

  if (facet.shouldTruncate && isTruncated) {
    var valuesBeforeTrunc = facetValues.length;
    facetValues = facetValues.slice(0, facet.TruncateThreshold);
    remainingFacets = valuesBeforeTrunc - facet.TruncateThreshold;
  }

  var actor = {
    selectFacet: selectFacet,
    negateFacet: negateFacet,
    setFacets: setFacets,
    setFilter: setFilter,
    setTruncated: setTruncated,
    setCollapsed: setCollapsed
  };
  var state = {
    facetValues: facetValues,
    filter: filter,
    isTruncated: isTruncated,
    isCollapsed: isCollapsed,
    remainingFacets: remainingFacets,
    decimalPrecision: 2
  };
  var renderer = {
    renderTruncation: renderTruncation
  };

  function toggleCollapsible(event) {
    if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
      return;
    }

    setCollapsed(!isCollapsed);
  }

  return /*#__PURE__*/React__default.createElement(FacetContext.Provider, {
    value: {
      facet: facet,
      state: state,
      actor: actor,
      renderer: renderer
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading",
    onClick: function onClick(event) {
      return toggleCollapsible(event);
    }
  }, /*#__PURE__*/React__default.createElement("h4", null, facet.Name), facet.Tooltip && /*#__PURE__*/React__default.createElement("div", {
    className: "custom-tooltip",
    ref: wrapperRef
  }, /*#__PURE__*/React__default.createElement(QuestionmarkSVG, {
    "class": "hawk-questionmark"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React__default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: facet.Tooltip
    }
  }), /*#__PURE__*/React__default.createElement("i", null))), isCollapsed ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusSVG, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Expand facet category"), ' ') : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(MinusSVG, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Collapse facet category"))), !isCollapsed && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-body"
  }, facet.shouldSearch && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet__quick-lookup"
  }, /*#__PURE__*/React__default.createElement("input", {
    value: filter,
    onChange: function onChange(e) {
      return setFilter(e.currentTarget.value);
    },
    type: "text",
    placeholder: t('Quick Lookup')
  })), children)));
}

function useFacet() {
  return useContext(FacetContext);
}

/**
 * Dash circle SVG
 *
 * @returns
 */
function DashCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon icon-help-header ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    fill: "#5c5c5c",
    d: "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16v0c0-8.837 7.163-16 16-16v0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M21.51 17.594h-11.733c-0.884 0-1.6-0.716-1.6-1.6s0.716-1.6 1.6-1.6h11.733c0.884 0 1.6 0.716 1.6 1.6s-0.716 1.6-1.6 1.6z"
  }));
}

/**
 * Checkmark SVG
 *
 * @returns
 */
function CheckmarkSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M27 4l-15 15-7-7-5 5 12 12 20-20z"
  }));
}

/**
 * Plus SVG
 *
 * @returns
 */
function PlusCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 20 20",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M11 9v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0z"
  }));
}

function Checkbox() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function renderOptions() {
    if (facet.FieldType === 'range') {
      return facetValues.map(function (value) {
        var correspondingRange = facet.Ranges.find(function (c) {
          return c.Value === value.Value;
        });
        var rangeValueAssetUrl = correspondingRange ? config.dashboardUrl + correspondingRange.AssetFullUrl : ''; // facets can be selected or negated, so explicitly check that the facet is not selected

        var selectionState = store.isFacetSelected(facet, value).state;
        var isSelected = selectionState !== FacetSelectionState.NotSelected;
        var isNegated = selectionState === FacetSelectionState.Negated;
        return /*#__PURE__*/React__default.createElement("li", {
          key: value.Value,
          className: "hawk-facet-rail__facet-list-item"
        }, /*#__PURE__*/React__default.createElement("button", {
          onClick: function onClick(e) {
            return actor.selectFacet(value);
          },
          className: "hawk-facet-rail__facet-btn",
          "aria-pressed": isSelected
        }, renderCheckMark(isSelected), rangeValueAssetUrl !== '' ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
          className: "hawk-selectionInner"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "hawk-range-asset",
          title: value.Label
        }), /*#__PURE__*/React__default.createElement("img", {
          src: rangeValueAssetUrl,
          alt: value.Label
        })), /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")"))), renderFacetActions(value.Value || '', isNegated));
      });
    } else {
      return facetValues.map(function (value) {
        // facets can be selected or negated, so explicitly check that the facet is not selected
        var selectionState = store.isFacetSelected(facet, value).state;
        var isSelected = selectionState !== FacetSelectionState.NotSelected;
        var isNegated = selectionState === FacetSelectionState.Negated;
        return /*#__PURE__*/React__default.createElement("li", {
          key: value.Value,
          className: "hawk-facet-rail__facet-list-item"
        }, /*#__PURE__*/React__default.createElement("button", {
          onClick: function onClick(e) {
            return actor.selectFacet(value);
          },
          className: "hawk-facet-rail__facet-btn",
          "aria-pressed": isSelected
        }, renderCheckMark(isSelected), /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")")), renderFacetActions(value.Value || '', isNegated));
      });
    }
  }

  function renderCheckMark(isSelected) {
    return /*#__PURE__*/React__default.createElement("span", {
      className: isSelected ? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked' : 'hawk-facet-rail__facet-checkbox'
    }, isSelected ? /*#__PURE__*/React__default.createElement(CheckmarkSVG, {
      "class": "hawk-facet-rail__facet-checkbox-icon"
    }) : null);
  }

  function renderFacetActions(value, isNegated) {
    return /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick(e) {
        return actor.negateFacet(value);
      },
      className: "hawk-facet-rail__facet-btn-exclude"
    }, isNegated ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusCircleSVG, {
      "class": "hawk-facet-rail__facet-btn-include"
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Include facet")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DashCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Exclude facet")));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, renderOptions())), renderer.renderTruncation());
}

function Search() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store,
      hawkActor = _useHawkSearch.actor;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      actor = _useFacet.actor;

  var _useState = useState(undefined),
      _useState2 = _slicedToArray$1(_useState, 2),
      input = _useState2[0],
      setInput = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      setInput(undefined); // clear the user's entered value as we want to be driven by the store again

      actor.selectFacet(event.currentTarget.value);
    }
  }

  function clearFacet() {
    setInput(undefined); // clear the user's entered value as we want to be driven by the store again

    hawkActor.clearFacet(facet);
  }

  function getInputValue() {
    if (input !== undefined) {
      // if the user type an input, that's the value for the input
      return input;
    } // otherwise, use the value from the store


    return store.pendingSearch.SearchWithin || '';
  }

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values__search"
  }, /*#__PURE__*/React__default.createElement("input", {
    value: getInputValue(),
    onChange: function onChange(e) {
      return setInput(e.currentTarget.value);
    },
    onKeyDown: onKeyDown
  }))), store.pendingSearch.SearchWithin && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values__search-clear"
  }, /*#__PURE__*/React__default.createElement("button", {
    className: "link-button",
    onClick: clearFacet
  }, t('Clear'))));
}

function Link() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facetValues.map(function (value) {
    // facets can be selected or negated, so explicitly check that the facet is not selected
    var selectionState = store.isFacetSelected(facet, value).state;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    return /*#__PURE__*/React__default.createElement("li", {
      key: value.Value,
      className: "hawk-facet-rail__facet-list-item"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick(e) {
        return actor.selectFacet(value);
      },
      className: "hawk-facet-rail__facet-btn",
      "aria-pressed": isSelected
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "hawk-facet-rail__facet-name"
    }, value.Label, " (", value.Count, ")")));
  }))), renderer.renderTruncation());
}

function formatDate(unixFormat) {
  var date = new Date(unixFormat);
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + '-' + month + '-' + day;
}

function SliderCalendarInputs(sliderProps) {
  var _useState = useState(0),
      _useState2 = _slicedToArray$1(_useState, 2),
      minValue = _useState2[0],
      setMinValue = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxValue = _useState4[0],
      setMaxValue = _useState4[1];

  function onMinUpdate(event) {
    var value = new Date(event.target.value).getTime();
    var newMinValue = Number(value);

    if (isNaN(newMinValue) || minValue === value) {
      return;
    }

    setMinValue(value);
    sliderProps.onValueChange(Number(newMinValue), Number(maxValue));
  }

  function onMaxUpdate(event) {
    var value = new Date(event.target.value).getTime();
    var newMaxValue = Number(value);

    if (isNaN(newMaxValue) || maxValue === value) {
      return;
    }

    setMaxValue(value);
    sliderProps.onValueChange(Number(minValue), Number(newMaxValue));
  }

  useEffect(function () {
    setMinValue(sliderProps.values[0]);
    setMaxValue(sliderProps.values[1]);
  }, [sliderProps]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sliderNumeric"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "date",
    value: formatDate(Number(minValue)),
    className: "hawk-text-input hawk-date-value-start",
    min: formatDate(sliderProps.min),
    max: formatDate(sliderProps.max),
    onChange: onMinUpdate
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "date",
    value: formatDate(Number(maxValue)),
    className: "hawk-text-input hawk-date-value-end",
    min: formatDate(sliderProps.min),
    max: formatDate(sliderProps.max),
    onChange: onMaxUpdate
  }));
}

var Rheostat = /*#__PURE__*/React__default.lazy(function () {
  return import(
  /* webpackChunkName: "rheostat" */
  'rheostat');
});

function formatDate$1(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + '-' + month + '-' + day;
}

function replaceHyphen(date) {
  if (!date) {
    return date;
  }

  return date.replace(/-/g, '/');
}

function getTime(date) {
  return date && Number(new Date(date || '').getTime());
}

function SliderDate() {
  var _useHawkSearch = useHawkSearch(),
      facetSelections = _useHawkSearch.store.facetSelections;

  var _useFacet = useFacet(),
      _useFacet$state = _useFacet.state,
      facetValues = _useFacet$state.facetValues,
      decimalPrecision = _useFacet$state.decimalPrecision,
      facet = _useFacet.facet,
      actor = _useFacet.actor; // the range of the slider is defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;

  var _useState = useState(range && getTime(range.RangeMin)),
      _useState2 = _slicedToArray$1(_useState, 2),
      rangeMin = _useState2[0],
      setMinRange = _useState2[1];

  var _useState3 = useState(range && getTime(range.RangeMax)),
      _useState4 = _slicedToArray$1(_useState3, 2),
      rangeMax = _useState4[0],
      setMaxRange = _useState4[1];

  var _useState5 = useState(range && getTime(range.RangeStart)),
      _useState6 = _slicedToArray$1(_useState5, 2),
      rangeStart = _useState6[0],
      setStartRange = _useState6[1];

  var _useState7 = useState(range && getTime(range.RangeEnd)),
      _useState8 = _slicedToArray$1(_useState7, 2),
      rangeEnd = _useState8[0],
      setEndRange = _useState8[1]; // if there's no range, initialize to zeros


  var _useState9 = useState(),
      _useState10 = _slicedToArray$1(_useState9, 2),
      minValue = _useState10[0],
      setMinValue = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray$1(_useState11, 2),
      maxValue = _useState12[0],
      setMaxValue = _useState12[1];

  useEffect(function () {
    var paramName = facet.ParamName || facet.Field; // clear min and max value if these were cleared

    if (!paramName || !(paramName in facetSelections)) {
      setMinValue(undefined);
      setMaxValue(undefined);
    }
  }, [facetSelections]);
  useEffect(function () {
    var newRange = facetValues.length > 0 ? facetValues[0] : null;
    setMinRange(newRange && getTime(newRange.RangeMin));
    setMaxRange(newRange && getTime(newRange.RangeMax));
    setStartRange(newRange && getTime(newRange.RangeStart));
    setEndRange(newRange && getTime(newRange.RangeEnd));
  }, [facetValues]);

  if (rangeMin === null || isNaN(rangeMin) || rangeMax === null || isNaN(rangeMax) || rangeStart === null || isNaN(rangeStart) || rangeEnd === null || isNaN(rangeEnd)) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function onSliderDrag(state) {
    var _state$values = _slicedToArray$1(state.values, 2),
        newMin = _state$values[0],
        newMax = _state$values[1];

    setMinValue(newMin);
    setMaxValue(newMax);
  }

  function onSliderValueChange(state) {
    var _state$values2 = _slicedToArray$1(state.values, 2),
        newMin = _state$values2[0],
        newMax = _state$values2[1];

    setFacetValues(newMin, newMax);
  }

  function onValueChange(newMinValue, newMaxValue) {
    var currentMinValue = minValue;
    var currentMaxValue = maxValue; // if min value wasn't yet selected use range start

    if (minValue === undefined && rangeStart !== null) {
      currentMinValue = rangeStart; // setMinValue(rangeStart);
    } // if max value wasn't yet selected use range end


    if (maxValue === undefined && rangeEnd !== null) {
      currentMaxValue = rangeEnd;
    }

    if (currentMinValue === undefined || currentMaxValue === undefined) {
      return;
    }

    if (currentMinValue !== newMinValue && newMinValue <= currentMaxValue) {
      if (rangeMin !== null && newMinValue <= rangeMin) {
        currentMinValue = rangeMin;
      } else {
        currentMinValue = newMinValue;
      }
    }

    if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
      if (rangeMax !== null && newMaxValue >= rangeMax) {
        currentMaxValue = rangeMax;
      } else {
        currentMaxValue = newMaxValue;
      }
    }

    setFacetValues(currentMinValue, currentMaxValue);
  }

  function setFacetValues(minVal, maxVal) {
    if (minVal === undefined || maxVal === undefined || isNaN(minVal) || isNaN(maxVal)) {
      return;
    }

    setMinValue(minVal);
    setMaxValue(maxVal);
    var formattedMinVal = replaceHyphen(formatDate$1(new Date(minVal)));
    var formattedMaxVal = replaceHyphen(formatDate$1(new Date(maxVal))); // this selection is sent to hawk separated by commas, so build the value here

    var selection = "".concat(formattedMinVal, ",").concat(formattedMaxVal);
    actor.setFacets([selection]);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, "Loading...")
  }, /*#__PURE__*/React__default.createElement(SliderCalendarInputs, {
    min: rangeMin,
    max: rangeMax,
    values: [minValue === undefined ? rangeStart : Math.max(minValue, rangeMin), maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax)],
    onValueChange: onValueChange
  }), /*#__PURE__*/React__default.createElement(Rheostat, {
    min: rangeMin,
    max: rangeMax,
    values: [Math.floor(minValue === undefined ? rangeStart : Math.max(minValue, rangeMin)), Math.ceil(maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax))],
    onValuesUpdated: onSliderDrag,
    onChange: onSliderValueChange
  }))));
}

/**
 * react-number-format - 4.4.3
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2021 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-number-format
 */

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  return Constructor;
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf$1(o, p);
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule$1(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

// basic noop function
function noop$1() {}
function returnTrue() {
  return true;
}
function charIsNumber(_char) {
  return !!(_char || '').match(/\d/);
}
function isNil(val) {
  return val === null || val === undefined;
}
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;

    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;

    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator);
} //spilt a float number into different parts beforeDecimal, afterDecimal, and negation

function splitDecimal(numStr) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var hasNagation = numStr[0] === '-';
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');
  var parts = numStr.split('.');
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || '';
  return {
    beforeDecimal: beforeDecimal,
    afterDecimal: afterDecimal,
    hasNagation: hasNagation,
    addNegation: addNegation
  };
}
function fixLeadingZero(numStr) {
  if (!numStr) return numStr;
  var isNegative = numStr[0] === '-';
  if (isNegative) numStr = numStr.substring(1, numStr.length);
  var parts = numStr.split('.');
  var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  var afterDecimal = parts[1] || '';
  return "".concat(isNegative ? '-' : '').concat(beforeDecimal).concat(afterDecimal ? ".".concat(afterDecimal) : '');
}
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */

function limitToScale(numStr, scale, fixedDecimalScale) {
  var str = '';
  var filler = fixedDecimalScale ? '0' : '';

  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }

  return str;
}
/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */

function roundToPrecision(numStr, scale, fixedDecimalScale) {
  //if number is empty don't do anything return empty string
  if (['', '-'].indexOf(numStr) !== -1) return numStr;
  var shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;

  var _splitDecimal = splitDecimal(numStr),
      beforeDecimal = _splitDecimal.beforeDecimal,
      afterDecimal = _splitDecimal.afterDecimal,
      hasNagation = _splitDecimal.hasNagation;

  var roundedDecimalParts = parseFloat("0.".concat(afterDecimal || '0')).toFixed(scale).split('.');
  var intPart = beforeDecimal.split('').reverse().reduce(function (roundedStr, current, idx) {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }

    return current + roundedStr;
  }, roundedDecimalParts[0]);
  var decimalPart = limitToScale(roundedDecimalParts[1] || '', Math.min(scale, afterDecimal.length), fixedDecimalScale);
  var negation = hasNagation ? '-' : '';
  var decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return "".concat(negation).concat(intPart).concat(decimalSeparator).concat(decimalPart);
}
function omit(obj, keyMaps) {
  var filteredObj = {};
  Object.keys(obj).forEach(function (key) {
    if (!keyMaps[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
}
/** set the caret positon in an input field **/

function setCaretPosition(el, caretPos) {
  el.value = el.value; // ^ this is used to not only get "focus", but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)

  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    } // (el.selectionStart === 0 added for Firefox bug)


    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    } // fail city, fortunately this never happens (as far as I've tested) :)


    el.focus();
    return false;
  }
}
/**
  Given previous value and newValue it returns the index
  start - end to which values have changed.
  This function makes assumption about only consecutive
  characters are changed which is correct assumption for caret input.
*/

function findChangedIndex(prevValue, newValue) {
  var i = 0,
      j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;

  while (prevValue[i] === newValue[i] && i < prevLength) {
    i++;
  } //check what has been changed from last


  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) {
    j++;
  }

  return {
    start: i,
    end: prevLength - j
  };
}
/*
  Returns a number whose value is limited to the given range
*/

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function getCurrentCaretPosition(el) {
  /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
  return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode(format) {
  return format || !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}

var propTypes$1 = {
  thousandSeparator: propTypes.oneOfType([propTypes.string, propTypes.oneOf([true])]),
  decimalSeparator: propTypes.string,
  allowedDecimalSeparators: propTypes.arrayOf(propTypes.string),
  thousandsGroupStyle: propTypes.oneOf(['thousand', 'lakh', 'wan']),
  decimalScale: propTypes.number,
  fixedDecimalScale: propTypes.bool,
  displayType: propTypes.oneOf(['input', 'text']),
  prefix: propTypes.string,
  suffix: propTypes.string,
  format: propTypes.oneOfType([propTypes.string, propTypes.func]),
  removeFormatting: propTypes.func,
  mask: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),
  value: propTypes.oneOfType([propTypes.number, propTypes.string]),
  defaultValue: propTypes.oneOfType([propTypes.number, propTypes.string]),
  isNumericString: propTypes.bool,
  customInput: propTypes.elementType,
  allowNegative: propTypes.bool,
  allowEmptyFormatting: propTypes.bool,
  allowLeadingZeros: propTypes.bool,
  onValueChange: propTypes.func,
  onKeyDown: propTypes.func,
  onMouseUp: propTypes.func,
  onChange: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  type: propTypes.oneOf(['text', 'tel', 'password']),
  isAllowed: propTypes.func,
  renderText: propTypes.func,
  getInputRef: propTypes.oneOfType([propTypes.func, // for legacy refs
  propTypes.shape({
    current: propTypes.any
  })])
};
var defaultProps = {
  displayType: 'input',
  decimalSeparator: '.',
  thousandsGroupStyle: 'thousand',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  allowNegative: true,
  allowEmptyFormatting: false,
  allowLeadingZeros: false,
  isNumericString: false,
  type: 'text',
  onValueChange: noop$1,
  onChange: noop$1,
  onKeyDown: noop$1,
  onMouseUp: noop$1,
  onFocus: noop$1,
  onBlur: noop$1,
  isAllowed: returnTrue
};

var NumberFormat =
/*#__PURE__*/
function (_React$Component) {
  _inherits$1(NumberFormat, _React$Component);

  function NumberFormat(props) {
    var _this;

    _classCallCheck$2(this, NumberFormat);

    _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(NumberFormat).call(this, props));
    var defaultValue = props.defaultValue; //validate props

    _this.validateProps();

    var formattedValue = _this.formatValueProp(defaultValue);

    _this.state = {
      value: formattedValue,
      numAsString: _this.removeFormatting(formattedValue)
    };
    _this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized$1(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized$1(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized$1(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized$1(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized$1(_this));
    return _this;
  }

  _createClass$2(NumberFormat, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateValueIfRequired(prevProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.focusTimeout);
    }
  }, {
    key: "updateValueIfRequired",
    value: function updateValueIfRequired(prevProps) {
      var props = this.props,
          state = this.state,
          focusedElm = this.focusedElm;
      var stateValue = state.value,
          _state$numAsString = state.numAsString,
          lastNumStr = _state$numAsString === void 0 ? '' : _state$numAsString; // If only state changed no need to do any thing

      if (prevProps !== props) {
        //validate props
        this.validateProps();
        var lastValueWithNewFormat = this.formatNumString(lastNumStr);
        var formattedValue = isNil(props.value) ? lastValueWithNewFormat : this.formatValueProp();
        var numAsString = this.removeFormatting(formattedValue);
        var floatValue = parseFloat(numAsString);
        var lastFloatValue = parseFloat(lastNumStr);

        if ( //while typing set state only when float value changes
        (!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue || //can also set state when float value is same and the format props changes
        lastValueWithNewFormat !== stateValue || //set state always when not in focus and formatted value is changed
        focusedElm === null && formattedValue !== stateValue) {
          this.updateValue({
            formattedValue: formattedValue,
            numAsString: numAsString,
            input: focusedElm
          });
        }
      }
    }
    /** Misc methods **/

  }, {
    key: "getFloatString",
    value: function getFloatString() {
      var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var decimalScale = this.props.decimalScale;

      var _this$getSeparators = this.getSeparators(),
          decimalSeparator = _this$getSeparators.decimalSeparator;

      var numRegex = this.getNumberRegex(true); //remove negation for regex check

      var hasNegation = num[0] === '-';
      if (hasNegation) num = num.replace('-', ''); //if decimal scale is zero remove decimal and number after decimalSeparator

      if (decimalSeparator && decimalScale === 0) {
        num = num.split(decimalSeparator)[0];
      }

      num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.'); //remove extra decimals

      var firstDecimalIndex = num.indexOf('.');

      if (firstDecimalIndex !== -1) {
        num = "".concat(num.substring(0, firstDecimalIndex), ".").concat(num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), ''));
      } //add negation back


      if (hasNegation) num = '-' + num;
      return num;
    } //returned regex assumes decimalSeparator is as per prop

  }, {
    key: "getNumberRegex",
    value: function getNumberRegex(g, ignoreDecimalSeparator) {
      var _this$props = this.props,
          format = _this$props.format,
          decimalScale = _this$props.decimalScale;

      var _this$getSeparators2 = this.getSeparators(),
          decimalSeparator = _this$getSeparators2.decimalSeparator;

      return new RegExp('\\d' + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? '|' + escapeRegExp(decimalSeparator) : ''), g ? 'g' : undefined);
    }
  }, {
    key: "getSeparators",
    value: function getSeparators() {
      var decimalSeparator = this.props.decimalSeparator;
      var _this$props2 = this.props,
          thousandSeparator = _this$props2.thousandSeparator,
          allowedDecimalSeparators = _this$props2.allowedDecimalSeparators;

      if (thousandSeparator === true) {
        thousandSeparator = ',';
      }

      if (!allowedDecimalSeparators) {
        allowedDecimalSeparators = [decimalSeparator, '.'];
      }

      return {
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator,
        allowedDecimalSeparators: allowedDecimalSeparators
      };
    }
  }, {
    key: "getMaskAtIndex",
    value: function getMaskAtIndex(index) {
      var _this$props$mask = this.props.mask,
          mask = _this$props$mask === void 0 ? ' ' : _this$props$mask;

      if (typeof mask === 'string') {
        return mask;
      }

      return mask[index] || ' ';
    }
  }, {
    key: "getValueObject",
    value: function getValueObject(formattedValue, numAsString) {
      var floatValue = parseFloat(numAsString);
      return {
        formattedValue: formattedValue,
        value: numAsString,
        floatValue: isNaN(floatValue) ? undefined : floatValue
      };
    }
  }, {
    key: "validateProps",
    value: function validateProps() {
      var mask = this.props.mask; //validate decimalSeparator and thousandSeparator

      var _this$getSeparators3 = this.getSeparators(),
          decimalSeparator = _this$getSeparators3.decimalSeparator,
          thousandSeparator = _this$getSeparators3.thousandSeparator;

      if (decimalSeparator === thousandSeparator) {
        throw new Error("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: ".concat(thousandSeparator, " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n          decimalSeparator: ").concat(decimalSeparator, " (default value for decimalSeparator is .)\n       "));
      } //validate mask


      if (mask) {
        var maskAsStr = mask === 'string' ? mask : mask.toString();

        if (maskAsStr.match(/\d/g)) {
          throw new Error("\n          Mask ".concat(mask, " should not contain numeric character;\n        "));
        }
      }
    }
    /** Misc methods end **/

    /** caret specific methods **/

  }, {
    key: "setPatchedCaretPosition",
    value: function setPatchedCaretPosition(el, caretPos, currentValue) {
      /* setting caret position within timeout of 0ms is required for mobile chrome,
      otherwise browser resets the caret position after we set it
      We are also setting it without timeout so that in normal browser we don't see the flickering */
      setCaretPosition(el, caretPos);
      setTimeout(function () {
        if (el.value === currentValue) setCaretPosition(el, caretPos);
      }, 0);
    }
    /* This keeps the caret within typing area so people can't type in between prefix or suffix */

  }, {
    key: "correctCaretPosition",
    value: function correctCaretPosition(value, caretPos, direction) {
      var _this$props3 = this.props,
          prefix = _this$props3.prefix,
          suffix = _this$props3.suffix,
          format = _this$props3.format; //if value is empty return 0

      if (value === '') return 0; //caret position should be between 0 and value length

      caretPos = clamp(caretPos, 0, value.length); //in case of format as number limit between prefix and suffix

      if (!format) {
        var hasNegation = value[0] === '-';
        return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
      } //in case if custom format method don't do anything


      if (typeof format === 'function') return caretPos;
      /* in case format is string find the closest # position from the caret position */
      //in case the caretPos have input value on it don't do anything

      if (format[caretPos] === '#' && charIsNumber(value[caretPos])) return caretPos; //if caretPos is just after input value don't do anything

      if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) return caretPos; //find the nearest caret position

      var firstHashPosition = format.indexOf('#');
      var lastHashPosition = format.lastIndexOf('#'); //limit the cursor between the first # position and the last # position

      caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);
      var nextPos = format.substring(caretPos, format.length).indexOf('#');
      var caretLeftBound = caretPos;
      var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos); //get the position where the last number is present

      while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))) {
        caretLeftBound -= 1;
      }

      var goToLeft = !charIsNumber(value[caretRightBound]) || direction === 'left' && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBound - caretPos;

      if (goToLeft) {
        //check if number should be taken after the bound or after it
        //if number preceding a valid number keep it after
        return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
      }

      return caretRightBound;
    }
  }, {
    key: "getCaretPosition",
    value: function getCaretPosition(inputValue, formattedValue, caretPos) {
      var format = this.props.format;
      var stateValue = this.state.value;
      var numRegex = this.getNumberRegex(true);
      var inputNumber = (inputValue.match(numRegex) || []).join('');
      var formattedNumber = (formattedValue.match(numRegex) || []).join('');
      var j, i;
      j = 0;

      for (i = 0; i < caretPos; i++) {
        var currentInputChar = inputValue[i] || '';
        var currentFormatChar = formattedValue[j] || ''; //no need to increase new cursor position if formatted value does not have those characters
        //case inputValue = 1a23 and formattedValue =  123

        if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) continue; //When we are striping out leading zeros maintain the new cursor position
        //Case inputValue = 00023 and formattedValue = 23;

        if (currentInputChar === '0' && currentFormatChar.match(numRegex) && currentFormatChar !== '0' && inputNumber.length !== formattedNumber.length) continue; //we are not using currentFormatChar because j can change here

        while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
          j++;
        }

        j++;
      }

      if (typeof format === 'string' && !stateValue) {
        //set it to the maximum value so it goes after the last number
        j = formattedValue.length;
      } //correct caret position if its outside of editable area


      j = this.correctCaretPosition(formattedValue, j);
      return j;
    }
    /** caret specific methods ends **/

    /** methods to remove formattting **/

  }, {
    key: "removePrefixAndSuffix",
    value: function removePrefixAndSuffix(val) {
      var _this$props4 = this.props,
          format = _this$props4.format,
          prefix = _this$props4.prefix,
          suffix = _this$props4.suffix; //remove prefix and suffix

      if (!format && val) {
        var isNegative = val[0] === '-'; //remove negation sign

        if (isNegative) val = val.substring(1, val.length); //remove prefix

        val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val; //remove suffix

        var suffixLastIndex = val.lastIndexOf(suffix);
        val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val; //add negation sign back

        if (isNegative) val = '-' + val;
      }

      return val;
    }
  }, {
    key: "removePatternFormatting",
    value: function removePatternFormatting(val) {
      var format = this.props.format;
      var formatArray = format.split('#').filter(function (str) {
        return str !== '';
      });
      var start = 0;
      var numStr = '';

      for (var i = 0, ln = formatArray.length; i <= ln; i++) {
        var part = formatArray[i] || ''; //if i is the last fragment take the index of end of the value
        //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##

        var index = i === ln ? val.length : val.indexOf(part, start);
        /* in any case if we don't find the pattern part in the value assume the val as numeric string
        This will be also in case if user has started typing, in any other case it will not be -1
        unless wrong prop value is provided */

        if (index === -1) {
          numStr = val;
          break;
        } else {
          numStr += val.substring(start, index);
          start = index + part.length;
        }
      }

      return (numStr.match(/\d/g) || []).join('');
    }
  }, {
    key: "removeFormatting",
    value: function removeFormatting(val) {
      var _this$props5 = this.props,
          format = _this$props5.format,
          removeFormatting = _this$props5.removeFormatting;
      if (!val) return val;

      if (!format) {
        val = this.removePrefixAndSuffix(val);
        val = this.getFloatString(val);
      } else if (typeof format === 'string') {
        val = this.removePatternFormatting(val);
      } else if (typeof removeFormatting === 'function') {
        //condition need to be handled if format method is provide,
        val = removeFormatting(val);
      } else {
        val = (val.match(/\d/g) || []).join('');
      }

      return val;
    }
    /** methods to remove formattting end **/

    /*** format specific methods start ***/

    /**
     * Format when # based string is provided
     * @param  {string} numStr Numeric String
     * @return {string}        formatted Value
     */

  }, {
    key: "formatWithPattern",
    value: function formatWithPattern(numStr) {
      var format = this.props.format;
      var hashCount = 0;
      var formattedNumberAry = format.split('');

      for (var i = 0, ln = format.length; i < ln; i++) {
        if (format[i] === '#') {
          formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
          hashCount += 1;
        }
      }

      return formattedNumberAry.join('');
    }
    /**
     * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
     * @return {string} formatted Value
     */

  }, {
    key: "formatAsNumber",
    value: function formatAsNumber(numStr) {
      var _this$props6 = this.props,
          decimalScale = _this$props6.decimalScale,
          fixedDecimalScale = _this$props6.fixedDecimalScale,
          prefix = _this$props6.prefix,
          suffix = _this$props6.suffix,
          allowNegative = _this$props6.allowNegative,
          thousandsGroupStyle = _this$props6.thousandsGroupStyle;

      var _this$getSeparators4 = this.getSeparators(),
          thousandSeparator = _this$getSeparators4.thousandSeparator,
          decimalSeparator = _this$getSeparators4.decimalSeparator;

      var hasDecimalSeparator = numStr.indexOf('.') !== -1 || decimalScale && fixedDecimalScale;

      var _splitDecimal = splitDecimal(numStr, allowNegative),
          beforeDecimal = _splitDecimal.beforeDecimal,
          afterDecimal = _splitDecimal.afterDecimal,
          addNegation = _splitDecimal.addNegation; // eslint-disable-line prefer-const
      //apply decimal precision if its defined


      if (decimalScale !== undefined) afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);

      if (thousandSeparator) {
        beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
      } //add prefix and suffix


      if (prefix) beforeDecimal = prefix + beforeDecimal;
      if (suffix) afterDecimal = afterDecimal + suffix; //restore negation sign

      if (addNegation) beforeDecimal = '-' + beforeDecimal;
      numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || '') + afterDecimal;
      return numStr;
    }
  }, {
    key: "formatNumString",
    value: function formatNumString() {
      var numStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _this$props7 = this.props,
          format = _this$props7.format,
          allowEmptyFormatting = _this$props7.allowEmptyFormatting;
      var formattedValue = numStr;

      if (numStr === '' && !allowEmptyFormatting) {
        formattedValue = '';
      } else if (numStr === '-' && !format) {
        formattedValue = '-';
      } else if (typeof format === 'string') {
        formattedValue = this.formatWithPattern(formattedValue);
      } else if (typeof format === 'function') {
        formattedValue = format(formattedValue);
      } else {
        formattedValue = this.formatAsNumber(formattedValue);
      }

      return formattedValue;
    }
  }, {
    key: "formatValueProp",
    value: function formatValueProp(defaultValue) {
      var _this$props8 = this.props,
          format = _this$props8.format,
          decimalScale = _this$props8.decimalScale,
          fixedDecimalScale = _this$props8.fixedDecimalScale,
          allowEmptyFormatting = _this$props8.allowEmptyFormatting;
      var _this$props9 = this.props,
          value = _this$props9.value,
          isNumericString = _this$props9.isNumericString; // if value is undefined or null, use defaultValue instead

      value = isNil(value) ? defaultValue : value;
      var isNonNumericFalsy = !value && value !== 0;

      if (isNonNumericFalsy && allowEmptyFormatting) {
        value = '';
      } // if value is not defined return empty string


      if (isNonNumericFalsy && !allowEmptyFormatting) return '';

      if (typeof value === 'number') {
        value = value.toString();
        isNumericString = true;
      } //change infinity value to empty string


      if (value === 'Infinity' && isNumericString) {
        value = '';
      } //round the number based on decimalScale
      //format only if non formatted value is provided


      if (isNumericString && !format && typeof decimalScale === 'number') {
        value = roundToPrecision(value, decimalScale, fixedDecimalScale);
      }

      var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);
      return formattedValue;
    }
  }, {
    key: "formatNegation",
    value: function formatNegation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var allowNegative = this.props.allowNegative;
      var negationRegex = new RegExp('(-)');
      var doubleNegationRegex = new RegExp('(-)(.)*(-)'); // Check number has '-' value

      var hasNegation = negationRegex.test(value); // Check number has 2 or more '-' values

      var removeNegation = doubleNegationRegex.test(value); //remove negation

      value = value.replace(/-/g, '');

      if (hasNegation && !removeNegation && allowNegative) {
        value = '-' + value;
      }

      return value;
    }
  }, {
    key: "formatInput",
    value: function formatInput() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var format = this.props.format; //format negation only if we are formatting as number

      if (!format) {
        value = this.removePrefixAndSuffix(value);
        value = this.formatNegation(value);
      } //remove formatting from number


      value = this.removeFormatting(value);
      return this.formatNumString(value);
    }
    /*** format specific methods end ***/

  }, {
    key: "isCharacterAFormat",
    value: function isCharacterAFormat(caretPos, value) {
      var _this$props10 = this.props,
          format = _this$props10.format,
          prefix = _this$props10.prefix,
          suffix = _this$props10.suffix,
          decimalScale = _this$props10.decimalScale,
          fixedDecimalScale = _this$props10.fixedDecimalScale;

      var _this$getSeparators5 = this.getSeparators(),
          decimalSeparator = _this$getSeparators5.decimalSeparator; //check within format pattern


      if (typeof format === 'string' && format[caretPos] !== '#') return true; //check in number format

      if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkIfFormatGotDeleted",
    value: function checkIfFormatGotDeleted(start, end, value) {
      for (var i = start; i < end; i++) {
        if (this.isCharacterAFormat(i, value)) return true;
      }

      return false;
    }
    /**
     * This will check if any formatting got removed by the delete or backspace and reset the value
     * It will also work as fallback if android chome keyDown handler does not work
     **/

  }, {
    key: "correctInputValue",
    value: function correctInputValue(caretPos, lastValue, value) {
      var _this$props11 = this.props,
          format = _this$props11.format,
          allowNegative = _this$props11.allowNegative,
          prefix = _this$props11.prefix,
          suffix = _this$props11.suffix,
          decimalScale = _this$props11.decimalScale;

      var _this$getSeparators6 = this.getSeparators(),
          allowedDecimalSeparators = _this$getSeparators6.allowedDecimalSeparators,
          decimalSeparator = _this$getSeparators6.decimalSeparator;

      var lastNumStr = this.state.numAsString || '';
      var _this$selectionBefore = this.selectionBeforeInput,
          selectionStart = _this$selectionBefore.selectionStart,
          selectionEnd = _this$selectionBefore.selectionEnd;

      var _findChangedIndex = findChangedIndex(lastValue, value),
          start = _findChangedIndex.start,
          end = _findChangedIndex.end;
      /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */


      if (!format && start === end && allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1) {
        var separator = decimalScale === 0 ? '' : decimalSeparator;
        return value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length);
      }
      /* don't do anyhting if something got added,
       or if value is empty string (when whole input is cleared)
       or whole input is replace with a number
      */


      var leftBound = !!format ? 0 : prefix.length;
      var rightBound = lastValue.length - (!!format ? 0 : suffix.length);

      if (value.length > lastValue.length || !value.length || start === end || selectionStart === 0 && selectionEnd === lastValue.length || selectionStart === leftBound && selectionEnd === rightBound) {
        return value;
      } //if format got deleted reset the value to last value


      if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
        value = lastValue;
      } //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
      //clear all numbers in such case while keeping the - sign


      if (!format) {
        var numericString = this.removeFormatting(value);

        var _splitDecimal2 = splitDecimal(numericString, allowNegative),
            beforeDecimal = _splitDecimal2.beforeDecimal,
            afterDecimal = _splitDecimal2.afterDecimal,
            addNegation = _splitDecimal2.addNegation; // eslint-disable-line prefer-const
        //clear only if something got deleted


        var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;

        if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === '' && !parseFloat(afterDecimal)) {
          return addNegation ? '-' : '';
        }
      }

      return value;
    }
    /** Update value and caret position */

  }, {
    key: "updateValue",
    value: function updateValue(params) {
      var formattedValue = params.formattedValue,
          input = params.input,
          _params$setCaretPosit = params.setCaretPosition,
          setCaretPosition = _params$setCaretPosit === void 0 ? true : _params$setCaretPosit;
      var numAsString = params.numAsString,
          caretPos = params.caretPos;
      var onValueChange = this.props.onValueChange;
      var lastValue = this.state.value;

      if (input) {
        //set caret position, and value imperatively when element is provided
        if (setCaretPosition) {
          //calculate caret position if not defined
          if (!caretPos) {
            var inputValue = params.inputValue || input.value;
            var currentCaretPosition = getCurrentCaretPosition(input);
            /**
             * set the value imperatively, this is required for IE fix
             * This is also required as if new caret position is beyond the previous value.
             * Caret position will not be set correctly
             */

            input.value = formattedValue; //get the caret position

            caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
          } //set caret position


          this.setPatchedCaretPosition(input, caretPos, formattedValue);
        } else {
          /**
           * if we are not setting caret position set the value imperatively.
           * This is required on onBlur method
           */
          input.value = formattedValue;
        }
      } //calculate numeric string if not passed


      if (numAsString === undefined) {
        numAsString = this.removeFormatting(formattedValue);
      } //update state if value is changed


      if (formattedValue !== lastValue) {
        this.setState({
          value: formattedValue,
          numAsString: numAsString
        }); // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287

        onValueChange(this.getValueObject(formattedValue, numAsString));
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var el = e.target;
      var inputValue = el.value;
      var state = this.state,
          props = this.props;
      var isAllowed = props.isAllowed;
      var lastValue = state.value || '';
      var currentCaretPosition = getCurrentCaretPosition(el);
      inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);
      var formattedValue = this.formatInput(inputValue) || '';
      var numAsString = this.removeFormatting(formattedValue);
      var valueObj = this.getValueObject(formattedValue, numAsString);

      if (!isAllowed(valueObj)) {
        formattedValue = lastValue;
      }

      this.updateValue({
        formattedValue: formattedValue,
        numAsString: numAsString,
        inputValue: inputValue,
        input: el
      });
      props.onChange(e);
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var props = this.props,
          state = this.state;
      var format = props.format,
          onBlur = props.onBlur,
          allowLeadingZeros = props.allowLeadingZeros;
      var numAsString = state.numAsString;
      var lastValue = state.value;
      this.focusedElm = null;
      clearTimeout(this.focusTimeout);

      if (!format) {
        // if the numAsString is not a valid number reset it to empty
        if (isNaN(parseFloat(numAsString))) {
          numAsString = '';
        }

        if (!allowLeadingZeros) {
          numAsString = fixLeadingZero(numAsString);
        }

        var formattedValue = this.formatNumString(numAsString); //change the state

        if (formattedValue !== lastValue) {
          // the event needs to be persisted because its properties can be accessed in an asynchronous way
          this.updateValue({
            formattedValue: formattedValue,
            numAsString: numAsString,
            input: e.target,
            setCaretPosition: false
          });
          onBlur(e);
          return;
        }
      }

      onBlur(e);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var el = e.target;
      var key = e.key;
      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          _el$value = el.value,
          value = _el$value === void 0 ? '' : _el$value;
      var expectedCaretPosition;
      var _this$props12 = this.props,
          decimalScale = _this$props12.decimalScale,
          fixedDecimalScale = _this$props12.fixedDecimalScale,
          prefix = _this$props12.prefix,
          suffix = _this$props12.suffix,
          format = _this$props12.format,
          onKeyDown = _this$props12.onKeyDown;
      var ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
      var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
      var negativeRegex = new RegExp('-');
      var isPatternFormat = typeof format === 'string';
      this.selectionBeforeInput = {
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      }; //Handle backspace and delete against non numerical/decimal characters or arrow keys

      if (key === 'ArrowLeft' || key === 'Backspace') {
        expectedCaretPosition = selectionStart - 1;
      } else if (key === 'ArrowRight') {
        expectedCaretPosition = selectionStart + 1;
      } else if (key === 'Delete') {
        expectedCaretPosition = selectionStart;
      } //if expectedCaretPosition is not set it means we don't want to Handle keyDown
      //also if multiple characters are selected don't handle


      if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
        onKeyDown(e);
        return;
      }

      var newCaretPosition = expectedCaretPosition;
      var leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
      var rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        var direction = key === 'ArrowLeft' ? 'left' : 'right';
        newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
      } else if (key === 'Delete' && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
          newCaretPosition++;
        }
      } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
        /* NOTE: This is special case when backspace is pressed on a
        negative value while the cursor position is after prefix. We can't handle it on onChange because
        we will not have any information of keyPress
        */
        if (selectionStart <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
          var newValue = value.substring(1);
          this.updateValue({
            formattedValue: newValue,
            caretPos: newCaretPosition,
            input: el
          });
        } else if (!negativeRegex.test(value[expectedCaretPosition])) {
          while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
            newCaretPosition--;
          }

          newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
        }
      }

      if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
        e.preventDefault();
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }
      /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
              Remove this when you find different solution */


      if (e.isUnitTestRun) {
        this.setPatchedCaretPosition(el, newCaretPosition, value);
      }

      onKeyDown(e);
    }
    /** required to handle the caret position when click anywhere within the input **/

  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      var el = e.target;
      /**
       * NOTE: we have to give default value for value as in case when custom input is provided
       * value can come as undefined when nothing is provided on value prop.
      */

      var selectionStart = el.selectionStart,
          selectionEnd = el.selectionEnd,
          _el$value2 = el.value,
          value = _el$value2 === void 0 ? '' : _el$value2;

      if (selectionStart === selectionEnd) {
        var caretPosition = this.correctCaretPosition(value, selectionStart);

        if (caretPosition !== selectionStart) {
          this.setPatchedCaretPosition(el, caretPosition, value);
        }
      }

      this.props.onMouseUp(e);
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      var _this2 = this;

      // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
      // (onFocus event target selectionStart is always 0 before setTimeout)
      e.persist();
      this.focusedElm = e.target;
      this.focusTimeout = setTimeout(function () {
        var el = e.target;
        var selectionStart = el.selectionStart,
            selectionEnd = el.selectionEnd,
            _el$value3 = el.value,
            value = _el$value3 === void 0 ? '' : _el$value3;

        var caretPosition = _this2.correctCaretPosition(value, selectionStart); //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)


        if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
          _this2.setPatchedCaretPosition(el, caretPosition, value);
        }

        _this2.props.onFocus(e);
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props13 = this.props,
          type = _this$props13.type,
          displayType = _this$props13.displayType,
          customInput = _this$props13.customInput,
          renderText = _this$props13.renderText,
          getInputRef = _this$props13.getInputRef,
          format = _this$props13.format;
      var value = this.state.value;
      var otherProps = omit(this.props, propTypes$1);
      var inputMode = addInputMode(format) ? 'numeric' : undefined;

      var inputProps = _extends$1({
        inputMode: inputMode
      }, otherProps, {
        type: type,
        value: value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onMouseUp: this.onMouseUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      });

      if (displayType === 'text') {
        return renderText ? renderText(value) || null : React__default.createElement("span", _extends$1({}, otherProps, {
          ref: getInputRef
        }), value);
      } else if (customInput) {
        var CustomInput = customInput;
        return React__default.createElement(CustomInput, _extends$1({}, inputProps, {
          ref: getInputRef
        }));
      }

      return React__default.createElement("input", _extends$1({}, inputProps, {
        ref: getInputRef
      }));
    }
  }]);

  return NumberFormat;
}(React__default.Component);

NumberFormat.propTypes = propTypes$1;
NumberFormat.defaultProps = defaultProps;

function SliderNumericInputs(sliderProps) {
  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      minValue = _useState2[0],
      setMinValue = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxValue = _useState4[0],
      setMaxValue = _useState4[1];

  function onMinUpdate(values) {
    var formattedValue = values.formattedValue,
        value = values.value;
    var newMinValue = Number(value);

    if (isNaN(newMinValue) || minValue === value) {
      return;
    }

    setMinValue(value);
  }

  function onMaxUpdate(values) {
    var formattedValue = values.formattedValue,
        value = values.value;
    var newMaxValue = Number(value);

    if (isNaN(newMaxValue) || maxValue === value) {
      return;
    }

    setMaxValue(value);
  }

  function reloadFacets(event) {
    sliderProps.onValueChange(Number(minValue), Number(maxValue));
  }

  useEffect(function () {
    setMinValue(sliderProps.values[0].toString());
    setMaxValue(sliderProps.values[1].toString());
  }, [sliderProps]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sliderNumeric"
  }, /*#__PURE__*/React__default.createElement(NumberFormat, {
    thousandSeparator: sliderProps.isCurrency,
    prefix: sliderProps.isCurrency ? sliderProps.currencySymbol : '',
    value: minValue,
    className: "hawk-numericInput numeric-from",
    min: sliderProps.min,
    max: sliderProps.max,
    onValueChange: onMinUpdate,
    onBlur: reloadFacets,
    decimalScale: sliderProps.decimalPrecision
  }), /*#__PURE__*/React__default.createElement(NumberFormat, {
    thousandSeparator: sliderProps.isCurrency,
    prefix: sliderProps.isCurrency ? sliderProps.currencySymbol : '',
    value: maxValue,
    className: "hawk-numericInput numeric-to",
    min: sliderProps.min,
    max: sliderProps.max,
    onValueChange: onMaxUpdate,
    onBlur: reloadFacets,
    decimalScale: sliderProps.decimalPrecision
  }));
}

var Rheostat$1 = /*#__PURE__*/React__default.lazy(function () {
  return import(
  /* webpackChunkName: "rheostat" */
  'rheostat');
});

function SliderNumeric() {
  var _useHawkSearch = useHawkSearch(),
      facetSelections = _useHawkSearch.store.facetSelections;

  var _useFacet = useFacet(),
      _useFacet$state = _useFacet.state,
      facetValues = _useFacet$state.facetValues,
      decimalPrecision = _useFacet$state.decimalPrecision,
      facet = _useFacet.facet,
      actor = _useFacet.actor; // the range of the slider is defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;

  var _useState = useState(range && Number(parseFloat(range.RangeMin || '').toFixed(2))),
      _useState2 = _slicedToArray$1(_useState, 2),
      rangeMin = _useState2[0],
      setMinRange = _useState2[1];

  var _useState3 = useState(range && Number(parseFloat(range.RangeMax || '').toFixed(2))),
      _useState4 = _slicedToArray$1(_useState3, 2),
      rangeMax = _useState4[0],
      setMaxRange = _useState4[1];

  var _useState5 = useState(range && Number(parseFloat(range.RangeStart || '').toFixed(2))),
      _useState6 = _slicedToArray$1(_useState5, 2),
      rangeStart = _useState6[0],
      setStartRange = _useState6[1];

  var _useState7 = useState(range && Number(parseFloat(range.RangeEnd || '').toFixed(2))),
      _useState8 = _slicedToArray$1(_useState7, 2),
      rangeEnd = _useState8[0],
      setEndRange = _useState8[1]; // if there's no range, initialize to zeros


  var _useState9 = useState(),
      _useState10 = _slicedToArray$1(_useState9, 2),
      minValue = _useState10[0],
      setMinValue = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray$1(_useState11, 2),
      maxValue = _useState12[0],
      setMaxValue = _useState12[1];

  var _useState13 = useState(facet.IsCurrency),
      _useState14 = _slicedToArray$1(_useState13, 2),
      isCurency = _useState14[0],
      setIsCurrency = _useState14[1];

  var _useState15 = useState(facet.CurrencySymbol),
      _useState16 = _slicedToArray$1(_useState15, 2),
      currencySymbol = _useState16[0],
      setCurrencySymbol = _useState16[1];

  useEffect(function () {
    setCurrencySymbol(facet.CurrencySymbol || '$');
    setIsCurrency(facet.IsCurrency);
  }, [facet]);
  useEffect(function () {
    var paramName = facet.ParamName || facet.Field; // clear min and max value if these were cleared

    if (!paramName || !(paramName in facetSelections)) {
      setMinValue(undefined);
      setMaxValue(undefined);
    } else if (paramName in facetSelections && facetSelections[paramName].items && facetSelections[paramName].items.length > 0) {
      var selectedValues = facetSelections[paramName].items[0].value.split(',');
      setMinValue(Number(selectedValues[0]));
      setMaxValue(Number(selectedValues[1]));
    }
  }, [facetSelections]);
  useEffect(function () {
    var newRange = facetValues.length > 0 ? facetValues[0] : null;
    setMinRange(newRange && Number(parseFloat(newRange.RangeMin || '').toFixed(2)));
    setMaxRange(newRange && Number(parseFloat(newRange.RangeMax || '').toFixed(2)));
    setStartRange(newRange && Number(parseFloat(newRange.RangeStart || '').toFixed(2)));
    setEndRange(newRange && Number(parseFloat(newRange.RangeEnd || '').toFixed(2)));
  }, [facetValues]);

  if (rangeMin === null || isNaN(rangeMin) || rangeMax === null || isNaN(rangeMax) || rangeStart === null || isNaN(rangeStart) || rangeEnd === null || isNaN(rangeEnd)) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function onSliderValueChange(state) {
    var _state$values = _slicedToArray$1(state.values, 2),
        newMin = _state$values[0],
        newMax = _state$values[1];

    setFacetValues(newMin, newMax);
  }

  function onValueChange(newMinValue, newMaxValue) {
    var currentMinValue = minValue;
    var currentMaxValue = maxValue; // if min value wasn't yet selected use range start

    if (minValue === undefined && rangeStart !== null) {
      currentMinValue = rangeStart; // setMinValue(rangeStart);
    } // if max value wasn't yet selected use range end


    if (maxValue === undefined && rangeEnd !== null) {
      currentMaxValue = rangeEnd;
    }

    if (currentMinValue === undefined || currentMaxValue === undefined) {
      return;
    }

    if (currentMinValue !== newMinValue && newMinValue <= currentMaxValue) {
      if (rangeMin !== null && newMinValue <= rangeMin) {
        currentMinValue = rangeMin;
      } else {
        currentMinValue = newMinValue;
      }
    }

    if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
      if (rangeMax !== null && newMaxValue >= rangeMax) {
        currentMaxValue = rangeMax;
      } else {
        currentMaxValue = newMaxValue;
      }
    }

    setMinValue(currentMinValue);
    setMaxValue(currentMaxValue);
    setFacetValues(currentMinValue, currentMaxValue);
  }

  function setFacetValues(minVal, maxVal) {
    if (minVal === undefined || maxVal === undefined || isNaN(minVal) || isNaN(maxVal)) {
      return;
    }

    setMinValue(minVal);
    setMaxValue(maxVal); // this selection is sent to hawk separated by commas, so build the value here

    var selection = "".concat(minVal, ",").concat(maxVal);
    actor.setFacets([selection]);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, "Loading...")
  }, /*#__PURE__*/React__default.createElement(SliderNumericInputs, {
    min: rangeMin,
    max: rangeMax,
    currencySymbol: currencySymbol,
    isCurrency: isCurency,
    values: [minValue === undefined ? rangeStart : Math.max(minValue, rangeMin), maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax)],
    onValueChange: onValueChange,
    decimalPrecision: decimalPrecision
  }), /*#__PURE__*/React__default.createElement(Rheostat$1, {
    min: rangeMin,
    max: rangeMax,
    values: [Math.floor(minValue === undefined ? rangeStart : Math.max(minValue, rangeMin)), Math.ceil(maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax))],
    onChange: onSliderValueChange
  }))));
}

function Slider() {
  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  if (facet.DataType && facet.DataType === 'datetime') {
    return /*#__PURE__*/React__default.createElement(SliderDate, null);
  }

  return /*#__PURE__*/React__default.createElement(SliderNumeric, null);
}

function SwatchItem(item) {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var facetValue = item.swatchValue.Value || ''; // facets can be selected or negated, so explicitly check that the facet is not selected

  var swatchUrl = config.dashboardUrl + (!item.facetSwatch.AssetUrl ? item.facetSwatch.AssetName : item.facetSwatch.AssetUrl);
  var colorSwatchStyle = {
    backgroundColor: item.facetSwatch.Color
  };
  var listItemClassNames = 'hawk-facet-rail__facet-list-item' + (item.isSelected ? ' hawkFacet-active' : '') + (item.isNegated ? ' hawkFacet-negative' : '');
  return /*#__PURE__*/React__default.createElement("li", {
    key: item.facetSwatch.Value,
    className: listItemClassNames
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick(e) {
      return item.onSwatchSelected(facetValue, false);
    },
    className: "hawk-facet-rail__facet-btn hawk-styleSwatch",
    "aria-pressed": item.isSelected
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-selectionInner"
  }, item.isColor ? /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-swatchColor",
    style: colorSwatchStyle,
    title: item.facetSwatch.Value
  }) : /*#__PURE__*/React__default.createElement("img", {
    src: swatchUrl,
    alt: item.facetSwatch.Value
  }))), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-negativeIcon"
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "hawkIcon-blocked",
    onClick: function onClick(e) {
      return item.onSwatchSelected(facetValue, true);
    }
  })));
}

function Swatch$1() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      actor = _useFacet.actor,
      facetValues = _useFacet.state.facetValues,
      renderer = _useFacet.renderer;

  function onSwatchSelected(facetValue, isNegated) {
    isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-swatch"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facet.SwatchData && facetValues.map(function (value) {
    var facetValue = value.Value || ''; // find swatch that is corresponding with value

    var facetSwatch = facet.SwatchData && facet.SwatchData.find(function (s) {
      return s.Value.toLowerCase() === facetValue.toLowerCase();
    });

    if (!facetSwatch) {
      return;
    }

    var selectionState = store.isFacetSelected(facet, value).state;
    var isNegated = selectionState === FacetSelectionState.Negated;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    var isColor = !!facetSwatch.Color;
    return /*#__PURE__*/React__default.createElement(SwatchItem, {
      key: facetValue,
      swatchValue: value,
      facetSwatch: facetSwatch,
      isSelected: isSelected,
      isColor: isColor,
      isNegated: isNegated,
      onSwatchSelected: onSwatchSelected
    });
  }))), renderer.renderTruncation());
}

function NestedItem(item) {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var _useState3 = useState(facet.shouldTruncate),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isTruncated = _useState4[0],
      setIsTruncated = _useState4[1];

  var hierarchyValue = item.hierarchyValue || '';
  var hierarchyChildren = item.hierarchyValue.Children || [];
  var remainingValues = 0;
  var shouldTruncateChildren = facet.DisplayType === 'truncating' && hierarchyChildren.length > facet.TruncateThreshold;

  if (shouldTruncateChildren && isTruncated) {
    var valuesBeforeTrunc = hierarchyChildren.length;
    hierarchyChildren = hierarchyChildren.slice(0, facet.TruncateThreshold);
    remainingValues = valuesBeforeTrunc - facet.TruncateThreshold;
  }

  function renderChildTruncation() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, shouldTruncateChildren && /*#__PURE__*/React__default.createElement("li", {
      className: "hawk-facet-rail__facet-list-item hawk-show-more"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return setIsTruncated(!isTruncated);
      },
      className: "hawk-facet-rail__show-more-btn"
    }, isTruncated ? "(+) Show ".concat(remainingValues, " More") : '(-) Show Less')));
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-facet-rail__facet-list-item hawkFacet-group"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawkFacet-group__inline"
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return item.onValueSelected(hierarchyValue, false);
    },
    className: "hawk-facet-rail__facet-btn",
    "aria-pressed": item.isSelected
  }, /*#__PURE__*/React__default.createElement("span", {
    className: item.isSelected ? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked' : 'hawk-facet-rail__facet-checkbox'
  }, item.isSelected ? /*#__PURE__*/React__default.createElement(CheckmarkSVG, {
    "class": "hawk-facet-rail__facet-checkbox-icon"
  }) : null), /*#__PURE__*/React__default.createElement("span", {
    style: item.isNegated ? {
      textDecoration: 'line-through'
    } : undefined,
    className: "hawk-facet-rail__facet-name"
  }, item.hierarchyValue.Label, " (", item.hierarchyValue.Count, ")")), /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick(e) {
      return item.onValueSelected(hierarchyValue, true);
    },
    className: "hawk-facet-rail__facet-btn-exclude"
  }, item.isNegated ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusCircleSVG, {
    "class": "hawk-facet-rail__facet-btn-include"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Include facet")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DashCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Exclude facet"))), hierarchyChildren.length > 0 ? /*#__PURE__*/React__default.createElement("button", {
    className: isExpanded ? 'hawk-collapseState' : 'hawk-collapseState collapsed',
    "aria-expanded": "false",
    onClick: function onClick() {
      return setIsExpanded(!isExpanded);
    }
  }, "\xA0") : null), isExpanded && hierarchyChildren ? /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__w-100"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawkFacet-group-inside"
  }, hierarchyChildren.map(function (value) {
    var selectionState = store.isFacetSelected(facet, value).state;
    var isNegated = selectionState === FacetSelectionState.Negated;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    return /*#__PURE__*/React__default.createElement(NestedItem, {
      key: value.Path,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: item.onValueSelected
    });
  }), renderChildTruncation())) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null));
}

function Nested() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function onValueSelected(facetValue, isNegated) {
    isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facetValues.map(function (value) {
    // facets can be selected or negated, so explicitly check that the facet is not selected
    var selectionState = store.isFacetSelected(facet, value).state;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    var isNegated = selectionState === FacetSelectionState.Negated;
    return /*#__PURE__*/React__default.createElement(NestedItem, {
      key: value.Value,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: onValueSelected
    });
  }))), renderer.renderTruncation());
}

function formatDate$2(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + '-' + month + '-' + day;
}

function replaceHyphen$1(date) {
  if (!date) {
    return date;
  }

  return date.replace(/-/g, '/');
}

function OpenRange() {
  var _useHawkSearch = useHawkSearch(),
      hawkActor = _useHawkSearch.actor;

  var _useFacet = useFacet(),
      facetValues = _useFacet.state.facetValues,
      facet = _useFacet.facet,
      actor = _useFacet.actor;

  var daterange = facetValues.length > 0 ? facetValues[0] : null;
  var rangeStartDate = daterange && daterange.RangeStart ? formatDate$2(new Date(daterange.RangeStart)) : '';
  var rangeEndDate = daterange && daterange.RangeEnd ? formatDate$2(new Date(daterange.RangeEnd)) : ''; // if there's no range, initialize to empty strings

  var _useState = useState(rangeStartDate || ''),
      _useState2 = _slicedToArray$1(_useState, 2),
      minDateValue = _useState2[0],
      setdateStartValue = _useState2[1];

  var _useState3 = useState(rangeEndDate || ''),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxDateValue = _useState4[0],
      setdateEndValue = _useState4[1]; // the open range boundary values are defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;
  var rangeStart = range && range.RangeStart || '';
  var rangeEnd = range && range.RangeEnd || ''; // if there's no range, initialize to empty strings

  var _useState5 = useState(rangeStart || ''),
      _useState6 = _slicedToArray$1(_useState5, 2),
      minValue = _useState6[0],
      setStartValue = _useState6[1];

  var _useState7 = useState(rangeEnd || ''),
      _useState8 = _slicedToArray$1(_useState7, 2),
      maxValue = _useState8[0],
      setEndValue = _useState8[1];

  if (rangeStart === null || rangeEnd === null) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function onRangeStartChange(event) {
    setFacetValues(event.currentTarget.value, maxValue);
  }

  function onRangeEndChange(event) {
    setFacetValues(minValue, event.currentTarget.value);
  }

  function setFacetValues(startVal, endVal) {
    setStartValue(startVal);
    setEndValue(endVal); // this selection is sent to hawk separated by commas, so build the value here

    if (startVal === '' && endVal === '') {
      hawkActor.clearFacet(facet);
    } else {
      var selection = "".concat(startVal, ",").concat(endVal);
      actor.setFacets([selection]);
    }
  }

  if (rangeStart === null || rangeEnd === null) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function ondateRangeStartChange(event) {
    setdateFacetValues(event.currentTarget.value, maxDateValue);
  }

  function ondateRangeEndChange(event) {
    setdateFacetValues(minDateValue, event.currentTarget.value);
  }

  function setdateFacetValues(startVal, endVal) {
    setdateStartValue(startVal);
    setdateEndValue(endVal); // this selection is sent to hawk separated by commas, so build the value here

    if (startVal === '' && endVal === '') {
      hawkActor.clearFacet(facet);
    } else {
      var selection = "".concat(replaceHyphen$1(startVal), ",").concat(replaceHyphen$1(endVal));
      actor.setFacets([selection]);
    }
  }

  if (facet.DataType && facet.DataType === 'datetime') {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "hawk-facet-rail__facet-values"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "hawk-facet-rail__facet-values-link"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "hawk-open-range hawk-facet-type-date"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "date",
      className: "hawk-text-input hawk-date-value-start",
      value: minDateValue,
      min: rangeStartDate,
      max: rangeEndDate,
      onChange: ondateRangeStartChange
    }), /*#__PURE__*/React__default.createElement("input", {
      type: "date",
      className: "hawk-text-input hawk-date-value-end",
      value: maxDateValue,
      min: rangeStartDate,
      max: rangeEndDate,
      onChange: ondateRangeEndChange
    }))));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-open-range"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    className: "hawk-text-input value-start",
    "data-type": "currency",
    value: minValue,
    onChange: onRangeStartChange
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    className: "hawk-text-input value-end",
    onChange: onRangeEndChange,
    value: maxValue
  }))));
}

var FacetType;

(function (FacetType) {
  FacetType["Checkbox"] = "checkbox";
  FacetType["NestedCheckbox"] = "nestedcheckbox";
  FacetType["Link"] = "link";
  FacetType["Nestedlink"] = "nestedlink";
  FacetType["Slider"] = "slider";
  FacetType["Swatch"] = "swatch";
  FacetType["Rating"] = "rating";
  FacetType["Size"] = "size";
  FacetType["SearchWithin"] = "search";
  FacetType["RecentSearches"] = "recentsearches";
  FacetType["RelatedSearches"] = "relatedsearches";
  FacetType["OpenRange"] = "openRange";
})(FacetType || (FacetType = {}));

var defaultFacetComponents = [{
  facetType: FacetType.Checkbox,
  component: Checkbox
}, {
  facetType: FacetType.NestedCheckbox,
  component: Nested
}, {
  facetType: FacetType.SearchWithin,
  component: Search
}, {
  facetType: FacetType.Link,
  component: Link
}, {
  facetType: FacetType.Slider,
  component: Slider
}, {
  facetType: FacetType.Swatch,
  component: Swatch$1
}, {
  facetType: FacetType.OpenRange,
  component: OpenRange
}];
var defaultAutocompleteStrategies = [{
  SuggestionType: SuggestionType.Product,
  SuggestionStrategy: new ProductStrategy()
}, {
  SuggestionType: SuggestionType.Category,
  SuggestionStrategy: new CategoryStrategy()
}, {
  SuggestionType: SuggestionType.Popular,
  SuggestionStrategy: new PopularStrategy()
}, {
  SuggestionType: SuggestionType.Content,
  SuggestionStrategy: new ContentStrategy()
}];
/**
 * Builds a list of all supported facet components by also taking into consideration overridden components.
 */

function getFacetComponents(overridedComponents) {
  var facetComponents = []; // tslint:disable-next-line:forin

  var _loop = function _loop(key) {
    var fType = FacetType[key];
    var fComponent = // check to see if the facet is overridden
    overridedComponents.find(function (component) {
      return component.facetType === fType;
    }) || // otherwise, pull from defaults
    defaultFacetComponents.find(function (component) {
      return component.facetType === fType;
    });

    if (fComponent) {
      facetComponents.push(fComponent);
    }
  };

  for (var key in FacetType) {
    _loop(key);
  }

  return facetComponents;
}
/**
 * Builds a list of all supported autocomplete suggestion strategiesby also taking into consideration overridden strategies.
 */

function getAutocompleteStrategies(overridedStrategies) {
  var suggestionStrategies = []; // tslint:disable-next-line:forin

  var _loop2 = function _loop2(key) {
    var sType = SuggestionType[key];
    var autocompleteStrategy = // check to see if the facet is overridden
    overridedStrategies.find(function (strategyMatch) {
      return strategyMatch.SuggestionType === sType;
    }) || // otherwise, pull from defaults
    defaultAutocompleteStrategies.find(function (strategyMatch) {
      return strategyMatch.SuggestionType === sType;
    });

    if (autocompleteStrategy) {
      suggestionStrategies.push(autocompleteStrategy);
    }
  };

  for (var key in SuggestionType) {
    _loop2(key);
  }

  return suggestionStrategies;
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Downshift = /*#__PURE__*/React__default.lazy(function () {
  return import(
  /* webpackChunkName: "downshift" */
  'downshift');
});

function SearchBoxBase(_ref) {
  var initialValue = _ref.initialValue,
      onSubmit = _ref.onSubmit,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var strategies = getAutocompleteStrategies(config.autocompleteStrategies || []);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;
  /** Called when the internal state of downshift changes - we're handling a couple custom behaviors here */


  function handleStateChange(state, changes) {
    if ( // NOTE: these strings are hardcoded to support code splitting downshift.
    // using the constants from the package will prevent code splitting from operating correctly
    changes.type === '__autocomplete_mouseup__' || changes.type === '__autocomplete_keydown_enter__' || changes.type === '__autocomplete_click_item__') {
      // when:
      //
      //  1. the mouse the clicked outside of downshift
      //  2. enter is pressed on the keyboard
      //  3. an item is selected from the dropdown
      //
      // then we want to retain the input value that was originally typed in. by default downshift
      // will clear the input value, so we're overriding this behavior here.
      return _objectSpread$5(_objectSpread$5({}, changes), {}, {
        inputValue: state.inputValue
      });
    }

    return changes;
  }
  /** Called when an item has been selected from the autocomplete results. */


  function handleItemChange(item, downshift) {
    if (!item) {
      return;
    }

    var matchedStrategy = strategies.find(function (strategy) {
      return strategy.SuggestionType === item.SuggestionType;
    });

    if (!matchedStrategy) {
      return;
    }

    matchedStrategy.SuggestionStrategy.handleItemChange(item, downshift);
  }

  function handleToString(item) {
    if (!item) {
      return '';
    }

    var matchedStrategy = strategies.find(function (strategy) {
      return strategy.SuggestionType === item.SuggestionType;
    });

    if (!matchedStrategy) {
      return '';
    }

    return matchedStrategy.SuggestionStrategy.toString(item);
  }

  return /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, t('Loading'), "...")
  }, /*#__PURE__*/React__default.createElement(Downshift, {
    stateReducer: handleStateChange,
    itemToString: function itemToString(item) {
      return handleToString(item);
    },
    onChange: handleItemChange,
    initialInputValue: decodeURIComponent(initialValue || '')
  }, function (options) {
    var isOpen = options.isOpen,
        inputValue = options.inputValue,
        getInputProps = options.getInputProps,
        openMenu = options.openMenu,
        closeMenu = options.closeMenu;
    var showSuggestions = isOpen && inputValue && inputValue.length > 0;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "hawk__searchBox__searchInput",
      "aria-labelledby": "autocomplete-search-box"
    }, /*#__PURE__*/React__default.createElement("div", {
      id: "autocomplete-search-box",
      className: "hidden-label"
    }, "Autocomplete search box"), /*#__PURE__*/React__default.createElement("input", _extends({
      type: "text",
      style: {
        width: '100%'
      }
    }, getInputProps({
      onKeyDown: function onKeyDown(event) {
        if (onSubmit) {
          onSubmit(event, options);
          closeMenu();
        }
      },
      // when the input is focused again, reopen the downshift menu
      onFocus: function onFocus() {
        if (inputValue && inputValue.length > 0) {
          openMenu();
        }
      },
      placeholder: t('Enter a search term'),
      'aria-labelledby': 'autocomplete-search-box'
    }))), showSuggestions ? /*#__PURE__*/React__default.createElement(SearchSuggestions, {
      query: inputValue || '',
      downshift: options,
      onViewMatches: onViewMatches,
      SuggestionList: SuggestionList
    }) : null);
  }));
}

/**
 * This component is a simple search input box (with autosuggest) that can be placed globally throughout the site.
 * This search box is intended to be used on non-search pages. On search pages, the `SearchBox` component should be
 * used instead.
 */

function GlobalSearchBox() {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var _useHawkSearch = useHawkSearch(),
      actor = _useHawkSearch.actor;

  var searchUrl = config.searchPageUrl;

  function handleSubmit(event, downshift) {
    var inputValue = downshift.inputValue;

    if (event.key === 'Enter') {
      var redirect = "".concat(searchUrl, "?keyword=").concat(inputValue);

      if (config.indexName) {
        redirect += '&indexName=' + config.indexName;
      }

      location.assign(redirect);
    }
  } // On select view all matches from suggestions list


  function handleViewAllMatches(downshift) {
    var inputValue = downshift.inputValue,
        closeMenu = downshift.closeMenu;
    actor.setSearch({
      PageId: undefined,
      CustomUrl: undefined,
      Keyword: inputValue || ''
    });
    closeMenu();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk hawk__searchBox"
  }, /*#__PURE__*/React__default.createElement(SearchBoxBase, {
    onSubmit: handleSubmit,
    onViewMatches: handleViewAllMatches
  }));
}

function SearchBox(_ref) {
  var SuggestionList = _ref.SuggestionList;

  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store,
      actor = _useHawkSearch.actor;

  function handleSubmit(event, downshift) {
    if (event.key === 'Enter') {
      actor.setSearch({
        PageId: undefined,
        CustomUrl: undefined,
        Keyword: encodeURIComponent(event.currentTarget.value),
        FacetSelections: undefined
      });
    }
  } // On Select view all matches from suggestion list


  function handleViewAllMatches(downshift) {
    var inputValue = downshift.inputValue,
        closeMenu = downshift.closeMenu;
    actor.setSearch({
      PageId: undefined,
      CustomUrl: undefined,
      Keyword: inputValue || ''
    });
    closeMenu();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk__searchBox"
  }, /*#__PURE__*/React__default.createElement(SearchBoxBase, {
    onViewMatches: handleViewAllMatches,
    initialValue: store && store.pendingSearch ? store.pendingSearch.Keyword : '',
    onSubmit: handleSubmit,
    SuggestionList: SuggestionList
  }));
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function PlaceholderFacetValue() {
  var _useState = useState(Math.round(Math.random() * (200 - 100) + 100)),
      _useState2 = _slicedToArray$1(_useState, 1),
      width = _useState2[0];

  return /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-facet-rail__facet-list-item"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox-placeholder"
  }), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-facet-rail__facet-btn"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-facet-rail__facet-name"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-name-placeholder",
    style: {
      width: "".concat(width, "px")
    }
  }))));
}

function PlaceholderFacet() {
  var _useState = useState(Math.round(Math.random() * (250 - 125) + 125)),
      _useState2 = _slicedToArray$1(_useState, 1),
      width = _useState2[0];

  var _useState3 = useState(Math.round(Math.random() * (8 - 1) + 1)),
      _useState4 = _slicedToArray$1(_useState3, 1),
      numValues = _useState4[0];

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading-placeholder",
    style: {
      width: "".concat(width, "px")
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-body"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values hawk-facet-rail__facet-values-placeholder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, _toConsumableArray(Array(numValues)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderFacetValue, {
      key: i
    });
  }))))));
}

function FacetList() {
  var _useHawkSearch = useHawkSearch(),
      searchResults = _useHawkSearch.store.searchResults;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config; // the number of random placeholders to render while we wait for results


  var _useState = useState(Math.round(Math.random() * (5 - 3) + 3)),
      _useState2 = _slicedToArray$1(_useState, 1),
      numPlaceholders = _useState2[0];

  var components = getFacetComponents(config.facetOverrides || []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-list"
  }, searchResults ? // if there are search results, render the facets
  searchResults.Facets.map(function (facet) {
    if (!facet.IsVisible) {
      return null;
    }

    if (facet.FieldType === 'tab') {
      return null;
    }

    var registeredComponent = components.find(function (component) {
      return component.facetType === facet.FacetType;
    });
    var Component = !registeredComponent ? null : registeredComponent.component;
    return /*#__PURE__*/React__default.createElement(Facet$1, {
      key: facet.FacetId,
      facet: facet
    }, Component ? /*#__PURE__*/React__default.createElement(Component, null) : /*#__PURE__*/React__default.createElement("div", null, facet.FieldType, " ", facet.FacetType, " is not implemented!"));
  }) : // otherwise render a couple placeholders
  _toConsumableArray(Array(numPlaceholders)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderFacet, {
      key: i
    });
  }));
}

function FacetRail() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__heading"
  }, t('Narrow Results')), /*#__PURE__*/React__default.createElement(FacetList, null));
}

/**
 * X Circle SVG
 *
 * @returns
 */
function XCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon icon-help-header ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    fill: "#d9534f",
    d: "M15.998 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16v0c0-8.837 7.163-16 16-16v0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M13.6 11.646l7.171 7.171c0.541 0.541 0.541 1.417 0 1.958l0.002-0.002c-0.541 0.541-1.417 0.541-1.958 0l-7.171-7.171c-0.541-0.541-0.541-1.417 0-1.958l-0.002 0.002c0.541-0.541 1.417-0.541 1.958 0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M20.774 13.6l-7.174 7.174c-0.54 0.54-1.415 0.54-1.955 0l-0.002-0.002c-0.54-0.54-0.54-1.415 0-1.955l7.174-7.174c0.54-0.54 1.415-0.54 1.955 0l0.002 0.002c0.54 0.54 0.54 1.415 0 1.955z"
  }));
}

function Selections$1() {
  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      facetSelections = _useHawkSearch$store.facetSelections,
      pendingSearch = _useHawkSearch$store.pendingSearch,
      actor = _useHawkSearch.actor;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n; // Added filter to hide selection for Tabs


  var keys = Object.keys(facetSelections).filter(function (key) {
    return key !== 'it';
  });

  if (keys.length === 0) {
    // no selections, so render nothing
    return null;
  }

  function clearSelection(facet, value) {
    if (value) {
      actor.clearFacetValue(facet, value.value);
    } else {
      actor.clearFacet(facet);
    }
  }

  function clearAll() {
    actor.clearAllFacets();
  }

  function renderRange(value, facet) {
    var displayValue = value.value;

    if (!displayValue || displayValue.indexOf(',') === -1) {
      // range facet selection values should include a comma, so if they don't then this likely isn't a valid
      // range value that we want to render
      var selectedRange = facet.Ranges.find(function (range) {
        return range.Value === value.value;
      });
      return selectedRange ? selectedRange.Label : displayValue;
    }

    var splittedValues = displayValue.split(',');

    if (facet.IsCurrency && splittedValues.length > 1) {
      return "".concat(facet.CurrencySymbol, " ").concat(splittedValues[0], " - ").concat(facet.CurrencySymbol, " ").concat(splittedValues[1]);
    } // return a prettier display value for ranges


    return displayValue.replace(',', ' - ');
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__selections"
  }, /*#__PURE__*/React__default.createElement("h4", null, t("You've Selected")), /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-selections"
  }, keys.map(function (key) {
    var selection = facetSelections[key];
    return /*#__PURE__*/React__default.createElement("li", {
      key: key,
      className: "hawk-selections__category"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "hawk-selections__category-wrapper"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "hawk-selections__category-name"
    }, selection.label, ":"), /*#__PURE__*/React__default.createElement("ul", {
      className: "hawk-selections__item-list"
    }, selection.items.map(function (item) {
      var negation = item.value.startsWith('-');
      return /*#__PURE__*/React__default.createElement("li", {
        key: item.value,
        className: "hawk-selections__item"
      }, /*#__PURE__*/React__default.createElement("button", {
        onClick: function onClick() {
          return clearSelection(key, item);
        },
        className: "hawk-selections__item-remove"
      }, /*#__PURE__*/React__default.createElement(XCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
        className: "visually-hidden"
      }, "Unselect facet ", selection.label, " ", item.label)), /*#__PURE__*/React__default.createElement("span", {
        className: negation ? 'hawk-selections__item-name hawk-selections__item-name--negated' : 'hawk-selections__item-name'
      }, selection.facet.FieldType === 'range' ? // render ranges in a specific way
      renderRange(item, selection.facet) : // other facets can have their labels rendered directly
      item.label));
    }))), /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return clearSelection(key);
      },
      className: "hawk-selections__category-remove"
    }, /*#__PURE__*/React__default.createElement(XCircleSVG, null), ' ', /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Unselect all facets for ", selection.label)));
  }), /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-selections__category"
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: clearAll,
    className: "hawk-btn hawk-btn-primary-outline"
  }, t('Clear All')))));
}

function SearchResultsLabel() {
  var _useHawkSearch = useHawkSearch(),
      pendingSearch = _useHawkSearch.store.pendingSearch;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  if (!pendingSearch.Keyword) {
    // no selections, so render nothing
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__results-label"
  }, /*#__PURE__*/React__default.createElement("h3", null, pendingSearch.Keyword ? t('Search Results for') + ' ' + decodeURIComponent(pendingSearch.Keyword) : t('Search Results')));
}

function Sorting$1() {
  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      searchResults = _useHawkSearch$store.searchResults,
      pendingSearch = _useHawkSearch$store.pendingSearch,
      actor = _useHawkSearch.actor;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function onChange(event) {
    actor.setSearch({
      SortBy: event.currentTarget.value
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sorting"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-sorting__label"
  }, t('Sort By')), /*#__PURE__*/React__default.createElement("select", {
    value: pendingSearch.SortBy,
    onChange: onChange
  }, searchResults ? searchResults.Sorting.Items.map(function (sortingItem) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: sortingItem.Value,
      value: sortingItem.Value,
      selected: sortingItem.Selected
    }, sortingItem.Label);
  }) : /*#__PURE__*/React__default.createElement("option", {
    value: "score"
  }, "Best Match")));
}

/**
 * Left chevron SVG
 *
 * @returns
 */
function LeftChevronSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 19 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M18.462 27.891c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.279-0.741 1.705l-0.001 0.001c-0.467 0.437-1.097 0.705-1.789 0.705s-1.322-0.268-1.79-0.706l0.002 0.001-14.146-13.598c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.28 0.741-1.705l0.001-0.001 14.142-13.589c0.468-0.436 1.097-0.704 1.79-0.704s1.322 0.268 1.791 0.706l-0.002-0.001c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.28-0.741 1.705l-0.001 0.001-11.597 11.883z"
  }));
}

/**
 * Right chevron SVG
 *
 * @returns
 */
function RightChevronSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 19 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M0.738 4.109c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.28 0.741-1.705l0.001-0.001c0.467-0.437 1.097-0.705 1.789-0.705s1.322 0.268 1.79 0.706l-0.002-0.001 14.146 13.598c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.279-0.741 1.705l-0.001 0.001-14.142 13.589c-0.468 0.436-1.097 0.704-1.79 0.704s-1.322-0.268-1.791-0.706l0.002 0.001c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.279 0.741-1.705l0.001-0.001 11.597-11.883z"
  }));
}

function Pager(_ref) {
  var page = _ref.page,
      totalPages = _ref.totalPages,
      onPageChange = _ref.onPageChange;

  var _useState = useState(undefined),
      _useState2 = _slicedToArray$1(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray$1(_useState3, 2),
      hasError = _useState4[0],
      setHasError = _useState4[1];

  function goToPreviousPage() {
    goToPage(page - 1);
  }

  function goToNextPage() {
    goToPage(page + 1);
  }

  function goToPage(pageNo) {
    if (isNaN(pageNo)) {
      // not a valid number
      doInputError();
      return;
    }

    if (pageNo < 1) {
      // can't go beyond the first page
      doInputError();
      return;
    }

    if (pageNo > totalPages) {
      // can't go beyond the last page
      doInputError();
      return;
    } // once we've determined that we *do* want to do this page change, clear the user's input
    // because the input should be driven by props again


    setInputValue(undefined); // inform the consumer that we've changed pages

    onPageChange(pageNo);
  }
  /**
   * Returns the input value for the pager input control. If the user has typed in a value into the input then
   * that value will be returned; otherwise, the page value passed in via props will be returned.
   */


  function getInputValue() {
    if (inputValue !== undefined) {
      // if the user typed an input, that's the page value for the control
      return inputValue || '';
    } // otherwise, fall back to what's passed in through props


    return page;
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      var wantedPageNo = parseInt(event.currentTarget.value, 10);
      goToPage(wantedPageNo);
    }
  }

  function doInputError() {
    setHasError(true); // in 500ms, clear the error animation

    setTimeout(function () {
      setHasError(false);
    }, 500);
  }

  function onChange(event) {
    setInputValue(event.currentTarget.value);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-pagination__controls"
  }, /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-pagination__item",
    onClick: goToPreviousPage
  }, /*#__PURE__*/React__default.createElement(LeftChevronSVG, {
    "class": "hawk-pagination__left"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Previous page")), /*#__PURE__*/React__default.createElement("input", {
    type: "number",
    value: getInputValue(),
    onChange: onChange,
    onKeyDown: onKeyDown,
    className: hasError ? 'hawk-pagination__input error' : 'hawk-pagination__input'
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-pagination__total-text"
  }, "\xA0 of ", totalPages), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-pagination__item",
    onClick: goToNextPage
  }, /*#__PURE__*/React__default.createElement(RightChevronSVG, {
    "class": "hawk-pagination__right"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Next page")));
}

function ItemsPerPage() {
  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      searchResults = _useHawkSearch$store.searchResults,
      pendingSearch = _useHawkSearch$store.pendingSearch,
      actor = _useHawkSearch.actor;

  function onChange(event) {
    actor.setSearch({
      MaxPerPage: Number(event.currentTarget.value),
      PageNo: 1 // if we change our max items per page, reset to page 1

    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-items-per-page"
  }, /*#__PURE__*/React__default.createElement("select", {
    value: pendingSearch.MaxPerPage,
    onChange: onChange
  }, searchResults ? searchResults.Pagination.Items.map(function (paginationItem) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: paginationItem.PageSize,
      value: paginationItem.PageSize
    }, paginationItem.Label);
  }) : /*#__PURE__*/React__default.createElement("option", null, "12 Items Per Page")));
}

function Pagination$1() {
  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      searchResults = _useHawkSearch$store.searchResults,
      pendingSearch = _useHawkSearch$store.pendingSearch,
      actor = _useHawkSearch.actor;

  function onPageChange(pageNo) {
    // when the pager's page changes, trigger a new search
    actor.setSearch({
      PageNo: pageNo
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-pagination"
  }, /*#__PURE__*/React__default.createElement(Pager, {
    page: searchResults ? pendingSearch.PageNo || 1 : 0,
    totalPages: searchResults ? searchResults.Pagination.NofPages : 0,
    onPageChange: onPageChange
  }), /*#__PURE__*/React__default.createElement(ItemsPerPage, null));
}

function ToolRow() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row__item"
  }, /*#__PURE__*/React__default.createElement(Sorting$1, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row__item"
  }, /*#__PURE__*/React__default.createElement(Pagination$1, null)));
}

function PlaceholderImage(_ref) {
  var showSpinner = _ref.showSpinner;

  var _useState = useState(Math.round(Math.random() * (175 - 125) + 125)),
      _useState2 = _slicedToArray$1(_useState, 1),
      height = _useState2[0];

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-placeholder",
    style: {
      height: "".concat(height, "px")
    }
  }, showSpinner && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-placeholder__image"
  }, "Loading..."));
}

function PlaceholderItem() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-image"
  }, /*#__PURE__*/React__default.createElement(PlaceholderImage, {
    showSpinner: false
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name-placeholder"
  })));
}

function Spinner(_ref) {
  var isVisible = _ref.isVisible;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: 'hawk-modal'
  }, /*#__PURE__*/React__default.createElement("div", {
    className: 'hawk-modal__content'
  }, t('Loading'), "..."));
}

function ResultImage(_ref) {
  var item = _ref.item,
      websiteUrl = _ref.websiteUrl,
      itemTitleFieldName = _ref.itemTitleFieldName,
      imageUrlFieldName = _ref.imageUrlFieldName;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      imageLoaded = _useState2[0],
      setImageLoaded = _useState2[1];

  var imageUrl = imageUrlFieldName ? item.getDocumentValue(imageUrlFieldName) : item.getDocumentValue('image');

  if (!imageUrl) {
    return null;
  }

  var itemName = itemTitleFieldName ? item.getDocumentValue(itemTitleFieldName) : item.getDocumentValue('itemname');
  var absoluteUrlTester = new RegExp('^https?://|^//', 'i');

  if (!absoluteUrlTester.test(imageUrl) && websiteUrl) {
    imageUrl = websiteUrl + imageUrl;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-image"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: imageLoaded ? {} : {
      overflow: 'hidden',
      width: '0px',
      height: '0px'
    }
  }, /*#__PURE__*/React__default.createElement("img", {
    onLoad: function onLoad() {
      return setImageLoaded(true);
    },
    src: imageUrl,
    alt: "Image for ".concat(itemName)
  })), !imageLoaded ?
  /*#__PURE__*/
  // if the main image hasn't loaded yet, show a placeholder
  React__default.createElement(PlaceholderImage, {
    showSpinner: true
  }) : null);
}

function ResultItem(_ref) {
  var item = _ref.item;
  var itemName = item.getDocumentValue('itemname');
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item"
  }, /*#__PURE__*/React__default.createElement(ResultImage, {
    item: item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name"
  }, /*#__PURE__*/React__default.createElement("span", null, itemName)));
}

function ResultListing(_ref) {
  var _ref$ResultItem = _ref.ResultItem,
      ResultItem$1 = _ref$ResultItem === void 0 ? ResultItem : _ref$ResultItem;

  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      isLoading = _useHawkSearch$store.isLoading,
      searchResults = _useHawkSearch$store.searchResults;

  var results = searchResults ? searchResults.Results : [];
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__listing"
  }, /*#__PURE__*/React__default.createElement(Spinner, {
    isVisible: isLoading
  }), results.length ? // if we have results, display them
  results.map(function (result) {
    return /*#__PURE__*/React__default.createElement(ResultItem$1, {
      key: result.DocId,
      item: result
    });
  }) : // otherwise display placeholder items as we're loading
  _toConsumableArray(Array(12)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderItem, {
      key: i
    });
  }));
}

function Results(_ref) {
  var _ref$ResultItem = _ref.ResultItem,
      ResultItem$1 = _ref$ResultItem === void 0 ? ResultItem : _ref$ResultItem;

  var _useHawkSearch = useHawkSearch(),
      _useHawkSearch$store = _useHawkSearch.store,
      isLoading = _useHawkSearch$store.isLoading,
      searchResults = _useHawkSearch$store.searchResults,
      requestError = _useHawkSearch$store.requestError;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  if (requestError) {
    return /*#__PURE__*/React__default.createElement("span", null, "An error occurred while searching for your results. Please contact the site administrator.");
  } // end of overrides


  if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
    return /*#__PURE__*/React__default.createElement("span", null, t('No Results'));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results"
  }, /*#__PURE__*/React__default.createElement(SearchResultsLabel, null), /*#__PURE__*/React__default.createElement(Selections$1, null), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__top-tool-row"
  }, /*#__PURE__*/React__default.createElement(ToolRow, null)), /*#__PURE__*/React__default.createElement(ResultListing, {
    ResultItem: ResultItem$1
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__bottom-tool-row"
  }, /*#__PURE__*/React__default.createElement(ToolRow, null)));
}

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

var isProduction = process.env.NODE_ENV === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

var isProduction$1 = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction$1) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ''));
}

function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    process.env.NODE_ENV !== "production" ? warning(prompt == null, 'A history supports only one prompt at a time') : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          process.env.NODE_ENV !== "production" ? warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Browser history needs a DOM') : invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var history = createBrowserHistory();

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** Represents parts of the browser query string that are fixed and are always single strings. */

/**
 * Represents the parts of the browser query string that are dynamic (the selected facets). Facets
 * can have multiple values, so the value of these is always an array of strings.
 */

/**
 * Parses the input query string and returns an object that can be used to build a search request.
 * The object returned will usually have the keys: `keyword`, `sort`, `pg`,`lp`,`lpurl`, `mpp`, and then more keys
 * for every selected facet.
 * @param search The input query string.
 */
function parseQueryStringToObject(search) {
  var params = new URLSearchParams(search);
  var parsed = {};
  params.forEach(function (value, key) {
    if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'lp' || key === 'PageId' || key === 'lpurl' || key === 'mpp' || key === 'searchWithin' || key === 'is100Coverage' || key === 'indexName') {
      // `keyword` is special and should never be turned into an array
      parsed[key] = encodeURIComponent(value);
    } else {
      // everything else should be turned into an array
      if (!value) {
        // no useful value for this query param, so skip it
        return;
      } // multiple selections are split by commas, so split into an array


      var multipleValues = value.split(','); // and now handle any comma escaping - any single value that contained a comma is escaped to '::'

      for (var x = 0; x < multipleValues.length; ++x) {
        multipleValues[x] = multipleValues[x].replace('::', ',');
      }

      parsed[key] = multipleValues;
    }
  });
  return parsed;
}
/**
 * Parses the abosulte url into a `HawkClient` client search request object.
 * @param location The input location
 */


function parseLocation(location) {
  var searchUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/search';
  var searchRequest = parseSearchQueryString(location.search); // customUrl have priority over keywords

  if (checkIfUrlRefsLandingPage(location.pathname, searchUrl)) {
    searchRequest.Keyword = undefined;
    searchRequest.CustomUrl = location.pathname.replace(searchUrl, '');
  }

  return searchRequest;
}
/**
 * Parses the input query string into a `HawkClient` client search request object.
 * @param search The input query string.
 */

function parseSearchQueryString(search) {
  var queryObj = parseQueryStringToObject(search); // extract out components, including facet selections

  var keyword = queryObj.keyword,
      sort = queryObj.sort,
      pg = queryObj.pg,
      mpp = queryObj.mpp,
      lp = queryObj.lp,
      PageId = queryObj.PageId,
      lpurl = queryObj.lpurl,
      searchWithin = queryObj.searchWithin,
      is100Coverage = queryObj.is100Coverage,
      indexName = queryObj.indexName,
      facetSelections = _objectWithoutProperties(queryObj, ["keyword", "sort", "pg", "mpp", "lp", "PageId", "lpurl", "searchWithin", "is100Coverage", "indexName"]); // ignore landing pages if keyword is passed


  var pageId = lp || PageId;
  return {
    Keyword: lpurl || pageId ? '' : keyword,
    SortBy: sort,
    PageNo: pg ? Number(pg) : undefined,
    MaxPerPage: mpp ? Number(mpp) : undefined,
    PageId: pageId ? Number(pageId) : undefined,
    CustomUrl: lpurl,
    SearchWithin: searchWithin,
    Is100CoverageTurnedOn: is100Coverage ? Boolean(is100Coverage) : undefined,
    FacetSelections: facetSelections,
    IndexName: indexName
  };
}
function checkIfUrlRefsLandingPage(path, searchUrl) {
  if (!path) {
    // if there's no path, this request can't be for a landing page
    return false;
  }

  if (!path.endsWith('/')) {
    path = path + '/';
  }

  if (!searchUrl.endsWith('/')) {
    searchUrl = searchUrl + '/';
  }

  return path !== searchUrl;
}
/**
 * Converts a search query object (such as one returned from `parseSearchQueryString`) and converts
 * it into a browser query string
 * @param queryObj The query object to convert to a query string.
 */

function convertObjectToQueryString(queryObj) {
  var queryStringValues = [];

  for (var _key in queryObj) {
    if (queryObj.hasOwnProperty(_key)) {
      if (_key === 'keyword' || _key === 'sort' || _key === 'pg' || _key === 'mpp' || _key === 'searchWithin' || _key === 'is100Coverage' || _key === 'indexName') {
        var value = queryObj[_key];

        if (value === undefined || value === null) {
          // if any of the special keys just aren't defined or are null, don't include them in
          // the query string
          continue;
        }

        if (typeof value !== 'string') {
          throw new Error("".concat(_key, " must be a string"));
        } // certain strings are special and are never arrays


        queryStringValues.push(_key + '=' + value);
      } else {
        var values = queryObj[_key]; // handle comma escaping - if any of the values contains a comma, they need to be escaped first

        var escapedValues = [];

        var _iterator = _createForOfIteratorHelper$2(values),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var unescapedValue = _step.value;
            escapedValues.push(unescapedValue.replace(',', '::'));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        queryStringValues.push(_key + '=' + escapedValues.join(','));
      }
    }
  }

  return '?' + queryStringValues.join('&');
}
/**
 * Converts a partial search request object into a browser query string.
 * @param searchRequest The search request object to convert.
 */


function getSearchQueryString(searchRequest) {
  var searchQuery = _objectSpread$6({
    keyword: searchRequest.Keyword,
    sort: searchRequest.SortBy,
    pg: searchRequest.PageNo ? String(searchRequest.PageNo) : undefined,
    mpp: searchRequest.MaxPerPage ? String(searchRequest.MaxPerPage) : undefined,
    is100Coverage: searchRequest.Is100CoverageTurnedOn ? String(searchRequest.Is100CoverageTurnedOn) : undefined,
    searchWithin: searchRequest.SearchWithin,
    indexName: searchRequest.IndexName
  }, searchRequest.FacetSelections);

  return convertObjectToQueryString(searchQuery);
}

var doSearch = true;

function QueryStringListener() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store,
      actor = _useHawkSearch.actor;

  useEffect(function () {
    // listen to history so that when we navigate backward/forward, trigger a new search based off
    // the new query string
    var unlisten = history.listen(function (location) {
      if (!doSearch) {
        // if the previous history change specified that we shouldn't do a search, clear the flag and bail
        doSearch = true;
        return;
      }

      var searchRequest = parseSearchQueryString(location.search);
      actor.setSearch(searchRequest, // explicitly flag this next search as not needing to push additional history, since this search
      // _is_ the result of history.

      /*doHistory*/
      false);
    });
    return function () {
      unlisten();
    };
  });
  useEffect(function () {
    // listen to changes in the pending search so that history records can be pushed to the browser's
    // query string
    if (store.doHistory) {
      // if we're pushing history, we don't want to to trigger a search as a result of this history
      // change
      doSearch = false;
      history.push({
        search: getSearchQueryString(store.pendingSearch)
      });
    }
  }, [store.pendingSearch]); // Extract access token and refresh token from query string on load

  useEffect(function () {
    var params = new URLSearchParams(location.search);
    AuthToken$1.setTokens(params.get('token') || '', (params.get('refreshToken') || '').replace(/ /g, '+') || '');
  }, []);
  return null;
}

function RedirectURLListener() {
  var _useHawkSearch = useHawkSearch(),
      store = _useHawkSearch.store;

  useEffect(function () {
    if (store.searchResults && store.searchResults.Redirect.Location) {
      // NOTE: This will redirect the parent window to the given URL
      window.top.location.href = store.searchResults.Redirect.Location;
    }
  }, [store.searchResults]);
  return null;
}

export { AuthToken$1 as AuthToken, Checkbox, ConfigProvider, ContentType, Facet$1 as Facet, FacetList, FacetRail, FacetSelectionState, FacetType, GlobalSearchBox, HawkSearch, Link, Nested as NestedCheckbox, OpenRange, Pagination$1 as Pagination, PlaceholderItem, QueryStringListener, RedirectURLListener, ResultImage, ResultListing, Results, RuleOperatorType, RuleType, Search, SearchBox, SearchResultsLabel, Selections$1 as Selections, Slider, Sorting$1 as Sorting, Spinner, StoreProvider, Suggestion, SuggestionType, Swatch$1 as Swatch, SwatchItem, ToolRow, checkIfUrlRefsLandingPage, createGuid, getCookie, getSearchQueryString, getVisitExpiry, getVisitorExpiry, parseLocation, parseSearchQueryString, setCookie, i18next as tConfig, useFacet, useHawkSearch };
//# sourceMappingURL=react-hawksearch.js.map
