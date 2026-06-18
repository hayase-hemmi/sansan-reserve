/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
import { designTokens } from '../../styles/designTokens';
const props = withDefaults(defineProps(), {
    required: false,
    disabled: false,
});
const emit = defineEmits();
const errorMessage = ref('');
const handleBlur = () => {
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(props.modelValue);
            if (result !== true) {
                errorMessage.value = result;
                return;
            }
        }
    }
    errorMessage.value = '';
};
// リセット機能: 値が空文字列になったらエラーメッセージもクリア
const clearError = () => {
    errorMessage.value = '';
};
watch(() => props.modelValue, (newValue) => {
    if (newValue === '') {
        clearError();
    }
});
// コンポーネントから呼び出せるようにする
const __VLS_exposed = {
    clearError
};
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    required: false,
    disabled: false,
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
/** @type {__VLS_StyleScopedClasses['select-field']} */ ;
/** @type {__VLS_StyleScopedClasses['select-field']} */ ;
/** @type {__VLS_StyleScopedClasses['select-field']} */ ;
/** @type {__VLS_StyleScopedClasses['select-field']} */ ;
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.typography.fontFamily.primary);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.typography.fontFamily.primary);
(__VLS_ctx.designTokens.typography.fontSize.base);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.colors.border.medium);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.colors.background.input);
(__VLS_ctx.designTokens.colors.text.primary);
(__VLS_ctx.designTokens.transitions.duration.normal);
(__VLS_ctx.designTokens.transitions.easing.easeInOut);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.shadows.sm);
(__VLS_ctx.designTokens.colors.background.hover);
(__VLS_ctx.designTokens.colors.text.disabled);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.spacing.xs);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
// @ts-ignore
[designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens,];
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "select-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['select-wrapper']} */ ;
if (__VLS_ctx.label) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.id),
        ...{ class: "select-label" },
    });
    /** @type {__VLS_StyleScopedClasses['select-label']} */ ;
    (__VLS_ctx.label);
    if (__VLS_ctx.required) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "required" },
        });
        /** @type {__VLS_StyleScopedClasses['required']} */ ;
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.$emit('update:modelValue', $event.target.value);
            // @ts-ignore
            [label, label, id, required, $emit,];
        } },
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    id: (__VLS_ctx.id),
    value: (__VLS_ctx.modelValue),
    required: (__VLS_ctx.required),
    disabled: (__VLS_ctx.disabled),
    ...{ class: "select-field" },
    ...{ class: ({ 'has-error': __VLS_ctx.errorMessage }) },
});
/** @type {__VLS_StyleScopedClasses['select-field']} */ ;
/** @type {__VLS_StyleScopedClasses['has-error']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "",
    disabled: true,
});
for (const [option] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (option.value),
        value: (option.value),
    });
    (option.title);
    // @ts-ignore
    [id, required, handleBlur, modelValue, disabled, errorMessage, options,];
}
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    (__VLS_ctx.errorMessage);
}
// @ts-ignore
[errorMessage, errorMessage,];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __defaults: __VLS_defaults,
    __typeProps: {},
});
export default {};
