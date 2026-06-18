/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { designTokens } from '../styles/designTokens';
const props = defineProps();
const __VLS_emit = defineEmits();
const isSelected = computed(() => props.selectedMenu === props.menu.value);
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['menu-card']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-card']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-card']} */ ;
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.border.medium);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.transitions.duration.normal);
(__VLS_ctx.designTokens.transitions.easing.easeInOut);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.hover);
(__VLS_ctx.designTokens.typography.fontFamily.secondary);
(__VLS_ctx.designTokens.typography.fontSize.base);
(__VLS_ctx.designTokens.typography.fontWeight.regular);
(__VLS_ctx.designTokens.colors.text.primary);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.typography.lineHeight.base);
(__VLS_ctx.designTokens.typography.letterSpacing.wide);
(__VLS_ctx.designTokens.spacing.xs);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.typography.fontFamily.primary);
(__VLS_ctx.designTokens.typography.fontSize.lg);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.typography.letterSpacing.wide);
(__VLS_ctx.designTokens.colors.text.disabled);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.typography.letterSpacing.normal);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.typography.lineHeight.normal);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.spacing.lg);
// @ts-ignore
[designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens,];
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('showDetail');
            // @ts-ignore
            [$emit,];
        } },
    ...{ onKeypress: (...[$event]) => {
            __VLS_ctx.$emit('showDetail');
            // @ts-ignore
            [$emit,];
        } },
    ...{ onKeypress: (...[$event]) => {
            __VLS_ctx.$emit('showDetail');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "menu-card" },
    ...{ class: ({ selected: __VLS_ctx.isSelected }) },
    role: "button",
    tabindex: "0",
});
/** @type {__VLS_StyleScopedClasses['menu-card']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "menu-card-inner" },
});
/** @type {__VLS_StyleScopedClasses['menu-card-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "menu-title" },
});
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
(__VLS_ctx.menu.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "menu-info" },
});
/** @type {__VLS_StyleScopedClasses['menu-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "menu-price" },
});
/** @type {__VLS_StyleScopedClasses['menu-price']} */ ;
(__VLS_ctx.menu.price);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "menu-separator" },
});
/** @type {__VLS_StyleScopedClasses['menu-separator']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "menu-duration" },
});
/** @type {__VLS_StyleScopedClasses['menu-duration']} */ ;
(__VLS_ctx.menu.duration);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "menu-description" },
});
/** @type {__VLS_StyleScopedClasses['menu-description']} */ ;
(__VLS_ctx.menu.description);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "detail-link" },
});
/** @type {__VLS_StyleScopedClasses['detail-link']} */ ;
if (__VLS_ctx.isSelected) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "selected-badge" },
    });
    /** @type {__VLS_StyleScopedClasses['selected-badge']} */ ;
}
// @ts-ignore
[isSelected, isSelected, menu, menu, menu, menu,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
