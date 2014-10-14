/**
 * @license
 * elzoido-promises 0.1.0
 * (c) 2014 marigan.net
 * License: GPL-3.0+
 */
angular.module("elzoido.promises",["dialogs.main","dialogs.default-translations"]).constant("elzoidoPromisesModule",{config:{timeout:500}}),angular.module("elzoido.promises").factory("elzoidoPromises",["$rootScope","$q","$timeout","dialogs","elzoidoPromisesModule",function(n,o,e,i,t){var r,u,s,a;return r={},s=function(n,o){return _.isUndefined(r[n])&&(r[n]=[]),r[n].push(o),o.then(function(){return _.remove(r[n],o)})},u=function(n){return _.isUndefined(r[n])?!1:r[n].length>0},a=function(n,s){return e(function(){var e;return u(n)?(e=i.wait("Please wait",s),o.all(r[n]).then(function(){return e.close()})):void 0},t.config.timeout)},{register:function(n,o){return _.isArray(o)?_.forEach(o,function(o){return s(n,o)}):s(n,o)},isRunning:function(n){return u(n)},wait:function(n,o){return a(n,o)}}}]);