import{ax as S,ay as r}from"./index-7bab1c5f.js";var _=(E=>(E[E.TEXT=1]="TEXT",E[E.CLASS=2]="CLASS",E[E.STYLE=4]="STYLE",E[E.PROPS=8]="PROPS",E[E.FULL_PROPS=16]="FULL_PROPS",E[E.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",E[E.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",E[E.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",E[E.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",E[E.NEED_PATCH=512]="NEED_PATCH",E[E.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",E[E.HOISTED=-1]="HOISTED",E[E.BAIL=-2]="BAIL",E))(_||{});const o=E=>{const N=S(E)?E:[E],e=[];return N.forEach(T=>{var A;S(T)?e.push(...o(T)):r(T)&&S(T.children)?e.push(...o(T.children)):(e.push(T),r(T)&&((A=T.component)!=null&&A.subTree)&&e.push(...o(T.component.subTree)))}),e};export{_ as P,o as f};
