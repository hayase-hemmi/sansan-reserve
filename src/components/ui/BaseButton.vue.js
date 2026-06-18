/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { designTokens } from '../../styles/designTokens';
const props = withDefaults(defineProps(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
});
const emit = defineEmits();
const variantClass = computed(() => {
    return `variant-${props.variant}`;
});
const __VLS_defaults = {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
};
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
/** @type {__VLS_StyleScopedClasses['variant-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['variant-text']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button']} */ ;
(__VLS_ctx.designTokens.typography.fontFamily.primary);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing["2xl"]);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.transitions.duration.normal);
(__VLS_ctx.designTokens.transitions.easing.easeInOut);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.shadows.sm);
(__VLS_ctx.designTokens.colors.accent.secondary);
(__VLS_ctx.designTokens.shadows.md);
(__VLS_ctx.designTokens.shadows.sm);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.colors.border.medium);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.colors.background.hover);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.colors.accent.hover);
// @ts-ignore
[designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens,];
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [$emit,];
        } },
    type: (__VLS_ctx.type),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
    ...{ class: "base-button" },
    ...{ class: ([__VLS_ctx.variantClass, { 'is-loading': __VLS_ctx.loading }]) },
});
/** @type {__VLS_StyleScopedClasses['base-button']} */ ;
/** @type {__VLS_StyleScopedClasses['is-loading']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "loader" },
    });
    /** @type {__VLS_StyleScopedClasses['loader']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: ({ 'button-text-hidden': __VLS_ctx.loading }) },
});
/** @type {__VLS_StyleScopedClasses['button-text-hidden']} */ ;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[type, disabled, loading, loading, loading, loading, variantClass,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __defaults: __VLS_defaults,
    __typeProps: {},
});
const __VLS_export = {};
export default {};
