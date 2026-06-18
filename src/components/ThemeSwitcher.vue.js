/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
import { useTheme } from '../composables/useTheme';
const { currentTheme, themes, setTheme } = useTheme();
const isOpen = ref(false);
const toastVisible = ref(false);
let toastTimer = null;
const currentThemeInfo = computed(() => themes.find(t => t.id === currentTheme.value));
const selectTheme = (id) => {
    setTheme(id);
    isOpen.value = false;
    if (toastTimer)
        clearTimeout(toastTimer);
    toastVisible.value = true;
    toastTimer = setTimeout(() => {
        toastVisible.value = false;
    }, 1500);
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['theme-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-option']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-option']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-switcher']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-toast']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "theme-switcher" },
});
/** @type {__VLS_StyleScopedClasses['theme-switcher']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
            // @ts-ignore
            [isOpen, isOpen,];
        } },
    ...{ class: "theme-toggle" },
    'aria-label': ('テーマ切り替え: 現在 ' + __VLS_ctx.currentThemeInfo.label),
    title: ('テーマ: ' + __VLS_ctx.currentThemeInfo.label),
});
/** @type {__VLS_StyleScopedClasses['theme-toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "toggle-dot" },
    ...{ style: ({ backgroundColor: __VLS_ctx.currentThemeInfo.color }) },
});
/** @type {__VLS_StyleScopedClasses['toggle-dot']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "panel",
}));
const __VLS_2 = __VLS_1({
    name: "panel",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "theme-panel" },
    });
    /** @type {__VLS_StyleScopedClasses['theme-panel']} */ ;
    for (const [theme] of __VLS_vFor((__VLS_ctx.themes))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    __VLS_ctx.selectTheme(theme.id);
                    // @ts-ignore
                    [isOpen, currentThemeInfo, currentThemeInfo, currentThemeInfo, themes, selectTheme,];
                } },
            key: (theme.id),
            ...{ class: "theme-option" },
            ...{ class: ({ active: __VLS_ctx.currentTheme === theme.id }) },
            'aria-label': (theme.label),
            title: (theme.label),
        });
        /** @type {__VLS_StyleScopedClasses['theme-option']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "option-dot" },
            ...{ style: ({ backgroundColor: theme.color }) },
        });
        /** @type {__VLS_StyleScopedClasses['option-dot']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "option-label" },
        });
        /** @type {__VLS_StyleScopedClasses['option-label']} */ ;
        (theme.label);
        // @ts-ignore
        [currentTheme,];
    }
}
// @ts-ignore
[];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "toast",
}));
const __VLS_8 = __VLS_7({
    name: "toast",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.toastVisible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "theme-toast" },
    });
    /** @type {__VLS_StyleScopedClasses['theme-toast']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "toast-dot" },
        ...{ style: ({ backgroundColor: __VLS_ctx.currentThemeInfo.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['toast-dot']} */ ;
    (__VLS_ctx.currentThemeInfo.label);
}
// @ts-ignore
[currentThemeInfo, currentThemeInfo, toastVisible,];
var __VLS_9;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
