import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B4dpzbmu.mjs';
import { manifest } from './manifest_CvxY4jxs.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/create-payment-intent.astro.mjs');
const _page3 = () => import('./pages/api/submit-lead.astro.mjs');
const _page4 = () => import('./pages/artificial-lawn.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/outdoor-blinds.astro.mjs');
const _page7 = () => import('./pages/pay/success.astro.mjs');
const _page8 = () => import('./pages/pay.astro.mjs');
const _page9 = () => import('./pages/privacy-policy.astro.mjs');
const _page10 = () => import('./pages/roller-shutters.astro.mjs');
const _page11 = () => import('./pages/terms-and-conditions.astro.mjs');
const _page12 = () => import('./pages/thank-you.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.7_@types+node@22.19.3_@vercel+functions@2.2.13_rollup@4.55.1_terser@5.44.1_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/create-payment-intent.ts", _page2],
    ["src/pages/api/submit-lead.ts", _page3],
    ["src/pages/artificial-lawn.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/outdoor-blinds.astro", _page6],
    ["src/pages/pay/success.astro", _page7],
    ["src/pages/pay.astro", _page8],
    ["src/pages/privacy-policy.astro", _page9],
    ["src/pages/roller-shutters.astro", _page10],
    ["src/pages/terms-and-conditions.astro", _page11],
    ["src/pages/thank-you.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "184e8b58-ee3e-4df7-96f6-3d80ddf5e303",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
