(window.webpackJsonp=window.webpackJsonp||[]).push([["swag-pay-pal"],{dkCy:function(t,e,n){"use strict";n.r(e);var o=n("k8s9"),r=n("gHbT"),i=n("u0Tz"),a=n("2Y4b"),c=n("FGIj");function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function l(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=!1,b=!1,h=[],d=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,p(e).apply(this,arguments))}var n,o,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,t),n=e,(o=[{key:"createScript",value:function(t){if(h.push(t),y)b&&t.call(this);else{y=!0;var e=this.getScriptUrlOptions(),n="https://www.paypal.com/sdk/js?client-id=".concat(this.options.clientId).concat(e),o=document.createElement("script");o.type="text/javascript",o.src=n,o.addEventListener("load",this.callCallbacks.bind(this),!1),document.head.appendChild(o)}}},{key:"callCallbacks",value:function(){var t=this;h.forEach((function(e){e.call(t)})),b=!0}},{key:"getScriptUrlOptions",value:function(){var t="";return void 0!==this.options.commit&&(t+="&commit=".concat(this.options.commit)),this.options.languageIso&&(t+="&locale=".concat(this.options.languageIso)),this.options.currency&&(t+="&currency=".concat(this.options.currency)),this.options.intent&&"sale"!==this.options.intent&&(t+="&intent=".concat(this.options.intent)),void 0===this.options.useAlternativePaymentMethods||this.options.useAlternativePaymentMethods||(t+="&disable-funding=credit,card,sepa,bancontact,eps,giropay,ideal,mybank,sofort"),t+="&components=marks,buttons"}}])&&s(n.prototype,o),r&&s(n,r),e}(c.a);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function w(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var S=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),w(this,g(e).apply(this,arguments))}var n,c,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(e,t),n=e,(c=[{key:"init",value:function(){this._client=new o.a(window.accessKey,window.contextToken),this.paypal=null,this.createButton()}},{key:"createButton",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.renderButton()}))}},{key:"renderButton",value:function(){return this.paypal.Buttons(this.getButtonConfig()).render(this.el)}},{key:"getButtonConfig",value:function(){return{style:{size:this.options.buttonSize,shape:this.options.buttonShape,color:this.options.buttonColor,tagline:this.options.tagline,layout:"horizontal",label:"checkout",height:40},createOrder:this.createOrder.bind(this),onApprove:this.onApprove.bind(this)}}},{key:"createOrder",value:function(){var t=this;return this.options.addProductToCart?this.addProductToCart().then((function(){return t._createOrder()})):this._createOrder()}},{key:"_createOrder",value:function(){var t=this;return new Promise((function(e){t._client.get(t.options.createPaymentUrl,(function(t){var n=JSON.parse(t);e(n.token)}))}))}},{key:"addProductToCart",value:function(){var t=this,e=this._formatLineItems();return e._csrf_token=r.a.getDataAttribute(this.el,"swag-pay-pal-express-button-add-line-item-token"),new Promise((function(n){t._client.get(t.options.createNewCartUrl,(function(){t._client.post(t.options.addLineItemUrl,JSON.stringify(e),(function(){n()}))}))}))}},{key:"_formatLineItems",value:function(){var t=a.a.serializeJson(this.el.closest("form")),e={};return Object.keys(t).forEach((function(n){var o=n.match(/lineItems\[(.+)]\[(.+)]/);"redirectTo"!==n&&o&&3===o.length&&(e[o[1]]?e[o[1]][o[2]]=t[o[0]]:e[o[1]]=k({},o[2],t[o[0]]))})),{lineItems:e}}},{key:"onApprove",value:function(t,e){var n=this,o={paymentId:t.paymentID,_csrf_token:r.a.getDataAttribute(this.el,"swag-pay-pal-express-button-approve-payment-token")};i.a.create(document.body),this._client.post(this.options.approvePaymentUrl,JSON.stringify(o),(function(){e.redirect(n.options.checkoutConfirmUrl)}))}}])&&v(n.prototype,c),u&&v(n,u),e}(d);function _(t){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function P(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function j(t,e){return!e||"object"!==_(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function C(t){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function I(t,e){return(I=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}k(S,"options",{buttonColor:"gold",buttonShape:"rect",buttonSize:"small",languageIso:"en_GB",loginEnabled:!1,clientId:"",commit:!1,tagline:!1,addProductToCart:!1,createPaymentUrl:"",createNewCartUrl:"",addLineItemUrl:"",approvePaymentUrl:"",checkoutConfirmUrl:""});var B,E,T,U=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),j(this,C(e).apply(this,arguments))}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&I(t,e)}(e,t),n=e,(i=[{key:"init",value:function(){this.paypal=null,this._client=new o.a(window.accessKey,window.contextToken),this.createButton()}},{key:"createButton",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.renderButton()}))}},{key:"renderButton",value:function(){var t=this,e=function(){r.a.querySelector(document,"input.payment-method-input[checked=checked]").value===t.options.paymentMethodId?(r.a.querySelector(document,"#confirmFormSubmit").style.display="none",t.el.style.display="block"):(r.a.querySelector(document,"#confirmFormSubmit").style.display="block",t.el.style.display="none")};e();var n=r.a.querySelector(document,".confirm-payment");return new MutationObserver((function(){e()})).observe(n,{attributes:!1,childList:!0,subtree:!1}),this.paypal.Buttons(this.getButtonConfig()).render(this.el)}},{key:"getButtonConfig",value:function(){return{style:{size:this.options.buttonSize,shape:this.options.buttonShape,color:this.options.buttonColor,label:"checkout"},createOrder:this.createOrder.bind(this),onApprove:this.onApprove.bind(this)}}},{key:"createOrder",value:function(){var t=this,e={_csrf_token:r.a.getDataAttribute(this.el,"swag-pay-pal-smart-payment-buttons-create-payment-token")};return new Promise((function(n){t._client.post(t.options.createPaymentUrl,JSON.stringify(e),(function(t){var e=JSON.parse(t);n(e.token)}))}))}},{key:"onApprove",value:function(t,e){var n=new URLSearchParams;n.append("paypalPayerId",t.payerID),n.append("paypalPaymentId",t.paymentID);var o="".concat(this.options.checkoutConfirmUrl,"?").concat(n.toString());e.redirect(o)}}])&&P(n.prototype,i),a&&P(n,a),e}(d);function A(t){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function M(t,e){return!e||"object"!==A(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function z(t){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function J(t,e){return(J=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}T={buttonColor:"gold",buttonShape:"rect",buttonSize:"small",languageIso:"en_GB",clientId:"",commit:!1,useAlternativePaymentMethods:!0,createPaymentUrl:"",checkoutConfirmUrl:""},(E="options")in(B=U)?Object.defineProperty(B,E,{value:T,enumerable:!0,configurable:!0,writable:!0}):B[E]=T;var L=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),M(this,z(e).apply(this,arguments))}var n,o,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&J(t,e)}(e,t),n=e,(o=[{key:"init",value:function(){this.paypal=null,this.createMarks()}},{key:"createMarks",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.paypal.Marks().render(t.el)}))}}])&&x(n.prototype,o),r&&x(n,r),e}(d);!function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(L,"options",{clientId:"",useAlternativePaymentMethods:!0});var N=window.PluginManager;N.register("SwagPayPalExpressButton",S,"[data-swag-paypal-express-button]"),N.register("SwagPayPalSmartPaymentButtons",U,"[data-swag-paypal-smart-payment-buttons]"),N.register("SwagPayPalMarks",L,"[data-swag-paypal-marks]")}},[["dkCy","runtime","vendor-node","vendor-shared"]]]);