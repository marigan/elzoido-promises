/**
 * @license
 * elzoido-promises 0.2.0
 * (c) 2014 marigan.net
 * License: GPL-3.0+
 */
angular.module("elzoido.promises",["dialogs.main","dialogs.default-translations"]).constant("elzoidoPromisesModule",{config:{timeout:500}}),angular.module("elzoido.promises").factory("elzoidoPromises",["$rootScope","$q","$timeout","dialogs","elzoidoPromisesModule",function(n,o,e,i,t){var r,u,s,a,l;return u={},a=function(n,o){return _.isUndefined(u[n])&&(u[n]=[]),u[n].push(o),o.then(function(){return _.remove(u[n],o)})},s=function(n){return _.isUndefined(u[n])?!1:u[n].length>0},r=function(n){return o.all(u[n])},l=function(n,o){return e(function(){var e;return s(n)?(e=i.wait("Please wait",o),r(n).then(function(){return e.close()})):void 0},t.config.timeout)},{register:function(n,o){return _.isArray(o)?_.forEach(o,function(o){return a(n,o)}):a(n,o)},isRunning:function(n){return s(n)},wait:function(n,o){return l(n,o)},promise:function(n){return r(n)}}}]);