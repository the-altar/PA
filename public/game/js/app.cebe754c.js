(function(e){function t(t){for(var r,a,c=t[0],u=t[1],s=t[2],d=0,l=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);m&&m(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-28900322":"64077945","chunk-5e9c1195":"292caf56","chunk-7587e445":"50badd04"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-28900322":1,"chunk-5e9c1195":1,"chunk-7587e445":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-28900322":"b4a1ce62","chunk-5e9c1195":"09adbc0f","chunk-7587e445":"9b4aec60"}[e]+".css",o=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){s=l[c],d=s.getAttribute("data-href");if(d===r||d===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],m.parentNode.removeChild(m),n(i)},m.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=c(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var m=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/game/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var m=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{attrs:{id:"app"}},[n("canvas",{ref:"canvas",staticClass:"canvas"}),n("transition",{attrs:{name:"fade"}},[n("router-view",{directives:[{name:"show",rawName:"v-show",value:e.isLoaded,expression:"isLoaded"}]})],1)],1)},o=[],i=(n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("bc3a")),c=n.n(i),u={computed:{isLoaded:function(){return this.$store.state.midori.isLoaded}},created:function(){var e=this;c.a.get("/character").then((function(t){e.$store.commit("Roster/setData",t.data)})).catch((function(e){console.log(e)})),this.$store.commit("user/SET_USER",{_id:1,userName:Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,9),isLoggedIn:!0,avatarId:Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)})},mounted:function(){this.$store.commit("midori/setCanvas",this.$refs.canvas)}},s=u,d=(n("5c0b"),n("2877")),l=Object(d["a"])(s,a,o,!1,null,null,null),m=l.exports,f=n("8c4f");r["a"].use(f["a"]);var p=[{path:"/",component:function(){return n.e("chunk-28900322").then(n.bind(null,"d9c5"))},children:[{path:"",name:"home",component:function(){return n.e("chunk-5e9c1195").then(n.bind(null,"ed0b"))}},{path:"lobby",name:"lobby",component:function(){return n.e("chunk-7587e445").then(n.bind(null,"29e2"))}}]}],h=new f["a"]({mode:"history",base:"/game/",routes:p}),g=h,b=n("2f62"),v={namespaced:!0,state:{memberRank:"",userName:"",id:"",isLoggedIn:!1,avatarId:""},mutations:{SET_USER:function(e,t){e.id=t._id,e.avatarId=t.avatarId,e.userName=t.userName,e.memberRank=t.memberRank,e.isLoggedIn=!0}},getters:{getUserData:function(e){return{id:e.id,avatarId:e.avatarId,userName:e.userName,memberRank:e.memberRank}}},actions:{}},y={namespaced:!0,state:{data:[],isLoaded:!1},mutations:{setData:function(e,t){e.data=t,e.isLoaded=!0}}},w=(n("4de4"),{namespaced:!0,state:{players:[],characters:[],currentTeam:[]},getters:{GetMyData:function(e){return function(t){return e.players.filter((function(e){return e._id===t}))}},GetMyCharacters:function(e){return function(t){return e.characters.filter((function(e){return e.ownership===t}))}}},mutations:{setGame:function(e,t){e.characters=t.characters,e.players=t.players},addToTeam:function(e,t){if(!(e.currentTeam.length>=3)){for(var n=0;n<e.currentTeam.length;n++)if(e.currentTeam[n]._id===t._id)return;e.currentTeam.push(t)}}}}),k=n("0045"),S={namespaced:!0,state:{background:"",midoriRenderer:null,canvas:null,isLoaded:!1},mutations:{setHomeBackground:function(e){e.isLoaded=!1,k["e"]&&(e.midoriRenderer=new k["a"](e.canvas),Object(k["f"])(n("9cdf")).then((function(t){e.midoriRenderer.setBackground(t,{type:k["d"].Glitch,config:{seed:Math.random(),duration:1.5,easing:k["b"].Cubic.InOut}});var n=e.midoriRenderer.background.camera;n.sway({x:.1,y:.05,z:.02,zr:1},{duration:2,easing:k["b"].Quadratic.InOut,loop:!0});var r=e.midoriRenderer.background.effects;r.set(k["c"].MotionBlur,{intensity:1,samples:32}),r.set(k["c"].RgbShift,{amount:.005,angle:90}),r.set(k["c"].VignetteBlur,{size:3,radius:1.5,passes:10});var a=e.midoriRenderer.background.particles;a.generate([{name:"small",amount:100,maxSize:5,maxOpacity:1,minGradient:.75,maxGradient:1,color:16777215},{name:"large",amount:30,minSize:50,maxSize:100,maxOpacity:.1,minGradient:1,maxGradient:1,color:16777215}]),a.sway("large",{x:.025,y:.025},{duration:1.5,easing:k["b"].Sinusoidal.InOut,loop:!0}),a.sway("small",{x:.025,y:.025},{duration:1.5,easing:k["b"].Sinusoidal.InOut,loop:!0}),setTimeout((function(){e.isLoaded=!0}),1250)})).catch((function(e){alert(e)})))},setCanvas:function(e,t){e.canvas=t},setBackgroundImage:function(e,t){e.background=t}}};r["a"].use(b["a"]);var O=new b["a"].Store({modules:{user:v,Roster:y,game:w,midori:S}}),x=n("cd9f"),T=("https:"===window.location.protocol?"wss://":"ws://")+window.location.host;r["a"].prototype.$colyseus=new x["Client"](T),r["a"].config.productionTip=!1,new r["a"]({router:g,store:O,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"9c0c":function(e,t,n){},"9cdf":function(e,t,n){e.exports=n.p+"img/bg4.671dfcef.jpg"}});
//# sourceMappingURL=app.cebe754c.js.map