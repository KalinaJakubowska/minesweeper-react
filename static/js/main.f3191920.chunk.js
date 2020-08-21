(this["webpackJsonpminesweeper-react"]=this["webpackJsonpminesweeper-react"]||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(7),o=n.n(r),i=(n(14),n(8)),l=n(2),u=n(1),m=n(3),s=(n(15),function(e){var t=e.getGameProperties,n=e.gameLineColumns,r=e.gameLineRows,o=e.generateFields,i=Object(a.useState)(8),l=Object(m.a)(i,2),u=l[0],s=l[1],b=Object(a.useState)(8),f=Object(m.a)(b,2),d=f[0],g=f[1],j=Object(a.useState)(10),O=Object(m.a)(j,2),p=O[0],h=O[1];Object(a.useEffect)((function(){o()}),[p,n,r]);return c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t(p,u,d),o()},className:"form"},c.a.createElement("button",{className:"form__button"},"Rozpocznij now\u0105 gr\u0119"),c.a.createElement("fieldset",{className:"form__fieldset"},c.a.createElement("legend",{className:"form__legend"},"Zaawansowane opcje"),c.a.createElement("label",{className:"form__label"},"Liczba kolumn",c.a.createElement("input",{required:!0,type:"number",step:"1",min:"5",max:"25",value:u,onChange:function(e){var t=e.target;return s(+t.value)},name:"columnsNumber",className:"form__input"})),c.a.createElement("label",{className:"form__label"},"Liczba wierszy",c.a.createElement("input",{required:!0,type:"number",step:"1",min:"5",max:"20",value:d,onChange:function(e){var t=e.target;return g(+t.value)},name:"rowsNumber",className:"form__input"})),c.a.createElement("label",{className:"form__label"},"Liczba bomb",c.a.createElement("input",{required:!0,type:"number",step:"1",min:"5",max:"300",value:p,onChange:function(e){var t=e.target;return h(+t.value)},name:"bombsNumber",className:"form__input"})),c.a.createElement("span",{className:"form__span"})))}),b=(n(16),function(e){var t=e.gameFields,n=e.setGameFields,a=e.gameLineColumns,r=e.gameLineRows,o=e.isGameLost,i=e.isGameWon,m=e.checkField,s=e.onDoubleClick;return c.a.createElement("div",{className:"container container--game"},c.a.createElement("div",{className:"game",style:{gridTemplateColumns:"repeat(".concat(a,", 40px)"),gridTemplateRows:"repeat(".concat(r,", 40px)")}},t.map((function(e){var t=e.bombsAround,a=e.type,r=e.hidden,b=e.id,f=e.rightClicked;return c.a.createElement("div",{onDoubleClick:function(){return s(b)},key:b,className:"game__field\n                        ".concat("field"===a?"":" game__field--"+a,"\n                        ").concat(i&&"bomb"===a&&!o?" game__field--greenBomb":"")},c.a.createElement("button",{className:"game__button\n                                ".concat(r?"":" game__button--hidden","\n                                ").concat(f?" game__button--rightClicked":""),onClick:function(){return m(b)},onContextMenu:function(e){return function(e,t){e.preventDefault(),n((function(e){return[].concat(Object(u.a)(e.slice(0,t)),[Object(l.a)(Object(l.a)({},e[t]),{},{rightClicked:!e[t].rightClicked})],Object(u.a)(e.slice(t+1)))}))}(e,b)},disabled:o}),0===t||"border"===a?"":t)}))))}),f=(n(17),function(){return c.a.createElement("footer",{className:"footer"},"Kalina Jakubowska 2020")});var d=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(10),d=Object(m.a)(o,2),g=d[0],j=d[1],O=Object(a.useState)(10),p=Object(m.a)(O,2),h=p[0],v=p[1],_=Object(a.useState)(10),E=Object(m.a)(_,2),k=E[0],C=E[1],w=Object(a.useState)(!1),y=Object(m.a)(w,2),N=y[0],L=y[1],S=Object(a.useState)(!1),F=Object(m.a)(S,2),G=F[0],x=F[1],z=Object(a.useState)(g*h),A=Object(m.a)(z,2),M=A[0],R=A[1],D=Object(a.useState)(!0),W=Object(m.a)(D,2),q=W[0],B=W[1];Object(a.useEffect)((function(){n.filter((function(e){return e.hidden})).length!==k||N||(x(!0),I()),!n.filter((function(e){return"bomb"===e.type})).find((function(e){return!1===e.hidden}))||G||N||(L(!0),I())}),[n]);var J=function(e){return[-1*g-1,-1*g,-1*g+1,-1,1,g-1,g,g+1].map((function(t){return t+e}))},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(u.a)(n),a=function e(n){!1===t[n].rightClicked&&(t=[].concat(Object(u.a)(t.slice(0,n)),[Object(l.a)(Object(l.a)({},t[n]),{},{hidden:!1})],Object(u.a)(t.slice(n+1))));var a,c=Object(i.a)(J(n));try{for(c.s();!(a=c.n()).done;){var r=a.value;"field"===t[r].type&&0===t[r].bombsAround&&!0===t[r].hidden?e(r):!0===t[r].hidden&&!1===t[r].rightClicked&&(t=[].concat(Object(u.a)(t.slice(0,r)),[Object(l.a)(Object(l.a)({},t[r]),{},{hidden:!1})],Object(u.a)(t.slice(r+1))))}}catch(o){c.e(o)}finally{c.f()}};a(e),r(t)},T=function(e){r((function(t){return[].concat(Object(u.a)(t.slice(0,e)),[Object(l.a)(Object(l.a)({},t[e]),{},{hidden:!1})],Object(u.a)(t.slice(e+1)))}))},I=function(){for(var e=0;e<M;e++)"bomb"===n[e].type&&T(e)},K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(u.a)(n);return J(e).map((function(e){return+("bomb"===t[e].type)})).reduce((function(e,t){return e+t}))},Z=function(e){for(var t,a=J(e),c=Object(u.a)(n),r=1;r<=k;r++){for(t=Math.floor(Math.random()*M);"field"!==c[t].type||t===e||a.includes(t);)t=Math.floor(Math.random()*M);c=[].concat(Object(u.a)(c.slice(0,t)),[Object(l.a)(Object(l.a)({},c[t]),{},{type:"bomb"})],Object(u.a)(c.slice(t+1)))}!function(e,t){for(var n=0;n<M;n++)"field"===e[n].type&&(e=[].concat(Object(u.a)(e.slice(0,n)),[Object(l.a)(Object(l.a)({},e[n]),{},{bombsAround:K(n,e)})],Object(u.a)(e.slice(n+1))));P(t,e)}(c,e)},$=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];r((function(c){return[].concat(Object(u.a)(c),[{id:c.length,type:e,hidden:t,bombsAround:n,rightClicked:a}])}))};return c.a.createElement(c.a.Fragment,null,c.a.createElement(b,{gameFields:n,setGameFields:r,gameLineColumns:g,gameLineRows:h,isGameLost:N,isGameWon:G,checkField:function(e){return q?(Z(e),B(!1),0):n[e].rightClicked?0:void(0===n[e].bombsAround&&"bomb"!==n[e].type?P(e):T(e))},onDoubleClick:function(e){(function(e){return J(e).map((function(e){return+n[e].rightClicked})).reduce((function(e,t){return e+t}))})(e)===n[e].bombsAround&&"bomb"!==n[e].type&&P(e)}}),c.a.createElement(s,{getGameProperties:function(e,t,n){j(t+2),v(n+2),C(e),L(!1),x(!1),B(!0),R((t+2)*(n+2))},gameLineColumns:g,gameLineRows:h,generateFields:function(){r([]);for(var e=0;e<h;e++)for(var t=0;t<g;t++)0===t||t===g-1||0===e||e===h-1?$("border",!1):$("field",!0,0)}}),c.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.f3191920.chunk.js.map