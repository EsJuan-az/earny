if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let f={};const o=e=>n(e,r),t={module:{uri:r},exports:f,require:o};i[r]=Promise.all(s.map((e=>t[e]||o(e)))).then((e=>(c(...e),f)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-5c9cc80a.css",revision:null},{url:"assets/index-c0490e0b.js",revision:null},{url:"index.html",revision:"774e1cb11fd93f31192013eb32f05c7d"},{url:"registerSW.js",revision:"ff0532749b2545b5b0969e81d3952f45"},{url:"favicon.ico",revision:"f2413d192135c1f5194f5e7016a8a4d0"},{url:"pwa-64x64.png",revision:"d701c68c99d7878c99e674e07ee980ee"},{url:"pwa-192x192.png",revision:"befb82638ebfb5c672ec7f706c36f760"},{url:"pwa-512x512.png",revision:"65d2283264dbc6fc7c46ed485302b02b"},{url:"apple-touch-icon-180x180.png",revision:"9d57ab38ff54e83b1f84c369f96bdba1"},{url:"maskable-icon-512x512.png",revision:"833fff5b4eec6c465ab04ccd3f704220"},{url:"manifest.webmanifest",revision:"6d19321933ac48a264c6de4782f7b625"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
