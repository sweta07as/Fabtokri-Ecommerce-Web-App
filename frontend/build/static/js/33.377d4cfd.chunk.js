(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[33],{256:function(e,c,t){"use strict";c.a=t.p+"static/media/profile.697fdcd2.png"},328:function(e,c,t){},509:function(e,c,t){"use strict";t.r(c);var s=t(0),i=t(21),n=t(58),r=t(44),j=t(18),d=(t(328),t(256)),l=t(76),b=t(36),o=t(2);c.default=function(e){var c=e.history,t=Object(i.b)(),h=Object(b.c)(),a=Object(i.c)((function(e){return e.user})),O=a.error,u=a.user,x=a.loading,f=a.isAuthenticated;return Object(s.useEffect)((function(){O&&(h.error(O),t(Object(l.a)())),!1===f&&c.push("/login")}),[t,O,h,c,f]),Object(o.jsx)(s.Fragment,{children:x?Object(o.jsx)(r.a,{}):Object(o.jsxs)(s.Fragment,{children:[Object(o.jsx)(n.a,{title:"".concat(u.name,"'s Profile")}),Object(o.jsxs)("div",{className:"profileContainer",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:"My Profile"}),Object(o.jsx)("img",{src:d.a,alt:u.name}),Object(o.jsx)(j.b,{to:"/me/update",children:"Edit Profile"})]}),Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:"Full Name"}),Object(o.jsx)("p",{children:u.name})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:"Email"}),Object(o.jsxs)("p",{children:[" ",u.email," "]})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:"Mobile Number"}),Object(o.jsxs)("p",{children:[" ",u.mobile," "]})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:"Joined On"}),Object(o.jsxs)("p",{children:[String(u.createdAt).substr(0,10)," "]})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)(j.b,{to:"/orders",children:"My Orders"}),Object(o.jsx)(j.b,{to:"/password/update",children:"Change Password"}),Object(o.jsx)(j.b,{onClick:function(e){e.preventDefault(),t(Object(l.h)()),h.success("Logout Successfully"),c.push("/login")},children:"Logout"})]})]})]})]})})}}}]);
//# sourceMappingURL=33.377d4cfd.chunk.js.map