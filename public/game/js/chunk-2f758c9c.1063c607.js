(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f758c9c"],{"0331":function(t,e,a){t.exports=a.p+"img/coins_1.76bf98db.svg"},"15f5":function(t,e,a){t.exports=a.p+"img/pokeball.fa43dce7.png"},"2bb2":function(t,e,a){"use strict";var s=a("2fcc"),r=a.n(s);r.a},"2fcc":function(t,e,a){},"3e7b":function(t,e,a){},"5ab6":function(t,e,a){},6418:function(t,e,a){"use strict";var s=a("3e7b"),r=a.n(s);r.a},7500:function(t,e,a){"use strict";var s=a("c013"),r=a.n(s);r.a},7832:function(t,e,a){"use strict";var s=a("e0ef"),r=a.n(s);r.a},"7e21":function(t,e,a){},ad7a:function(t,e,a){t.exports=a.p+"img/rosterdark.738aa006.png"},c013:function(t,e,a){},cdba:function(t,e,a){"use strict";var s=a("5ab6"),r=a.n(s);r.a},e0ef:function(t,e,a){},ed0b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Character",{attrs:{id:t.selectedChar.id,banner:t.banner}},[t.selectedChar?a("CharacterDetail",{attrs:{character:t.selectedChar},on:{"change-component-view":t.updateView,"add-to-team":t.addToTeam}},[a(t.component,{tag:"component",attrs:{data:t.viewData}})],1):t._e()],1),a("Roster",{on:{"char-selected":t.setChar,"add-to-team":t.addToTeam}})],1)},r=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"roster"},[s("div",{staticClass:"roster-list",style:{"background-image":"url("+a("ad7a")+")"}},[s("img",{staticClass:"deco deco-top-left",attrs:{src:a("15f5")}}),s("img",{staticClass:"deco deco-btm-left",attrs:{src:a("15f5")}}),s("img",{staticClass:"deco deco-btm-rght",attrs:{src:a("15f5")}}),s("img",{staticClass:"deco deco-top-rght",attrs:{src:a("15f5")}}),t._l(t.roster,(function(e,a){return s("drag",{key:a,staticClass:"roster__icon",attrs:{"transfer-data":e}},[t.unlocked?s("img",{attrs:{src:"/img/game/"+e.facepic+".jpg"},on:{click:function(a){return t.selectCharacterMethod(e,!0)},dblclick:function(a){return t.emitAddToTeam(e)}}}):s("img",{staticClass:"roster-faded",attrs:{src:"/img/game/"+e.facepic+".jpg"},on:{click:function(a){return t.selectCharacterMethod(e,!0)}}})])}))],2),s("div",{staticClass:"roster-footer"},[s("img",{staticClass:"roster-list-next roster-list-next-reverse",attrs:{src:"/img/icons/next.svg"}}),t._l(Math.floor(t.roster.length/12),(function(t){return s("span",{key:t,staticClass:"roster-points"})})),s("img",{staticClass:"roster-list-next",attrs:{src:"/img/icons/next.svg"}})],2)])},c=[],i={},o=function(t,e){e&&this.$store.dispatch("audio/playClick"),this.$emit("char-selected",t)},l=function(t){this.$emit("add-to-team",t)},d={selectCharacterMethod:o,emitAddToTeam:l},u={computed:{roster:function(){return this.$store.state.Roster.data},isLoaded:function(){return this.$store.state.Roster.isLoaded},unlocked:function(){return!0}},components:i,methods:d,created:function(){this.selectCharacterMethod(this.roster[0])}},h=u,p=(a("7832"),a("2877")),m=Object(p["a"])(h,n,c,!1,null,null,null),f=m.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"character"},[a("transition",{attrs:{name:"slide-fade"}},[t.id?a("figure",{key:t.id,staticClass:"character__figure"},[a("img",{staticClass:"character__banner",attrs:{src:"/img/game/"+t.banner+".jpg"}})]):t._e()]),a("transition",{attrs:{name:"fade"}},[t._t("default")],2)],1)},g=[],C={},v={},k={},b={},y={props:["id","banner"],components:C,computed:v,methods:k,watchers:b},w=y,$=(a("2bb2"),Object(p["a"])(w,_,g,!1,null,"4b53d62c",null)),T=$.exports,x=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("article",{staticClass:"detail",style:{"background-image":"url("+a("ad7a")+")"}},[s("v-dialog"),t._t("default"),s("div",{staticClass:"detail__bottom"},[t._l(t.character.skills,(function(e,a){return s("img",{key:a,staticClass:"detail__skill",attrs:{src:"/img/game/"+e.skillpic+".jpg"},on:{click:function(a){return t.seeSkill(e)}}})})),t.unlocked?s("button",{staticClass:"detail__btn",on:{click:t.characterSelect}},[t._v(" Add ")]):t.funds>=t.character.cost?s("button",{staticClass:"detail-cost",on:{click:function(e){return t.showButtonDialog()}}},[t._v(" "+t._s(t.character.cost)+" "),s("img",{attrs:{src:a("0331")}})]):s("button",{staticClass:"detail-cost detail-cost-col"},[t._v(" "+t._s(t.funds)+" / "+t._s(t.character.cost)+" "),s("span",[t._v("Not enough funds")])])],2)],2)},D=[],j=(a("b0c0"),a("96cf"),a("1da1")),E={props:["character"],methods:{seeSkill:function(t){this.$store.dispatch("audio/playClick"),this.$emit("change-component-view",{component:"CharacterDetailSkill",data:t})},characterSelect:function(){this.$emit("add-to-team")},showButtonDialog:function(){var t=this;this.$modal.show("dialog",{title:"This license unlocks ".concat(this.character.name),text:"".concat(this.character.cost," coins will be credited from your account, are you sure you want to proceed?"),buttons:[{title:"Purchase",handler:function(){t.purchase()}},{title:"Cancel",handler:function(){t.$modal.hide("dialog")}}]})},purchase:function(){var t=this;return Object(j["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$http.post("/character/purchase",{coins:t.character.cost,userId:t.$store.getters["user/getUserData"].id,characterId:t.character.id});case 3:t.$store.getters["user/getUserData"].unlocked.push(t.character.id),t.$store.getters["user/getUserData"].coins-=t.character.cost,t.$modal.hide("dialog"),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),alert(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},computed:{unlocked:function(){return!0},funds:function(){return this.$store.getters["user/getUserData"].coins}}},O=E,R=(a("7500"),Object(p["a"])(O,x,D,!1,null,null,null)),S=R.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"profile"},[a("div",{staticClass:"profile__name"},[a("p",[t._v(t._s(t.data.name))]),a("div",{staticClass:"profile__energies"},t._l(t.data.energyGain,(function(e,s){return a("span",{key:s,class:"profile__energy "+t.energies[e]})})),0)]),a("p",{staticClass:"profile__description"},[t._v(t._s(t.data.description))]),a("p",{staticClass:"profile__typing"},[t._v(" Typing: "),t._l(t.data.type,(function(e,s){return a("span",{key:s,class:t.types[e]+"--text profile__typing__type"},[t._v(t._s(t.types[e]))])}))],2)])},P=[],U={props:["data"],data:function(){return{energies:["speed","strength","elemental","wisdom","random"]}},methods:{},computed:{types:function(){return this.$store.getters["enums/getEnum"]("pokemonTypings")}},watchers:{}},A=U,B=(a("cdba"),Object(p["a"])(A,M,P,!1,null,null,null)),I=B.exports,J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"skill"},[a("div",{staticClass:"skill__name"},[a("p",[t._v(t._s(t.data.name))]),a("div",{staticClass:"skill__energies"},[a("p",{staticClass:"skill__cost"},[t._v("cost:")]),t._l(t.energyCost,(function(t,e){return a("span",{key:e,class:"skill__energy "+t})}))],2)]),a("p",{staticClass:"skill__description"},[t._v(t._s(t.data.description))]),a("div",{staticClass:"skill__params"},[a("p",{staticClass:"skill__params__cooldown"},[t._v(" Classes: "),a("span",{class:t.types[t.skillType]+"--text"},[t._v(t._s(t.types[t.skillType]))]),t._v(" , "+t._s(t.data.class)+" ")]),a("p",{staticClass:"skill__params__class"},[t._v("Cooldown: "+t._s(t.data.baseCooldown))])])])},L=[],V={props:["data"],methods:{},computed:{energyCost:function(){for(var t=["speed","strength","elemental","wisdom","random"],e=[],a=0;a<t.length;a++)for(var s=0;s<this.data.cost[a];s++)e.push(t[a]);return e},skillType:function(){return this.data.type[0]},types:function(){return this.$store.getters["enums/getEnum"]("pokemonTypings")}},watchers:{}},G=V,N=(a("f492"),Object(p["a"])(G,J,L,!1,null,null,null)),q=N.exports,z={Roster:f,Character:T,CharacterDetail:S,CharacterDetailProfile:I,CharacterDetailSkill:q},F={},H=function(t){this.component=t.component,this.viewData=t.data,this.banner=t.data.banner},K=function(t){this.component="CharacterDetailProfile",this.selectedChar=t,this.viewData=t,this.banner=t.banner},Q=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];!1!==t&&this.$store.commit("game/addToTeam",t),this.$store.commit("game/addToTeam",this.selectedChar)},W={updateView:H,addToTeam:Q,setChar:K},X={},Y={data:function(){return{selectedChar:!1,component:"CharacterDetailProfile",viewData:{},banner:!1}},components:z,computed:F,methods:W,watchers:X},Z=Y,tt=(a("6418"),Object(p["a"])(Z,s,r,!1,null,null,null));e["default"]=tt.exports},f492:function(t,e,a){"use strict";var s=a("7e21"),r=a.n(s);r.a}}]);
//# sourceMappingURL=chunk-2f758c9c.1063c607.js.map