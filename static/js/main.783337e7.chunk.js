(this["webpackJsonpreact-starter-pack"]=this["webpackJsonpreact-starter-pack"]||[]).push([[0],{14:function(e,t,r){},15:function(e,t,r){},18:function(e,t,r){},19:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(1),c=r.n(a),s=r(8),i=r.n(s),l=(r(14),r(2)),o=r(3),u=(r(15),r(7)),j=r.n(u),f=r(21),b=(r(18),c.a.memo((function(e){var t=e.cells;return Object(n.jsx)(n.Fragment,{children:t.map((function(e){return Object(n.jsx)("div",{className:e?"field-cell field-cell--".concat(e):"field-cell",children:e||""},Object(f.a)())}))})})));b.propTypes={cells:j.a.arrayOf(j.a.number.isRequired).isRequired};var O=Array(16).fill(0),d=[2,4],v=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),r=t[0],c=t[1],s=Object(a.useState)(O),i=Object(o.a)(s,2),u=i[0],j=i[1],f=Object(a.useState)(!1),v=Object(o.a)(f,2),m=v[0],h=v[1],p=Object(a.useState)(!1),g=Object(o.a)(p,2),x=g[0],k=g[1],N=Object(a.useState)(!1),y=Object(o.a)(N,2),w=y[0],A=y[1],S=Object(a.useCallback)((function(){return Math.floor(Math.random()*u.length)}),[u]),R=Object(a.useCallback)((function(){var e=S(),t=S();e!==t?(j((function(r){return r.map((function(r,n){return n===e||n===t?C():r}))})),h(!0),k(!1),A(!1),c(0)):R()}),[S,C]);function C(){return d.sort((function(){return Math.random()-.5}))[0]}var M=function e(t){var r=S();if(0===t[r]){var n=t.map((function(e,t){return t===r?C():e}));j(n)}else e(t)},q=function(e){var t;return e.map((function(e,r,n){var a=e;return r===t?(a=0,t=null):e===n[r+1]&&(a*=2,c((function(e){return e+a})),t=r+1),a})).filter((function(e){return e}))},I=function(e){var t;return e.map((function(e,r,n){var a=e;return 2048===e?k(!0):r===t?(a=0,t=null):e===n[r+1]&&(a*=2,c((function(e){return e+a})),t=r+1),a})).filter((function(e){return e}))},J=function(e){var t=[];switch(e){case"ArrowLeft":for(var r=0;r<u.length-1;r+=1)if(r%4===0){var n=[u[r],u[r+1],u[r+2],u[r+3]].filter((function(e){return e}));n=q(n);var a=Array(4-n.length).fill(0);t=[].concat(Object(l.a)(t),Object(l.a)(n),Object(l.a)(a))}break;case"ArrowRight":for(var c=0;c<u.length-1;c+=1)if(c%4===0){var s=[u[c],u[c+1],u[c+2],u[c+3]].filter((function(e){return e})).reverse();s=q(s).reverse();var i=Array(4-s.length).fill(0);t=[].concat(Object(l.a)(t),Object(l.a)(i),Object(l.a)(s))}break;case"ArrowUp":for(var f=0;f<4;f+=1){var b=[u[f],u[f+4],u[f+8],u[f+12]].filter((function(e){return e}));b=I(b);var O=Array(4-b.length).fill(0),d=[].concat(Object(l.a)(b),Object(l.a)(O)),v=Object(o.a)(d,4),m=v[0],h=v[1],p=v[2],g=v[3];t[f]=m,t[f+4]=h,t[f+8]=p,t[f+12]=g}break;case"ArrowDown":for(var x=0;x<4;x+=1){var N=[u[x],u[x+4],u[x+8],u[x+12]].filter((function(e){return e})).reverse();N=I(N).reverse();var y=Array(4-N.length).fill(0),w=[].concat(Object(l.a)(y),Object(l.a)(N)),S=Object(o.a)(w,4),R=S[0],C=S[1],J=S[2],U=S[3];t[x]=R,t[x+4]=C,t[x+8]=J,t[x+12]=U}break;default:return}var Y=t.every((function(e,t){return e===u[t]})),B=t.some((function(e,t,r){return 0===e||(e===r[t+4]||t%4!==3&&e===r[t+1])}));t.includes(2048)?(k(!0),j(t)):B?Y||M(t):(A(!0),j(t))};return Object(n.jsx)("div",{className:"page-container",role:"presentation",tabIndex:1,onKeyUp:function(e){x||w||J(e.key)},children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsxs)("div",{className:"game-header",children:[Object(n.jsx)("h1",{className:"title",children:"2048"}),Object(n.jsxs)("div",{className:"controls",children:[Object(n.jsxs)("p",{className:"info",children:["Score: ",Object(n.jsx)("span",{children:r})]}),Object(n.jsx)("button",{type:"button",className:m?"button restart":"button start",onClick:function(){j(O),R()},children:m?"Restart":"Start"})]})]}),Object(n.jsx)("div",{className:"game-field",children:Object(n.jsx)(b,{cells:u})}),Object(n.jsxs)("div",{className:"message-container",children:[w&&Object(n.jsx)("p",{className:"message",children:"You lose! Restart the game?"}),x&&Object(n.jsx)("p",{className:"message message-win",children:"Winner! Congrats! You did it!"}),!m&&Object(n.jsx)("p",{className:"message",children:'Press "Start" to begin game. Good luck!'})]})]})})};i.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(v,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.783337e7.chunk.js.map