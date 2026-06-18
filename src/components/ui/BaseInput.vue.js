/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
import { designTokens } from '../../styles/designTokens';
const props = withDefaults(defineProps(), {
    type: 'text',
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
    type: 'text',
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
/** @type {__VLS_StyleScopedClasses['input-field']} */ ;
/** @type {__VLS_StyleScopedClasses['input-field']} */ ;
/** @type {__VLS_StyleScopedClasses['input-field']} */ ;
/** @type {__VLS_StyleScopedClasses['input-field']} */ ;
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
(__VLS_ctx.designTokens.typography.letterSpacing.normal);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
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
    ...{ class: "input-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
if (__VLS_ctx.label) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.id),
        ...{ class: "input-label" },
    });
    /** @type {__VLS_StyleScopedClasses['input-label']} */ ;
    (__VLS_ctx.label);
    if (__VLS_ctx.required) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "required" },
        });
        /** @type {__VLS_StyleScopedClasses['required']} */ ;
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:modelValue', $event.target.value);
            // @ts-ignore
            [label, label, id, required, $emit,];
        } },
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    id: (__VLS_ctx.id),
    type: (__VLS_ctx.type),
    value: (__VLS_ctx.modelValue),
    placeholder: (__VLS_ctx.placeholder),
    required: (__VLS_ctx.required),
    disabled: (__VLS_ctx.disabled),
    ...{ class: "input-field" },
    ...{ class: ({ 'has-error': __VLS_ctx.errorMessage }) },
});
/** @type {__VLS_StyleScopedClasses['input-field']} */ ;
/** @type {__VLS_StyleScopedClasses['has-error']} */ ;
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    (__VLS_ctx.errorMessage);
}
// @ts-ignore
[id, required, handleBlur, type, modelValue, placeholder, disabled, errorMessage, errorMessage, errorMessage,];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __defaults: __VLS_defaults,
    __typeProps: {},
});
export default {};
