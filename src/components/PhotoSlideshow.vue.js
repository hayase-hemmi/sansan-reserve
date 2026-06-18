/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
const props = withDefaults(defineProps(), {
    interval: 4000,
});
const currentIndex = ref(0);
let timer = null;
onMounted(() => {
    if (props.images.length > 1) {
        timer = setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % props.images.length;
        }, props.interval);
    }
});
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
});
const __VLS_defaults = {
    interval: 4000,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['slideshow-img']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "slideshow" },
});
/** @type {__VLS_StyleScopedClasses['slideshow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "slideshow-images" },
});
/** @type {__VLS_StyleScopedClasses['slideshow-images']} */ ;
for (const [src, idx] of __VLS_vFor((__VLS_ctx.images))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        key: (idx),
        src: (src),
        ...{ class: ({ active: idx === __VLS_ctx.currentIndex }) },
        ...{ class: "slideshow-img" },
        alt: "",
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    /** @type {__VLS_StyleScopedClasses['slideshow-img']} */ ;
    // @ts-ignore
    [images, currentIndex,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "slideshow-overlay" },
});
/** @type {__VLS_StyleScopedClasses['slideshow-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "slideshow-content" },
});
/** @type {__VLS_StyleScopedClasses['slideshow-content']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __defaults: __VLS_defaults,
    __typeProps: {},
});
const __VLS_export = {};
export default {};
