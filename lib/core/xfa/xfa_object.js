/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XmlObject = exports.XFAObjectArray = exports.XFAObject = exports.XFAAttribute = exports.StringObject = exports.OptionObject = exports.Option10 = exports.Option01 = exports.IntegerObject = exports.ContentObject = exports.$uid = exports.$toStyle = exports.$toHTML = exports.$text = exports.$setValue = exports.$setSetAttributes = exports.$setId = exports.$resolvePrototypes = exports.$removeChild = exports.$onText = exports.$onChildCheck = exports.$onChild = exports.$nsAttributes = exports.$nodeName = exports.$namespaceId = exports.$isTransparent = exports.$isDescendent = exports.$isDataValue = exports.$insertAt = exports.$indexOf = exports.$hasSettableValue = exports.$hasItem = exports.$global = exports.$getRealChildrenByNameIt = exports.$getParent = exports.$getChildrenByNameIt = exports.$getChildrenByName = exports.$getChildrenByClass = exports.$getChildren = exports.$getAttributeIt = exports.$finalize = exports.$extra = exports.$dump = exports.$data = exports.$content = exports.$consumed = exports.$clone = exports.$cleanup = exports.$clean = exports.$childrenToHTML = exports.$appendChild = exports.$acceptWhitespace = void 0;

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

var _namespaces = require("./namespaces.js");

const $acceptWhitespace = Symbol();
exports.$acceptWhitespace = $acceptWhitespace;
const $appendChild = Symbol();
exports.$appendChild = $appendChild;
const $childrenToHTML = Symbol();
exports.$childrenToHTML = $childrenToHTML;
const $clean = Symbol();
exports.$clean = $clean;
const $cleanup = Symbol();
exports.$cleanup = $cleanup;
const $clone = Symbol();
exports.$clone = $clone;
const $consumed = Symbol();
exports.$consumed = $consumed;
const $content = Symbol("content");
exports.$content = $content;
const $data = Symbol("data");
exports.$data = $data;
const $dump = Symbol();
exports.$dump = $dump;
const $extra = Symbol("extra");
exports.$extra = $extra;
const $finalize = Symbol();
exports.$finalize = $finalize;
const $getAttributeIt = Symbol();
exports.$getAttributeIt = $getAttributeIt;
const $getChildrenByClass = Symbol();
exports.$getChildrenByClass = $getChildrenByClass;
const $getChildrenByName = Symbol();
exports.$getChildrenByName = $getChildrenByName;
const $getChildrenByNameIt = Symbol();
exports.$getChildrenByNameIt = $getChildrenByNameIt;
const $getRealChildrenByNameIt = Symbol();
exports.$getRealChildrenByNameIt = $getRealChildrenByNameIt;
const $getChildren = Symbol();
exports.$getChildren = $getChildren;
const $getParent = Symbol();
exports.$getParent = $getParent;
const $global = Symbol();
exports.$global = $global;
const $hasItem = Symbol();
exports.$hasItem = $hasItem;
const $hasSettableValue = Symbol();
exports.$hasSettableValue = $hasSettableValue;
const $indexOf = Symbol();
exports.$indexOf = $indexOf;
const $insertAt = Symbol();
exports.$insertAt = $insertAt;
const $isDataValue = Symbol();
exports.$isDataValue = $isDataValue;
const $isDescendent = Symbol();
exports.$isDescendent = $isDescendent;
const $isTransparent = Symbol();
exports.$isTransparent = $isTransparent;
const $lastAttribute = Symbol();
const $namespaceId = Symbol("namespaceId");
exports.$namespaceId = $namespaceId;
const $nodeName = Symbol("nodeName");
exports.$nodeName = $nodeName;
const $nsAttributes = Symbol();
exports.$nsAttributes = $nsAttributes;
const $onChild = Symbol();
exports.$onChild = $onChild;
const $onChildCheck = Symbol();
exports.$onChildCheck = $onChildCheck;
const $onText = Symbol();
exports.$onText = $onText;
const $removeChild = Symbol();
exports.$removeChild = $removeChild;
const $resolvePrototypes = Symbol();
exports.$resolvePrototypes = $resolvePrototypes;
const $setId = Symbol();
exports.$setId = $setId;
const $setSetAttributes = Symbol();
exports.$setSetAttributes = $setSetAttributes;
const $setValue = Symbol();
exports.$setValue = $setValue;
const $text = Symbol();
exports.$text = $text;
const $toHTML = Symbol();
exports.$toHTML = $toHTML;
const $toStyle = Symbol();
exports.$toStyle = $toStyle;
const $uid = Symbol("uid");
exports.$uid = $uid;

const _applyPrototype = Symbol();

const _attributes = Symbol();

const _attributeNames = Symbol();

const _children = Symbol("_children");

const _cloneAttribute = Symbol();

const _dataValue = Symbol();

const _defaultValue = Symbol();

const _getPrototype = Symbol();

const _getUnsetAttributes = Symbol();

const _hasChildren = Symbol();

const _max = Symbol();

const _options = Symbol();

const _parent = Symbol("parent");

const _setAttributes = Symbol();

const _validator = Symbol();

let uid = 0;

class XFAObject {
  constructor(nsId, name, hasChildren = false) {
    this[$namespaceId] = nsId;
    this[$nodeName] = name;
    this[_hasChildren] = hasChildren;
    this[_parent] = null;
    this[_children] = [];
    this[$uid] = `${name}${uid++}`;
  }

  [$onChild](child) {
    if (!this[_hasChildren] || !this[$onChildCheck](child)) {
      return false;
    }

    const name = child[$nodeName];
    const node = this[name];

    if (node instanceof XFAObjectArray) {
      if (node.push(child)) {
        this[$appendChild](child);
        return true;
      }
    } else {
      if (node !== null) {
        this[$removeChild](node);
      }

      this[name] = child;
      this[$appendChild](child);
      return true;
    }

    let id = "";

    if (this.id) {
      id = ` (id: ${this.id})`;
    } else if (this.name) {
      id = ` (name: ${this.name} ${this.h.value})`;
    }

    (0, _util.warn)(`XFA - node "${this[$nodeName]}"${id} has already enough "${name}"!`);
    return false;
  }

  [$onChildCheck](child) {
    return this.hasOwnProperty(child[$nodeName]) && child[$namespaceId] === this[$namespaceId];
  }

  [$acceptWhitespace]() {
    return false;
  }

  [$setId](ids) {
    if (this.id && this[$namespaceId] === _namespaces.NamespaceIds.template.id) {
      ids.set(this.id, this);
    }
  }

  [$appendChild](child) {
    child[_parent] = this;

    this[_children].push(child);
  }

  [$removeChild](child) {
    const i = this[_children].indexOf(child);

    this[_children].splice(i, 1);
  }

  [$hasSettableValue]() {
    return this.hasOwnProperty("value");
  }

  [$setValue](_) {}

  [$onText](_) {}

  [$finalize]() {}

  [$clean](builder) {
    delete this[_hasChildren];

    if (this[$cleanup]) {
      builder.clean(this[$cleanup]);
      delete this[$cleanup];
    }
  }

  [$hasItem]() {
    return false;
  }

  [$indexOf](child) {
    return this[_children].indexOf(child);
  }

  [$insertAt](i, child) {
    child[_parent] = this;

    this[_children].splice(i, 0, child);
  }

  [$isTransparent]() {
    return this.name === "";
  }

  [$lastAttribute]() {
    return "";
  }

  [$text]() {
    if (this[_children].length === 0) {
      return this[$content];
    }

    return this[_children].map(c => c[$text]()).join("");
  }

  get [_attributeNames]() {
    const proto = Object.getPrototypeOf(this);

    if (!proto._attributes) {
      const attributes = proto._attributes = new Set();

      for (const name of Object.getOwnPropertyNames(this)) {
        if (this[name] === null || this[name] instanceof XFAObject || this[name] instanceof XFAObjectArray) {
          break;
        }

        attributes.add(name);
      }
    }

    return (0, _util.shadow)(this, _attributeNames, proto._attributes);
  }

  [$isDescendent](parent) {
    let node = this;

    while (node) {
      if (node === parent) {
        return true;
      }

      node = node[$getParent]();
    }

    return false;
  }

  [$getParent]() {
    return this[_parent];
  }

  [$getChildren](name = null) {
    if (!name) {
      return this[_children];
    }

    return this[name];
  }

  [$dump]() {
    const dumped = Object.create(null);

    if (this[$content]) {
      dumped.$content = this[$content];
    }

    for (const name of Object.getOwnPropertyNames(this)) {
      const value = this[name];

      if (value === null) {
        continue;
      }

      if (value instanceof XFAObject) {
        dumped[name] = value[$dump]();
      } else if (value instanceof XFAObjectArray) {
        if (!value.isEmpty()) {
          dumped[name] = value.dump();
        }
      } else {
        dumped[name] = value;
      }
    }

    return dumped;
  }

  [$toStyle]() {
    return null;
  }

  [$toHTML]() {
    return null;
  }

  [$childrenToHTML]({
    filter = null,
    include = true
  }) {
    const res = [];
    this[$getChildren]().forEach(node => {
      if (!filter || include === filter.has(node[$nodeName])) {
        const html = node[$toHTML]();

        if (html) {
          res.push(html);
        }
      }
    });
    return res;
  }

  [$setSetAttributes](attributes) {
    if (attributes.use || attributes.id) {
      this[_setAttributes] = new Set(Object.keys(attributes));
    }
  }

  [_getUnsetAttributes](protoAttributes) {
    const allAttr = this[_attributeNames];
    const setAttr = this[_setAttributes];
    return [...protoAttributes].filter(x => allAttr.has(x) && !setAttr.has(x));
  }

  [$resolvePrototypes](ids, ancestors = new Set()) {
    for (const child of this[_children]) {
      const proto = child[_getPrototype](ids, ancestors);

      if (proto) {
        child[_applyPrototype](proto, ids, ancestors);
      } else {
        child[$resolvePrototypes](ids, ancestors);
      }
    }
  }

  [_getPrototype](ids, ancestors) {
    const {
      use
    } = this;

    if (use && use.startsWith("#")) {
      const id = use.slice(1);
      const proto = ids.get(id);
      this.use = "";

      if (!proto) {
        (0, _util.warn)(`XFA - Invalid prototype id: ${id}.`);
        return null;
      }

      if (proto[$nodeName] !== this[$nodeName]) {
        (0, _util.warn)(`XFA - Incompatible prototype: ${proto[$nodeName]} !== ${this[$nodeName]}.`);
        return null;
      }

      if (ancestors.has(proto)) {
        (0, _util.warn)(`XFA - Cycle detected in prototypes use.`);
        return null;
      }

      ancestors.add(proto);

      const protoProto = proto[_getPrototype](ids, ancestors);

      if (!protoProto) {
        ancestors.delete(proto);
        return proto;
      }

      proto[_applyPrototype](protoProto, ids, ancestors);

      ancestors.delete(proto);
      return proto;
    }

    return null;
  }

  [_applyPrototype](proto, ids, ancestors) {
    if (ancestors.has(proto)) {
      (0, _util.warn)(`XFA - Cycle detected in prototypes use.`);
      return;
    }

    if (!this[$content] && proto[$content]) {
      this[$content] = proto[$content];
    }

    const newAncestors = new Set(ancestors);
    newAncestors.add(proto);

    for (const unsetAttrName of this[_getUnsetAttributes](proto[_setAttributes])) {
      this[unsetAttrName] = proto[unsetAttrName];

      if (this[_setAttributes]) {
        this[_setAttributes].add(unsetAttrName);
      }
    }

    for (const name of Object.getOwnPropertyNames(this)) {
      if (this[_attributeNames].has(name)) {
        continue;
      }

      const value = this[name];
      const protoValue = proto[name];

      if (value instanceof XFAObjectArray) {
        for (const child of value[_children]) {
          child[$resolvePrototypes](ids, ancestors);
        }

        for (let i = value[_children].length, ii = protoValue[_children].length; i < ii; i++) {
          const child = proto[_children][i][$clone]();

          if (value.push(child)) {
            child[_parent] = this;

            this[_children].push(child);

            child[$resolvePrototypes](ids, newAncestors);
          } else {
            break;
          }
        }

        continue;
      }

      if (value !== null) {
        value[$resolvePrototypes](ids, ancestors);
        continue;
      }

      if (protoValue !== null) {
        const child = protoValue[$clone]();
        child[_parent] = this;
        this[name] = child;

        this[_children].push(child);

        child[$resolvePrototypes](ids, newAncestors);
      }
    }
  }

  static [_cloneAttribute](obj) {
    if (Array.isArray(obj)) {
      return obj.map(x => XFAObject[_cloneAttribute](x));
    }

    if (obj instanceof Object) {
      return Object.assign({}, obj);
    }

    return obj;
  }

  [$clone]() {
    const clone = Object.create(Object.getPrototypeOf(this));

    for (const $symbol of Object.getOwnPropertySymbols(this)) {
      try {
        clone[$symbol] = this[$symbol];
      } catch (_) {
        (0, _util.shadow)(clone, $symbol, this[$symbol]);
      }
    }

    clone[_children] = [];

    for (const name of Object.getOwnPropertyNames(this)) {
      if (this[_attributeNames].has(name)) {
        clone[name] = XFAObject[_cloneAttribute](this[name]);
        continue;
      }

      const value = this[name];

      if (value instanceof XFAObjectArray) {
        clone[name] = new XFAObjectArray(value[_max]);
      } else {
        clone[name] = null;
      }
    }

    for (const child of this[_children]) {
      const name = child[$nodeName];
      const clonedChild = child[$clone]();

      clone[_children].push(clonedChild);

      clonedChild[_parent] = clone;

      if (clone[name] === null) {
        clone[name] = clonedChild;
      } else {
        clone[name][_children].push(clonedChild);
      }
    }

    return clone;
  }

  [$getChildren](name = null) {
    if (!name) {
      return this[_children];
    }

    return this[_children].filter(c => c[$nodeName] === name);
  }

  [$getChildrenByClass](name) {
    return this[name];
  }

  [$getChildrenByName](name, allTransparent, first = true) {
    return Array.from(this[$getChildrenByNameIt](name, allTransparent, first));
  }

  *[$getChildrenByNameIt](name, allTransparent, first = true) {
    if (name === "parent") {
      yield this[_parent];
      return;
    }

    for (const child of this[_children]) {
      if (child[$nodeName] === name) {
        yield child;
      }

      if (child.name === name) {
        yield child;
      }

      if (allTransparent || child[$isTransparent]()) {
        yield* child[$getChildrenByNameIt](name, allTransparent, false);
      }
    }

    if (first && this[_attributeNames].has(name)) {
      yield new XFAAttribute(this, name, this[name]);
    }
  }

}

exports.XFAObject = XFAObject;

class XFAObjectArray {
  constructor(max = Infinity) {
    this[_max] = max;
    this[_children] = [];
  }

  push(child) {
    const len = this[_children].length;

    if (len <= this[_max]) {
      this[_children].push(child);

      return true;
    }

    (0, _util.warn)(`XFA - node "${child[$nodeName]}" accepts no more than ${this[_max]} children`);
    return false;
  }

  isEmpty() {
    return this[_children].length === 0;
  }

  dump() {
    return this[_children].length === 1 ? this[_children][0][$dump]() : this[_children].map(x => x[$dump]());
  }

  [$clone]() {
    const clone = new XFAObjectArray(this[_max]);
    clone[_children] = this[_children].map(c => c[$clone]());
    return clone;
  }

  get children() {
    return this[_children];
  }

  clear() {
    this[_children].length = 0;
  }

}

exports.XFAObjectArray = XFAObjectArray;

class XFAAttribute {
  constructor(node, name, value) {
    this[_parent] = node;
    this[$nodeName] = name;
    this[$content] = value;
    this[$consumed] = false;
  }

  [$getParent]() {
    return this[_parent];
  }

  [$isDataValue]() {
    return true;
  }

  [$text]() {
    return this[$content];
  }

  [$isDescendent](parent) {
    return this[_parent] === parent || this[_parent][$isDescendent](parent);
  }

}

exports.XFAAttribute = XFAAttribute;

class XmlObject extends XFAObject {
  constructor(nsId, name, attributes = {}) {
    super(nsId, name);
    this[$content] = "";
    this[_dataValue] = null;

    if (name !== "#text") {
      const map = new Map();
      this[_attributes] = map;

      for (const [attrName, value] of Object.entries(attributes)) {
        map.set(attrName, new XFAAttribute(this, attrName, value));
      }

      if (attributes.hasOwnProperty($nsAttributes)) {
        const dataNode = attributes[$nsAttributes].xfa.dataNode;

        if (dataNode !== undefined) {
          if (dataNode === "dataGroup") {
            this[_dataValue] = false;
          } else if (dataNode === "dataValue") {
            this[_dataValue] = true;
          }
        }
      }
    }

    this[$consumed] = false;
  }

  [$onChild](child) {
    if (this[$content]) {
      const node = new XmlObject(this[$namespaceId], "#text");
      this[$appendChild](node);
      node[$content] = this[$content];
      this[$content] = "";
    }

    this[$appendChild](child);
    return true;
  }

  [$onText](str) {
    this[$content] += str;
  }

  [$finalize]() {
    if (this[$content] && this[_children].length > 0) {
      const node = new XmlObject(this[$namespaceId], "#text");
      this[$appendChild](node);
      node[$content] = this[$content];
      delete this[$content];
    }
  }

  [$toHTML]() {
    if (this[$nodeName] === "#text") {
      return {
        name: "#text",
        value: this[$content]
      };
    }

    return null;
  }

  [$getChildren](name = null) {
    if (!name) {
      return this[_children];
    }

    return this[_children].filter(c => c[$nodeName] === name);
  }

  [$getChildrenByClass](name) {
    const value = this[_attributes].get(name);

    if (value !== undefined) {
      return value;
    }

    return this[$getChildren](name);
  }

  *[$getChildrenByNameIt](name, allTransparent) {
    const value = this[_attributes].get(name);

    if (value) {
      yield value;
    }

    for (const child of this[_children]) {
      if (child[$nodeName] === name) {
        yield child;
      }

      if (allTransparent) {
        yield* child[$getChildrenByNameIt](name, allTransparent);
      }
    }
  }

  *[$getAttributeIt](name, skipConsumed) {
    const value = this[_attributes].get(name);

    if (value && (!skipConsumed || !value[$consumed])) {
      yield value;
    }

    for (const child of this[_children]) {
      yield* child[$getAttributeIt](name, skipConsumed);
    }
  }

  *[$getRealChildrenByNameIt](name, allTransparent, skipConsumed) {
    for (const child of this[_children]) {
      if (child[$nodeName] === name && (!skipConsumed || !child[$consumed])) {
        yield child;
      }

      if (allTransparent) {
        yield* child[$getRealChildrenByNameIt](name, allTransparent, skipConsumed);
      }
    }
  }

  [$isDataValue]() {
    if (this[_dataValue] === null) {
      return this[_children].length === 0;
    }

    return this[_dataValue];
  }

  [$dump]() {
    const dumped = Object.create(null);

    if (this[$content]) {
      dumped.$content = this[$content];
    }

    dumped.$name = this[$nodeName];
    dumped.children = [];

    for (const child of this[_children]) {
      dumped.children.push(child[$dump]());
    }

    dumped.attributes = Object.create(null);

    for (const [name, value] of this[_attributes]) {
      dumped.attributes[name] = value[$content];
    }

    return dumped;
  }

}

exports.XmlObject = XmlObject;

class ContentObject extends XFAObject {
  constructor(nsId, name) {
    super(nsId, name);
    this[$content] = "";
  }

  [$onText](text) {
    this[$content] += text;
  }

  [$finalize]() {}

}

exports.ContentObject = ContentObject;

class OptionObject extends ContentObject {
  constructor(nsId, name, options) {
    super(nsId, name);
    this[_options] = options;
  }

  [$finalize]() {
    this[$content] = (0, _utils.getKeyword)({
      data: this[$content],
      defaultValue: this[_options][0],
      validate: k => this[_options].includes(k)
    });
  }

  [$clean](builder) {
    super[$clean](builder);
    delete this[_options];
  }

}

exports.OptionObject = OptionObject;

class StringObject extends ContentObject {
  [$finalize]() {
    this[$content] = this[$content].trim();
  }

}

exports.StringObject = StringObject;

class IntegerObject extends ContentObject {
  constructor(nsId, name, defaultValue, validator) {
    super(nsId, name);
    this[_defaultValue] = defaultValue;
    this[_validator] = validator;
  }

  [$finalize]() {
    this[$content] = (0, _utils.getInteger)({
      data: this[$content],
      defaultValue: this[_defaultValue],
      validate: this[_validator]
    });
  }

  [$clean](builder) {
    super[$clean](builder);
    delete this[_defaultValue];
    delete this[_validator];
  }

}

exports.IntegerObject = IntegerObject;

class Option01 extends IntegerObject {
  constructor(nsId, name) {
    super(nsId, name, 0, n => n === 1);
  }

}

exports.Option01 = Option01;

class Option10 extends IntegerObject {
  constructor(nsId, name) {
    super(nsId, name, 1, n => n === 0);
  }

}

exports.Option10 = Option10;