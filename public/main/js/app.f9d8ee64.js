(function(t){function e(e){for(var s,r,o=e[0],c=e[1],u=e[2],m=0,p=[];m<o.length;m++)r=o[m],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);l&&l(e);while(p.length)p.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(s=!1)}s&&(n.splice(e--,1),t=r(r.s=a[0]))}return t}var s={},i={app:0},n=[];function r(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=s,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},2644:function(t,e,a){},3134:function(t,e,a){t.exports=a.p+"img/psyduck.35bb7028.svg"},3979:function(t,e,a){t.exports=a.p+"img/pikachu-2.9820a5c2.svg"},"436d":function(t,e,a){"use strict";var s=a("2644"),i=a.n(s);i.a},"43a2":function(t,e,a){t.exports=a.p+"img/star.177be070.svg"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{attrs:{id:"app"}},[s("aside",{staticClass:"aside"},[s("button",{staticClass:"btn btn--pink",on:{click:t.openGame}},[s("img",{attrs:{src:a("3979")}}),t._v(" Start Page ")]),t._m(0),t._m(1),t._m(2),t._m(3)]),s("router-view",{staticClass:"container"}),t._m(4)],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn btn--purple"},[s("img",{attrs:{src:a("ff0b")}}),t._v(" Start Playing ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn btn--deepblue"},[s("img",{attrs:{src:a("dafa")}}),t._v(" Login ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn btn--blue"},[s("img",{attrs:{src:a("acd0")}}),t._v(" Register ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn btn--green"},[s("img",{attrs:{src:a("3134")}}),t._v(" Characters ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("aside",{staticClass:"aside aside--top"},[s("div",{staticClass:"aside-box"},[s("div",{staticClass:"aside-box-head"},[t._v("Points ladder")]),s("div",{staticClass:"aside-box-body"},[s("li",[s("img",{attrs:{src:a("43a2")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Blackspot")])]),s("li",[s("img",{attrs:{src:a("85e0")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Kostas")])]),s("li",[s("img",{attrs:{src:a("fc03")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Sparks Marshall")])])])]),s("div",{staticClass:"aside-box"},[s("div",{staticClass:"aside-box-head"},[t._v("Streak ladder")]),s("div",{staticClass:"aside-box-body"},[s("li",[s("img",{attrs:{src:a("43a2")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Blackspot")])]),s("li",[s("img",{attrs:{src:a("85e0")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Kostas")])]),s("li",[s("img",{attrs:{src:a("fc03")}}),s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}}),s("p",[t._v("Sparks Marshall")])])])]),s("div",{staticClass:"aside-box"},[s("div",{staticClass:"aside-box-head"},[t._v("Latest poll")]),s("div",{staticClass:"aside-box-body"})])])}],r=(a("99af"),{methods:{openGame:function(){var t=window.top.outerHeight/2+window.top.screenY-275,e=window.top.outerWidth/2+window.top.screenX-400;window.open("/game","mywin","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(850,", height=",550,", top=",t,", left=").concat(e))}}}),o=r,c=(a("5c0b"),a("2877")),u=Object(c["a"])(o,i,n,!1,null,null,null),l=u.exports,m=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("banner"),a("news"),a("div",{staticClass:"main"},[t._v("oi")])],1)},d=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"banner",style:{backgroundImage:"url("+t.banner+")"}})},b=[],v={computed:{banner:function(){var t=Math.floor(10*Math.random()+0);return"/img/mainsite/".concat(t,".png")}}},g=v,h=(a("436d"),Object(c["a"])(g,f,b,!1,null,null,null)),_=h.exports,w=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},y=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main"},[s("div",{staticClass:"main-body"},[s("div",{staticClass:"main-body-head"},[s("div",{staticClass:"main-icon"},[s("img",{attrs:{src:"https://placewaifu.com/image/75/75"}})]),s("div",{staticClass:"main-header"},[s("h5",[t._v("Pokemon Arena is Now Live!")]),s("p",[t._v("posted by: blackspot, on Tuesday, January 11, 2011 at 08:00")])])]),s("div",{staticClass:"main-body-content"},[t._v(" Lorem ipsum dolor sit amet, consectetur adipiscing elit. At ultricies turpis risus et sem. Etiam non facilisis ipsum. Morbi non dapibus augue. "),s("br"),s("br"),t._v("Sed pharetra consequat gravida. "),s("br"),s("br"),t._v("Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nec condimentum urna, at scelerisque eros. Etiam nec massa sed eros suscipit viverra. Integer condimentum scelerisque congue. Aliquam erat volutpat. "),s("br"),s("br"),t._v("Nam molestie, velit sed ornare ultrices, enim dui tempor diam, at fringilla diam ante vitae quam. Phasellus nisi nunc, venenatis in massa eu, euismod pellentesque libero. "),s("br"),s("br"),t._v("Maecenas faucibus, tellus vitae suscipit mollis, enim nunc placerat mi, vitae aliquam lectus odio non dolor. Integer finibus congue dui, eu malesuada magna efficitur non. "),s("br"),s("br"),t._v("Nunc ultricies risus quis purus egestas, ac consequat nisi imperdiet. Vestibulum semper malesuada turpis, nec varius ipsum. In hac habitasse platea dictumst. Proin blandit sagittis elit eu vestibulum. ")]),s("div",{staticClass:"main-body-footer"},[s("a",[s("img",{attrs:{src:a("bdf2")}}),t._v(" leave a comment ")])])])])}],x={},C=x,k=Object(c["a"])(C,w,y,!1,null,null,null),O=k.exports,j={banner:_,news:O},P={},E={},S={},$={data:function(){return{}},components:j,computed:P,methods:E,watchers:S},q=$,M=(a("95c4"),Object(c["a"])(q,p,d,!1,null,null,null)),I=M.exports;s["a"].use(m["a"]);var L=[{path:"/",name:"Home",component:I}],T=new m["a"]({mode:"history",base:"/",routes:L}),A=T,J=a("2f62");s["a"].use(J["a"]);var N=new J["a"].Store({state:{},mutations:{},actions:{},modules:{}});s["a"].config.productionTip=!1,new s["a"]({router:A,store:N,render:function(t){return t(l)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var s=a("9c0c"),i=a.n(s);i.a},"85e0":function(t,e,a){t.exports=a.p+"img/insignia.f47bf11c.svg"},"95c4":function(t,e,a){"use strict";var s=a("d26b"),i=a.n(s);i.a},"9c0c":function(t,e,a){},acd0:function(t,e,a){t.exports=a.p+"img/eevee.69c53349.svg"},bdf2:function(t,e,a){t.exports=a.p+"img/comments.e0e88a5a.svg"},d26b:function(t,e,a){},dafa:function(t,e,a){t.exports=a.p+"img/meowth.4d77d91c.svg"},fc03:function(t,e,a){t.exports=a.p+"img/insignia-1.19f88dc2.svg"},ff0b:function(t,e,a){t.exports=a.p+"img/mankey.687ba60d.svg"}});
//# sourceMappingURL=app.f9d8ee64.js.map