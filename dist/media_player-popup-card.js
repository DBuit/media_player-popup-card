/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},i={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,c=new RegExp(`${o}|${a}`);class l{constructor(t,e){this.parts=[],this.element=e;const s=[],n=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,a=-1,l=0;const{strings:h,values:{length:m}}=t;for(;l<m;){const t=i.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let n=0;for(let t=0;t<s;t++)d(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=h[l],s=p.exec(e)[2],n=s.toLowerCase()+"$lit$",i=t.getAttribute(n);t.removeAttribute(n);const r=i.split(c);this.parts.push({type:"attribute",index:a,name:s,strings:r}),l+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const n=t.parentNode,i=e.split(c),r=i.length-1;for(let e=0;e<r;e++){let s,r=i[e];if(""===r)s=u();else{const t=p.exec(r);null!==t&&d(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(r)}n.insertBefore(s,t),this.parts.push({type:"node",index:++a})}""===i[r]?(n.insertBefore(u(),t),s.push(t)):t.data=i[r],l+=r}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&a!==r||(a++,e.insertBefore(u(),t)),r=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(s.push(t),a--),l++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),l++}}else i.currentNode=n.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},h=t=>-1!==t.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class m{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,c=i.nextNode();for(;o<n.length;)if(r=n[o],h(r)){for(;a<r.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),i.currentNode=c.content),null===(c=i.nextNode())&&(i.currentNode=e.pop(),c=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const f=` ${o} `;class g{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let n=0;n<t;n++){const t=this.strings[n],i=t.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===t.indexOf("--\x3e",i+1);const r=p.exec(t);e+=null===r?t+(s?f:a):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+o}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const y=t=>null===t||!("object"==typeof t||"function"==typeof t),_=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class v{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(y(t)||!_(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===i||y(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=i,t(this)}this.value!==i&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}const t=this.__pendingValue;t!==i&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof g?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):_(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),n=s._clone();s.update(t.values),this.__commitNode(n),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const i of t)s=e[n],void 0===s&&(s=new w(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=i}}class x extends v{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends b{}let P=!1;try{const t={get capture(){return P=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class N{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=this.__pendingValue,s=this.value,n=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),r=null!=t&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=E(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=i}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(P?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;const M=new class{handleAttributeExpressions(t,e,s,n){const i=e[0];if("."===i){return new x(t,e.slice(1),s).parts}return"@"===i?[new N(t,e.slice(1),n.eventContext)]:"?"===i?[new S(t,e.slice(1),s)]:new v(t,e,s).parts}handleTextExpression(t){return new w(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function k(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(o);return s=e.keyString.get(n),void 0===s&&(s=new l(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const $=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const O=(t,...e)=>new g(t,e,"html",M)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function A(t,e){const{element:{content:s},parts:n}=t,i=document.createTreeWalker(s,133,null,!1);let r=R(n),o=n[r],a=-1,c=0;const l=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(l.push(t),null===d&&(d=t)),null!==d&&c++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-c,r=R(n,r),o=n[r]}l.forEach(t=>t.parentNode.removeChild(t))}const D=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},R=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(h(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const V=(t,e)=>`${t}--${e}`;let Y=!0;void 0===window.ShadyCSS?Y=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Y=!1);const j=t=>e=>{const s=V(e.type,t);let n=$.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},$.set(s,n));let i=n.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(o);if(i=n.keyString.get(r),void 0===i){const s=e.getTemplateElement();Y&&window.ShadyCSS.prepareTemplateDom(s,t),i=new l(e,s),n.keyString.set(r,i)}return n.stringsArray.set(e.strings,i),i},H=["html","svg"],F=new Set,q=(t,e,s)=>{F.add(t);const n=s?s.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:r}=i;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=i[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{H.forEach(e=>{const s=$.get(V(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),A(t,s)})})})(t);const a=n.content;s?function(t,e,s=null){const{element:{content:n},parts:i}=t;if(null==s)return void n.appendChild(e);const r=document.createTreeWalker(n,133,null,!1);let o=R(i),a=0,c=-1;for(;r.nextNode();){for(c++,r.currentNode===s&&(a=D(e),s.parentNode.insertBefore(e,s));-1!==o&&i[o].index===c;){if(a>0){for(;-1!==o;)i[o].index+=a,o=R(i,o);return}o=R(i,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),A(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const z={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},U=(t,e)=>e!==t&&(e==e||t==t),I={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:U},L=Promise.resolve(!0);class B extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=L,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const n=this._attributeNameForProperty(s,e);void 0!==n&&(this._attributeToPropertyMap.set(n,s),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=I){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const n=this[t];this[s]=e,this._requestUpdate(t,n)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=U){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,n=e.converter||z,i="function"==typeof n?n:n.fromAttribute;return i?i(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,n=e.converter;return(n&&n.toAttribute||z.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=32|this._updateState,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=I){const n=this.constructor,i=n._attributeNameForProperty(t,s);if(void 0!==i){const t=n._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,n=s._attributeToPropertyMap.get(t);if(void 0!==n){const t=s._classProperties.get(n)||I;this._updateState=16|this._updateState,this[n]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const n=this.constructor,i=n._classProperties.get(t)||I;n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=4|this._updateState;const s=this._updatePromise;this._updatePromise=new Promise((s,n)=>{t=s,e=n});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return 32&this._updateState}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}B.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const W="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol();class Z{constructor(t,e){if(e!==J)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(W?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const G=(t,...e)=>{const s=e.reduce((e,s,n)=>e+(t=>{if(t instanceof Z)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[n+1],t[0]);return new Z(s,J)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const K=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let n=0,i=e.length;n<i;n++){const i=e[n];Array.isArray(i)?t(i,s):s.push(i)}return s}(t);class Q extends B{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){K(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?W?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof g&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}function X(t,e,s=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},s)s.dispatchEvent(t);else{var n=function(){var t=document.querySelector("hc-main");return t=t?(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("hc-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-view"):(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=document.querySelector("home-assistant"))&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root"))&&t.shadowRoot)&&t.querySelector("ha-app-layout #view"))&&t.firstElementChild}();n&&n.dispatchEvent(t)}}Q.finalized=!0,Q.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,r=T.has(e),o=Y&&11===e.nodeType&&!!e.host,a=o&&!F.has(i),c=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=T.get(e);void 0===i&&(n(e,e.firstChild),T.set(e,i=new w(Object.assign({templateFactory:k},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,c,Object.assign({templateFactory:j(i)},s)),a){const t=T.get(c);T.delete(c);const s=t.value instanceof m?t.value.template:void 0;q(i,c,s),n(e,e.firstChild),e.appendChild(c),T.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)};const tt=customElements.get("home-assistant-main")?Object.getPrototypeOf(customElements.get("home-assistant-main")):Object.getPrototypeOf(customElements.get("hui-view")),et=tt.prototype.html;tt.prototype.css;function st(t,e){const s=document.createElement("hui-error-card");return s.setConfig({type:"error",error:t,origConfig:e}),s}function nt(t,e){if(!e||"object"!=typeof e||!e.type)return st(`No ${t} type configured`,e);let s=e.type;if(s=s.startsWith("custom:")?s.substr("custom:".length):`hui-${s}-${t}`,customElements.get(s))return function(t,e){const s=document.createElement(t);try{s.setConfig({...e})}catch(t){return st(t,e)}return s}(s,e);const n=st(`Custom element doesn't exist: ${s}.`,e);n.style.display="None";const i=setTimeout(()=>{n.style.display=""},2e3);return customElements.whenDefined(s).then(()=>{clearTimeout(i),X("ll-rebuild",{},n)}),n}class it extends tt{static get version(){return 2}static get properties(){return{noHass:{type:Boolean}}}setConfig(t){var e;this._config=t,this.el?this.el.setConfig(t):(this.el=this.create(t),this._hass&&(this.el.hass=this._hass),this.noHass&&(e=this,document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")&&document.querySelector("home-assistant").provideHass(e)))}set config(t){this.setConfig(t)}set hass(t){this._hass=t,this.el&&(this.el.hass=t)}createRenderRoot(){return this}render(){return et`${this.el}`}}const rt=function(t,e){const s=Object.getOwnPropertyDescriptors(e.prototype);for(const[e,n]of Object.entries(s))"constructor"!==e&&Object.defineProperty(t.prototype,e,n);const n=Object.getOwnPropertyDescriptors(e);for(const[e,s]of Object.entries(n))"prototype"!==e&&Object.defineProperty(t,e,s);const i=Object.getPrototypeOf(e),r=Object.getOwnPropertyDescriptors(i.prototype);for(const[e,s]of Object.entries(r))"constructor"!==e&&Object.defineProperty(Object.getPrototypeOf(t).prototype,e,s);const o=Object.getOwnPropertyDescriptors(i);for(const[e,s]of Object.entries(o))"prototype"!==e&&Object.defineProperty(Object.getPrototypeOf(t),e,s)},ot=customElements.get("card-maker");if(!ot||!ot.version||ot.version<2){class t extends it{create(t){return function(t){return nt("card",t)}(t)}getCardSize(){return this.firstElementChild&&this.firstElementChild.getCardSize?this.firstElementChild.getCardSize():1}}ot?rt(ot,t):customElements.define("card-maker",t)}const at=customElements.get("element-maker");if(!at||!at.version||at.version<2){class t extends it{create(t){return function(t){return nt("element",t)}(t)}}at?rt(at,t):customElements.define("element-maker",t)}const ct=customElements.get("entity-row-maker");if(!ct||!ct.version||ct.version<2){class t extends it{create(t){return function(t){const e=new Set(["call-service","cast","conditional","divider","section","select","weblink"]);if(!t)return st("Invalid configuration given.",t);if("string"==typeof t&&(t={entity:t}),"object"!=typeof t||!t.entity&&!t.type)return st("Invalid configuration given.",t);const s=t.type||"default";return e.has(s)||s.startsWith("custom:")?nt("row",t):nt("entity-row",{type:{alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"}[t.entity.split(".",1)[0]]||"text",...t})}(t)}}ct?rt(ct,t):customElements.define("entity-row-maker",t)}var lt={},dt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ht="[^\\s]+",ut=/\[([^]*?)\]/gm,pt=function(){};function mt(t,e){for(var s=[],n=0,i=t.length;n<i;n++)s.push(t[n].substr(0,e));return s}function ft(t){return function(e,s,n){var i=n[t].indexOf(s.charAt(0).toUpperCase()+s.substr(1).toLowerCase());~i&&(e.month=i)}}function gt(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var yt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["January","February","March","April","May","June","July","August","September","October","November","December"],vt=mt(_t,3),bt=mt(yt,3);lt.i18n={dayNamesShort:bt,dayNames:yt,monthNamesShort:vt,monthNames:_t,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var wt={D:function(t){return t.getDate()},DD:function(t){return gt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return gt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return gt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return gt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return gt(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return gt(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return gt(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return gt(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return gt(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return gt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return gt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+gt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},St={D:["\\d\\d?",function(t,e){t.day=e}],Do:["\\d\\d?"+ht,function(t,e){t.day=parseInt(e,10)}],M:["\\d\\d?",function(t,e){t.month=e-1}],YY:["\\d\\d?",function(t,e){var s=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?s-1:s)+e}],h:["\\d\\d?",function(t,e){t.hour=e}],m:["\\d\\d?",function(t,e){t.minute=e}],s:["\\d\\d?",function(t,e){t.second=e}],YYYY:["\\d{4}",function(t,e){t.year=e}],S:["\\d",function(t,e){t.millisecond=100*e}],SS:["\\d{2}",function(t,e){t.millisecond=10*e}],SSS:["\\d{3}",function(t,e){t.millisecond=e}],d:["\\d\\d?",pt],ddd:[ht,pt],MMM:[ht,ft("monthNamesShort")],MMMM:[ht,ft("monthNames")],a:[ht,function(t,e,s){var n=e.toLowerCase();n===s.amPm[0]?t.isPm=!1:n===s.amPm[1]&&(t.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(t,e){var s,n=(e+"").match(/([+-]|\d\d)/gi);n&&(s=60*n[1]+parseInt(n[2],10),t.timezoneOffset="+"===n[0]?s:-s)}]};St.dd=St.d,St.dddd=St.ddd,St.DD=St.D,St.mm=St.m,St.hh=St.H=St.HH=St.h,St.MM=St.M,St.ss=St.s,St.A=St.a,lt.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},lt.format=function(t,e,s){var n=s||lt.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");e=lt.masks[e]||e||lt.masks.default;var i=[];return(e=(e=e.replace(ut,(function(t,e){return i.push(e),"@@@"}))).replace(dt,(function(e){return e in wt?wt[e](t,n):e.slice(1,e.length-1)}))).replace(/@@@/g,(function(){return i.shift()}))},lt.parse=function(t,e,s){var n=s||lt.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=lt.masks[e]||e,t.length>1e3)return null;var i={},r=[],o=[];e=e.replace(ut,(function(t,e){return o.push(e),"@@@"}));var a,c=(a=e,a.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(dt,(function(t){if(St[t]){var e=St[t];return r.push(e[1]),"("+e[0]+")"}return t}));c=c.replace(/@@@/g,(function(){return o.shift()}));var l=t.match(new RegExp(c,"i"));if(!l)return null;for(var d=1;d<l.length;d++)r[d-1](i,l[d],n);var h,u=new Date;return!0===i.isPm&&null!=i.hour&&12!=+i.hour?i.hour=+i.hour+12:!1===i.isPm&&12==+i.hour&&(i.hour=0),null!=i.timezoneOffset?(i.minute=+(i.minute||0)-+i.timezoneOffset,h=new Date(Date.UTC(i.year||u.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0))):h=new Date(i.year||u.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0),h};var xt=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(t){return lt.format(t,"mediumDate")},Ct=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return lt.format(t,"haDateTime")},Pt=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(t){return lt.format(t,"shortTime")};customElements.define("media_player-popup-card",class extends Q{constructor(){super(),this.actionRows=[],this.settings=!1,this.settingsCustomCard=!1}static get properties(){return{hass:{},config:{},active:{}}}render(){var t=this.config.entity,e=this.hass.states[t],s=this.config.actionsInARow?this.config.actionsInARow:4,n=this.config.icon?this.config.icon:e.attributes.icon?e.attributes.icon:"mdi:speaker",i=this.config.borderRadius?this.config.borderRadius:"12px",r=this.config.actions;if(r&&r.length>0)for(var o=Math.ceil(r.length/s),a=0;a<o;a++){this.actionRows[a]=[];for(var c=0;c<s;c++)r[a*s+c]&&(this.actionRows[a][c]=r[a*s+c])}var l=!("fullscreen"in this.config)||this.config.fullscreen,d=this.config.sliderWidth?this.config.sliderWidth:"150px",h=this.config.sliderHeight?this.config.sliderHeight:"400px",u=0;this.settings="settings"in this.config,this.settingsCustomCard="settingsCard"in this.config;var p="sliderColor"in this.config?this.config.sliderColor:"#FFF",m="sliderThumbColor"in this.config?this.config.sliderThumbColor:"#ddd",f="sliderTrackColor"in this.config?this.config.sliderTrackColor:"#ddd";return O`
      <div class="${!0===l?"popup-wrapper":""}">
        <div id="popup" class="popup-inner" @click="${t=>this._close(t)}">
          <div class="icon${!0===l?" fullscreen":""}${["off","unavailable","paused"].includes(e.state)?"":" on"}">
              <ha-icon icon="${n}" />
          </div>
          <h4 class="${"off"===e.state?"":"brightness"}">${"off"===e.state?function(t,e,s){var n,i=function(t){return function(t){return t.substr(0,t.indexOf("."))}(t.entity_id)}(e);if("binary_sensor"===i)e.attributes.device_class&&(n=t("state."+i+"."+e.attributes.device_class+"."+e.state)),n||(n=t("state."+i+".default."+e.state));else if(e.attributes.unit_of_measurement&&!["unknown","unavailable"].includes(e.state))n=e.state+" "+e.attributes.unit_of_measurement;else if("input_datetime"===i){var r;if(e.attributes.has_time)if(e.attributes.has_date)r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),n=Ct(r,s);else{var o=new Date;r=new Date(o.getFullYear(),o.getMonth(),o.getDay(),e.attributes.hour,e.attributes.minute),n=Pt(r,s)}else r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),n=xt(r,s)}else n="zwave"===i?["initializing","dead"].includes(e.state)?t("state.zwave.query_stage."+e.state,"query_stage",e.attributes.query_stage):t("state.zwave.default."+e.state):t("state."+i+"."+e.state);return n||(n=t("state.default."+e.state)||t("component."+i+".state."+e.state)||e.state),n}(this.hass.localize,e,this.hass.language):Math.round(100*e.attributes.volume_level)}</h4>
          <div class="range-holder" style="--slider-height: ${h};--slider-width: ${d};">
              <input type="range" style="--slider-width: ${d};--slider-height: ${h}; --slider-border-radius: ${i};--slider-color:${p};--slider-thumb-color:${m};--slider-track-color:${f};" .value="${"off"===e.state?0:Math.round(100*e.attributes.volume_level)}" @change=${t=>this._setVolume(e,t.target.value)}>
          </div>

          ${r&&r.length>0?O`
          <div class="action-holder">

              ${this.actionRows.map(t=>{u++;var e=0;return O`
                  <div class="action-row">
                  ${t.map(t=>(e++,O`
                      <div class="action" @click="${t=>this._activateAction(t)}" data-service="${u}#${e}">
                          <span class="color" style="background-color: ${t.color};border-color: ${t.color};">${t.icon?O`<ha-icon icon="${t.icon}" />`:O``}</span>
                          ${t.name?O`<span class="name">${t.name}</span>`:O``}
                      </div>
                    `))}
                  </div>
                `})}
          </div>`:O``}
          ${this.settings?O`<button class="bottom-right-btn" @click="${()=>this._openSettings()}">${this.config.settings.openButton?this.config.settings.openButton:"Settings"}</button>`:O``}
        </div>
        ${this.settings?O`
            <div id="settings" class="${!0===l?" fullscreen":""}">
              <div class="settings-inner" @click="${t=>this._close(t)}">
                ${this.settingsCustomCard?O`
                  <card-maker nohass data-card="${this.config.settingsCard.type}" data-options="${JSON.stringify(this.config.settingsCard.cardOptions)}" data-style="${this.config.settingsCard.cardStyle?this.config.settingsCard.cardStyle:""}">
                  </card-maker>
                `:O`
                    <more-info-controls
                    .dialogElement=${null}
                    .canConfigure=${!1}
                    .hass=${this.hass}
                    .stateObj=${e}
                    style="--paper-slider-knob-color: white !important;
                    --paper-slider-knob-start-color: white !important;
                    --paper-slider-pin-color: white !important;
                    --paper-slider-active-color: white !important;
                    color: white !important;
                    --primary-text-color: white !important;"
                  ></more-info-controls>
                `}
                <button class="bottom-right-btn" @click="${()=>this._closeSettings()}">${this.config.settings.closeButton?this.config.settings.closeButton:"Close"}</button>
              </div>
            </div>
          `:O``}
      </div>
    `}firstUpdated(){if(this.settings&&!this.settingsCustomCard){const t=this.shadowRoot.querySelector("more-info-controls").shadowRoot;t.removeChild(t.querySelector("app-toolbar"))}else this.settings&&this.settingsCustomCard&&this.shadowRoot.querySelectorAll("card-maker").forEach(t=>{var e={type:t.dataset.card};e=Object.assign({},e,JSON.parse(t.dataset.options)),t.config=e;let s="";if(t.dataset.style&&(s=t.dataset.style),""!=s){let e=0,n=setInterval((function(){let i=t.children[0];if(i){window.clearInterval(n);var r=document.createElement("style");r.innerHTML=s,i.shadowRoot.appendChild(r)}else 10==++e&&window.clearInterval(n)}),100)}})}updated(){}_openSettings(){this.shadowRoot.getElementById("popup").classList.add("off"),this.shadowRoot.getElementById("settings").classList.add("on")}_closeSettings(){this.shadowRoot.getElementById("settings").classList.remove("on"),this.shadowRoot.getElementById("popup").classList.remove("off")}_close(t){t&&"popup-inner"===t.target.className&&function(){const t=document.querySelector("hc-main")||document.querySelector("home-assistant"),e=t&&t._moreInfoEl;e&&e.close()}()}_createRange(t){const e=[];for(let s=0;s<t;s++)e.push(s);return e}_setVolume(t,e){this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100})}_activateAction(t){if(t.target.dataset&&t.target.dataset.service){const[e,s]=t.target.dataset.service.split("#",2),n=this.actionRows[e-1][s-1],[i,r]=n.service.split(".",2);n.service_data.entity_id&&"this"==n.service_data.entity_id&&(n.service_data.entity_id=this.config.entity),this.hass.callService(i,r,n.service_data)}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}getCardSize(){return this.config.entities.length+1}static get styles(){return G`
        :host {
            background-color:#000!important;
        }
        .popup-wrapper {
            margin-top:64px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .popup-inner {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .popup-inner.off {
          display:none;
        }
        #settings {
          position:relative;
          display:none;
        }
        #settings.fullscreen {
          position:absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .settings-inner {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        #settings.on {
          display:block;
        }
        .bottom-right-btn {
          position:absolute;
          bottom:15px;
          right:30px;
          background-color: #7f8082;
          color: #FFF;
          border: 0;
          padding: 5px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
        }
        .fullscreen {
          margin-top:-64px;
        }
        .icon {
            text-align:center;
            display:block;
            height: 40px;
            width: 40px;
            color: rgba(255,255,255,0.3);
            font-size: 30px;
            padding-top:5px;
        }
        .icon ha-icon {
            width:30px;
            height:30px;
        }
        .icon.on ha-icon {
            fill: #f7d959;
        }
        h4 {
            color: #FFF;
            display: block;
            font-weight: 300;
            margin-bottom: 30px;
            text-align: center;
            font-size:20px;
            margin-top:0;
            text-transform: capitalize;
        }
        h4.brightness:after {
            content: "%";
            padding-left: 1px;
        }
        
        .range-holder {
            height: var(--slider-height);
            width: var(--slider-width);
            position:relative;
            display: block;
        }
        .range-holder input[type="range"] {
            outline: 0;
            border: 0;
            border-radius: var(--slider-border-radius, 12px);
            width: var(--slider-height);
            margin: 0;
            transition: box-shadow 0.2s ease-in-out;
            -webkit-transform:rotate(270deg);
            -moz-transform:rotate(270deg);
            -o-transform:rotate(270deg);
            -ms-transform:rotate(270deg);
            transform:rotate(270deg);
            overflow: hidden;
            height: var(--slider-width);
            -webkit-appearance: none;
            background-color: var(--slider-track-color);
            position: absolute;
            top: calc(50% - (var(--slider-width) / 2));
            right: calc(50% - (var(--slider-height) / 2));
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
            height: var(--slider-width);
            -webkit-appearance: none;
            background-color: var(--slider-track-color);
            margin-top: -1px;
            transition: box-shadow 0.2s ease-in-out;
        }
        .range-holder input[type="range"]::-webkit-slider-thumb {
            width: 25px;
            border-right:10px solid var(--slider-color);
            border-left:10px solid var(--slider-color);
            border-top:20px solid var(--slider-color);
            border-bottom:20px solid var(--slider-color);
            -webkit-appearance: none;
            height: 80px;
            cursor: ew-resize;
            background: #fff;
            box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
            border-radius: 0;
            transition: box-shadow 0.2s ease-in-out;
            position: relative;
            top: calc((var(--slider-width) - 80px) / 2);
        }
        
        .action-holder {
            display: flex;
            flex-direction: column;
            margin-top:20px;
        }
        .action-row {
            display:block;
            padding-bottom:10px;
        }
        .action-row:last-child {
            padding:0;
        }
        .action-holder .action {
            display:inline-block;
            margin-right:10px;
            cursor:pointer;
        }
        .action-holder .action:nth-child(4n) {
            margin-right:0;
        }
        .action-holder .action .color {
            width:50px;
            height:50px;
            border-radius:50%;
            display:block;
            border: 1px solid #FFF;
            line-height: 50px;
            text-align: center;
            pointer-events: none;
        }
        .action-holder .action .color ha-icon {
          pointer-events: none;
        }
        .action-holder .action .name {
            width:50px;
            display:block;
            color: #FFF;
            font-size: 9px;
            margin-top:3px;
            text-align:center;
            pointer-events: none;
        }
    `}});
