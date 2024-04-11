(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function I6(c,a){const e=new Set(c.split(","));return a?r=>e.has(r.toLowerCase()):r=>e.has(r)}const i1={},I2=[],T1=()=>{},Vo=()=>!1,M4=c=>c.charCodeAt(0)===111&&c.charCodeAt(1)===110&&(c.charCodeAt(2)>122||c.charCodeAt(2)<97),G6=c=>c.startsWith("onUpdate:"),h1=Object.assign,W6=(c,a)=>{const e=c.indexOf(a);e>-1&&c.splice(e,1)},Mo=Object.prototype.hasOwnProperty,j=(c,a)=>Mo.call(c,a),$=Array.isArray,G2=c=>C4(c)==="[object Map]",Q5=c=>C4(c)==="[object Set]",G=c=>typeof c=="function",f1=c=>typeof c=="string",a3=c=>typeof c=="symbol",l1=c=>c!==null&&typeof c=="object",J5=c=>(l1(c)||G(c))&&G(c.then)&&G(c.catch),c7=Object.prototype.toString,C4=c=>c7.call(c),Co=c=>C4(c).slice(8,-1),a7=c=>C4(c)==="[object Object]",j6=c=>f1(c)&&c!=="NaN"&&c[0]!=="-"&&""+parseInt(c,10)===c,t3=I6(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),d4=c=>{const a=Object.create(null);return e=>a[e]||(a[e]=c(e))},Lo=/-(\w)/g,K2=d4(c=>c.replace(Lo,(a,e)=>e?e.toUpperCase():"")),go=/\B([A-Z])/g,T2=d4(c=>c.replace(go,"-$1").toLowerCase()),e7=d4(c=>c.charAt(0).toUpperCase()+c.slice(1)),a6=d4(c=>c?`on${e7(c)}`:""),H2=(c,a)=>!Object.is(c,a),e6=(c,a)=>{for(let e=0;e<c.length;e++)c[e](a)},t4=(c,a,e)=>{Object.defineProperty(c,a,{configurable:!0,enumerable:!1,value:e})},xo=c=>{const a=parseFloat(c);return isNaN(a)?c:a};let A0;const r7=()=>A0||(A0=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function x2(c){if($(c)){const a={};for(let e=0;e<c.length;e++){const r=c[e],s=f1(r)?yo(r):x2(r);if(s)for(const i in s)a[i]=s[i]}return a}else if(f1(c)||l1(c))return c}const bo=/;(?![^(]*\))/g,No=/:([^]+)/,So=/\/\*[^]*?\*\//g;function yo(c){const a={};return c.replace(So,"").split(bo).forEach(e=>{if(e){const r=e.split(No);r.length>1&&(a[r[0].trim()]=r[1].trim())}}),a}function L4(c){let a="";if(f1(c))a=c;else if($(c))for(let e=0;e<c.length;e++){const r=L4(c[e]);r&&(a+=r+" ")}else if(l1(c))for(const e in c)c[e]&&(a+=e+" ");return a.trim()}const ko="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",wo=I6(ko);function s7(c){return!!c||c===""}const i3=c=>f1(c)?c:c==null?"":$(c)||l1(c)&&(c.toString===c7||!G(c.toString))?JSON.stringify(c,i7,2):String(c),i7=(c,a)=>a&&a.__v_isRef?i7(c,a.value):G2(a)?{[`Map(${a.size})`]:[...a.entries()].reduce((e,[r,s],i)=>(e[r6(r,i)+" =>"]=s,e),{})}:Q5(a)?{[`Set(${a.size})`]:[...a.values()].map(e=>r6(e))}:a3(a)?r6(a):l1(a)&&!$(a)&&!a7(a)?String(a):a,r6=(c,a="")=>{var e;return a3(c)?`Symbol(${(e=c.description)!=null?e:a})`:c};/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let B1;class Ao{constructor(a=!1){this.detached=a,this._active=!0,this.effects=[],this.cleanups=[],this.parent=B1,!a&&B1&&(this.index=(B1.scopes||(B1.scopes=[])).push(this)-1)}get active(){return this._active}run(a){if(this._active){const e=B1;try{return B1=this,a()}finally{B1=e}}}on(){B1=this}off(){B1=this.parent}stop(a){if(this._active){let e,r;for(e=0,r=this.effects.length;e<r;e++)this.effects[e].stop();for(e=0,r=this.cleanups.length;e<r;e++)this.cleanups[e]();if(this.scopes)for(e=0,r=this.scopes.length;e<r;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!a){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function Po(c,a=B1){a&&a.active&&a.effects.push(c)}function To(){return B1}let S2;class Z6{constructor(a,e,r,s){this.fn=a,this.trigger=e,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Po(this,s)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,F2();for(let a=0;a<this._depsLength;a++){const e=this.deps[a];if(e.computed&&(Fo(e.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),B2()}return this._dirtyLevel>=4}set dirty(a){this._dirtyLevel=a?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let a=v2,e=S2;try{return v2=!0,S2=this,this._runnings++,P0(this),this.fn()}finally{T0(this),this._runnings--,S2=e,v2=a}}stop(){var a;this.active&&(P0(this),T0(this),(a=this.onStop)==null||a.call(this),this.active=!1)}}function Fo(c){return c.value}function P0(c){c._trackId++,c._depsLength=0}function T0(c){if(c.deps.length>c._depsLength){for(let a=c._depsLength;a<c.deps.length;a++)l7(c.deps[a],c);c.deps.length=c._depsLength}}function l7(c,a){const e=c.get(a);e!==void 0&&a._trackId!==e&&(c.delete(a),c.size===0&&c.cleanup())}let v2=!0,p6=0;const n7=[];function F2(){n7.push(v2),v2=!1}function B2(){const c=n7.pop();v2=c===void 0?!0:c}function K6(){p6++}function Y6(){for(p6--;!p6&&V6.length;)V6.shift()()}function f7(c,a,e){if(a.get(c)!==c._trackId){a.set(c,c._trackId);const r=c.deps[c._depsLength];r!==a?(r&&l7(r,c),c.deps[c._depsLength++]=a):c._depsLength++}}const V6=[];function o7(c,a,e){K6();for(const r of c.keys()){let s;r._dirtyLevel<a&&(s??(s=c.get(r)===r._trackId))&&(r._shouldSchedule||(r._shouldSchedule=r._dirtyLevel===0),r._dirtyLevel=a),r._shouldSchedule&&(s??(s=c.get(r)===r._trackId))&&(r.trigger(),(!r._runnings||r.allowRecurse)&&r._dirtyLevel!==2&&(r._shouldSchedule=!1,r.scheduler&&V6.push(r.scheduler)))}Y6()}const t7=(c,a)=>{const e=new Map;return e.cleanup=c,e.computed=a,e},M6=new WeakMap,y2=Symbol(""),C6=Symbol("");function S1(c,a,e){if(v2&&S2){let r=M6.get(c);r||M6.set(c,r=new Map);let s=r.get(e);s||r.set(e,s=t7(()=>r.delete(e))),f7(S2,s)}}function X1(c,a,e,r,s,i){const l=M6.get(c);if(!l)return;let n=[];if(a==="clear")n=[...l.values()];else if(e==="length"&&$(c)){const f=Number(r);l.forEach((t,o)=>{(o==="length"||!a3(o)&&o>=f)&&n.push(t)})}else switch(e!==void 0&&n.push(l.get(e)),a){case"add":$(c)?j6(e)&&n.push(l.get("length")):(n.push(l.get(y2)),G2(c)&&n.push(l.get(C6)));break;case"delete":$(c)||(n.push(l.get(y2)),G2(c)&&n.push(l.get(C6)));break;case"set":G2(c)&&n.push(l.get(y2));break}K6();for(const f of n)f&&o7(f,4);Y6()}const Bo=I6("__proto__,__v_isRef,__isVue"),m7=new Set(Object.getOwnPropertyNames(Symbol).filter(c=>c!=="arguments"&&c!=="caller").map(c=>Symbol[c]).filter(a3)),F0=Ro();function Ro(){const c={};return["includes","indexOf","lastIndexOf"].forEach(a=>{c[a]=function(...e){const r=Z(this);for(let i=0,l=this.length;i<l;i++)S1(r,"get",i+"");const s=r[a](...e);return s===-1||s===!1?r[a](...e.map(Z)):s}}),["push","pop","shift","unshift","splice"].forEach(a=>{c[a]=function(...e){F2(),K6();const r=Z(this)[a].apply(this,e);return Y6(),B2(),r}}),c}function _o(c){const a=Z(this);return S1(a,"has",c),a.hasOwnProperty(c)}class z7{constructor(a=!1,e=!1){this._isReadonly=a,this._isShallow=e}get(a,e,r){const s=this._isReadonly,i=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return i;if(e==="__v_raw")return r===(s?i?Yo:u7:i?H7:h7).get(a)||Object.getPrototypeOf(a)===Object.getPrototypeOf(r)?a:void 0;const l=$(a);if(!s){if(l&&j(F0,e))return Reflect.get(F0,e,r);if(e==="hasOwnProperty")return _o}const n=Reflect.get(a,e,r);return(a3(e)?m7.has(e):Bo(e))||(s||S1(a,"get",e),i)?n:y1(n)?l&&j6(e)?n:n.value:l1(n)?s?V7(n):x4(n):n}}class v7 extends z7{constructor(a=!1){super(!1,a)}set(a,e,r,s){let i=a[e];if(!this._isShallow){const f=Y2(i);if(!m4(r)&&!Y2(r)&&(i=Z(i),r=Z(r)),!$(a)&&y1(i)&&!y1(r))return f?!1:(i.value=r,!0)}const l=$(a)&&j6(e)?Number(e)<a.length:j(a,e),n=Reflect.set(a,e,r,s);return a===Z(s)&&(l?H2(r,i)&&X1(a,"set",e,r):X1(a,"add",e,r)),n}deleteProperty(a,e){const r=j(a,e);a[e];const s=Reflect.deleteProperty(a,e);return s&&r&&X1(a,"delete",e,void 0),s}has(a,e){const r=Reflect.has(a,e);return(!a3(e)||!m7.has(e))&&S1(a,"has",e),r}ownKeys(a){return S1(a,"iterate",$(a)?"length":y2),Reflect.ownKeys(a)}}class Eo extends z7{constructor(a=!1){super(!0,a)}set(a,e){return!0}deleteProperty(a,e){return!0}}const qo=new v7,Do=new Eo,Oo=new v7(!0),X6=c=>c,g4=c=>Reflect.getPrototypeOf(c);function D3(c,a,e=!1,r=!1){c=c.__v_raw;const s=Z(c),i=Z(a);e||(H2(a,i)&&S1(s,"get",a),S1(s,"get",i));const{has:l}=g4(s),n=r?X6:e?c8:M3;if(l.call(s,a))return n(c.get(a));if(l.call(s,i))return n(c.get(i));c!==s&&c.get(a)}function O3(c,a=!1){const e=this.__v_raw,r=Z(e),s=Z(c);return a||(H2(c,s)&&S1(r,"has",c),S1(r,"has",s)),c===s?e.has(c):e.has(c)||e.has(s)}function U3(c,a=!1){return c=c.__v_raw,!a&&S1(Z(c),"iterate",y2),Reflect.get(c,"size",c)}function B0(c){c=Z(c);const a=Z(this);return g4(a).has.call(a,c)||(a.add(c),X1(a,"add",c,c)),this}function R0(c,a){a=Z(a);const e=Z(this),{has:r,get:s}=g4(e);let i=r.call(e,c);i||(c=Z(c),i=r.call(e,c));const l=s.call(e,c);return e.set(c,a),i?H2(a,l)&&X1(e,"set",c,a):X1(e,"add",c,a),this}function _0(c){const a=Z(this),{has:e,get:r}=g4(a);let s=e.call(a,c);s||(c=Z(c),s=e.call(a,c)),r&&r.call(a,c);const i=a.delete(c);return s&&X1(a,"delete",c,void 0),i}function E0(){const c=Z(this),a=c.size!==0,e=c.clear();return a&&X1(c,"clear",void 0,void 0),e}function $3(c,a){return function(r,s){const i=this,l=i.__v_raw,n=Z(l),f=a?X6:c?c8:M3;return!c&&S1(n,"iterate",y2),l.forEach((t,o)=>r.call(s,f(t),f(o),i))}}function I3(c,a,e){return function(...r){const s=this.__v_raw,i=Z(s),l=G2(i),n=c==="entries"||c===Symbol.iterator&&l,f=c==="keys"&&l,t=s[c](...r),o=e?X6:a?c8:M3;return!a&&S1(i,"iterate",f?C6:y2),{next(){const{value:v,done:h}=t.next();return h?{value:v,done:h}:{value:n?[o(v[0]),o(v[1])]:o(v),done:h}},[Symbol.iterator](){return this}}}}function l2(c){return function(...a){return c==="delete"?!1:c==="clear"?void 0:this}}function Uo(){const c={get(i){return D3(this,i)},get size(){return U3(this)},has:O3,add:B0,set:R0,delete:_0,clear:E0,forEach:$3(!1,!1)},a={get(i){return D3(this,i,!1,!0)},get size(){return U3(this)},has:O3,add:B0,set:R0,delete:_0,clear:E0,forEach:$3(!1,!0)},e={get(i){return D3(this,i,!0)},get size(){return U3(this,!0)},has(i){return O3.call(this,i,!0)},add:l2("add"),set:l2("set"),delete:l2("delete"),clear:l2("clear"),forEach:$3(!0,!1)},r={get(i){return D3(this,i,!0,!0)},get size(){return U3(this,!0)},has(i){return O3.call(this,i,!0)},add:l2("add"),set:l2("set"),delete:l2("delete"),clear:l2("clear"),forEach:$3(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{c[i]=I3(i,!1,!1),e[i]=I3(i,!0,!1),a[i]=I3(i,!1,!0),r[i]=I3(i,!0,!0)}),[c,e,a,r]}const[$o,Io,Go,Wo]=Uo();function Q6(c,a){const e=a?c?Wo:Go:c?Io:$o;return(r,s,i)=>s==="__v_isReactive"?!c:s==="__v_isReadonly"?c:s==="__v_raw"?r:Reflect.get(j(e,s)&&s in r?e:r,s,i)}const jo={get:Q6(!1,!1)},Zo={get:Q6(!1,!0)},Ko={get:Q6(!0,!1)},h7=new WeakMap,H7=new WeakMap,u7=new WeakMap,Yo=new WeakMap;function Xo(c){switch(c){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Qo(c){return c.__v_skip||!Object.isExtensible(c)?0:Xo(Co(c))}function x4(c){return Y2(c)?c:J6(c,!1,qo,jo,h7)}function p7(c){return J6(c,!1,Oo,Zo,H7)}function V7(c){return J6(c,!0,Do,Ko,u7)}function J6(c,a,e,r,s){if(!l1(c)||c.__v_raw&&!(a&&c.__v_isReactive))return c;const i=s.get(c);if(i)return i;const l=Qo(c);if(l===0)return c;const n=new Proxy(c,l===2?r:e);return s.set(c,n),n}function W2(c){return Y2(c)?W2(c.__v_raw):!!(c&&c.__v_isReactive)}function Y2(c){return!!(c&&c.__v_isReadonly)}function m4(c){return!!(c&&c.__v_isShallow)}function M7(c){return W2(c)||Y2(c)}function Z(c){const a=c&&c.__v_raw;return a?Z(a):c}function C7(c){return Object.isExtensible(c)&&t4(c,"__v_skip",!0),c}const M3=c=>l1(c)?x4(c):c,c8=c=>l1(c)?V7(c):c;class d7{constructor(a,e,r,s){this.getter=a,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Z6(()=>a(this._value),()=>e4(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const a=Z(this);return(!a._cacheable||a.effect.dirty)&&H2(a._value,a._value=a.effect.run())&&e4(a,4),L7(a),a.effect._dirtyLevel>=2&&e4(a,2),a._value}set value(a){this._setter(a)}get _dirty(){return this.effect.dirty}set _dirty(a){this.effect.dirty=a}}function Jo(c,a,e=!1){let r,s;const i=G(c);return i?(r=c,s=T1):(r=c.get,s=c.set),new d7(r,s,i||!s,e)}function L7(c){var a;v2&&S2&&(c=Z(c),f7(S2,(a=c.dep)!=null?a:c.dep=t7(()=>c.dep=void 0,c instanceof d7?c:void 0)))}function e4(c,a=4,e){c=Z(c);const r=c.dep;r&&o7(r,a)}function y1(c){return!!(c&&c.__v_isRef===!0)}function ct(c){return g7(c,!1)}function at(c){return g7(c,!0)}function g7(c,a){return y1(c)?c:new et(c,a)}class et{constructor(a,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?a:Z(a),this._value=e?a:M3(a)}get value(){return L7(this),this._value}set value(a){const e=this.__v_isShallow||m4(a)||Y2(a);a=e?a:Z(a),H2(a,this._rawValue)&&(this._rawValue=a,this._value=e?a:M3(a),e4(this,4))}}function k2(c){return y1(c)?c.value:c}const rt={get:(c,a,e)=>k2(Reflect.get(c,a,e)),set:(c,a,e,r)=>{const s=c[a];return y1(s)&&!y1(e)?(s.value=e,!0):Reflect.set(c,a,e,r)}};function x7(c){return W2(c)?c:new Proxy(c,rt)}/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function h2(c,a,e,r){try{return r?c(...r):c()}catch(s){b4(s,a,e)}}function E1(c,a,e,r){if(G(c)){const i=h2(c,a,e,r);return i&&J5(i)&&i.catch(l=>{b4(l,a,e)}),i}const s=[];for(let i=0;i<c.length;i++)s.push(E1(c[i],a,e,r));return s}function b4(c,a,e,r=!0){const s=a?a.vnode:null;if(a){let i=a.parent;const l=a.proxy,n=`https://vuejs.org/error-reference/#runtime-${e}`;for(;i;){const t=i.ec;if(t){for(let o=0;o<t.length;o++)if(t[o](c,l,n)===!1)return}i=i.parent}const f=a.appContext.config.errorHandler;if(f){h2(f,null,10,[c,l,n]);return}}st(c,e,s,r)}function st(c,a,e,r=!0){console.error(c)}let C3=!1,d6=!1;const C1=[];let G1=0;const j2=[];let o2=null,g2=0;const b7=Promise.resolve();let a8=null;function N7(c){const a=a8||b7;return c?a.then(this?c.bind(this):c):a}function it(c){let a=G1+1,e=C1.length;for(;a<e;){const r=a+e>>>1,s=C1[r],i=d3(s);i<c||i===c&&s.pre?a=r+1:e=r}return a}function e8(c){(!C1.length||!C1.includes(c,C3&&c.allowRecurse?G1+1:G1))&&(c.id==null?C1.push(c):C1.splice(it(c.id),0,c),S7())}function S7(){!C3&&!d6&&(d6=!0,a8=b7.then(k7))}function lt(c){const a=C1.indexOf(c);a>G1&&C1.splice(a,1)}function nt(c){$(c)?j2.push(...c):(!o2||!o2.includes(c,c.allowRecurse?g2+1:g2))&&j2.push(c),S7()}function q0(c,a,e=C3?G1+1:0){for(;e<C1.length;e++){const r=C1[e];if(r&&r.pre){if(c&&r.id!==c.uid)continue;C1.splice(e,1),e--,r()}}}function y7(c){if(j2.length){const a=[...new Set(j2)].sort((e,r)=>d3(e)-d3(r));if(j2.length=0,o2){o2.push(...a);return}for(o2=a,g2=0;g2<o2.length;g2++)o2[g2]();o2=null,g2=0}}const d3=c=>c.id==null?1/0:c.id,ft=(c,a)=>{const e=d3(c)-d3(a);if(e===0){if(c.pre&&!a.pre)return-1;if(a.pre&&!c.pre)return 1}return e};function k7(c){d6=!1,C3=!0,C1.sort(ft);try{for(G1=0;G1<C1.length;G1++){const a=C1[G1];a&&a.active!==!1&&h2(a,null,14)}}finally{G1=0,C1.length=0,y7(),C3=!1,a8=null,(C1.length||j2.length)&&k7()}}function ot(c,a,...e){if(c.isUnmounted)return;const r=c.vnode.props||i1;let s=e;const i=a.startsWith("update:"),l=i&&a.slice(7);if(l&&l in r){const o=`${l==="modelValue"?"model":l}Modifiers`,{number:v,trim:h}=r[o]||i1;h&&(s=e.map(u=>f1(u)?u.trim():u)),v&&(s=e.map(xo))}let n,f=r[n=a6(a)]||r[n=a6(K2(a))];!f&&i&&(f=r[n=a6(T2(a))]),f&&E1(f,c,6,s);const t=r[n+"Once"];if(t){if(!c.emitted)c.emitted={};else if(c.emitted[n])return;c.emitted[n]=!0,E1(t,c,6,s)}}function w7(c,a,e=!1){const r=a.emitsCache,s=r.get(c);if(s!==void 0)return s;const i=c.emits;let l={},n=!1;if(!G(c)){const f=t=>{const o=w7(t,a,!0);o&&(n=!0,h1(l,o))};!e&&a.mixins.length&&a.mixins.forEach(f),c.extends&&f(c.extends),c.mixins&&c.mixins.forEach(f)}return!i&&!n?(l1(c)&&r.set(c,null),null):($(i)?i.forEach(f=>l[f]=null):h1(l,i),l1(c)&&r.set(c,l),l)}function N4(c,a){return!c||!M4(a)?!1:(a=a.slice(2).replace(/Once$/,""),j(c,a[0].toLowerCase()+a.slice(1))||j(c,T2(a))||j(c,a))}let W1=null,S4=null;function z4(c){const a=W1;return W1=c,S4=c&&c.type.__scopeId||null,a}function r8(c){S4=c}function s8(){S4=null}function tt(c,a=W1,e){if(!a||c._n)return c;const r=(...s)=>{r._d&&K0(-1);const i=z4(a);let l;try{l=c(...s)}finally{z4(i),r._d&&K0(1)}return l};return r._n=!0,r._c=!0,r._d=!0,r}function s6(c){const{type:a,vnode:e,proxy:r,withProxy:s,props:i,propsOptions:[l],slots:n,attrs:f,emit:t,render:o,renderCache:v,data:h,setupState:u,ctx:S,inheritAttrs:A}=c;let _,M;const d=z4(c);try{if(e.shapeFlag&4){const D=s||r,I=D;_=I1(o.call(I,D,v,i,u,h,S)),M=f}else{const D=a;_=I1(D.length>1?D(i,{attrs:f,slots:n,emit:t}):D(i,null)),M=a.props?f:mt(f)}}catch(D){h3.length=0,b4(D,c,1),_=N1(w2)}let w=_;if(M&&A!==!1){const D=Object.keys(M),{shapeFlag:I}=w;D.length&&I&7&&(l&&D.some(G6)&&(M=zt(M,l)),w=X2(w,M))}return e.dirs&&(w=X2(w),w.dirs=w.dirs?w.dirs.concat(e.dirs):e.dirs),e.transition&&(w.transition=e.transition),_=w,z4(d),_}const mt=c=>{let a;for(const e in c)(e==="class"||e==="style"||M4(e))&&((a||(a={}))[e]=c[e]);return a},zt=(c,a)=>{const e={};for(const r in c)(!G6(r)||!(r.slice(9)in a))&&(e[r]=c[r]);return e};function vt(c,a,e){const{props:r,children:s,component:i}=c,{props:l,children:n,patchFlag:f}=a,t=i.emitsOptions;if(a.dirs||a.transition)return!0;if(e&&f>=0){if(f&1024)return!0;if(f&16)return r?D0(r,l,t):!!l;if(f&8){const o=a.dynamicProps;for(let v=0;v<o.length;v++){const h=o[v];if(l[h]!==r[h]&&!N4(t,h))return!0}}}else return(s||n)&&(!n||!n.$stable)?!0:r===l?!1:r?l?D0(r,l,t):!0:!!l;return!1}function D0(c,a,e){const r=Object.keys(a);if(r.length!==Object.keys(c).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(a[i]!==c[i]&&!N4(e,i))return!0}return!1}function ht({vnode:c,parent:a},e){for(;a;){const r=a.subTree;if(r.suspense&&r.suspense.activeBranch===c&&(r.el=c.el),r===c)(c=a.vnode).el=e,a=a.parent;else break}}const Ht=Symbol.for("v-ndc"),ut=c=>c.__isSuspense;function pt(c,a){a&&a.pendingBranch?$(c)?a.effects.push(...c):a.effects.push(c):nt(c)}const Vt=Symbol.for("v-scx"),Mt=()=>Q1(Vt),G3={};function m3(c,a,e){return A7(c,a,e)}function A7(c,a,{immediate:e,deep:r,flush:s,once:i,onTrack:l,onTrigger:n}=i1){if(a&&i){const q=a;a=(...c1)=>{q(...c1),I()}}const f=L1,t=q=>r===!0?q:O2(q,r===!1?1:void 0);let o,v=!1,h=!1;if(y1(c)?(o=()=>c.value,v=m4(c)):W2(c)?(o=()=>t(c),v=!0):$(c)?(h=!0,v=c.some(q=>W2(q)||m4(q)),o=()=>c.map(q=>{if(y1(q))return q.value;if(W2(q))return t(q);if(G(q))return h2(q,f,2)})):G(c)?a?o=()=>h2(c,f,2):o=()=>(u&&u(),E1(c,f,3,[S])):o=T1,a&&r){const q=o;o=()=>O2(q())}let u,S=q=>{u=w.onStop=()=>{h2(q,f,4),u=w.onStop=void 0}},A;if(P4)if(S=T1,a?e&&E1(a,f,3,[o(),h?[]:void 0,S]):o(),s==="sync"){const q=Mt();A=q.__watcherHandles||(q.__watcherHandles=[])}else return T1;let _=h?new Array(c.length).fill(G3):G3;const M=()=>{if(!(!w.active||!w.dirty))if(a){const q=w.run();(r||v||(h?q.some((c1,u1)=>H2(c1,_[u1])):H2(q,_)))&&(u&&u(),E1(a,f,3,[q,_===G3?void 0:h&&_[0]===G3?[]:_,S]),_=q)}else w.run()};M.allowRecurse=!!a;let d;s==="sync"?d=M:s==="post"?d=()=>b1(M,f&&f.suspense):(M.pre=!0,f&&(M.id=f.uid),d=()=>e8(M));const w=new Z6(o,T1,d),D=To(),I=()=>{w.stop(),D&&W6(D.effects,w)};return a?e?M():_=w.run():s==="post"?b1(w.run.bind(w),f&&f.suspense):w.run(),A&&A.push(I),I}function Ct(c,a,e){const r=this.proxy,s=f1(c)?c.includes(".")?P7(r,c):()=>r[c]:c.bind(r,r);let i;G(a)?i=a:(i=a.handler,e=a);const l=w3(this),n=A7(s,i.bind(r),e);return l(),n}function P7(c,a){const e=a.split(".");return()=>{let r=c;for(let s=0;s<e.length&&r;s++)r=r[e[s]];return r}}function O2(c,a,e=0,r){if(!l1(c)||c.__v_skip)return c;if(a&&a>0){if(e>=a)return c;e++}if(r=r||new Set,r.has(c))return c;if(r.add(c),y1(c))O2(c.value,a,e,r);else if($(c))for(let s=0;s<c.length;s++)O2(c[s],a,e,r);else if(Q5(c)||G2(c))c.forEach(s=>{O2(s,a,e,r)});else if(a7(c))for(const s in c)O2(c[s],a,e,r);return c}function C2(c,a,e,r){const s=c.dirs,i=a&&a.dirs;for(let l=0;l<s.length;l++){const n=s[l];i&&(n.oldValue=i[l].value);let f=n.dir[r];f&&(F2(),E1(f,e,8,[c.el,n,c,a]),B2())}}/*! #__NO_SIDE_EFFECTS__ */function i8(c,a){return G(c)?h1({name:c.name},a,{setup:c}):c}const r4=c=>!!c.type.__asyncLoader,T7=c=>c.type.__isKeepAlive;function dt(c,a){F7(c,"a",a)}function Lt(c,a){F7(c,"da",a)}function F7(c,a,e=L1){const r=c.__wdc||(c.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return c()});if(y4(a,r,e),e){let s=e.parent;for(;s&&s.parent;)T7(s.parent.vnode)&&gt(r,a,e,s),s=s.parent}}function gt(c,a,e,r){const s=y4(a,c,r,!0);B7(()=>{W6(r[a],s)},e)}function y4(c,a,e=L1,r=!1){if(e){const s=e[c]||(e[c]=[]),i=a.__weh||(a.__weh=(...l)=>{if(e.isUnmounted)return;F2();const n=w3(e),f=E1(a,e,c,l);return n(),B2(),f});return r?s.unshift(i):s.push(i),i}}const e2=c=>(a,e=L1)=>(!P4||c==="sp")&&y4(c,(...r)=>a(...r),e),xt=e2("bm"),bt=e2("m"),Nt=e2("bu"),St=e2("u"),yt=e2("bum"),B7=e2("um"),kt=e2("sp"),wt=e2("rtg"),At=e2("rtc");function Pt(c,a=L1){y4("ec",c,a)}function W3(c,a,e,r){let s;const i=e&&e[r];if($(c)||f1(c)){s=new Array(c.length);for(let l=0,n=c.length;l<n;l++)s[l]=a(c[l],l,void 0,i&&i[l])}else if(typeof c=="number"){s=new Array(c);for(let l=0;l<c;l++)s[l]=a(l+1,l,void 0,i&&i[l])}else if(l1(c))if(c[Symbol.iterator])s=Array.from(c,(l,n)=>a(l,n,void 0,i&&i[n]));else{const l=Object.keys(c);s=new Array(l.length);for(let n=0,f=l.length;n<f;n++){const t=l[n];s[n]=a(c[t],t,n,i&&i[n])}}else s=[];return e&&(e[r]=s),s}const L6=c=>c?K7(c)?o8(c)||c.proxy:L6(c.parent):null,z3=h1(Object.create(null),{$:c=>c,$el:c=>c.vnode.el,$data:c=>c.data,$props:c=>c.props,$attrs:c=>c.attrs,$slots:c=>c.slots,$refs:c=>c.refs,$parent:c=>L6(c.parent),$root:c=>L6(c.root),$emit:c=>c.emit,$options:c=>l8(c),$forceUpdate:c=>c.f||(c.f=()=>{c.effect.dirty=!0,e8(c.update)}),$nextTick:c=>c.n||(c.n=N7.bind(c.proxy)),$watch:c=>Ct.bind(c)}),i6=(c,a)=>c!==i1&&!c.__isScriptSetup&&j(c,a),Tt={get({_:c},a){const{ctx:e,setupState:r,data:s,props:i,accessCache:l,type:n,appContext:f}=c;let t;if(a[0]!=="$"){const u=l[a];if(u!==void 0)switch(u){case 1:return r[a];case 2:return s[a];case 4:return e[a];case 3:return i[a]}else{if(i6(r,a))return l[a]=1,r[a];if(s!==i1&&j(s,a))return l[a]=2,s[a];if((t=c.propsOptions[0])&&j(t,a))return l[a]=3,i[a];if(e!==i1&&j(e,a))return l[a]=4,e[a];g6&&(l[a]=0)}}const o=z3[a];let v,h;if(o)return a==="$attrs"&&S1(c,"get",a),o(c);if((v=n.__cssModules)&&(v=v[a]))return v;if(e!==i1&&j(e,a))return l[a]=4,e[a];if(h=f.config.globalProperties,j(h,a))return h[a]},set({_:c},a,e){const{data:r,setupState:s,ctx:i}=c;return i6(s,a)?(s[a]=e,!0):r!==i1&&j(r,a)?(r[a]=e,!0):j(c.props,a)||a[0]==="$"&&a.slice(1)in c?!1:(i[a]=e,!0)},has({_:{data:c,setupState:a,accessCache:e,ctx:r,appContext:s,propsOptions:i}},l){let n;return!!e[l]||c!==i1&&j(c,l)||i6(a,l)||(n=i[0])&&j(n,l)||j(r,l)||j(z3,l)||j(s.config.globalProperties,l)},defineProperty(c,a,e){return e.get!=null?c._.accessCache[a]=0:j(e,"value")&&this.set(c,a,e.value,null),Reflect.defineProperty(c,a,e)}};function O0(c){return $(c)?c.reduce((a,e)=>(a[e]=null,a),{}):c}let g6=!0;function Ft(c){const a=l8(c),e=c.proxy,r=c.ctx;g6=!1,a.beforeCreate&&U0(a.beforeCreate,c,"bc");const{data:s,computed:i,methods:l,watch:n,provide:f,inject:t,created:o,beforeMount:v,mounted:h,beforeUpdate:u,updated:S,activated:A,deactivated:_,beforeDestroy:M,beforeUnmount:d,destroyed:w,unmounted:D,render:I,renderTracked:q,renderTriggered:c1,errorCaptured:u1,serverPrefetch:p1,expose:P1,inheritAttrs:s2,components:M2,directives:D1,filters:r3}=a;if(t&&Bt(t,r,null),l)for(const Q in l){const K=l[Q];G(K)&&(r[Q]=K.bind(e))}if(s){const Q=s.call(e,e);l1(Q)&&(c.data=x4(Q))}if(g6=!0,i)for(const Q in i){const K=i[Q],Z1=G(K)?K.bind(e,e):G(K.get)?K.get.bind(e,e):T1,i2=!G(K)&&G(K.set)?K.set.bind(e):T1,O1=v1({get:Z1,set:i2});Object.defineProperty(r,Q,{enumerable:!0,configurable:!0,get:()=>O1.value,set:g1=>O1.value=g1})}if(n)for(const Q in n)R7(n[Q],r,e,Q);if(f){const Q=G(f)?f.call(e):f;Reflect.ownKeys(Q).forEach(K=>{s4(K,Q[K])})}o&&U0(o,c,"c");function t1(Q,K){$(K)?K.forEach(Z1=>Q(Z1.bind(e))):K&&Q(K.bind(e))}if(t1(xt,v),t1(bt,h),t1(Nt,u),t1(St,S),t1(dt,A),t1(Lt,_),t1(Pt,u1),t1(At,q),t1(wt,c1),t1(yt,d),t1(B7,D),t1(kt,p1),$(P1))if(P1.length){const Q=c.exposed||(c.exposed={});P1.forEach(K=>{Object.defineProperty(Q,K,{get:()=>e[K],set:Z1=>e[K]=Z1})})}else c.exposed||(c.exposed={});I&&c.render===T1&&(c.render=I),s2!=null&&(c.inheritAttrs=s2),M2&&(c.components=M2),D1&&(c.directives=D1)}function Bt(c,a,e=T1){$(c)&&(c=x6(c));for(const r in c){const s=c[r];let i;l1(s)?"default"in s?i=Q1(s.from||r,s.default,!0):i=Q1(s.from||r):i=Q1(s),y1(i)?Object.defineProperty(a,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:l=>i.value=l}):a[r]=i}}function U0(c,a,e){E1($(c)?c.map(r=>r.bind(a.proxy)):c.bind(a.proxy),a,e)}function R7(c,a,e,r){const s=r.includes(".")?P7(e,r):()=>e[r];if(f1(c)){const i=a[c];G(i)&&m3(s,i)}else if(G(c))m3(s,c.bind(e));else if(l1(c))if($(c))c.forEach(i=>R7(i,a,e,r));else{const i=G(c.handler)?c.handler.bind(e):a[c.handler];G(i)&&m3(s,i,c)}}function l8(c){const a=c.type,{mixins:e,extends:r}=a,{mixins:s,optionsCache:i,config:{optionMergeStrategies:l}}=c.appContext,n=i.get(a);let f;return n?f=n:!s.length&&!e&&!r?f=a:(f={},s.length&&s.forEach(t=>v4(f,t,l,!0)),v4(f,a,l)),l1(a)&&i.set(a,f),f}function v4(c,a,e,r=!1){const{mixins:s,extends:i}=a;i&&v4(c,i,e,!0),s&&s.forEach(l=>v4(c,l,e,!0));for(const l in a)if(!(r&&l==="expose")){const n=Rt[l]||e&&e[l];c[l]=n?n(c[l],a[l]):a[l]}return c}const Rt={data:$0,props:I0,emits:I0,methods:f3,computed:f3,beforeCreate:d1,created:d1,beforeMount:d1,mounted:d1,beforeUpdate:d1,updated:d1,beforeDestroy:d1,beforeUnmount:d1,destroyed:d1,unmounted:d1,activated:d1,deactivated:d1,errorCaptured:d1,serverPrefetch:d1,components:f3,directives:f3,watch:Et,provide:$0,inject:_t};function $0(c,a){return a?c?function(){return h1(G(c)?c.call(this,this):c,G(a)?a.call(this,this):a)}:a:c}function _t(c,a){return f3(x6(c),x6(a))}function x6(c){if($(c)){const a={};for(let e=0;e<c.length;e++)a[c[e]]=c[e];return a}return c}function d1(c,a){return c?[...new Set([].concat(c,a))]:a}function f3(c,a){return c?h1(Object.create(null),c,a):a}function I0(c,a){return c?$(c)&&$(a)?[...new Set([...c,...a])]:h1(Object.create(null),O0(c),O0(a??{})):a}function Et(c,a){if(!c)return a;if(!a)return c;const e=h1(Object.create(null),c);for(const r in a)e[r]=d1(c[r],a[r]);return e}function _7(){return{app:null,config:{isNativeTag:Vo,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let qt=0;function Dt(c,a){return function(r,s=null){G(r)||(r=h1({},r)),s!=null&&!l1(s)&&(s=null);const i=_7(),l=new WeakSet;let n=!1;const f=i.app={_uid:qt++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:om,get config(){return i.config},set config(t){},use(t,...o){return l.has(t)||(t&&G(t.install)?(l.add(t),t.install(f,...o)):G(t)&&(l.add(t),t(f,...o))),f},mixin(t){return i.mixins.includes(t)||i.mixins.push(t),f},component(t,o){return o?(i.components[t]=o,f):i.components[t]},directive(t,o){return o?(i.directives[t]=o,f):i.directives[t]},mount(t,o,v){if(!n){const h=N1(r,s);return h.appContext=i,v===!0?v="svg":v===!1&&(v=void 0),o&&a?a(h,t):c(h,t,v),n=!0,f._container=t,t.__vue_app__=f,o8(h.component)||h.component.proxy}},unmount(){n&&(c(null,f._container),delete f._container.__vue_app__)},provide(t,o){return i.provides[t]=o,f},runWithContext(t){const o=v3;v3=f;try{return t()}finally{v3=o}}};return f}}let v3=null;function s4(c,a){if(L1){let e=L1.provides;const r=L1.parent&&L1.parent.provides;r===e&&(e=L1.provides=Object.create(r)),e[c]=a}}function Q1(c,a,e=!1){const r=L1||W1;if(r||v3){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:v3._context.provides;if(s&&c in s)return s[c];if(arguments.length>1)return e&&G(a)?a.call(r&&r.proxy):a}}function Ot(c,a,e,r=!1){const s={},i={};t4(i,w4,1),c.propsDefaults=Object.create(null),E7(c,a,s,i);for(const l in c.propsOptions[0])l in s||(s[l]=void 0);e?c.props=r?s:p7(s):c.type.props?c.props=s:c.props=i,c.attrs=i}function Ut(c,a,e,r){const{props:s,attrs:i,vnode:{patchFlag:l}}=c,n=Z(s),[f]=c.propsOptions;let t=!1;if((r||l>0)&&!(l&16)){if(l&8){const o=c.vnode.dynamicProps;for(let v=0;v<o.length;v++){let h=o[v];if(N4(c.emitsOptions,h))continue;const u=a[h];if(f)if(j(i,h))u!==i[h]&&(i[h]=u,t=!0);else{const S=K2(h);s[S]=b6(f,n,S,u,c,!1)}else u!==i[h]&&(i[h]=u,t=!0)}}}else{E7(c,a,s,i)&&(t=!0);let o;for(const v in n)(!a||!j(a,v)&&((o=T2(v))===v||!j(a,o)))&&(f?e&&(e[v]!==void 0||e[o]!==void 0)&&(s[v]=b6(f,n,v,void 0,c,!0)):delete s[v]);if(i!==n)for(const v in i)(!a||!j(a,v))&&(delete i[v],t=!0)}t&&X1(c,"set","$attrs")}function E7(c,a,e,r){const[s,i]=c.propsOptions;let l=!1,n;if(a)for(let f in a){if(t3(f))continue;const t=a[f];let o;s&&j(s,o=K2(f))?!i||!i.includes(o)?e[o]=t:(n||(n={}))[o]=t:N4(c.emitsOptions,f)||(!(f in r)||t!==r[f])&&(r[f]=t,l=!0)}if(i){const f=Z(e),t=n||i1;for(let o=0;o<i.length;o++){const v=i[o];e[v]=b6(s,f,v,t[v],c,!j(t,v))}}return l}function b6(c,a,e,r,s,i){const l=c[e];if(l!=null){const n=j(l,"default");if(n&&r===void 0){const f=l.default;if(l.type!==Function&&!l.skipFactory&&G(f)){const{propsDefaults:t}=s;if(e in t)r=t[e];else{const o=w3(s);r=t[e]=f.call(null,a),o()}}else r=f}l[0]&&(i&&!n?r=!1:l[1]&&(r===""||r===T2(e))&&(r=!0))}return r}function q7(c,a,e=!1){const r=a.propsCache,s=r.get(c);if(s)return s;const i=c.props,l={},n=[];let f=!1;if(!G(c)){const o=v=>{f=!0;const[h,u]=q7(v,a,!0);h1(l,h),u&&n.push(...u)};!e&&a.mixins.length&&a.mixins.forEach(o),c.extends&&o(c.extends),c.mixins&&c.mixins.forEach(o)}if(!i&&!f)return l1(c)&&r.set(c,I2),I2;if($(i))for(let o=0;o<i.length;o++){const v=K2(i[o]);G0(v)&&(l[v]=i1)}else if(i)for(const o in i){const v=K2(o);if(G0(v)){const h=i[o],u=l[v]=$(h)||G(h)?{type:h}:h1({},h);if(u){const S=Z0(Boolean,u.type),A=Z0(String,u.type);u[0]=S>-1,u[1]=A<0||S<A,(S>-1||j(u,"default"))&&n.push(v)}}}const t=[l,n];return l1(c)&&r.set(c,t),t}function G0(c){return c[0]!=="$"&&!t3(c)}function W0(c){return c===null?"null":typeof c=="function"?c.name||"":typeof c=="object"&&c.constructor&&c.constructor.name||""}function j0(c,a){return W0(c)===W0(a)}function Z0(c,a){return $(a)?a.findIndex(e=>j0(e,c)):G(a)&&j0(a,c)?0:-1}const D7=c=>c[0]==="_"||c==="$stable",n8=c=>$(c)?c.map(I1):[I1(c)],$t=(c,a,e)=>{if(a._n)return a;const r=tt((...s)=>n8(a(...s)),e);return r._c=!1,r},O7=(c,a,e)=>{const r=c._ctx;for(const s in c){if(D7(s))continue;const i=c[s];if(G(i))a[s]=$t(s,i,r);else if(i!=null){const l=n8(i);a[s]=()=>l}}},U7=(c,a)=>{const e=n8(a);c.slots.default=()=>e},It=(c,a)=>{if(c.vnode.shapeFlag&32){const e=a._;e?(c.slots=Z(a),t4(a,"_",e)):O7(a,c.slots={})}else c.slots={},a&&U7(c,a);t4(c.slots,w4,1)},Gt=(c,a,e)=>{const{vnode:r,slots:s}=c;let i=!0,l=i1;if(r.shapeFlag&32){const n=a._;n?e&&n===1?i=!1:(h1(s,a),!e&&n===1&&delete s._):(i=!a.$stable,O7(a,s)),l=a}else a&&(U7(c,a),l={default:1});if(i)for(const n in s)!D7(n)&&l[n]==null&&delete s[n]};function N6(c,a,e,r,s=!1){if($(c)){c.forEach((h,u)=>N6(h,a&&($(a)?a[u]:a),e,r,s));return}if(r4(r)&&!s)return;const i=r.shapeFlag&4?o8(r.component)||r.component.proxy:r.el,l=s?null:i,{i:n,r:f}=c,t=a&&a.r,o=n.refs===i1?n.refs={}:n.refs,v=n.setupState;if(t!=null&&t!==f&&(f1(t)?(o[t]=null,j(v,t)&&(v[t]=null)):y1(t)&&(t.value=null)),G(f))h2(f,n,12,[l,o]);else{const h=f1(f),u=y1(f);if(h||u){const S=()=>{if(c.f){const A=h?j(v,f)?v[f]:o[f]:f.value;s?$(A)&&W6(A,i):$(A)?A.includes(i)||A.push(i):h?(o[f]=[i],j(v,f)&&(v[f]=o[f])):(f.value=[i],c.k&&(o[c.k]=f.value))}else h?(o[f]=l,j(v,f)&&(v[f]=l)):u&&(f.value=l,c.k&&(o[c.k]=l))};l?(S.id=-1,b1(S,e)):S()}}}const b1=pt;function Wt(c){return jt(c)}function jt(c,a){const e=r7();e.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:l,createText:n,createComment:f,setText:t,setElementText:o,parentNode:v,nextSibling:h,setScopeId:u=T1,insertStaticContent:S}=c,A=(m,z,H,C=null,p=null,x=null,k=void 0,g=null,N=!!z.dynamicChildren)=>{if(m===z)return;m&&!l3(m,z)&&(C=V(m),g1(m,p,x,!0),m=null),z.patchFlag===-2&&(N=!1,z.dynamicChildren=null);const{type:L,ref:F,shapeFlag:O}=z;switch(L){case k4:_(m,z,H,C);break;case w2:M(m,z,H,C);break;case i4:m==null&&d(z,H,C,k);break;case w1:M2(m,z,H,C,p,x,k,g,N);break;default:O&1?I(m,z,H,C,p,x,k,g,N):O&6?D1(m,z,H,C,p,x,k,g,N):(O&64||O&128)&&L.process(m,z,H,C,p,x,k,g,N,R)}F!=null&&p&&N6(F,m&&m.ref,x,z||m,!z)},_=(m,z,H,C)=>{if(m==null)r(z.el=n(z.children),H,C);else{const p=z.el=m.el;z.children!==m.children&&t(p,z.children)}},M=(m,z,H,C)=>{m==null?r(z.el=f(z.children||""),H,C):z.el=m.el},d=(m,z,H,C)=>{[m.el,m.anchor]=S(m.children,z,H,C,m.el,m.anchor)},w=({el:m,anchor:z},H,C)=>{let p;for(;m&&m!==z;)p=h(m),r(m,H,C),m=p;r(z,H,C)},D=({el:m,anchor:z})=>{let H;for(;m&&m!==z;)H=h(m),s(m),m=H;s(z)},I=(m,z,H,C,p,x,k,g,N)=>{z.type==="svg"?k="svg":z.type==="math"&&(k="mathml"),m==null?q(z,H,C,p,x,k,g,N):p1(m,z,p,x,k,g,N)},q=(m,z,H,C,p,x,k,g)=>{let N,L;const{props:F,shapeFlag:O,transition:E,dirs:U}=m;if(N=m.el=l(m.type,x,F&&F.is,F),O&8?o(N,m.children):O&16&&u1(m.children,N,null,C,p,l6(m,x),k,g),U&&C2(m,null,C,"created"),c1(N,m,m.scopeId,k,C),F){for(const J in F)J!=="value"&&!t3(J)&&i(N,J,null,F[J],x,m.children,C,p,V1);"value"in F&&i(N,"value",null,F.value,x),(L=F.onVnodeBeforeMount)&&$1(L,C,m)}U&&C2(m,null,C,"beforeMount");const W=Zt(p,E);W&&E.beforeEnter(N),r(N,z,H),((L=F&&F.onVnodeMounted)||W||U)&&b1(()=>{L&&$1(L,C,m),W&&E.enter(N),U&&C2(m,null,C,"mounted")},p)},c1=(m,z,H,C,p)=>{if(H&&u(m,H),C)for(let x=0;x<C.length;x++)u(m,C[x]);if(p){let x=p.subTree;if(z===x){const k=p.vnode;c1(m,k,k.scopeId,k.slotScopeIds,p.parent)}}},u1=(m,z,H,C,p,x,k,g,N=0)=>{for(let L=N;L<m.length;L++){const F=m[L]=g?t2(m[L]):I1(m[L]);A(null,F,z,H,C,p,x,k,g)}},p1=(m,z,H,C,p,x,k)=>{const g=z.el=m.el;let{patchFlag:N,dynamicChildren:L,dirs:F}=z;N|=m.patchFlag&16;const O=m.props||i1,E=z.props||i1;let U;if(H&&d2(H,!1),(U=E.onVnodeBeforeUpdate)&&$1(U,H,z,m),F&&C2(z,m,H,"beforeUpdate"),H&&d2(H,!0),L?P1(m.dynamicChildren,L,g,H,C,l6(z,p),x):k||K(m,z,g,null,H,C,l6(z,p),x,!1),N>0){if(N&16)s2(g,z,O,E,H,C,p);else if(N&2&&O.class!==E.class&&i(g,"class",null,E.class,p),N&4&&i(g,"style",O.style,E.style,p),N&8){const W=z.dynamicProps;for(let J=0;J<W.length;J++){const s1=W[J],m1=O[s1],F1=E[s1];(F1!==m1||s1==="value")&&i(g,s1,m1,F1,p,m.children,H,C,V1)}}N&1&&m.children!==z.children&&o(g,z.children)}else!k&&L==null&&s2(g,z,O,E,H,C,p);((U=E.onVnodeUpdated)||F)&&b1(()=>{U&&$1(U,H,z,m),F&&C2(z,m,H,"updated")},C)},P1=(m,z,H,C,p,x,k)=>{for(let g=0;g<z.length;g++){const N=m[g],L=z[g],F=N.el&&(N.type===w1||!l3(N,L)||N.shapeFlag&70)?v(N.el):H;A(N,L,F,null,C,p,x,k,!0)}},s2=(m,z,H,C,p,x,k)=>{if(H!==C){if(H!==i1)for(const g in H)!t3(g)&&!(g in C)&&i(m,g,H[g],null,k,z.children,p,x,V1);for(const g in C){if(t3(g))continue;const N=C[g],L=H[g];N!==L&&g!=="value"&&i(m,g,L,N,k,z.children,p,x,V1)}"value"in C&&i(m,"value",H.value,C.value,k)}},M2=(m,z,H,C,p,x,k,g,N)=>{const L=z.el=m?m.el:n(""),F=z.anchor=m?m.anchor:n("");let{patchFlag:O,dynamicChildren:E,slotScopeIds:U}=z;U&&(g=g?g.concat(U):U),m==null?(r(L,H,C),r(F,H,C),u1(z.children||[],H,F,p,x,k,g,N)):O>0&&O&64&&E&&m.dynamicChildren?(P1(m.dynamicChildren,E,H,p,x,k,g),(z.key!=null||p&&z===p.subTree)&&$7(m,z,!0)):K(m,z,H,F,p,x,k,g,N)},D1=(m,z,H,C,p,x,k,g,N)=>{z.slotScopeIds=g,m==null?z.shapeFlag&512?p.ctx.activate(z,H,C,k,N):r3(z,H,C,p,x,k,N):R2(m,z,N)},r3=(m,z,H,C,p,x,k)=>{const g=m.component=rm(m,C,p);if(T7(m)&&(g.ctx.renderer=R),sm(g),g.asyncDep){if(p&&p.registerDep(g,t1),!m.el){const N=g.subTree=N1(w2);M(null,N,z,H)}}else t1(g,m,z,H,p,x,k)},R2=(m,z,H)=>{const C=z.component=m.component;if(vt(m,z,H))if(C.asyncDep&&!C.asyncResolved){Q(C,z,H);return}else C.next=z,lt(C.update),C.effect.dirty=!0,C.update();else z.el=m.el,C.vnode=z},t1=(m,z,H,C,p,x,k)=>{const g=()=>{if(m.isMounted){let{next:F,bu:O,u:E,parent:U,vnode:W}=m;{const q2=I7(m);if(q2){F&&(F.el=W.el,Q(m,F,k)),q2.asyncDep.then(()=>{m.isUnmounted||g()});return}}let J=F,s1;d2(m,!1),F?(F.el=W.el,Q(m,F,k)):F=W,O&&e6(O),(s1=F.props&&F.props.onVnodeBeforeUpdate)&&$1(s1,U,F,W),d2(m,!0);const m1=s6(m),F1=m.subTree;m.subTree=m1,A(F1,m1,v(F1.el),V(F1),m,p,x),F.el=m1.el,J===null&&ht(m,m1.el),E&&b1(E,p),(s1=F.props&&F.props.onVnodeUpdated)&&b1(()=>$1(s1,U,F,W),p)}else{let F;const{el:O,props:E}=z,{bm:U,m:W,parent:J}=m,s1=r4(z);if(d2(m,!1),U&&e6(U),!s1&&(F=E&&E.onVnodeBeforeMount)&&$1(F,J,z),d2(m,!0),O&&r1){const m1=()=>{m.subTree=s6(m),r1(O,m.subTree,m,p,null)};s1?z.type.__asyncLoader().then(()=>!m.isUnmounted&&m1()):m1()}else{const m1=m.subTree=s6(m);A(null,m1,H,C,m,p,x),z.el=m1.el}if(W&&b1(W,p),!s1&&(F=E&&E.onVnodeMounted)){const m1=z;b1(()=>$1(F,J,m1),p)}(z.shapeFlag&256||J&&r4(J.vnode)&&J.vnode.shapeFlag&256)&&m.a&&b1(m.a,p),m.isMounted=!0,z=H=C=null}},N=m.effect=new Z6(g,T1,()=>e8(L),m.scope),L=m.update=()=>{N.dirty&&N.run()};L.id=m.uid,d2(m,!0),L()},Q=(m,z,H)=>{z.component=m;const C=m.vnode.props;m.vnode=z,m.next=null,Ut(m,z.props,C,H),Gt(m,z.children,H),F2(),q0(m),B2()},K=(m,z,H,C,p,x,k,g,N=!1)=>{const L=m&&m.children,F=m?m.shapeFlag:0,O=z.children,{patchFlag:E,shapeFlag:U}=z;if(E>0){if(E&128){i2(L,O,H,C,p,x,k,g,N);return}else if(E&256){Z1(L,O,H,C,p,x,k,g,N);return}}U&8?(F&16&&V1(L,p,x),O!==L&&o(H,O)):F&16?U&16?i2(L,O,H,C,p,x,k,g,N):V1(L,p,x,!0):(F&8&&o(H,""),U&16&&u1(O,H,C,p,x,k,g,N))},Z1=(m,z,H,C,p,x,k,g,N)=>{m=m||I2,z=z||I2;const L=m.length,F=z.length,O=Math.min(L,F);let E;for(E=0;E<O;E++){const U=z[E]=N?t2(z[E]):I1(z[E]);A(m[E],U,H,null,p,x,k,g,N)}L>F?V1(m,p,x,!0,!1,O):u1(z,H,C,p,x,k,g,N,O)},i2=(m,z,H,C,p,x,k,g,N)=>{let L=0;const F=z.length;let O=m.length-1,E=F-1;for(;L<=O&&L<=E;){const U=m[L],W=z[L]=N?t2(z[L]):I1(z[L]);if(l3(U,W))A(U,W,H,null,p,x,k,g,N);else break;L++}for(;L<=O&&L<=E;){const U=m[O],W=z[E]=N?t2(z[E]):I1(z[E]);if(l3(U,W))A(U,W,H,null,p,x,k,g,N);else break;O--,E--}if(L>O){if(L<=E){const U=E+1,W=U<F?z[U].el:C;for(;L<=E;)A(null,z[L]=N?t2(z[L]):I1(z[L]),H,W,p,x,k,g,N),L++}}else if(L>E)for(;L<=O;)g1(m[L],p,x,!0),L++;else{const U=L,W=L,J=new Map;for(L=W;L<=E;L++){const k1=z[L]=N?t2(z[L]):I1(z[L]);k1.key!=null&&J.set(k1.key,L)}let s1,m1=0;const F1=E-W+1;let q2=!1,y0=0;const s3=new Array(F1);for(L=0;L<F1;L++)s3[L]=0;for(L=U;L<=O;L++){const k1=m[L];if(m1>=F1){g1(k1,p,x,!0);continue}let U1;if(k1.key!=null)U1=J.get(k1.key);else for(s1=W;s1<=E;s1++)if(s3[s1-W]===0&&l3(k1,z[s1])){U1=s1;break}U1===void 0?g1(k1,p,x,!0):(s3[U1-W]=L+1,U1>=y0?y0=U1:q2=!0,A(k1,z[U1],H,null,p,x,k,g,N),m1++)}const k0=q2?Kt(s3):I2;for(s1=k0.length-1,L=F1-1;L>=0;L--){const k1=W+L,U1=z[k1],w0=k1+1<F?z[k1+1].el:C;s3[L]===0?A(null,U1,H,w0,p,x,k,g,N):q2&&(s1<0||L!==k0[s1]?O1(U1,H,w0,2):s1--)}}},O1=(m,z,H,C,p=null)=>{const{el:x,type:k,transition:g,children:N,shapeFlag:L}=m;if(L&6){O1(m.component.subTree,z,H,C);return}if(L&128){m.suspense.move(z,H,C);return}if(L&64){k.move(m,z,H,R);return}if(k===w1){r(x,z,H);for(let O=0;O<N.length;O++)O1(N[O],z,H,C);r(m.anchor,z,H);return}if(k===i4){w(m,z,H);return}if(C!==2&&L&1&&g)if(C===0)g.beforeEnter(x),r(x,z,H),b1(()=>g.enter(x),p);else{const{leave:O,delayLeave:E,afterLeave:U}=g,W=()=>r(x,z,H),J=()=>{O(x,()=>{W(),U&&U()})};E?E(x,W,J):J()}else r(x,z,H)},g1=(m,z,H,C=!1,p=!1)=>{const{type:x,props:k,ref:g,children:N,dynamicChildren:L,shapeFlag:F,patchFlag:O,dirs:E}=m;if(g!=null&&N6(g,null,H,m,!0),F&256){z.ctx.deactivate(m);return}const U=F&1&&E,W=!r4(m);let J;if(W&&(J=k&&k.onVnodeBeforeUnmount)&&$1(J,z,m),F&6)q3(m.component,H,C);else{if(F&128){m.suspense.unmount(H,C);return}U&&C2(m,null,z,"beforeUnmount"),F&64?m.type.remove(m,z,H,p,R,C):L&&(x!==w1||O>0&&O&64)?V1(L,z,H,!1,!0):(x===w1&&O&384||!p&&F&16)&&V1(N,z,H),C&&_2(m)}(W&&(J=k&&k.onVnodeUnmounted)||U)&&b1(()=>{J&&$1(J,z,m),U&&C2(m,null,z,"unmounted")},H)},_2=m=>{const{type:z,el:H,anchor:C,transition:p}=m;if(z===w1){E2(H,C);return}if(z===i4){D(m);return}const x=()=>{s(H),p&&!p.persisted&&p.afterLeave&&p.afterLeave()};if(m.shapeFlag&1&&p&&!p.persisted){const{leave:k,delayLeave:g}=p,N=()=>k(H,x);g?g(m.el,x,N):N()}else x()},E2=(m,z)=>{let H;for(;m!==z;)H=h(m),s(m),m=H;s(z)},q3=(m,z,H)=>{const{bum:C,scope:p,update:x,subTree:k,um:g}=m;C&&e6(C),p.stop(),x&&(x.active=!1,g1(k,m,z,H)),g&&b1(g,z),b1(()=>{m.isUnmounted=!0},z),z&&z.pendingBranch&&!z.isUnmounted&&m.asyncDep&&!m.asyncResolved&&m.suspenseId===z.pendingId&&(z.deps--,z.deps===0&&z.resolve())},V1=(m,z,H,C=!1,p=!1,x=0)=>{for(let k=x;k<m.length;k++)g1(m[k],z,H,C,p)},V=m=>m.shapeFlag&6?V(m.component.subTree):m.shapeFlag&128?m.suspense.next():h(m.anchor||m.el);let T=!1;const y=(m,z,H)=>{m==null?z._vnode&&g1(z._vnode,null,null,!0):A(z._vnode||null,m,z,null,null,null,H),T||(T=!0,q0(),y7(),T=!1),z._vnode=m},R={p:A,um:g1,m:O1,r:_2,mt:r3,mc:u1,pc:K,pbc:P1,n:V,o:c};let Y,r1;return a&&([Y,r1]=a(R)),{render:y,hydrate:Y,createApp:Dt(y,Y)}}function l6({type:c,props:a},e){return e==="svg"&&c==="foreignObject"||e==="mathml"&&c==="annotation-xml"&&a&&a.encoding&&a.encoding.includes("html")?void 0:e}function d2({effect:c,update:a},e){c.allowRecurse=a.allowRecurse=e}function Zt(c,a){return(!c||c&&!c.pendingBranch)&&a&&!a.persisted}function $7(c,a,e=!1){const r=c.children,s=a.children;if($(r)&&$(s))for(let i=0;i<r.length;i++){const l=r[i];let n=s[i];n.shapeFlag&1&&!n.dynamicChildren&&((n.patchFlag<=0||n.patchFlag===32)&&(n=s[i]=t2(s[i]),n.el=l.el),e||$7(l,n)),n.type===k4&&(n.el=l.el)}}function Kt(c){const a=c.slice(),e=[0];let r,s,i,l,n;const f=c.length;for(r=0;r<f;r++){const t=c[r];if(t!==0){if(s=e[e.length-1],c[s]<t){a[r]=s,e.push(r);continue}for(i=0,l=e.length-1;i<l;)n=i+l>>1,c[e[n]]<t?i=n+1:l=n;t<c[e[i]]&&(i>0&&(a[r]=e[i-1]),e[i]=r)}}for(i=e.length,l=e[i-1];i-- >0;)e[i]=l,l=a[l];return e}function I7(c){const a=c.subTree.component;if(a)return a.asyncDep&&!a.asyncResolved?a:I7(a)}const Yt=c=>c.__isTeleport,w1=Symbol.for("v-fgt"),k4=Symbol.for("v-txt"),w2=Symbol.for("v-cmt"),i4=Symbol.for("v-stc"),h3=[];let R1=null;function z1(c=!1){h3.push(R1=c?null:[])}function Xt(){h3.pop(),R1=h3[h3.length-1]||null}let L3=1;function K0(c){L3+=c}function G7(c){return c.dynamicChildren=L3>0?R1||I2:null,Xt(),L3>0&&R1&&R1.push(c),c}function M1(c,a,e,r,s,i){return G7(b(c,a,e,r,s,i,!0))}function W7(c,a,e,r,s){return G7(N1(c,a,e,r,s,!0))}function S6(c){return c?c.__v_isVNode===!0:!1}function l3(c,a){return c.type===a.type&&c.key===a.key}const w4="__vInternal",j7=({key:c})=>c??null,l4=({ref:c,ref_key:a,ref_for:e})=>(typeof c=="number"&&(c=""+c),c!=null?f1(c)||y1(c)||G(c)?{i:W1,r:c,k:a,f:!!e}:c:null);function b(c,a=null,e=null,r=0,s=null,i=c===w1?0:1,l=!1,n=!1){const f={__v_isVNode:!0,__v_skip:!0,type:c,props:a,key:a&&j7(a),ref:a&&l4(a),scopeId:S4,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:W1};return n?(f8(f,e),i&128&&c.normalize(f)):e&&(f.shapeFlag|=f1(e)?8:16),L3>0&&!l&&R1&&(f.patchFlag>0||i&6)&&f.patchFlag!==32&&R1.push(f),f}const N1=Qt;function Qt(c,a=null,e=null,r=0,s=null,i=!1){if((!c||c===Ht)&&(c=w2),S6(c)){const n=X2(c,a,!0);return e&&f8(n,e),L3>0&&!i&&R1&&(n.shapeFlag&6?R1[R1.indexOf(c)]=n:R1.push(n)),n.patchFlag|=-2,n}if(fm(c)&&(c=c.__vccOpts),a){a=Jt(a);let{class:n,style:f}=a;n&&!f1(n)&&(a.class=L4(n)),l1(f)&&(M7(f)&&!$(f)&&(f=h1({},f)),a.style=x2(f))}const l=f1(c)?1:ut(c)?128:Yt(c)?64:l1(c)?4:G(c)?2:0;return b(c,a,e,r,s,l,i,!0)}function Jt(c){return c?M7(c)||w4 in c?h1({},c):c:null}function X2(c,a,e=!1){const{props:r,ref:s,patchFlag:i,children:l}=c,n=a?cm(r||{},a):r;return{__v_isVNode:!0,__v_skip:!0,type:c.type,props:n,key:n&&j7(n),ref:a&&a.ref?e&&s?$(s)?s.concat(l4(a)):[s,l4(a)]:l4(a):s,scopeId:c.scopeId,slotScopeIds:c.slotScopeIds,children:l,target:c.target,targetAnchor:c.targetAnchor,staticCount:c.staticCount,shapeFlag:c.shapeFlag,patchFlag:a&&c.type!==w1?i===-1?16:i|16:i,dynamicProps:c.dynamicProps,dynamicChildren:c.dynamicChildren,appContext:c.appContext,dirs:c.dirs,transition:c.transition,component:c.component,suspense:c.suspense,ssContent:c.ssContent&&X2(c.ssContent),ssFallback:c.ssFallback&&X2(c.ssFallback),el:c.el,anchor:c.anchor,ctx:c.ctx,ce:c.ce}}function A4(c=" ",a=0){return N1(k4,null,c,a)}function Z7(c,a){const e=N1(i4,null,c);return e.staticCount=a,e}function L2(c="",a=!1){return a?(z1(),W7(w2,null,c)):N1(w2,null,c)}function I1(c){return c==null||typeof c=="boolean"?N1(w2):$(c)?N1(w1,null,c.slice()):typeof c=="object"?t2(c):N1(k4,null,String(c))}function t2(c){return c.el===null&&c.patchFlag!==-1||c.memo?c:X2(c)}function f8(c,a){let e=0;const{shapeFlag:r}=c;if(a==null)a=null;else if($(a))e=16;else if(typeof a=="object")if(r&65){const s=a.default;s&&(s._c&&(s._d=!1),f8(c,s()),s._c&&(s._d=!0));return}else{e=32;const s=a._;!s&&!(w4 in a)?a._ctx=W1:s===3&&W1&&(W1.slots._===1?a._=1:(a._=2,c.patchFlag|=1024))}else G(a)?(a={default:a,_ctx:W1},e=32):(a=String(a),r&64?(e=16,a=[A4(a)]):e=8);c.children=a,c.shapeFlag|=e}function cm(...c){const a={};for(let e=0;e<c.length;e++){const r=c[e];for(const s in r)if(s==="class")a.class!==r.class&&(a.class=L4([a.class,r.class]));else if(s==="style")a.style=x2([a.style,r.style]);else if(M4(s)){const i=a[s],l=r[s];l&&i!==l&&!($(i)&&i.includes(l))&&(a[s]=i?[].concat(i,l):l)}else s!==""&&(a[s]=r[s])}return a}function $1(c,a,e,r=null){E1(c,a,7,[e,r])}const am=_7();let em=0;function rm(c,a,e){const r=c.type,s=(a?a.appContext:c.appContext)||am,i={uid:em++,vnode:c,type:r,parent:a,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new Ao(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:a?a.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:q7(r,s),emitsOptions:w7(r,s),emit:null,emitted:null,propsDefaults:i1,inheritAttrs:r.inheritAttrs,ctx:i1,data:i1,props:i1,attrs:i1,slots:i1,refs:i1,setupState:i1,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=a?a.root:i,i.emit=ot.bind(null,i),c.ce&&c.ce(i),i}let L1=null,h4,y6;{const c=r7(),a=(e,r)=>{let s;return(s=c[e])||(s=c[e]=[]),s.push(r),i=>{s.length>1?s.forEach(l=>l(i)):s[0](i)}};h4=a("__VUE_INSTANCE_SETTERS__",e=>L1=e),y6=a("__VUE_SSR_SETTERS__",e=>P4=e)}const w3=c=>{const a=L1;return h4(c),c.scope.on(),()=>{c.scope.off(),h4(a)}},Y0=()=>{L1&&L1.scope.off(),h4(null)};function K7(c){return c.vnode.shapeFlag&4}let P4=!1;function sm(c,a=!1){a&&y6(a);const{props:e,children:r}=c.vnode,s=K7(c);Ot(c,e,s,a),It(c,r);const i=s?im(c,a):void 0;return a&&y6(!1),i}function im(c,a){const e=c.type;c.accessCache=Object.create(null),c.proxy=C7(new Proxy(c.ctx,Tt));const{setup:r}=e;if(r){const s=c.setupContext=r.length>1?nm(c):null,i=w3(c);F2();const l=h2(r,c,0,[c.props,s]);if(B2(),i(),J5(l)){if(l.then(Y0,Y0),a)return l.then(n=>{X0(c,n,a)}).catch(n=>{b4(n,c,0)});c.asyncDep=l}else X0(c,l,a)}else Y7(c,a)}function X0(c,a,e){G(a)?c.type.__ssrInlineRender?c.ssrRender=a:c.render=a:l1(a)&&(c.setupState=x7(a)),Y7(c,e)}let Q0;function Y7(c,a,e){const r=c.type;if(!c.render){if(!a&&Q0&&!r.render){const s=r.template||l8(c).template;if(s){const{isCustomElement:i,compilerOptions:l}=c.appContext.config,{delimiters:n,compilerOptions:f}=r,t=h1(h1({isCustomElement:i,delimiters:n},l),f);r.render=Q0(s,t)}}c.render=r.render||T1}{const s=w3(c);F2();try{Ft(c)}finally{B2(),s()}}}function lm(c){return c.attrsProxy||(c.attrsProxy=new Proxy(c.attrs,{get(a,e){return S1(c,"get","$attrs"),a[e]}}))}function nm(c){const a=e=>{c.exposed=e||{}};return{get attrs(){return lm(c)},slots:c.slots,emit:c.emit,expose:a}}function o8(c){if(c.exposed)return c.exposeProxy||(c.exposeProxy=new Proxy(x7(C7(c.exposed)),{get(a,e){if(e in a)return a[e];if(e in z3)return z3[e](c)},has(a,e){return e in a||e in z3}}))}function fm(c){return G(c)&&"__vccOpts"in c}const v1=(c,a)=>Jo(c,a,P4);function t8(c,a,e){const r=arguments.length;return r===2?l1(a)&&!$(a)?S6(a)?N1(c,null,[a]):N1(c,a):N1(c,null,a):(r>3?e=Array.prototype.slice.call(arguments,2):r===3&&S6(e)&&(e=[e]),N1(c,a,e))}const om="3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const tm="http://www.w3.org/2000/svg",mm="http://www.w3.org/1998/Math/MathML",m2=typeof document<"u"?document:null,J0=m2&&m2.createElement("template"),zm={insert:(c,a,e)=>{a.insertBefore(c,e||null)},remove:c=>{const a=c.parentNode;a&&a.removeChild(c)},createElement:(c,a,e,r)=>{const s=a==="svg"?m2.createElementNS(tm,c):a==="mathml"?m2.createElementNS(mm,c):m2.createElement(c,e?{is:e}:void 0);return c==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:c=>m2.createTextNode(c),createComment:c=>m2.createComment(c),setText:(c,a)=>{c.nodeValue=a},setElementText:(c,a)=>{c.textContent=a},parentNode:c=>c.parentNode,nextSibling:c=>c.nextSibling,querySelector:c=>m2.querySelector(c),setScopeId(c,a){c.setAttribute(a,"")},insertStaticContent(c,a,e,r,s,i){const l=e?e.previousSibling:a.lastChild;if(s&&(s===i||s.nextSibling))for(;a.insertBefore(s.cloneNode(!0),e),!(s===i||!(s=s.nextSibling)););else{J0.innerHTML=r==="svg"?`<svg>${c}</svg>`:r==="mathml"?`<math>${c}</math>`:c;const n=J0.content;if(r==="svg"||r==="mathml"){const f=n.firstChild;for(;f.firstChild;)n.appendChild(f.firstChild);n.removeChild(f)}a.insertBefore(n,e)}return[l?l.nextSibling:a.firstChild,e?e.previousSibling:a.lastChild]}},vm=Symbol("_vtc");function hm(c,a,e){const r=c[vm];r&&(a=(a?[a,...r]:[...r]).join(" ")),a==null?c.removeAttribute("class"):e?c.setAttribute("class",a):c.className=a}const c5=Symbol("_vod"),Hm=Symbol("_vsh"),um=Symbol(""),pm=/(^|;)\s*display\s*:/;function Vm(c,a,e){const r=c.style,s=f1(e);let i=!1;if(e&&!s){if(a)if(f1(a))for(const l of a.split(";")){const n=l.slice(0,l.indexOf(":")).trim();e[n]==null&&n4(r,n,"")}else for(const l in a)e[l]==null&&n4(r,l,"");for(const l in e)l==="display"&&(i=!0),n4(r,l,e[l])}else if(s){if(a!==e){const l=r[um];l&&(e+=";"+l),r.cssText=e,i=pm.test(e)}}else a&&c.removeAttribute("style");c5 in c&&(c[c5]=i?r.display:"",c[Hm]&&(r.display="none"))}const a5=/\s*!important$/;function n4(c,a,e){if($(e))e.forEach(r=>n4(c,a,r));else if(e==null&&(e=""),a.startsWith("--"))c.setProperty(a,e);else{const r=Mm(c,a);a5.test(e)?c.setProperty(T2(r),e.replace(a5,""),"important"):c[r]=e}}const e5=["Webkit","Moz","ms"],n6={};function Mm(c,a){const e=n6[a];if(e)return e;let r=K2(a);if(r!=="filter"&&r in c)return n6[a]=r;r=e7(r);for(let s=0;s<e5.length;s++){const i=e5[s]+r;if(i in c)return n6[a]=i}return a}const r5="http://www.w3.org/1999/xlink";function Cm(c,a,e,r,s){if(r&&a.startsWith("xlink:"))e==null?c.removeAttributeNS(r5,a.slice(6,a.length)):c.setAttributeNS(r5,a,e);else{const i=wo(a);e==null||i&&!s7(e)?c.removeAttribute(a):c.setAttribute(a,i?"":e)}}function dm(c,a,e,r,s,i,l){if(a==="innerHTML"||a==="textContent"){r&&l(r,s,i),c[a]=e??"";return}const n=c.tagName;if(a==="value"&&n!=="PROGRESS"&&!n.includes("-")){const t=n==="OPTION"?c.getAttribute("value")||"":c.value,o=e??"";(t!==o||!("_value"in c))&&(c.value=o),e==null&&c.removeAttribute(a),c._value=e;return}let f=!1;if(e===""||e==null){const t=typeof c[a];t==="boolean"?e=s7(e):e==null&&t==="string"?(e="",f=!0):t==="number"&&(e=0,f=!0)}try{c[a]=e}catch{}f&&c.removeAttribute(a)}function Lm(c,a,e,r){c.addEventListener(a,e,r)}function gm(c,a,e,r){c.removeEventListener(a,e,r)}const s5=Symbol("_vei");function xm(c,a,e,r,s=null){const i=c[s5]||(c[s5]={}),l=i[a];if(r&&l)l.value=r;else{const[n,f]=bm(a);if(r){const t=i[a]=ym(r,s);Lm(c,n,t,f)}else l&&(gm(c,n,l,f),i[a]=void 0)}}const i5=/(?:Once|Passive|Capture)$/;function bm(c){let a;if(i5.test(c)){a={};let r;for(;r=c.match(i5);)c=c.slice(0,c.length-r[0].length),a[r[0].toLowerCase()]=!0}return[c[2]===":"?c.slice(3):T2(c.slice(2)),a]}let f6=0;const Nm=Promise.resolve(),Sm=()=>f6||(Nm.then(()=>f6=0),f6=Date.now());function ym(c,a){const e=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=e.attached)return;E1(km(r,e.value),a,5,[r])};return e.value=c,e.attached=Sm(),e}function km(c,a){if($(a)){const e=c.stopImmediatePropagation;return c.stopImmediatePropagation=()=>{e.call(c),c._stopped=!0},a.map(r=>s=>!s._stopped&&r&&r(s))}else return a}const l5=c=>c.charCodeAt(0)===111&&c.charCodeAt(1)===110&&c.charCodeAt(2)>96&&c.charCodeAt(2)<123,wm=(c,a,e,r,s,i,l,n,f)=>{const t=s==="svg";a==="class"?hm(c,r,t):a==="style"?Vm(c,e,r):M4(a)?G6(a)||xm(c,a,e,r,l):(a[0]==="."?(a=a.slice(1),!0):a[0]==="^"?(a=a.slice(1),!1):Am(c,a,r,t))?dm(c,a,r,i,l,n,f):(a==="true-value"?c._trueValue=r:a==="false-value"&&(c._falseValue=r),Cm(c,a,r,t))};function Am(c,a,e,r){if(r)return!!(a==="innerHTML"||a==="textContent"||a in c&&l5(a)&&G(e));if(a==="spellcheck"||a==="draggable"||a==="translate"||a==="form"||a==="list"&&c.tagName==="INPUT"||a==="type"&&c.tagName==="TEXTAREA")return!1;if(a==="width"||a==="height"){const s=c.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return l5(a)&&f1(e)?!1:a in c}const Pm={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},n5=(c,a)=>{const e=c._withKeys||(c._withKeys={}),r=a.join(".");return e[r]||(e[r]=s=>{if(!("key"in s))return;const i=T2(s.key);if(a.some(l=>l===i||Pm[l]===i))return c(s)})},Tm=h1({patchProp:wm},zm);let f5;function Fm(){return f5||(f5=Wt(Tm))}const Bm=(...c)=>{const a=Fm().createApp(...c),{mount:e}=a;return a.mount=r=>{const s=_m(r);if(!s)return;const i=a._component;!G(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const l=e(s,!1,Rm(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),l},a};function Rm(c){if(c instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&c instanceof MathMLElement)return"mathml"}function _m(c){return f1(c)?document.querySelector(c):c}/*!
  * vue-router v4.3.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const D2=typeof document<"u";function Em(c){return c.__esModule||c[Symbol.toStringTag]==="Module"}const X=Object.assign;function o6(c,a){const e={};for(const r in a){const s=a[r];e[r]=q1(s)?s.map(c):c(s)}return e}const H3=()=>{},q1=Array.isArray,X7=/#/g,qm=/&/g,Dm=/\//g,Om=/=/g,Um=/\?/g,Q7=/\+/g,$m=/%5B/g,Im=/%5D/g,J7=/%5E/g,Gm=/%60/g,c9=/%7B/g,Wm=/%7C/g,a9=/%7D/g,jm=/%20/g;function m8(c){return encodeURI(""+c).replace(Wm,"|").replace($m,"[").replace(Im,"]")}function Zm(c){return m8(c).replace(c9,"{").replace(a9,"}").replace(J7,"^")}function k6(c){return m8(c).replace(Q7,"%2B").replace(jm,"+").replace(X7,"%23").replace(qm,"%26").replace(Gm,"`").replace(c9,"{").replace(a9,"}").replace(J7,"^")}function Km(c){return k6(c).replace(Om,"%3D")}function Ym(c){return m8(c).replace(X7,"%23").replace(Um,"%3F")}function Xm(c){return c==null?"":Ym(c).replace(Dm,"%2F")}function g3(c){try{return decodeURIComponent(""+c)}catch{}return""+c}const Qm=/\/$/,Jm=c=>c.replace(Qm,"");function t6(c,a,e="/"){let r,s={},i="",l="";const n=a.indexOf("#");let f=a.indexOf("?");return n<f&&n>=0&&(f=-1),f>-1&&(r=a.slice(0,f),i=a.slice(f+1,n>-1?n:a.length),s=c(i)),n>-1&&(r=r||a.slice(0,n),l=a.slice(n,a.length)),r=rz(r??a,e),{fullPath:r+(i&&"?")+i+l,path:r,query:s,hash:g3(l)}}function cz(c,a){const e=a.query?c(a.query):"";return a.path+(e&&"?")+e+(a.hash||"")}function o5(c,a){return!a||!c.toLowerCase().startsWith(a.toLowerCase())?c:c.slice(a.length)||"/"}function az(c,a,e){const r=a.matched.length-1,s=e.matched.length-1;return r>-1&&r===s&&Q2(a.matched[r],e.matched[s])&&e9(a.params,e.params)&&c(a.query)===c(e.query)&&a.hash===e.hash}function Q2(c,a){return(c.aliasOf||c)===(a.aliasOf||a)}function e9(c,a){if(Object.keys(c).length!==Object.keys(a).length)return!1;for(const e in c)if(!ez(c[e],a[e]))return!1;return!0}function ez(c,a){return q1(c)?t5(c,a):q1(a)?t5(a,c):c===a}function t5(c,a){return q1(a)?c.length===a.length&&c.every((e,r)=>e===a[r]):c.length===1&&c[0]===a}function rz(c,a){if(c.startsWith("/"))return c;if(!c)return a;const e=a.split("/"),r=c.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=e.length-1,l,n;for(l=0;l<r.length;l++)if(n=r[l],n!==".")if(n==="..")i>1&&i--;else break;return e.slice(0,i).join("/")+"/"+r.slice(l).join("/")}var x3;(function(c){c.pop="pop",c.push="push"})(x3||(x3={}));var u3;(function(c){c.back="back",c.forward="forward",c.unknown=""})(u3||(u3={}));function sz(c){if(!c)if(D2){const a=document.querySelector("base");c=a&&a.getAttribute("href")||"/",c=c.replace(/^\w+:\/\/[^\/]+/,"")}else c="/";return c[0]!=="/"&&c[0]!=="#"&&(c="/"+c),Jm(c)}const iz=/^[^#]+#/;function lz(c,a){return c.replace(iz,"#")+a}function nz(c,a){const e=document.documentElement.getBoundingClientRect(),r=c.getBoundingClientRect();return{behavior:a.behavior,left:r.left-e.left-(a.left||0),top:r.top-e.top-(a.top||0)}}const T4=()=>({left:window.scrollX,top:window.scrollY});function fz(c){let a;if("el"in c){const e=c.el,r=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?r?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;a=nz(s,c)}else a=c;"scrollBehavior"in document.documentElement.style?window.scrollTo(a):window.scrollTo(a.left!=null?a.left:window.scrollX,a.top!=null?a.top:window.scrollY)}function m5(c,a){return(history.state?history.state.position-a:-1)+c}const w6=new Map;function oz(c,a){w6.set(c,a)}function tz(c){const a=w6.get(c);return w6.delete(c),a}let mz=()=>location.protocol+"//"+location.host;function r9(c,a){const{pathname:e,search:r,hash:s}=a,i=c.indexOf("#");if(i>-1){let n=s.includes(c.slice(i))?c.slice(i).length:1,f=s.slice(n);return f[0]!=="/"&&(f="/"+f),o5(f,"")}return o5(e,c)+r+s}function zz(c,a,e,r){let s=[],i=[],l=null;const n=({state:h})=>{const u=r9(c,location),S=e.value,A=a.value;let _=0;if(h){if(e.value=u,a.value=h,l&&l===S){l=null;return}_=A?h.position-A.position:0}else r(u);s.forEach(M=>{M(e.value,S,{delta:_,type:x3.pop,direction:_?_>0?u3.forward:u3.back:u3.unknown})})};function f(){l=e.value}function t(h){s.push(h);const u=()=>{const S=s.indexOf(h);S>-1&&s.splice(S,1)};return i.push(u),u}function o(){const{history:h}=window;h.state&&h.replaceState(X({},h.state,{scroll:T4()}),"")}function v(){for(const h of i)h();i=[],window.removeEventListener("popstate",n),window.removeEventListener("beforeunload",o)}return window.addEventListener("popstate",n),window.addEventListener("beforeunload",o,{passive:!0}),{pauseListeners:f,listen:t,destroy:v}}function z5(c,a,e,r=!1,s=!1){return{back:c,current:a,forward:e,replaced:r,position:window.history.length,scroll:s?T4():null}}function vz(c){const{history:a,location:e}=window,r={value:r9(c,e)},s={value:a.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:a.length-1,replaced:!0,scroll:null},!0);function i(f,t,o){const v=c.indexOf("#"),h=v>-1?(e.host&&document.querySelector("base")?c:c.slice(v))+f:mz()+c+f;try{a[o?"replaceState":"pushState"](t,"",h),s.value=t}catch(u){console.error(u),e[o?"replace":"assign"](h)}}function l(f,t){const o=X({},a.state,z5(s.value.back,f,s.value.forward,!0),t,{position:s.value.position});i(f,o,!0),r.value=f}function n(f,t){const o=X({},s.value,a.state,{forward:f,scroll:T4()});i(o.current,o,!0);const v=X({},z5(r.value,f,null),{position:o.position+1},t);i(f,v,!1),r.value=f}return{location:r,state:s,push:n,replace:l}}function hz(c){c=sz(c);const a=vz(c),e=zz(c,a.state,a.location,a.replace);function r(i,l=!0){l||e.pauseListeners(),history.go(i)}const s=X({location:"",base:c,go:r,createHref:lz.bind(null,c)},a,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>a.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>a.state.value}),s}function Hz(c){return typeof c=="string"||c&&typeof c=="object"}function s9(c){return typeof c=="string"||typeof c=="symbol"}const n2={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},i9=Symbol("");var v5;(function(c){c[c.aborted=4]="aborted",c[c.cancelled=8]="cancelled",c[c.duplicated=16]="duplicated"})(v5||(v5={}));function J2(c,a){return X(new Error,{type:c,[i9]:!0},a)}function K1(c,a){return c instanceof Error&&i9 in c&&(a==null||!!(c.type&a))}const h5="[^/]+?",uz={sensitive:!1,strict:!1,start:!0,end:!0},pz=/[.+*?^${}()[\]/\\]/g;function Vz(c,a){const e=X({},uz,a),r=[];let s=e.start?"^":"";const i=[];for(const t of c){const o=t.length?[]:[90];e.strict&&!t.length&&(s+="/");for(let v=0;v<t.length;v++){const h=t[v];let u=40+(e.sensitive?.25:0);if(h.type===0)v||(s+="/"),s+=h.value.replace(pz,"\\$&"),u+=40;else if(h.type===1){const{value:S,repeatable:A,optional:_,regexp:M}=h;i.push({name:S,repeatable:A,optional:_});const d=M||h5;if(d!==h5){u+=10;try{new RegExp(`(${d})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${S}" (${d}): `+D.message)}}let w=A?`((?:${d})(?:/(?:${d}))*)`:`(${d})`;v||(w=_&&t.length<2?`(?:/${w})`:"/"+w),_&&(w+="?"),s+=w,u+=20,_&&(u+=-8),A&&(u+=-20),d===".*"&&(u+=-50)}o.push(u)}r.push(o)}if(e.strict&&e.end){const t=r.length-1;r[t][r[t].length-1]+=.7000000000000001}e.strict||(s+="/?"),e.end?s+="$":e.strict&&(s+="(?:/|$)");const l=new RegExp(s,e.sensitive?"":"i");function n(t){const o=t.match(l),v={};if(!o)return null;for(let h=1;h<o.length;h++){const u=o[h]||"",S=i[h-1];v[S.name]=u&&S.repeatable?u.split("/"):u}return v}function f(t){let o="",v=!1;for(const h of c){(!v||!o.endsWith("/"))&&(o+="/"),v=!1;for(const u of h)if(u.type===0)o+=u.value;else if(u.type===1){const{value:S,repeatable:A,optional:_}=u,M=S in t?t[S]:"";if(q1(M)&&!A)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const d=q1(M)?M.join("/"):M;if(!d)if(_)h.length<2&&(o.endsWith("/")?o=o.slice(0,-1):v=!0);else throw new Error(`Missing required param "${S}"`);o+=d}}return o||"/"}return{re:l,score:r,keys:i,parse:n,stringify:f}}function Mz(c,a){let e=0;for(;e<c.length&&e<a.length;){const r=a[e]-c[e];if(r)return r;e++}return c.length<a.length?c.length===1&&c[0]===80?-1:1:c.length>a.length?a.length===1&&a[0]===80?1:-1:0}function Cz(c,a){let e=0;const r=c.score,s=a.score;for(;e<r.length&&e<s.length;){const i=Mz(r[e],s[e]);if(i)return i;e++}if(Math.abs(s.length-r.length)===1){if(H5(r))return 1;if(H5(s))return-1}return s.length-r.length}function H5(c){const a=c[c.length-1];return c.length>0&&a[a.length-1]<0}const dz={type:0,value:""},Lz=/[a-zA-Z0-9_]/;function gz(c){if(!c)return[[]];if(c==="/")return[[dz]];if(!c.startsWith("/"))throw new Error(`Invalid path "${c}"`);function a(u){throw new Error(`ERR (${e})/"${t}": ${u}`)}let e=0,r=e;const s=[];let i;function l(){i&&s.push(i),i=[]}let n=0,f,t="",o="";function v(){t&&(e===0?i.push({type:0,value:t}):e===1||e===2||e===3?(i.length>1&&(f==="*"||f==="+")&&a(`A repeatable param (${t}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:t,regexp:o,repeatable:f==="*"||f==="+",optional:f==="*"||f==="?"})):a("Invalid state to consume buffer"),t="")}function h(){t+=f}for(;n<c.length;){if(f=c[n++],f==="\\"&&e!==2){r=e,e=4;continue}switch(e){case 0:f==="/"?(t&&v(),l()):f===":"?(v(),e=1):h();break;case 4:h(),e=r;break;case 1:f==="("?e=2:Lz.test(f)?h():(v(),e=0,f!=="*"&&f!=="?"&&f!=="+"&&n--);break;case 2:f===")"?o[o.length-1]=="\\"?o=o.slice(0,-1)+f:e=3:o+=f;break;case 3:v(),e=0,f!=="*"&&f!=="?"&&f!=="+"&&n--,o="";break;default:a("Unknown state");break}}return e===2&&a(`Unfinished custom RegExp for param "${t}"`),v(),l(),s}function xz(c,a,e){const r=Vz(gz(c.path),e),s=X(r,{record:c,parent:a,children:[],alias:[]});return a&&!s.record.aliasOf==!a.record.aliasOf&&a.children.push(s),s}function bz(c,a){const e=[],r=new Map;a=V5({strict:!1,end:!0,sensitive:!1},a);function s(o){return r.get(o)}function i(o,v,h){const u=!h,S=Nz(o);S.aliasOf=h&&h.record;const A=V5(a,o),_=[S];if("alias"in o){const w=typeof o.alias=="string"?[o.alias]:o.alias;for(const D of w)_.push(X({},S,{components:h?h.record.components:S.components,path:D,aliasOf:h?h.record:S}))}let M,d;for(const w of _){const{path:D}=w;if(v&&D[0]!=="/"){const I=v.record.path,q=I[I.length-1]==="/"?"":"/";w.path=v.record.path+(D&&q+D)}if(M=xz(w,v,A),h?h.alias.push(M):(d=d||M,d!==M&&d.alias.push(M),u&&o.name&&!p5(M)&&l(o.name)),S.children){const I=S.children;for(let q=0;q<I.length;q++)i(I[q],M,h&&h.children[q])}h=h||M,(M.record.components&&Object.keys(M.record.components).length||M.record.name||M.record.redirect)&&f(M)}return d?()=>{l(d)}:H3}function l(o){if(s9(o)){const v=r.get(o);v&&(r.delete(o),e.splice(e.indexOf(v),1),v.children.forEach(l),v.alias.forEach(l))}else{const v=e.indexOf(o);v>-1&&(e.splice(v,1),o.record.name&&r.delete(o.record.name),o.children.forEach(l),o.alias.forEach(l))}}function n(){return e}function f(o){let v=0;for(;v<e.length&&Cz(o,e[v])>=0&&(o.record.path!==e[v].record.path||!l9(o,e[v]));)v++;e.splice(v,0,o),o.record.name&&!p5(o)&&r.set(o.record.name,o)}function t(o,v){let h,u={},S,A;if("name"in o&&o.name){if(h=r.get(o.name),!h)throw J2(1,{location:o});A=h.record.name,u=X(u5(v.params,h.keys.filter(d=>!d.optional).concat(h.parent?h.parent.keys.filter(d=>d.optional):[]).map(d=>d.name)),o.params&&u5(o.params,h.keys.map(d=>d.name))),S=h.stringify(u)}else if(o.path!=null)S=o.path,h=e.find(d=>d.re.test(S)),h&&(u=h.parse(S),A=h.record.name);else{if(h=v.name?r.get(v.name):e.find(d=>d.re.test(v.path)),!h)throw J2(1,{location:o,currentLocation:v});A=h.record.name,u=X({},v.params,o.params),S=h.stringify(u)}const _=[];let M=h;for(;M;)_.unshift(M.record),M=M.parent;return{name:A,path:S,params:u,matched:_,meta:yz(_)}}return c.forEach(o=>i(o)),{addRoute:i,resolve:t,removeRoute:l,getRoutes:n,getRecordMatcher:s}}function u5(c,a){const e={};for(const r of a)r in c&&(e[r]=c[r]);return e}function Nz(c){return{path:c.path,redirect:c.redirect,name:c.name,meta:c.meta||{},aliasOf:void 0,beforeEnter:c.beforeEnter,props:Sz(c),children:c.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in c?c.components||null:c.component&&{default:c.component}}}function Sz(c){const a={},e=c.props||!1;if("component"in c)a.default=e;else for(const r in c.components)a[r]=typeof e=="object"?e[r]:e;return a}function p5(c){for(;c;){if(c.record.aliasOf)return!0;c=c.parent}return!1}function yz(c){return c.reduce((a,e)=>X(a,e.meta),{})}function V5(c,a){const e={};for(const r in c)e[r]=r in a?a[r]:c[r];return e}function l9(c,a){return a.children.some(e=>e===c||l9(c,e))}function kz(c){const a={};if(c===""||c==="?")return a;const r=(c[0]==="?"?c.slice(1):c).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Q7," "),l=i.indexOf("="),n=g3(l<0?i:i.slice(0,l)),f=l<0?null:g3(i.slice(l+1));if(n in a){let t=a[n];q1(t)||(t=a[n]=[t]),t.push(f)}else a[n]=f}return a}function M5(c){let a="";for(let e in c){const r=c[e];if(e=Km(e),r==null){r!==void 0&&(a+=(a.length?"&":"")+e);continue}(q1(r)?r.map(i=>i&&k6(i)):[r&&k6(r)]).forEach(i=>{i!==void 0&&(a+=(a.length?"&":"")+e,i!=null&&(a+="="+i))})}return a}function wz(c){const a={};for(const e in c){const r=c[e];r!==void 0&&(a[e]=q1(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return a}const Az=Symbol(""),C5=Symbol(""),z8=Symbol(""),n9=Symbol(""),A6=Symbol("");function n3(){let c=[];function a(r){return c.push(r),()=>{const s=c.indexOf(r);s>-1&&c.splice(s,1)}}function e(){c=[]}return{add:a,list:()=>c.slice(),reset:e}}function z2(c,a,e,r,s,i=l=>l()){const l=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((n,f)=>{const t=h=>{h===!1?f(J2(4,{from:e,to:a})):h instanceof Error?f(h):Hz(h)?f(J2(2,{from:a,to:h})):(l&&r.enterCallbacks[s]===l&&typeof h=="function"&&l.push(h),n())},o=i(()=>c.call(r&&r.instances[s],a,e,t));let v=Promise.resolve(o);c.length<3&&(v=v.then(t)),v.catch(h=>f(h))})}function m6(c,a,e,r,s=i=>i()){const i=[];for(const l of c)for(const n in l.components){let f=l.components[n];if(!(a!=="beforeRouteEnter"&&!l.instances[n]))if(Pz(f)){const o=(f.__vccOpts||f)[a];o&&i.push(z2(o,e,r,l,n,s))}else{let t=f();i.push(()=>t.then(o=>{if(!o)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${l.path}"`));const v=Em(o)?o.default:o;l.components[n]=v;const u=(v.__vccOpts||v)[a];return u&&z2(u,e,r,l,n,s)()}))}}return i}function Pz(c){return typeof c=="object"||"displayName"in c||"props"in c||"__vccOpts"in c}function d5(c){const a=Q1(z8),e=Q1(n9),r=v1(()=>a.resolve(k2(c.to))),s=v1(()=>{const{matched:f}=r.value,{length:t}=f,o=f[t-1],v=e.matched;if(!o||!v.length)return-1;const h=v.findIndex(Q2.bind(null,o));if(h>-1)return h;const u=L5(f[t-2]);return t>1&&L5(o)===u&&v[v.length-1].path!==u?v.findIndex(Q2.bind(null,f[t-2])):h}),i=v1(()=>s.value>-1&&Rz(e.params,r.value.params)),l=v1(()=>s.value>-1&&s.value===e.matched.length-1&&e9(e.params,r.value.params));function n(f={}){return Bz(f)?a[k2(c.replace)?"replace":"push"](k2(c.to)).catch(H3):Promise.resolve()}return{route:r,href:v1(()=>r.value.href),isActive:i,isExactActive:l,navigate:n}}const Tz=i8({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:d5,setup(c,{slots:a}){const e=x4(d5(c)),{options:r}=Q1(z8),s=v1(()=>({[g5(c.activeClass,r.linkActiveClass,"router-link-active")]:e.isActive,[g5(c.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const i=a.default&&a.default(e);return c.custom?i:t8("a",{"aria-current":e.isExactActive?c.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},i)}}}),Fz=Tz;function Bz(c){if(!(c.metaKey||c.altKey||c.ctrlKey||c.shiftKey)&&!c.defaultPrevented&&!(c.button!==void 0&&c.button!==0)){if(c.currentTarget&&c.currentTarget.getAttribute){const a=c.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(a))return}return c.preventDefault&&c.preventDefault(),!0}}function Rz(c,a){for(const e in a){const r=a[e],s=c[e];if(typeof r=="string"){if(r!==s)return!1}else if(!q1(s)||s.length!==r.length||r.some((i,l)=>i!==s[l]))return!1}return!0}function L5(c){return c?c.aliasOf?c.aliasOf.path:c.path:""}const g5=(c,a,e)=>c??a??e,_z=i8({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(c,{attrs:a,slots:e}){const r=Q1(A6),s=v1(()=>c.route||r.value),i=Q1(C5,0),l=v1(()=>{let t=k2(i);const{matched:o}=s.value;let v;for(;(v=o[t])&&!v.components;)t++;return t}),n=v1(()=>s.value.matched[l.value]);s4(C5,v1(()=>l.value+1)),s4(Az,n),s4(A6,s);const f=ct();return m3(()=>[f.value,n.value,c.name],([t,o,v],[h,u,S])=>{o&&(o.instances[v]=t,u&&u!==o&&t&&t===h&&(o.leaveGuards.size||(o.leaveGuards=u.leaveGuards),o.updateGuards.size||(o.updateGuards=u.updateGuards))),t&&o&&(!u||!Q2(o,u)||!h)&&(o.enterCallbacks[v]||[]).forEach(A=>A(t))},{flush:"post"}),()=>{const t=s.value,o=c.name,v=n.value,h=v&&v.components[o];if(!h)return x5(e.default,{Component:h,route:t});const u=v.props[o],S=u?u===!0?t.params:typeof u=="function"?u(t):u:null,_=t8(h,X({},S,a,{onVnodeUnmounted:M=>{M.component.isUnmounted&&(v.instances[o]=null)},ref:f}));return x5(e.default,{Component:_,route:t})||_}}});function x5(c,a){if(!c)return null;const e=c(a);return e.length===1?e[0]:e}const f9=_z;function Ez(c){const a=bz(c.routes,c),e=c.parseQuery||kz,r=c.stringifyQuery||M5,s=c.history,i=n3(),l=n3(),n=n3(),f=at(n2);let t=n2;D2&&c.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const o=o6.bind(null,V=>""+V),v=o6.bind(null,Xm),h=o6.bind(null,g3);function u(V,T){let y,R;return s9(V)?(y=a.getRecordMatcher(V),R=T):R=V,a.addRoute(R,y)}function S(V){const T=a.getRecordMatcher(V);T&&a.removeRoute(T)}function A(){return a.getRoutes().map(V=>V.record)}function _(V){return!!a.getRecordMatcher(V)}function M(V,T){if(T=X({},T||f.value),typeof V=="string"){const z=t6(e,V,T.path),H=a.resolve({path:z.path},T),C=s.createHref(z.fullPath);return X(z,H,{params:h(H.params),hash:g3(z.hash),redirectedFrom:void 0,href:C})}let y;if(V.path!=null)y=X({},V,{path:t6(e,V.path,T.path).path});else{const z=X({},V.params);for(const H in z)z[H]==null&&delete z[H];y=X({},V,{params:v(z)}),T.params=v(T.params)}const R=a.resolve(y,T),Y=V.hash||"";R.params=o(h(R.params));const r1=cz(r,X({},V,{hash:Zm(Y),path:R.path})),m=s.createHref(r1);return X({fullPath:r1,hash:Y,query:r===M5?wz(V.query):V.query||{}},R,{redirectedFrom:void 0,href:m})}function d(V){return typeof V=="string"?t6(e,V,f.value.path):X({},V)}function w(V,T){if(t!==V)return J2(8,{from:T,to:V})}function D(V){return c1(V)}function I(V){return D(X(d(V),{replace:!0}))}function q(V){const T=V.matched[V.matched.length-1];if(T&&T.redirect){const{redirect:y}=T;let R=typeof y=="function"?y(V):y;return typeof R=="string"&&(R=R.includes("?")||R.includes("#")?R=d(R):{path:R},R.params={}),X({query:V.query,hash:V.hash,params:R.path!=null?{}:V.params},R)}}function c1(V,T){const y=t=M(V),R=f.value,Y=V.state,r1=V.force,m=V.replace===!0,z=q(y);if(z)return c1(X(d(z),{state:typeof z=="object"?X({},Y,z.state):Y,force:r1,replace:m}),T||y);const H=y;H.redirectedFrom=T;let C;return!r1&&az(r,R,y)&&(C=J2(16,{to:H,from:R}),O1(R,R,!0,!1)),(C?Promise.resolve(C):P1(H,R)).catch(p=>K1(p)?K1(p,2)?p:i2(p):K(p,H,R)).then(p=>{if(p){if(K1(p,2))return c1(X({replace:m},d(p.to),{state:typeof p.to=="object"?X({},Y,p.to.state):Y,force:r1}),T||H)}else p=M2(H,R,!0,m,Y);return s2(H,R,p),p})}function u1(V,T){const y=w(V,T);return y?Promise.reject(y):Promise.resolve()}function p1(V){const T=E2.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(V):V()}function P1(V,T){let y;const[R,Y,r1]=qz(V,T);y=m6(R.reverse(),"beforeRouteLeave",V,T);for(const z of R)z.leaveGuards.forEach(H=>{y.push(z2(H,V,T))});const m=u1.bind(null,V,T);return y.push(m),V1(y).then(()=>{y=[];for(const z of i.list())y.push(z2(z,V,T));return y.push(m),V1(y)}).then(()=>{y=m6(Y,"beforeRouteUpdate",V,T);for(const z of Y)z.updateGuards.forEach(H=>{y.push(z2(H,V,T))});return y.push(m),V1(y)}).then(()=>{y=[];for(const z of r1)if(z.beforeEnter)if(q1(z.beforeEnter))for(const H of z.beforeEnter)y.push(z2(H,V,T));else y.push(z2(z.beforeEnter,V,T));return y.push(m),V1(y)}).then(()=>(V.matched.forEach(z=>z.enterCallbacks={}),y=m6(r1,"beforeRouteEnter",V,T,p1),y.push(m),V1(y))).then(()=>{y=[];for(const z of l.list())y.push(z2(z,V,T));return y.push(m),V1(y)}).catch(z=>K1(z,8)?z:Promise.reject(z))}function s2(V,T,y){n.list().forEach(R=>p1(()=>R(V,T,y)))}function M2(V,T,y,R,Y){const r1=w(V,T);if(r1)return r1;const m=T===n2,z=D2?history.state:{};y&&(R||m?s.replace(V.fullPath,X({scroll:m&&z&&z.scroll},Y)):s.push(V.fullPath,Y)),f.value=V,O1(V,T,y,m),i2()}let D1;function r3(){D1||(D1=s.listen((V,T,y)=>{if(!q3.listening)return;const R=M(V),Y=q(R);if(Y){c1(X(Y,{replace:!0}),R).catch(H3);return}t=R;const r1=f.value;D2&&oz(m5(r1.fullPath,y.delta),T4()),P1(R,r1).catch(m=>K1(m,12)?m:K1(m,2)?(c1(m.to,R).then(z=>{K1(z,20)&&!y.delta&&y.type===x3.pop&&s.go(-1,!1)}).catch(H3),Promise.reject()):(y.delta&&s.go(-y.delta,!1),K(m,R,r1))).then(m=>{m=m||M2(R,r1,!1),m&&(y.delta&&!K1(m,8)?s.go(-y.delta,!1):y.type===x3.pop&&K1(m,20)&&s.go(-1,!1)),s2(R,r1,m)}).catch(H3)}))}let R2=n3(),t1=n3(),Q;function K(V,T,y){i2(V);const R=t1.list();return R.length?R.forEach(Y=>Y(V,T,y)):console.error(V),Promise.reject(V)}function Z1(){return Q&&f.value!==n2?Promise.resolve():new Promise((V,T)=>{R2.add([V,T])})}function i2(V){return Q||(Q=!V,r3(),R2.list().forEach(([T,y])=>V?y(V):T()),R2.reset()),V}function O1(V,T,y,R){const{scrollBehavior:Y}=c;if(!D2||!Y)return Promise.resolve();const r1=!y&&tz(m5(V.fullPath,0))||(R||!y)&&history.state&&history.state.scroll||null;return N7().then(()=>Y(V,T,r1)).then(m=>m&&fz(m)).catch(m=>K(m,V,T))}const g1=V=>s.go(V);let _2;const E2=new Set,q3={currentRoute:f,listening:!0,addRoute:u,removeRoute:S,hasRoute:_,getRoutes:A,resolve:M,options:c,push:D,replace:I,go:g1,back:()=>g1(-1),forward:()=>g1(1),beforeEach:i.add,beforeResolve:l.add,afterEach:n.add,onError:t1.add,isReady:Z1,install(V){const T=this;V.component("RouterLink",Fz),V.component("RouterView",f9),V.config.globalProperties.$router=T,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>k2(f)}),D2&&!_2&&f.value===n2&&(_2=!0,D(s.location).catch(Y=>{}));const y={};for(const Y in n2)Object.defineProperty(y,Y,{get:()=>f.value[Y],enumerable:!0});V.provide(z8,T),V.provide(n9,p7(y)),V.provide(A6,f);const R=V.unmount;E2.add(V),V.unmount=function(){E2.delete(V),E2.size<1&&(t=n2,D1&&D1(),D1=null,f.value=n2,_2=!1,Q=!1),R()}}};function V1(V){return V.reduce((T,y)=>T.then(()=>p1(y)),Promise.resolve())}return q3}function qz(c,a){const e=[],r=[],s=[],i=Math.max(a.matched.length,c.matched.length);for(let l=0;l<i;l++){const n=a.matched[l];n&&(c.matched.find(t=>Q2(t,n))?r.push(n):e.push(n));const f=c.matched[l];f&&(a.matched.find(t=>Q2(t,f))||s.push(f))}return[e,r,s]}const Dz={__name:"App",setup(c){return(a,e)=>(z1(),W7(k2(f9)))}},v8=(c,a)=>{const e=c.__vccOpts||c;for(const[r,s]of a)e[r]=s;return e},Oz={name:"Login",methods:{login(){let c=document.getElementById("emailinput").value,a=document.getElementById("pwinput").value;fetch("https://api.fightman01bot.hu:5849/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:a})}).then(e=>{e.status==200?(e.json().then(r=>{localStorage.setItem("userid",r.user.id),localStorage.setItem("email",c)}),setTimeout(()=>{this.$router.push("/todos")},500)):alert("Hibás email cím vagy jelszó!")})}}},h8=c=>(r8("data-v-4a77d2fe"),c=c(),s8(),c),Uz=h8(()=>b("div",{class:"nav"},[b("h2",{style:{margin:"5px",display:"inline-block"}},"TODO app"),b("i",{class:"fa-regular fa-circle-check fa-lg",style:{display:"inline-block"}}),b("div",{class:"line"})],-1)),$z={class:"modal"},Iz=Z7('<h2 style="filter:drop-shadow(1px 1px 5px #000000);padding-top:1rem;align-self:center;" data-v-4a77d2fe>Bejelentkezés</h2><div style="padding-top:1rem;align-self:center;width:75%;" data-v-4a77d2fe><h3 data-v-4a77d2fe>Email cím</h3><div class="inputdiv" data-v-4a77d2fe><input type="email" required id="emailinput" data-v-4a77d2fe></div></div><div style="padding-top:1rem;align-self:center;width:75%;" data-v-4a77d2fe><h3 data-v-4a77d2fe>Jelszó</h3><div class="inputdiv" data-v-4a77d2fe><input type="password" required id="pwinput" data-v-4a77d2fe></div></div>',3),Gz={style:{"padding-top":"1.5rem","align-self":"center"}},Wz=h8(()=>b("p",{style:{"padding-top":"3.5rem"}},[A4("Nincs még fiókja? "),b("a",{href:"/webtech/register"},"Regisztráljon!")],-1)),jz=h8(()=>b("div",{class:"regtext"},null,-1));function Zz(c,a,e,r,s,i){return z1(),M1("main",null,[Uz,b("div",$z,[Iz,b("div",Gz,[b("button",{class:"loginbtn",onClick:a[0]||(a[0]=l=>i.login())},"Bejelentkezés"),Wz]),jz])])}const Kz=v8(Oz,[["render",Zz],["__scopeId","data-v-4a77d2fe"]]),Yz={name:"Register",data(){return{email:"",password:"",name:""}},methods:{register(){let c=document.getElementById("emailinput").value,a=document.getElementById("pwinput").value,e=document.getElementById("nameinput").value;fetch("https://api.fightman01bot.hu:5849/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:a,name:e})}).then(r=>{r.status===200?this.$router.push("/"):console.log("Sikertelen regisztráció!")})}}},H8=c=>(r8("data-v-855ee79b"),c=c(),s8(),c),Xz=H8(()=>b("div",{class:"nav"},[b("h2",{style:{margin:"5px",display:"inline-block"}},"TODO app"),b("i",{class:"fa-regular fa-circle-check fa-lg",style:{display:"inline-block"}}),b("div",{class:"line"})],-1)),Qz={class:"modal"},Jz=Z7('<h2 style="filter:drop-shadow(1px 1px 5px #000000);padding-top:1rem;align-self:center;" data-v-855ee79b>Regisztráció</h2><div style="padding-top:1rem;align-self:center;width:75%;" data-v-855ee79b><h3 data-v-855ee79b>Név</h3><div class="inputdiv" data-v-855ee79b><input id="nameinput" data-v-855ee79b></div></div><div style="padding-top:1rem;align-self:center;width:75%;" data-v-855ee79b><h3 data-v-855ee79b>Email cím</h3><div class="inputdiv" data-v-855ee79b><input type="email" required id="emailinput" data-v-855ee79b></div></div><div style="padding-top:1rem;align-self:center;width:75%;" data-v-855ee79b><h3 data-v-855ee79b>Jelszó</h3><div class="inputdiv" data-v-855ee79b><input type="password" required id="pwinput" data-v-855ee79b></div></div>',4),cv={style:{"padding-top":"1.5rem","align-self":"center"}},av=H8(()=>b("p",{style:{"padding-top":"3.5rem"}},[A4("Van már fiókja? "),b("a",{href:"/webtech/"},"Jelentkezzen be!")],-1)),ev=H8(()=>b("div",{class:"regtext"},null,-1));function rv(c,a,e,r,s,i){return z1(),M1("main",null,[Xz,b("div",Qz,[Jz,b("div",cv,[b("button",{class:"loginbtn",onClick:a[0]||(a[0]=l=>i.register())},"Regisztráció"),av]),ev])])}const sv=v8(Yz,[["render",rv],["__scopeId","data-v-855ee79b"]]),iv={name:"Todos",data(){return{todos:[],cimkek:[],apicimkek:[],showmodal:!1}},created(){localStorage.getItem("userid")||this.$router.push("/"),this.$watch(()=>this.$route.params.id,this.fetchData,{immediate:!0})},methods:{delete_cimke(c){fetch("https://api.fightman01bot.hu:5849/delete_cimke",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:c,userid:localStorage.getItem("userid")})}).then(a=>a.json()).then(a=>{this.apicimkek=a,this.cimkek=this.cimkek.filter(e=>e!==c)})},get_contrast(c){if(!c.includes("#"))return"white";var a=parseInt(c.substring(1,3),16),e=parseInt(c.substring(3,5),16),r=parseInt(c.substring(5,7),16),s=(a*299+e*587+r*114)/1e3;return s>=128?"black":"white"},get_contrast_by_id(c){var a=this.apicimkek.cimkek.filter(l=>l.id==c)[0].color;if(!a.includes("#"))return"white";var e=parseInt(a.substring(1,3),16),r=parseInt(a.substring(3,5),16),s=parseInt(a.substring(5,7),16),i=(e*299+r*587+s*114)/1e3;return i>=128?"black":"white"},save_cimke(){fetch("https://api.fightman01bot.hu:5849/add_cimke",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nev:document.getElementById("ujcimke").value,userid:localStorage.getItem("userid")})}).then(c=>c.json()).then(c=>{this.apicimkek=c,document.getElementById("ujcimke").value=""})},search_in_todo_table(){let c,a,e;if(c=document.getElementById("eleminput"),e=c.value.toUpperCase(),e===""){a=document.querySelectorAll("#todoszoveg");for(let r=0;r<a.length;r++)a[r].parentElement.parentElement.style.display="";return}a=document.querySelectorAll("#todoszoveg");for(let r=0;r<a.length;r++)a[r].innerText.toUpperCase().indexOf(e)>-1?a[r].parentElement.parentElement.style.display="":a[r].parentElement.parentElement.style.display="none"},add_cimke(c){this.cimkek.includes(c)?this.cimkek.splice(this.cimkek.indexOf(c),1):this.cimkek.push(c)},showtodo(c){this.showmodal=!0;let a=document.querySelector(".showmodal"),e=this.todos.todos.find(r=>r.id===c);this.cimkek=this.apicimkek.cimkek.filter(r=>e.cimkeid.includes(r.id)),document.querySelector("#showmodalszoveg").innerText=e.szoveg,document.querySelector("#showmodalszemely").innerText=e.szemely,e.kesz?document.querySelector(".showmodal-header").style.backgroundColor="green":document.querySelector(".showmodal-header").style.backgroundColor="#3E69FF",a.style.display="block"},closeshowmodal(){let c=document.querySelector(".showmodal");this.cimkek=[],c.style.display="none",this.showmodal=!1},fetchData(){fetch("https://api.fightman01bot.hu:5849/get_todos?userid="+localStorage.getItem("userid"),{method:"GET",headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>{this.todos=c}),fetch("https://api.fightman01bot.hu:5849/get_cimkek?userid="+localStorage.getItem("userid"),{method:"GET",headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>{this.apicimkek=c})},ujelem(){document.querySelector(".blurbg").style.display="flex",document.querySelector("#megnevezesinput").value=document.querySelector("#eleminput").value,document.querySelector("#megnevezesinput").focus()},closemodal:function(){document.querySelector(".blurbg").style.display="none",this.cimkek=[],document.querySelector("#eleminput").value="",document.querySelector("#megnevezesinput").value="",document.querySelector("#szemelyinput").value="",document.querySelector(".savebtn").id="";let a=document.querySelectorAll("#todoszoveg");for(let e=0;e<a.length;e++)a[e].parentElement.parentElement.style.display=""},saveTodo(){let c=document.querySelector(".savebtn");c.id?fetch("https://api.fightman01bot.hu:5849/edit_todo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:c.id,szoveg:document.querySelector("#megnevezesinput").value,cimkek:this.cimkek,szemely:document.querySelector("#szemelyinput").value,kesz:!1,userid:localStorage.getItem("userid")})}).then(a=>a.json()).then(a=>{this.todos=a,this.cimkek=[],document.querySelector(".blurbg").style.display="none",document.querySelector(".savebtn").id="",document.querySelector("#eleminput").value="",document.querySelector("#megnevezesinput").value="",document.querySelector("#szemelyinput").value="";let e=document.querySelectorAll("#todoszoveg");for(let r=0;r<e.length;r++)e[r].parentElement.parentElement.style.display=""}):fetch("https://api.fightman01bot.hu:5849/add_todo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({szoveg:document.querySelector("#megnevezesinput").value,cimkek:this.cimkek,szemely:document.querySelector("#szemelyinput").value,kesz:!1,userid:localStorage.getItem("userid")})}).then(a=>a.json()).then(a=>{this.todos=a,this.cimkek=[],document.querySelector(".blurbg").style.display="none",document.querySelector("#eleminput").value="",document.querySelector("#eleminput").value="",document.querySelector("#megnevezesinput").value="",document.querySelector("#szemelyinput").value="";let e=document.querySelectorAll("#todoszoveg");for(let r=0;r<e.length;r++)e[r].parentElement.parentElement.style.display=""})},deleteTodo(c){fetch("https://api.fightman01bot.hu:5849/delete_todo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:c,userid:localStorage.getItem("userid")})}).then(a=>a.json()).then(a=>{this.todos=a})},setkesz(c,a){fetch("https://api.fightman01bot.hu:5849/set_kesz",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:c,kesz:a,userid:localStorage.getItem("userid")})}).then(e=>e.json()).then(e=>{this.todos=e})},logout(){localStorage.removeItem("userid"),this.$router.push("/")},edit_item(c){document.querySelector(".blurbg").style.display="flex",document.querySelector("#megnevezesinput").value=this.todos.todos.find(a=>a.id===c).szoveg,document.querySelector("#megnevezesinput").focus(),document.getElementById("szemelyinput").value=this.todos.todos.find(a=>a.id===c).szemely,document.querySelector(".savebtn").id=c,this.cimkek=this.todos.todos.find(a=>a.id===c).cimkeid}}},H1=c=>(r8("data-v-d67dd9ea"),c=c(),s8(),c),lv={class:"nav"},nv=H1(()=>b("h2",{style:{margin:"5px",display:"inline-block"}},"TODO app",-1)),fv=H1(()=>b("i",{class:"fa-regular fa-circle-check fa-lg",style:{display:"inline-block"}},null,-1)),ov=H1(()=>b("div",{class:"line"},null,-1)),tv={style:{width:"100%",display:"flex","justify-content":"center","padding-top":"2em"}},mv={class:"inputdiv"},zv=H1(()=>b("i",{class:"fa-solid fa-plus fa-2x",id:"plusicon"},null,-1)),vv=[zv],hv={class:"modal"},Hv={id:"todotable",cellpadding:"0"},uv={key:0,style:{width:"8%"}},pv=["onClick"],Vv=H1(()=>b("i",{class:"fa-regular fa-circle-check fa-2x",style:{color:"black",cursor:"pointer"}},null,-1)),Mv=[Vv],Cv={key:1,style:{width:"8%"}},dv=["onClick"],Lv=H1(()=>b("i",{class:"fa-regular fa-circle-check fa-2x",style:{color:"#009206",cursor:"pointer"}},null,-1)),gv=[Lv],xv={key:2,style:{"font-size":"1.5em",overflow:"scroll","max-width":"400px","border-bottom":"1px solid white"}},bv={style:{width:"95%",overflow:"scroll","max-width":"95%"},id:"todoszoveg"},Nv={key:3,style:{"font-size":"1.5em",overflow:"scroll","max-width":"400px","border-bottom":"1px solid white"}},Sv={style:{width:"95%",overflow:"scroll","max-width":"95%","text-decoration":"line-through"},id:"todoszoveg"},yv={style:{right:"0",position:"relative",height:"39px","border-bottom":"1px solid white","padding-bottom":"10px",width:"15%"}},kv={style:{display:"flex","justify-content":"space-evenly",width:"100%",top:"31%",position:"relative"}},wv=["onClick"],Av=H1(()=>b("i",{class:"fa-solid fa-eye fa-lg",style:{color:"white",cursor:"pointer"}},null,-1)),Pv=[Av],Tv=["onClick"],Fv=H1(()=>b("i",{class:"fa-solid fa-pen fa-lg",style:{color:"#3E69FF",cursor:"pointer"}},null,-1)),Bv=[Fv],Rv=["onClick"],_v=H1(()=>b("i",{class:"fa-solid fa-trash fa-lg",style:{color:"red",cursor:"pointer"}},null,-1)),Ev=[_v],qv={class:"blurbg"},Dv={class:"addmodal"},Ov=H1(()=>b("div",{style:{"align-self":"flex-start","z-index":"1","padding-top":"1rem"}},[b("h1",null,"Új listaelem")],-1)),Uv={class:"popuptartalom"},$v=H1(()=>b("div",{style:{"padding-top":"1rem","align-self":"center",width:"90%"}},[b("h3",null,"Megnevezés"),b("div",{class:"inputdiv-popup"},[b("input",{id:"megnevezesinput"})])],-1)),Iv={style:{"padding-top":"1rem","align-self":"center",width:"90%"}},Gv=H1(()=>b("h3",{style:{position:"relative"}},"Címkék",-1)),Wv={class:"cimkediv"},jv=["onClick"],Zv=["onClick"],Kv=H1(()=>b("i",{class:"fa-solid fa-circle-minus"},null,-1)),Yv=[Kv],Xv={class:"ujcimkeinput"},Qv={class:"cimkediv2"},Jv=H1(()=>b("div",{style:{"padding-top":"1rem","align-self":"center",width:"90%"}},[b("h3",null,"Személy"),b("div",{class:"inputdiv-popup"},[b("input",{id:"szemelyinput"})])],-1)),ch={class:"gombok"},ah={class:"showmodal-content"},eh={class:"showmodal-header"},rh=H1(()=>b("h2",{id:"showmodalszoveg"},null,-1)),sh=H1(()=>b("div",{class:"modal-body",style:{"flex-wrap":"wrap",display:"flex"}},[b("i",{class:"fa-solid fa-person fa-2x",style:{"margin-top":"0.5rem","margin-left":"0.5rem"}}),b("p",{id:"showmodalszemely",style:{"margin-left":"1rem","font-size":"1.5rem"}})],-1)),ih={key:0,class:"modal-cimke",style:{display:"flex","flex-wrap":"wrap"}},lh=H1(()=>b("i",{class:"fa-solid fa-tag fa-2x",style:{"margin-top":"0.5rem","margin-left":"0.5rem"}},null,-1));function nh(c,a,e,r,s,i){return z1(),M1("main",null,[b("div",lv,[nv,fv,b("button",{class:"logoutbtn",onClick:a[0]||(a[0]=l=>i.logout())},"Kijelentkezés"),ov]),b("div",tv,[b("div",mv,[b("input",{placeholder:"Elem hozzáadása",id:"eleminput",onKeydown:a[1]||(a[1]=n5(l=>i.ujelem(),["enter"])),onInput:a[2]||(a[2]=l=>i.search_in_todo_table())},null,32)]),b("div",{class:"pluszdiv",onClick:a[3]||(a[3]=l=>c.test())},vv)]),b("div",hv,[b("table",Hv,[(z1(!0),M1(w1,null,W3(s.todos.todos,l=>(z1(),M1("tr",{key:l.id},[l.kesz?L2("",!0):(z1(),M1("td",uv,[b("button",{style:{"background-color":"transparent",border:"0"},onClick:n=>i.setkesz(l.id,!0)},Mv,8,pv)])),l.kesz?(z1(),M1("td",Cv,[b("button",{style:{"background-color":"transparent",border:"0"},onClick:n=>i.setkesz(l.id,!1)},gv,8,dv)])):L2("",!0),l.kesz?L2("",!0):(z1(),M1("td",xv,[b("p",bv,i3(l.szoveg),1)])),l.kesz?(z1(),M1("td",Nv,[b("p",Sv,i3(l.szoveg),1)])):L2("",!0),b("td",yv,[b("div",kv,[b("button",{style:{"background-color":"transparent",border:"0"},onClick:n=>i.showtodo(l.id)},Pv,8,wv),b("button",{style:{"background-color":"transparent",border:"0"},onClick:n=>i.edit_item(l.id)},Bv,8,Tv),b("button",{onClick:n=>i.deleteTodo(l.id),style:{"background-color":"transparent",border:"0"}},Ev,8,Rv)])])]))),128))])]),b("div",qv,[b("div",Dv,[Ov,b("div",Uv,[$v,b("div",Iv,[Gv,b("div",Wv,[(z1(!0),M1(w1,null,W3(s.apicimkek.cimkek,l=>(z1(),M1("div",{class:L4(["cimke",s.cimkek.includes(l.id)?"selected_cimke":""]),style:x2({"background-color":l.color,color:i.get_contrast(l.color)}),onClick:n=>i.add_cimke(l.id)},[A4(i3(l.nev)+" ",1),b("button",{style:x2([{"background-color":"transparent",border:"0","font-size":"1rem"},{color:i.get_contrast(l.color)}]),onClick:n=>i.delete_cimke(l.id)},Yv,12,Zv)],14,jv))),256)),b("div",Xv,[b("input",{id:"ujcimke",placeholder:"Új címke",onKeydown:a[4]||(a[4]=n5(l=>i.save_cimke(),["enter"]))},null,32)])]),b("div",Qv,[s.showmodal?L2("",!0):(z1(!0),M1(w1,{key:0},W3(s.cimkek,l=>(z1(),M1("div",{class:"cimke",style:x2([{"background-color":s.apicimkek.cimkek.filter(n=>n.id==l)[0].color,color:i.get_contrast_by_id(l)},{cursor:"default"}])},i3(s.apicimkek.cimkek.filter(n=>n.id==l)[0].nev),5))),256))])]),Jv]),b("div",ch,[b("button",{onClick:a[5]||(a[5]=l=>i.closemodal()),class:"cancelbtn"},"Mégse"),b("button",{class:"savebtn",onClick:a[6]||(a[6]=l=>i.saveTodo())},"Mentés")])])]),b("div",{class:"showmodal",onClick:a[8]||(a[8]=l=>i.closeshowmodal())},[b("div",ah,[b("div",eh,[b("span",{class:"close",onClick:a[7]||(a[7]=l=>i.closeshowmodal())},"×"),rh]),sh,s.cimkek.length>0?(z1(),M1("div",ih,[lh,s.showmodal?(z1(!0),M1(w1,{key:0},W3(s.cimkek,l=>(z1(),M1("div",{class:"cimke",style:x2([{"background-color":l.color,color:i.get_contrast(l.color)},{"margin-top":"0.5rem","margin-left":"0.5rem",position:"relative","margin-bottom":"0.5rem",cursor:"default"}])},i3(l.nev),5))),256)):L2("",!0)])):L2("",!0)])])])}const fh=v8(iv,[["render",nh],["__scopeId","data-v-d67dd9ea"]]),oh=Ez({history:hz("/webtech/"),routes:[{path:"/",name:"Login",component:Kz},{path:"/register",name:"Register",component:sv},{path:"/todos",name:"Todos",component:fh}]});function b5(c,a){var e=Object.keys(c);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(c);a&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(c,s).enumerable})),e.push.apply(e,r)}return e}function P(c){for(var a=1;a<arguments.length;a++){var e=arguments[a]!=null?arguments[a]:{};a%2?b5(Object(e),!0).forEach(function(r){o1(c,r,e[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(e)):b5(Object(e)).forEach(function(r){Object.defineProperty(c,r,Object.getOwnPropertyDescriptor(e,r))})}return c}function H4(c){"@babel/helpers - typeof";return H4=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},H4(c)}function th(c,a){if(!(c instanceof a))throw new TypeError("Cannot call a class as a function")}function N5(c,a){for(var e=0;e<a.length;e++){var r=a[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(c,r.key,r)}}function mh(c,a,e){return a&&N5(c.prototype,a),e&&N5(c,e),Object.defineProperty(c,"prototype",{writable:!1}),c}function o1(c,a,e){return a in c?Object.defineProperty(c,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):c[a]=e,c}function u8(c,a){return vh(c)||Hh(c,a)||o9(c,a)||ph()}function A3(c){return zh(c)||hh(c)||o9(c)||uh()}function zh(c){if(Array.isArray(c))return P6(c)}function vh(c){if(Array.isArray(c))return c}function hh(c){if(typeof Symbol<"u"&&c[Symbol.iterator]!=null||c["@@iterator"]!=null)return Array.from(c)}function Hh(c,a){var e=c==null?null:typeof Symbol<"u"&&c[Symbol.iterator]||c["@@iterator"];if(e!=null){var r=[],s=!0,i=!1,l,n;try{for(e=e.call(c);!(s=(l=e.next()).done)&&(r.push(l.value),!(a&&r.length===a));s=!0);}catch(f){i=!0,n=f}finally{try{!s&&e.return!=null&&e.return()}finally{if(i)throw n}}return r}}function o9(c,a){if(c){if(typeof c=="string")return P6(c,a);var e=Object.prototype.toString.call(c).slice(8,-1);if(e==="Object"&&c.constructor&&(e=c.constructor.name),e==="Map"||e==="Set")return Array.from(c);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return P6(c,a)}}function P6(c,a){(a==null||a>c.length)&&(a=c.length);for(var e=0,r=new Array(a);e<a;e++)r[e]=c[e];return r}function uh(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ph(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var S5=function(){},p8={},t9={},m9=null,z9={mark:S5,measure:S5};try{typeof window<"u"&&(p8=window),typeof document<"u"&&(t9=document),typeof MutationObserver<"u"&&(m9=MutationObserver),typeof performance<"u"&&(z9=performance)}catch{}var Vh=p8.navigator||{},y5=Vh.userAgent,k5=y5===void 0?"":y5,u2=p8,e1=t9,w5=m9,j3=z9;u2.document;var r2=!!e1.documentElement&&!!e1.head&&typeof e1.addEventListener=="function"&&typeof e1.createElement=="function",v9=~k5.indexOf("MSIE")||~k5.indexOf("Trident/"),Z3,K3,Y3,X3,Q3,J1="___FONT_AWESOME___",T6=16,h9="fa",H9="svg-inline--fa",A2="data-fa-i2svg",F6="data-fa-pseudo-element",Mh="data-fa-pseudo-element-pending",V8="data-prefix",M8="data-icon",A5="fontawesome-i2svg",Ch="async",dh=["HTML","HEAD","STYLE","SCRIPT"],u9=function(){try{return!0}catch{return!1}}(),a1="classic",n1="sharp",C8=[a1,n1];function P3(c){return new Proxy(c,{get:function(e,r){return r in e?e[r]:e[a1]}})}var b3=P3((Z3={},o1(Z3,a1,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),o1(Z3,n1,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),Z3)),N3=P3((K3={},o1(K3,a1,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),o1(K3,n1,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),K3)),S3=P3((Y3={},o1(Y3,a1,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),o1(Y3,n1,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),Y3)),Lh=P3((X3={},o1(X3,a1,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),o1(X3,n1,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),X3)),gh=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,p9="fa-layers-text",xh=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,bh=P3((Q3={},o1(Q3,a1,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),o1(Q3,n1,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),Q3)),V9=[1,2,3,4,5,6,7,8,9,10],Nh=V9.concat([11,12,13,14,15,16,17,18,19,20]),Sh=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],b2={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},y3=new Set;Object.keys(N3[a1]).map(y3.add.bind(y3));Object.keys(N3[n1]).map(y3.add.bind(y3));var yh=[].concat(C8,A3(y3),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",b2.GROUP,b2.SWAP_OPACITY,b2.PRIMARY,b2.SECONDARY]).concat(V9.map(function(c){return"".concat(c,"x")})).concat(Nh.map(function(c){return"w-".concat(c)})),p3=u2.FontAwesomeConfig||{};function kh(c){var a=e1.querySelector("script["+c+"]");if(a)return a.getAttribute(c)}function wh(c){return c===""?!0:c==="false"?!1:c==="true"?!0:c}if(e1&&typeof e1.querySelector=="function"){var Ah=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Ah.forEach(function(c){var a=u8(c,2),e=a[0],r=a[1],s=wh(kh(e));s!=null&&(p3[r]=s)})}var M9={styleDefault:"solid",familyDefault:"classic",cssPrefix:h9,replacementClass:H9,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};p3.familyPrefix&&(p3.cssPrefix=p3.familyPrefix);var c3=P(P({},M9),p3);c3.autoReplaceSvg||(c3.observeMutations=!1);var B={};Object.keys(M9).forEach(function(c){Object.defineProperty(B,c,{enumerable:!0,set:function(e){c3[c]=e,V3.forEach(function(r){return r(B)})},get:function(){return c3[c]}})});Object.defineProperty(B,"familyPrefix",{enumerable:!0,set:function(a){c3.cssPrefix=a,V3.forEach(function(e){return e(B)})},get:function(){return c3.cssPrefix}});u2.FontAwesomeConfig=B;var V3=[];function Ph(c){return V3.push(c),function(){V3.splice(V3.indexOf(c),1)}}var f2=T6,j1={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Th(c){if(!(!c||!r2)){var a=e1.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=c;for(var e=e1.head.childNodes,r=null,s=e.length-1;s>-1;s--){var i=e[s],l=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(l)>-1&&(r=i)}return e1.head.insertBefore(a,r),c}}var Fh="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function k3(){for(var c=12,a="";c-- >0;)a+=Fh[Math.random()*62|0];return a}function e3(c){for(var a=[],e=(c||[]).length>>>0;e--;)a[e]=c[e];return a}function d8(c){return c.classList?e3(c.classList):(c.getAttribute("class")||"").split(" ").filter(function(a){return a})}function C9(c){return"".concat(c).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Bh(c){return Object.keys(c||{}).reduce(function(a,e){return a+"".concat(e,'="').concat(C9(c[e]),'" ')},"").trim()}function F4(c){return Object.keys(c||{}).reduce(function(a,e){return a+"".concat(e,": ").concat(c[e].trim(),";")},"")}function L8(c){return c.size!==j1.size||c.x!==j1.x||c.y!==j1.y||c.rotate!==j1.rotate||c.flipX||c.flipY}function Rh(c){var a=c.transform,e=c.containerWidth,r=c.iconWidth,s={transform:"translate(".concat(e/2," 256)")},i="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),n="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(i," ").concat(l," ").concat(n)},t={transform:"translate(".concat(r/2*-1," -256)")};return{outer:s,inner:f,path:t}}function _h(c){var a=c.transform,e=c.width,r=e===void 0?T6:e,s=c.height,i=s===void 0?T6:s,l=c.startCentered,n=l===void 0?!1:l,f="";return n&&v9?f+="translate(".concat(a.x/f2-r/2,"em, ").concat(a.y/f2-i/2,"em) "):n?f+="translate(calc(-50% + ".concat(a.x/f2,"em), calc(-50% + ").concat(a.y/f2,"em)) "):f+="translate(".concat(a.x/f2,"em, ").concat(a.y/f2,"em) "),f+="scale(".concat(a.size/f2*(a.flipX?-1:1),", ").concat(a.size/f2*(a.flipY?-1:1),") "),f+="rotate(".concat(a.rotate,"deg) "),f}var Eh=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, 0));
          transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function d9(){var c=h9,a=H9,e=B.cssPrefix,r=B.replacementClass,s=Eh;if(e!==c||r!==a){var i=new RegExp("\\.".concat(c,"\\-"),"g"),l=new RegExp("\\--".concat(c,"\\-"),"g"),n=new RegExp("\\.".concat(a),"g");s=s.replace(i,".".concat(e,"-")).replace(l,"--".concat(e,"-")).replace(n,".".concat(r))}return s}var P5=!1;function z6(){B.autoAddCss&&!P5&&(Th(d9()),P5=!0)}var qh={mixout:function(){return{dom:{css:d9,insertCss:z6}}},hooks:function(){return{beforeDOMElementCreation:function(){z6()},beforeI2svg:function(){z6()}}}},c2=u2||{};c2[J1]||(c2[J1]={});c2[J1].styles||(c2[J1].styles={});c2[J1].hooks||(c2[J1].hooks={});c2[J1].shims||(c2[J1].shims=[]);var _1=c2[J1],L9=[],Dh=function c(){e1.removeEventListener("DOMContentLoaded",c),u4=1,L9.map(function(a){return a()})},u4=!1;r2&&(u4=(e1.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(e1.readyState),u4||e1.addEventListener("DOMContentLoaded",Dh));function Oh(c){r2&&(u4?setTimeout(c,0):L9.push(c))}function T3(c){var a=c.tag,e=c.attributes,r=e===void 0?{}:e,s=c.children,i=s===void 0?[]:s;return typeof c=="string"?C9(c):"<".concat(a," ").concat(Bh(r),">").concat(i.map(T3).join(""),"</").concat(a,">")}function T5(c,a,e){if(c&&c[a]&&c[a][e])return{prefix:a,iconName:e,icon:c[a][e]}}var Uh=function(a,e){return function(r,s,i,l){return a.call(e,r,s,i,l)}},v6=function(a,e,r,s){var i=Object.keys(a),l=i.length,n=s!==void 0?Uh(e,s):e,f,t,o;for(r===void 0?(f=1,o=a[i[0]]):(f=0,o=r);f<l;f++)t=i[f],o=n(o,a[t],t,a);return o};function $h(c){for(var a=[],e=0,r=c.length;e<r;){var s=c.charCodeAt(e++);if(s>=55296&&s<=56319&&e<r){var i=c.charCodeAt(e++);(i&64512)==56320?a.push(((s&1023)<<10)+(i&1023)+65536):(a.push(s),e--)}else a.push(s)}return a}function B6(c){var a=$h(c);return a.length===1?a[0].toString(16):null}function Ih(c,a){var e=c.length,r=c.charCodeAt(a),s;return r>=55296&&r<=56319&&e>a+1&&(s=c.charCodeAt(a+1),s>=56320&&s<=57343)?(r-55296)*1024+s-56320+65536:r}function F5(c){return Object.keys(c).reduce(function(a,e){var r=c[e],s=!!r.icon;return s?a[r.iconName]=r.icon:a[e]=r,a},{})}function R6(c,a){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=e.skipHooks,s=r===void 0?!1:r,i=F5(a);typeof _1.hooks.addPack=="function"&&!s?_1.hooks.addPack(c,F5(a)):_1.styles[c]=P(P({},_1.styles[c]||{}),i),c==="fas"&&R6("fa",a)}var J3,c4,a4,U2=_1.styles,Gh=_1.shims,Wh=(J3={},o1(J3,a1,Object.values(S3[a1])),o1(J3,n1,Object.values(S3[n1])),J3),g8=null,g9={},x9={},b9={},N9={},S9={},jh=(c4={},o1(c4,a1,Object.keys(b3[a1])),o1(c4,n1,Object.keys(b3[n1])),c4);function Zh(c){return~yh.indexOf(c)}function Kh(c,a){var e=a.split("-"),r=e[0],s=e.slice(1).join("-");return r===c&&s!==""&&!Zh(s)?s:null}var y9=function(){var a=function(i){return v6(U2,function(l,n,f){return l[f]=v6(n,i,{}),l},{})};g9=a(function(s,i,l){if(i[3]&&(s[i[3]]=l),i[2]){var n=i[2].filter(function(f){return typeof f=="number"});n.forEach(function(f){s[f.toString(16)]=l})}return s}),x9=a(function(s,i,l){if(s[l]=l,i[2]){var n=i[2].filter(function(f){return typeof f=="string"});n.forEach(function(f){s[f]=l})}return s}),S9=a(function(s,i,l){var n=i[2];return s[l]=l,n.forEach(function(f){s[f]=l}),s});var e="far"in U2||B.autoFetchSvg,r=v6(Gh,function(s,i){var l=i[0],n=i[1],f=i[2];return n==="far"&&!e&&(n="fas"),typeof l=="string"&&(s.names[l]={prefix:n,iconName:f}),typeof l=="number"&&(s.unicodes[l.toString(16)]={prefix:n,iconName:f}),s},{names:{},unicodes:{}});b9=r.names,N9=r.unicodes,g8=B4(B.styleDefault,{family:B.familyDefault})};Ph(function(c){g8=B4(c.styleDefault,{family:B.familyDefault})});y9();function x8(c,a){return(g9[c]||{})[a]}function Yh(c,a){return(x9[c]||{})[a]}function N2(c,a){return(S9[c]||{})[a]}function k9(c){return b9[c]||{prefix:null,iconName:null}}function Xh(c){var a=N9[c],e=x8("fas",c);return a||(e?{prefix:"fas",iconName:e}:null)||{prefix:null,iconName:null}}function p2(){return g8}var b8=function(){return{prefix:null,iconName:null,rest:[]}};function B4(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=a.family,r=e===void 0?a1:e,s=b3[r][c],i=N3[r][c]||N3[r][s],l=c in _1.styles?c:null;return i||l||null}var B5=(a4={},o1(a4,a1,Object.keys(S3[a1])),o1(a4,n1,Object.keys(S3[n1])),a4);function R4(c){var a,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.skipLookups,s=r===void 0?!1:r,i=(a={},o1(a,a1,"".concat(B.cssPrefix,"-").concat(a1)),o1(a,n1,"".concat(B.cssPrefix,"-").concat(n1)),a),l=null,n=a1;(c.includes(i[a1])||c.some(function(t){return B5[a1].includes(t)}))&&(n=a1),(c.includes(i[n1])||c.some(function(t){return B5[n1].includes(t)}))&&(n=n1);var f=c.reduce(function(t,o){var v=Kh(B.cssPrefix,o);if(U2[o]?(o=Wh[n].includes(o)?Lh[n][o]:o,l=o,t.prefix=o):jh[n].indexOf(o)>-1?(l=o,t.prefix=B4(o,{family:n})):v?t.iconName=v:o!==B.replacementClass&&o!==i[a1]&&o!==i[n1]&&t.rest.push(o),!s&&t.prefix&&t.iconName){var h=l==="fa"?k9(t.iconName):{},u=N2(t.prefix,t.iconName);h.prefix&&(l=null),t.iconName=h.iconName||u||t.iconName,t.prefix=h.prefix||t.prefix,t.prefix==="far"&&!U2.far&&U2.fas&&!B.autoFetchSvg&&(t.prefix="fas")}return t},b8());return(c.includes("fa-brands")||c.includes("fab"))&&(f.prefix="fab"),(c.includes("fa-duotone")||c.includes("fad"))&&(f.prefix="fad"),!f.prefix&&n===n1&&(U2.fass||B.autoFetchSvg)&&(f.prefix="fass",f.iconName=N2(f.prefix,f.iconName)||f.iconName),(f.prefix==="fa"||l==="fa")&&(f.prefix=p2()||"fas"),f}var Qh=function(){function c(){th(this,c),this.definitions={}}return mh(c,[{key:"add",value:function(){for(var e=this,r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];var l=s.reduce(this._pullDefinitions,{});Object.keys(l).forEach(function(n){e.definitions[n]=P(P({},e.definitions[n]||{}),l[n]),R6(n,l[n]);var f=S3[a1][n];f&&R6(f,l[n]),y9()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(e,r){var s=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(s).map(function(i){var l=s[i],n=l.prefix,f=l.iconName,t=l.icon,o=t[2];e[n]||(e[n]={}),o.length>0&&o.forEach(function(v){typeof v=="string"&&(e[n][v]=t)}),e[n][f]=t}),e}}]),c}(),R5=[],$2={},Z2={},Jh=Object.keys(Z2);function cH(c,a){var e=a.mixoutsTo;return R5=c,$2={},Object.keys(Z2).forEach(function(r){Jh.indexOf(r)===-1&&delete Z2[r]}),R5.forEach(function(r){var s=r.mixout?r.mixout():{};if(Object.keys(s).forEach(function(l){typeof s[l]=="function"&&(e[l]=s[l]),H4(s[l])==="object"&&Object.keys(s[l]).forEach(function(n){e[l]||(e[l]={}),e[l][n]=s[l][n]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(l){$2[l]||($2[l]=[]),$2[l].push(i[l])})}r.provides&&r.provides(Z2)}),e}function _6(c,a){for(var e=arguments.length,r=new Array(e>2?e-2:0),s=2;s<e;s++)r[s-2]=arguments[s];var i=$2[c]||[];return i.forEach(function(l){a=l.apply(null,[a].concat(r))}),a}function P2(c){for(var a=arguments.length,e=new Array(a>1?a-1:0),r=1;r<a;r++)e[r-1]=arguments[r];var s=$2[c]||[];s.forEach(function(i){i.apply(null,e)})}function a2(){var c=arguments[0],a=Array.prototype.slice.call(arguments,1);return Z2[c]?Z2[c].apply(null,a):void 0}function E6(c){c.prefix==="fa"&&(c.prefix="fas");var a=c.iconName,e=c.prefix||p2();if(a)return a=N2(e,a)||a,T5(w9.definitions,e,a)||T5(_1.styles,e,a)}var w9=new Qh,aH=function(){B.autoReplaceSvg=!1,B.observeMutations=!1,P2("noAuto")},eH={i2svg:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return r2?(P2("beforeI2svg",a),a2("pseudoElements2svg",a),a2("i2svg",a)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=a.autoReplaceSvgRoot;B.autoReplaceSvg===!1&&(B.autoReplaceSvg=!0),B.observeMutations=!0,Oh(function(){sH({autoReplaceSvgRoot:e}),P2("watch",a)})}},rH={icon:function(a){if(a===null)return null;if(H4(a)==="object"&&a.prefix&&a.iconName)return{prefix:a.prefix,iconName:N2(a.prefix,a.iconName)||a.iconName};if(Array.isArray(a)&&a.length===2){var e=a[1].indexOf("fa-")===0?a[1].slice(3):a[1],r=B4(a[0]);return{prefix:r,iconName:N2(r,e)||e}}if(typeof a=="string"&&(a.indexOf("".concat(B.cssPrefix,"-"))>-1||a.match(gh))){var s=R4(a.split(" "),{skipLookups:!0});return{prefix:s.prefix||p2(),iconName:N2(s.prefix,s.iconName)||s.iconName}}if(typeof a=="string"){var i=p2();return{prefix:i,iconName:N2(i,a)||a}}}},A1={noAuto:aH,config:B,dom:eH,parse:rH,library:w9,findIconDefinition:E6,toHtml:T3},sH=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=a.autoReplaceSvgRoot,r=e===void 0?e1:e;(Object.keys(_1.styles).length>0||B.autoFetchSvg)&&r2&&B.autoReplaceSvg&&A1.dom.i2svg({node:r})};function _4(c,a){return Object.defineProperty(c,"abstract",{get:a}),Object.defineProperty(c,"html",{get:function(){return c.abstract.map(function(r){return T3(r)})}}),Object.defineProperty(c,"node",{get:function(){if(r2){var r=e1.createElement("div");return r.innerHTML=c.html,r.children}}}),c}function iH(c){var a=c.children,e=c.main,r=c.mask,s=c.attributes,i=c.styles,l=c.transform;if(L8(l)&&e.found&&!r.found){var n=e.width,f=e.height,t={x:n/f/2,y:.5};s.style=F4(P(P({},i),{},{"transform-origin":"".concat(t.x+l.x/16,"em ").concat(t.y+l.y/16,"em")}))}return[{tag:"svg",attributes:s,children:a}]}function lH(c){var a=c.prefix,e=c.iconName,r=c.children,s=c.attributes,i=c.symbol,l=i===!0?"".concat(a,"-").concat(B.cssPrefix,"-").concat(e):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:P(P({},s),{},{id:l}),children:r}]}]}function N8(c){var a=c.icons,e=a.main,r=a.mask,s=c.prefix,i=c.iconName,l=c.transform,n=c.symbol,f=c.title,t=c.maskId,o=c.titleId,v=c.extra,h=c.watchable,u=h===void 0?!1:h,S=r.found?r:e,A=S.width,_=S.height,M=s==="fak",d=[B.replacementClass,i?"".concat(B.cssPrefix,"-").concat(i):""].filter(function(p1){return v.classes.indexOf(p1)===-1}).filter(function(p1){return p1!==""||!!p1}).concat(v.classes).join(" "),w={children:[],attributes:P(P({},v.attributes),{},{"data-prefix":s,"data-icon":i,class:d,role:v.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(A," ").concat(_)})},D=M&&!~v.classes.indexOf("fa-fw")?{width:"".concat(A/_*16*.0625,"em")}:{};u&&(w.attributes[A2]=""),f&&(w.children.push({tag:"title",attributes:{id:w.attributes["aria-labelledby"]||"title-".concat(o||k3())},children:[f]}),delete w.attributes.title);var I=P(P({},w),{},{prefix:s,iconName:i,main:e,mask:r,maskId:t,transform:l,symbol:n,styles:P(P({},D),v.styles)}),q=r.found&&e.found?a2("generateAbstractMask",I)||{children:[],attributes:{}}:a2("generateAbstractIcon",I)||{children:[],attributes:{}},c1=q.children,u1=q.attributes;return I.children=c1,I.attributes=u1,n?lH(I):iH(I)}function _5(c){var a=c.content,e=c.width,r=c.height,s=c.transform,i=c.title,l=c.extra,n=c.watchable,f=n===void 0?!1:n,t=P(P(P({},l.attributes),i?{title:i}:{}),{},{class:l.classes.join(" ")});f&&(t[A2]="");var o=P({},l.styles);L8(s)&&(o.transform=_h({transform:s,startCentered:!0,width:e,height:r}),o["-webkit-transform"]=o.transform);var v=F4(o);v.length>0&&(t.style=v);var h=[];return h.push({tag:"span",attributes:t,children:[a]}),i&&h.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),h}function nH(c){var a=c.content,e=c.title,r=c.extra,s=P(P(P({},r.attributes),e?{title:e}:{}),{},{class:r.classes.join(" ")}),i=F4(r.styles);i.length>0&&(s.style=i);var l=[];return l.push({tag:"span",attributes:s,children:[a]}),e&&l.push({tag:"span",attributes:{class:"sr-only"},children:[e]}),l}var h6=_1.styles;function q6(c){var a=c[0],e=c[1],r=c.slice(4),s=u8(r,1),i=s[0],l=null;return Array.isArray(i)?l={tag:"g",attributes:{class:"".concat(B.cssPrefix,"-").concat(b2.GROUP)},children:[{tag:"path",attributes:{class:"".concat(B.cssPrefix,"-").concat(b2.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(B.cssPrefix,"-").concat(b2.PRIMARY),fill:"currentColor",d:i[1]}}]}:l={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:a,height:e,icon:l}}var fH={found:!1,width:512,height:512};function oH(c,a){!u9&&!B.showMissingIcons&&c&&console.error('Icon with name "'.concat(c,'" and prefix "').concat(a,'" is missing.'))}function D6(c,a){var e=a;return a==="fa"&&B.styleDefault!==null&&(a=p2()),new Promise(function(r,s){if(a2("missingIconAbstract"),e==="fa"){var i=k9(c)||{};c=i.iconName||c,a=i.prefix||a}if(c&&a&&h6[a]&&h6[a][c]){var l=h6[a][c];return r(q6(l))}oH(c,a),r(P(P({},fH),{},{icon:B.showMissingIcons&&c?a2("missingIconAbstract")||{}:{}}))})}var E5=function(){},O6=B.measurePerformance&&j3&&j3.mark&&j3.measure?j3:{mark:E5,measure:E5},o3='FA "6.5.2"',tH=function(a){return O6.mark("".concat(o3," ").concat(a," begins")),function(){return A9(a)}},A9=function(a){O6.mark("".concat(o3," ").concat(a," ends")),O6.measure("".concat(o3," ").concat(a),"".concat(o3," ").concat(a," begins"),"".concat(o3," ").concat(a," ends"))},S8={begin:tH,end:A9},f4=function(){};function q5(c){var a=c.getAttribute?c.getAttribute(A2):null;return typeof a=="string"}function mH(c){var a=c.getAttribute?c.getAttribute(V8):null,e=c.getAttribute?c.getAttribute(M8):null;return a&&e}function zH(c){return c&&c.classList&&c.classList.contains&&c.classList.contains(B.replacementClass)}function vH(){if(B.autoReplaceSvg===!0)return o4.replace;var c=o4[B.autoReplaceSvg];return c||o4.replace}function hH(c){return e1.createElementNS("http://www.w3.org/2000/svg",c)}function HH(c){return e1.createElement(c)}function P9(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=a.ceFn,r=e===void 0?c.tag==="svg"?hH:HH:e;if(typeof c=="string")return e1.createTextNode(c);var s=r(c.tag);Object.keys(c.attributes||[]).forEach(function(l){s.setAttribute(l,c.attributes[l])});var i=c.children||[];return i.forEach(function(l){s.appendChild(P9(l,{ceFn:r}))}),s}function uH(c){var a=" ".concat(c.outerHTML," ");return a="".concat(a,"Font Awesome fontawesome.com "),a}var o4={replace:function(a){var e=a[0];if(e.parentNode)if(a[1].forEach(function(s){e.parentNode.insertBefore(P9(s),e)}),e.getAttribute(A2)===null&&B.keepOriginalSource){var r=e1.createComment(uH(e));e.parentNode.replaceChild(r,e)}else e.remove()},nest:function(a){var e=a[0],r=a[1];if(~d8(e).indexOf(B.replacementClass))return o4.replace(a);var s=new RegExp("".concat(B.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(n,f){return f===B.replacementClass||f.match(s)?n.toSvg.push(f):n.toNode.push(f),n},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",i.toNode.join(" "))}var l=r.map(function(n){return T3(n)}).join(`
`);e.setAttribute(A2,""),e.innerHTML=l}};function D5(c){c()}function T9(c,a){var e=typeof a=="function"?a:f4;if(c.length===0)e();else{var r=D5;B.mutateApproach===Ch&&(r=u2.requestAnimationFrame||D5),r(function(){var s=vH(),i=S8.begin("mutate");c.map(s),i(),e()})}}var y8=!1;function F9(){y8=!0}function U6(){y8=!1}var p4=null;function O5(c){if(w5&&B.observeMutations){var a=c.treeCallback,e=a===void 0?f4:a,r=c.nodeCallback,s=r===void 0?f4:r,i=c.pseudoElementsCallback,l=i===void 0?f4:i,n=c.observeMutationsRoot,f=n===void 0?e1:n;p4=new w5(function(t){if(!y8){var o=p2();e3(t).forEach(function(v){if(v.type==="childList"&&v.addedNodes.length>0&&!q5(v.addedNodes[0])&&(B.searchPseudoElements&&l(v.target),e(v.target)),v.type==="attributes"&&v.target.parentNode&&B.searchPseudoElements&&l(v.target.parentNode),v.type==="attributes"&&q5(v.target)&&~Sh.indexOf(v.attributeName))if(v.attributeName==="class"&&mH(v.target)){var h=R4(d8(v.target)),u=h.prefix,S=h.iconName;v.target.setAttribute(V8,u||o),S&&v.target.setAttribute(M8,S)}else zH(v.target)&&s(v.target)})}}),r2&&p4.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function pH(){p4&&p4.disconnect()}function VH(c){var a=c.getAttribute("style"),e=[];return a&&(e=a.split(";").reduce(function(r,s){var i=s.split(":"),l=i[0],n=i.slice(1);return l&&n.length>0&&(r[l]=n.join(":").trim()),r},{})),e}function MH(c){var a=c.getAttribute("data-prefix"),e=c.getAttribute("data-icon"),r=c.innerText!==void 0?c.innerText.trim():"",s=R4(d8(c));return s.prefix||(s.prefix=p2()),a&&e&&(s.prefix=a,s.iconName=e),s.iconName&&s.prefix||(s.prefix&&r.length>0&&(s.iconName=Yh(s.prefix,c.innerText)||x8(s.prefix,B6(c.innerText))),!s.iconName&&B.autoFetchSvg&&c.firstChild&&c.firstChild.nodeType===Node.TEXT_NODE&&(s.iconName=c.firstChild.data)),s}function CH(c){var a=e3(c.attributes).reduce(function(s,i){return s.name!=="class"&&s.name!=="style"&&(s[i.name]=i.value),s},{}),e=c.getAttribute("title"),r=c.getAttribute("data-fa-title-id");return B.autoA11y&&(e?a["aria-labelledby"]="".concat(B.replacementClass,"-title-").concat(r||k3()):(a["aria-hidden"]="true",a.focusable="false")),a}function dH(){return{iconName:null,title:null,titleId:null,prefix:null,transform:j1,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function U5(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},e=MH(c),r=e.iconName,s=e.prefix,i=e.rest,l=CH(c),n=_6("parseNodeAttributes",{},c),f=a.styleParser?VH(c):[];return P({iconName:r,title:c.getAttribute("title"),titleId:c.getAttribute("data-fa-title-id"),prefix:s,transform:j1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:f,attributes:l}},n)}var LH=_1.styles;function B9(c){var a=B.autoReplaceSvg==="nest"?U5(c,{styleParser:!1}):U5(c);return~a.extra.classes.indexOf(p9)?a2("generateLayersText",c,a):a2("generateSvgReplacementMutation",c,a)}var V2=new Set;C8.map(function(c){V2.add("fa-".concat(c))});Object.keys(b3[a1]).map(V2.add.bind(V2));Object.keys(b3[n1]).map(V2.add.bind(V2));V2=A3(V2);function $5(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!r2)return Promise.resolve();var e=e1.documentElement.classList,r=function(v){return e.add("".concat(A5,"-").concat(v))},s=function(v){return e.remove("".concat(A5,"-").concat(v))},i=B.autoFetchSvg?V2:C8.map(function(o){return"fa-".concat(o)}).concat(Object.keys(LH));i.includes("fa")||i.push("fa");var l=[".".concat(p9,":not([").concat(A2,"])")].concat(i.map(function(o){return".".concat(o,":not([").concat(A2,"])")})).join(", ");if(l.length===0)return Promise.resolve();var n=[];try{n=e3(c.querySelectorAll(l))}catch{}if(n.length>0)r("pending"),s("complete");else return Promise.resolve();var f=S8.begin("onTree"),t=n.reduce(function(o,v){try{var h=B9(v);h&&o.push(h)}catch(u){u9||u.name==="MissingIcon"&&console.error(u)}return o},[]);return new Promise(function(o,v){Promise.all(t).then(function(h){T9(h,function(){r("active"),r("complete"),s("pending"),typeof a=="function"&&a(),f(),o()})}).catch(function(h){f(),v(h)})})}function gH(c){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;B9(c).then(function(e){e&&T9([e],a)})}function xH(c){return function(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(a||{}).icon?a:E6(a||{}),s=e.mask;return s&&(s=(s||{}).icon?s:E6(s||{})),c(r,P(P({},e),{},{mask:s}))}}var bH=function(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.transform,s=r===void 0?j1:r,i=e.symbol,l=i===void 0?!1:i,n=e.mask,f=n===void 0?null:n,t=e.maskId,o=t===void 0?null:t,v=e.title,h=v===void 0?null:v,u=e.titleId,S=u===void 0?null:u,A=e.classes,_=A===void 0?[]:A,M=e.attributes,d=M===void 0?{}:M,w=e.styles,D=w===void 0?{}:w;if(a){var I=a.prefix,q=a.iconName,c1=a.icon;return _4(P({type:"icon"},a),function(){return P2("beforeDOMElementCreation",{iconDefinition:a,params:e}),B.autoA11y&&(h?d["aria-labelledby"]="".concat(B.replacementClass,"-title-").concat(S||k3()):(d["aria-hidden"]="true",d.focusable="false")),N8({icons:{main:q6(c1),mask:f?q6(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:I,iconName:q,transform:P(P({},j1),s),symbol:l,title:h,maskId:o,titleId:S,extra:{attributes:d,styles:D,classes:_}})})}},NH={mixout:function(){return{icon:xH(bH)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=$5,e.nodeCallback=gH,e}}},provides:function(a){a.i2svg=function(e){var r=e.node,s=r===void 0?e1:r,i=e.callback,l=i===void 0?function(){}:i;return $5(s,l)},a.generateSvgReplacementMutation=function(e,r){var s=r.iconName,i=r.title,l=r.titleId,n=r.prefix,f=r.transform,t=r.symbol,o=r.mask,v=r.maskId,h=r.extra;return new Promise(function(u,S){Promise.all([D6(s,n),o.iconName?D6(o.iconName,o.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(A){var _=u8(A,2),M=_[0],d=_[1];u([e,N8({icons:{main:M,mask:d},prefix:n,iconName:s,transform:f,symbol:t,maskId:v,title:i,titleId:l,extra:h,watchable:!0})])}).catch(S)})},a.generateAbstractIcon=function(e){var r=e.children,s=e.attributes,i=e.main,l=e.transform,n=e.styles,f=F4(n);f.length>0&&(s.style=f);var t;return L8(l)&&(t=a2("generateAbstractTransformGrouping",{main:i,transform:l,containerWidth:i.width,iconWidth:i.width})),r.push(t||i.icon),{children:r,attributes:s}}}},SH={mixout:function(){return{layer:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.classes,i=s===void 0?[]:s;return _4({type:"layer"},function(){P2("beforeDOMElementCreation",{assembler:e,params:r});var l=[];return e(function(n){Array.isArray(n)?n.map(function(f){l=l.concat(f.abstract)}):l=l.concat(n.abstract)}),[{tag:"span",attributes:{class:["".concat(B.cssPrefix,"-layers")].concat(A3(i)).join(" ")},children:l}]})}}}},yH={mixout:function(){return{counter:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.title,i=s===void 0?null:s,l=r.classes,n=l===void 0?[]:l,f=r.attributes,t=f===void 0?{}:f,o=r.styles,v=o===void 0?{}:o;return _4({type:"counter",content:e},function(){return P2("beforeDOMElementCreation",{content:e,params:r}),nH({content:e.toString(),title:i,extra:{attributes:t,styles:v,classes:["".concat(B.cssPrefix,"-layers-counter")].concat(A3(n))}})})}}}},kH={mixout:function(){return{text:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.transform,i=s===void 0?j1:s,l=r.title,n=l===void 0?null:l,f=r.classes,t=f===void 0?[]:f,o=r.attributes,v=o===void 0?{}:o,h=r.styles,u=h===void 0?{}:h;return _4({type:"text",content:e},function(){return P2("beforeDOMElementCreation",{content:e,params:r}),_5({content:e,transform:P(P({},j1),i),title:n,extra:{attributes:v,styles:u,classes:["".concat(B.cssPrefix,"-layers-text")].concat(A3(t))}})})}}},provides:function(a){a.generateLayersText=function(e,r){var s=r.title,i=r.transform,l=r.extra,n=null,f=null;if(v9){var t=parseInt(getComputedStyle(e).fontSize,10),o=e.getBoundingClientRect();n=o.width/t,f=o.height/t}return B.autoA11y&&!s&&(l.attributes["aria-hidden"]="true"),Promise.resolve([e,_5({content:e.innerHTML,width:n,height:f,transform:i,title:s,extra:l,watchable:!0})])}}},wH=new RegExp('"',"ug"),I5=[1105920,1112319];function AH(c){var a=c.replace(wH,""),e=Ih(a,0),r=e>=I5[0]&&e<=I5[1],s=a.length===2?a[0]===a[1]:!1;return{value:B6(s?a[0]:a),isSecondary:r||s}}function G5(c,a){var e="".concat(Mh).concat(a.replace(":","-"));return new Promise(function(r,s){if(c.getAttribute(e)!==null)return r();var i=e3(c.children),l=i.filter(function(c1){return c1.getAttribute(F6)===a})[0],n=u2.getComputedStyle(c,a),f=n.getPropertyValue("font-family").match(xh),t=n.getPropertyValue("font-weight"),o=n.getPropertyValue("content");if(l&&!f)return c.removeChild(l),r();if(f&&o!=="none"&&o!==""){var v=n.getPropertyValue("content"),h=~["Sharp"].indexOf(f[2])?n1:a1,u=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(f[2])?N3[h][f[2].toLowerCase()]:bh[h][t],S=AH(v),A=S.value,_=S.isSecondary,M=f[0].startsWith("FontAwesome"),d=x8(u,A),w=d;if(M){var D=Xh(A);D.iconName&&D.prefix&&(d=D.iconName,u=D.prefix)}if(d&&!_&&(!l||l.getAttribute(V8)!==u||l.getAttribute(M8)!==w)){c.setAttribute(e,w),l&&c.removeChild(l);var I=dH(),q=I.extra;q.attributes[F6]=a,D6(d,u).then(function(c1){var u1=N8(P(P({},I),{},{icons:{main:c1,mask:b8()},prefix:u,iconName:w,extra:q,watchable:!0})),p1=e1.createElementNS("http://www.w3.org/2000/svg","svg");a==="::before"?c.insertBefore(p1,c.firstChild):c.appendChild(p1),p1.outerHTML=u1.map(function(P1){return T3(P1)}).join(`