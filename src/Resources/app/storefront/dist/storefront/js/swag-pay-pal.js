(window.webpackJsonp=window.webpackJsonp||[]).push([["swag-pay-pal"],{dkCy:function(t,e,n){"use strict";n.r(e);var o=n("k8s9"),r=n("gHbT"),i=n("u0Tz"),a=n("2Y4b"),c=n("FGIj");function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function l(t,e){return!e||"object"!==u(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=!1,h=!1,d=[],b=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,p(e).apply(this,arguments))}var n,o,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(e,t),n=e,(o=[{key:"createScript",value:function(t){if(d.push(t),f)h&&t.call(this);else{f=!0;var e=this.getScriptUrlOptions(),n="https://www.paypal.com/sdk/js?client-id=".concat(this.options.clientId).concat(e),o=document.createElement("script");o.type="text/javascript",o.src=n,o.addEventListener("load",this.callCallbacks.bind(this),!1),document.head.appendChild(o)}}},{key:"callCallbacks",value:function(){var t=this;d.forEach((function(e){e.call(t)})),h=!0}},{key:"getScriptUrlOptions",value:function(){var t="";return void 0!==this.options.commit&&(t+="&commit=".concat(this.options.commit)),this.options.languageIso&&(t+="&locale=".concat(this.options.languageIso)),this.options.currency&&(t+="&currency=".concat(this.options.currency)),this.options.intent&&"sale"!==this.options.intent&&(t+="&intent=".concat(this.options.intent)),void 0===this.options.useAlternativePaymentMethods||this.options.useAlternativePaymentMethods||(t+="&disable-funding=credit,card,sepa,bancontact,eps,giropay,ideal,mybank,sofort"),t+="&components=marks,buttons"}}])&&s(n.prototype,o),r&&s(n,r),e}(c.a);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function g(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function P(t,e){return(P=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),g(this,w(e).apply(this,arguments))}var n,c,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&P(t,e)}(e,t),n=e,(c=[{key:"init",value:function(){this._client=new o.a(window.accessKey,window.contextToken),this.paypal=null,this.createButton()}},{key:"createButton",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.renderButton()}))}},{key:"renderButton",value:function(){return this.paypal.Buttons(this.getButtonConfig()).render(this.el)}},{key:"getButtonConfig",value:function(){return{style:{size:this.options.buttonSize,shape:this.options.buttonShape,color:this.options.buttonColor,tagline:this.options.tagline,layout:"horizontal",label:"checkout",height:40},createOrder:this.createOrder.bind(this),onApprove:this.onApprove.bind(this)}}},{key:"createOrder",value:function(){var t=this;return this.options.addProductToCart?this.addProductToCart().then((function(){return t._createOrder()})):this._createOrder()}},{key:"_createOrder",value:function(){var t=this;return new Promise((function(e){t._client.get(t.options.createPaymentUrl,(function(t){var n=JSON.parse(t);e(n.token)}))}))}},{key:"addProductToCart",value:function(){var t=this,e=this._formatLineItems();return e._csrf_token=r.a.getDataAttribute(this.el,"swag-pay-pal-express-button-add-line-item-token"),new Promise((function(n){t._client.get(t.options.createNewCartUrl,(function(){t._client.post(t.options.addLineItemUrl,JSON.stringify(e),(function(){n()}))}))}))}},{key:"_formatLineItems",value:function(){var t=a.a.serializeJson(this.el.closest("form")),e={};return Object.keys(t).forEach((function(n){var o=n.match(/lineItems\[(.+)]\[(.+)]/);"redirectTo"!==n&&o&&3===o.length&&(e[o[1]]?e[o[1]][o[2]]=t[o[0]]:e[o[1]]=k({},o[2],t[o[0]]))})),{lineItems:e}}},{key:"onApprove",value:function(t,e){var n=this,o={paymentId:t.paymentID,_csrf_token:r.a.getDataAttribute(this.el,"swag-pay-pal-express-button-approve-payment-token")};i.a.create(document.body),this._client.post(this.options.approvePaymentUrl,JSON.stringify(o),(function(){e.redirect(n.options.checkoutConfirmUrl)}))}}])&&v(n.prototype,c),u&&v(n,u),e}(b);function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function j(t,e){return!e||"object"!==S(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function C(t){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function I(t,e){return(I=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}k(O,"options",{buttonColor:"gold",buttonShape:"rect",buttonSize:"small",languageIso:"en_GB",loginEnabled:!1,clientId:"",commit:!1,tagline:!1,addProductToCart:!1,createPaymentUrl:"",createNewCartUrl:"",addLineItemUrl:"",approvePaymentUrl:"",checkoutConfirmUrl:""});var E,U,M,A=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),j(this,C(e).apply(this,arguments))}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&I(t,e)}(e,t),n=e,(i=[{key:"init",value:function(){this.paypal=null,this._client=new o.a(window.accessKey,window.contextToken),this.createButton()}},{key:"createButton",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.renderButton()}))}},{key:"renderButton",value:function(){var t=this,e=function(){r.a.querySelector(document,"input.payment-method-input[checked=checked]").value===t.options.paymentMethodId?(r.a.querySelector(document,"#confirmFormSubmit").style.display="none",t.el.style.display="block"):(r.a.querySelector(document,"#confirmFormSubmit").style.display="block",t.el.style.display="none")};e();var n=r.a.querySelector(document,".confirm-payment");return new MutationObserver((function(){e()})).observe(n,{attributes:!1,childList:!0,subtree:!1}),this.paypal.Buttons(this.getButtonConfig()).render(this.el)}},{key:"getButtonConfig",value:function(){return{style:{size:this.options.buttonSize,shape:this.options.buttonShape,color:this.options.buttonColor,label:"checkout"},createOrder:this.createOrder.bind(this),onApprove:this.onApprove.bind(this)}}},{key:"createOrder",value:function(){var t=this,e={_csrf_token:r.a.getDataAttribute(this.el,"swag-pay-pal-smart-payment-buttons-create-payment-token")};return new Promise((function(n){t._client.post(t.options.createPaymentUrl,JSON.stringify(e),(function(t){var e=JSON.parse(t);n(e.token)}))}))}},{key:"onApprove",value:function(t,e){var n=new URLSearchParams;n.append("paypalPayerId",t.payerID),n.append("paypalPaymentId",t.paymentID);var o="".concat(this.options.checkoutConfirmUrl,"?").concat(n.toString());e.redirect(o)}}])&&_(n.prototype,i),a&&_(n,a),e}(b);function L(t){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function T(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function B(t,e){return!e||"object"!==L(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function x(t){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function N(t,e){return(N=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}M={buttonColor:"gold",buttonShape:"rect",buttonSize:"small",languageIso:"en_GB",clientId:"",commit:!1,useAlternativePaymentMethods:!0,createPaymentUrl:"",checkoutConfirmUrl:""},(U="options")in(E=A)?Object.defineProperty(E,U,{value:M,enumerable:!0,configurable:!0,writable:!0}):E[U]=M;var J=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),B(this,x(e).apply(this,arguments))}var n,o,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&N(t,e)}(e,t),n=e,(o=[{key:"init",value:function(){this.paypal=null,this.createMarks()}},{key:"createMarks",value:function(){var t=this;this.createScript((function(){t.paypal=window.paypal,t.paypal.Marks().render(t.el)}))}}])&&T(n.prototype,o),r&&T(n,r),e}(b);function q(t){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function z(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function D(t,e){return!e||"object"!==q(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function W(t){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function F(t,e){return(F=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}!function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(J,"options",{clientId:"",useAlternativePaymentMethods:!0});var R=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),D(this,W(e).apply(this,arguments))}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&F(t,e)}(e,t),n=e,a=[{key:"getSelectedPaymentMethodId",value:function(){var t=r.a.querySelector(document,'*[checked="checked"][name="paymentMethodId"]');return r.a.getAttribute(t,"value")}}],(i=[{key:"init",value:function(){r.a.querySelector(document,"#confirmOrderForm").addEventListener("submit",this.onConfirmCheckout.bind(this)),this.createPaymentWall()}},{key:"createPaymentWall",value:function(){this.loaded=!1,this.paypal=window.PAYPAL,this.paymentWall=null,this.paymentWall=this.paypal.apps.PPP({placeholder:this.options.placeholder,approvalUrl:this.options.approvalUrl,mode:this.options.mode,country:this.options.customerCountryIso,buttonLocation:this.options.buttonLocation,language:this.options.customerSelectedLanguage,useraction:this.options.userAction,surcharging:this.options.surcharging,showLoadingIndicator:this.options.showLoadingIndicator,showPuiOnSandbox:this.options.showPuiOnSandbox,onLoad:this.onLoad.bind(this),enableContinue:this.onEnableContinue.bind(this)})}},{key:"onLoad",value:function(){this.loaded=!0,e.getSelectedPaymentMethodId()!==this.options.paymentMethodId&&this.clearPaymentSelection()}},{key:"clearPaymentSelection",value:function(){this.loaded&&this.paymentWall.deselectPaymentMethod()}},{key:"onEnableContinue",value:function(){if(this.loaded){var t=r.a.querySelector(document,'*[name=paymentMethodId][value="'.concat(this.options.paymentMethodId,'"]'));e.getSelectedPaymentMethodId()===this.options.paymentMethodId||r.a.hasAttribute(t,"checked")||(t.setAttribute("checked","checked"),r.a.querySelector(document,"#confirmPaymentForm").dispatchEvent(new Event("change")))}}},{key:"onConfirmCheckout",value:function(t){if(e.getSelectedPaymentMethodId()===this.options.paymentMethodId&&(t.preventDefault(),t.target.checkValidity())){r.a.querySelector(t.target,"#confirmFormSubmit").disabled=!0;var n={_csrf_token:r.a.getDataAttribute(this.el,"swag-pay-pal-plus-payment-wall-checkout-order-token")};this._client=new o.a(window.accessKey,window.contextToken),this._client.post(this.options.checkoutOrderUrl,JSON.stringify(n),this.afterCreateOrder.bind(this))}}},{key:"afterCreateOrder",value:function(t){var e=JSON.parse(t).data.id,n={paypalPaymentId:this.options.paypalPaymentId};n[this.options.isEnabledParameterName]=!0,this._client.post("".concat(this.options.checkoutOrderUrl,"/").concat(e,"/pay"),JSON.stringify(n),this.afterPayOrder.bind(this))}},{key:"afterPayOrder",value:function(t){"plusPatched"===JSON.parse(t).paymentUrl&&this.paypal.apps.PPP.doCheckout()}}])&&z(n.prototype,i),a&&z(n,a),e}(c.a);!function(t,e,n){e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(R,"options",{placeholder:"ppplus",approvalUrl:"",paypalPaymentId:"",customerCountryIso:"",mode:"live",buttonLocation:"outside",preSelection:"paypal",userAction:"commit",customerSelectedLanguage:"en_GB",surcharging:!1,showLoadingIndicator:!0,showPuiOnSandbox:!0,checkoutOrderUrl:"",isEnabledParameterName:"isPayPalPlusCheckout"});var G=window.PluginManager;G.register("SwagPayPalExpressButton",O,"[data-swag-paypal-express-button]"),G.register("SwagPayPalSmartPaymentButtons",A,"[data-swag-paypal-smart-payment-buttons]"),G.register("SwagPayPalMarks",J,"[data-swag-paypal-marks]"),G.register("SwagPayPalPlusPaymentWall",R,'[data-payPalPaymentWall="true"]')}},[["dkCy","runtime","vendor-node","vendor-shared"]]]);