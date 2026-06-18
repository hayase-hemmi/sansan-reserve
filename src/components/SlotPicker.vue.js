/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
import BaseInput from './ui/BaseInput.vue';
import { getAvailability, getMenuDuration, toJSTISOString } from '../services/api';
import { designTokens } from '../styles/designTokens';
const props = defineProps();
const emit = defineEmits();
const selectedDate = ref('');
const selectedSlotIndex = ref();
const slots = ref([]);
const loading = ref(false);
const error = ref('');
const rules = {
    required: (value) => !!value || '必須項目です',
};
const selectSlot = (index) => {
    if (slots.value[index]?.available) {
        selectedSlotIndex.value = index;
        emit('update:modelValue', slots.value[index].start);
    }
};
watch(selectedDate, async () => {
    if (selectedDate.value && props.menu) {
        selectedSlotIndex.value = undefined;
        emit('update:modelValue', '');
        await fetchSlots();
    }
});
watch(() => props.menu, async () => {
    if (selectedDate.value && props.menu) {
        selectedSlotIndex.value = undefined;
        emit('update:modelValue', '');
        await fetchSlots();
    }
});
const fetchSlots = async () => {
    if (!selectedDate.value || !props.menu) {
        return;
    }
    loading.value = true;
    error.value = '';
    try {
        const dateObj = new Date(selectedDate.value);
        const from = new Date(dateObj);
        from.setHours(9, 0, 0, 0);
        const to = new Date(dateObj);
        to.setHours(18, 0, 0, 0);
        const durationMin = getMenuDuration(props.menu);
        const response = await getAvailability(toJSTISOString(from), toJSTISOString(to), durationMin);
        slots.value = response.slots;
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : '空き枠の取得に失敗しました';
        slots.value = [];
    }
    finally {
        loading.value = false;
    }
};
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-available']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['slot-grid']} */ ;
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.spacing["2xl"]);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.borderRadius.md);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.colors.status.info);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.typography.fontFamily.primary);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.typography.fontWeight.regular);
(__VLS_ctx.designTokens.typography.letterSpacing.wide);
(__VLS_ctx.designTokens.transitions.duration.normal);
(__VLS_ctx.designTokens.transitions.easing.easeInOut);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.accent.hover);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.shadows.md);
(__VLS_ctx.designTokens.colors.background.hover);
(__VLS_ctx.designTokens.colors.text.disabled);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.typography.fontSize.xs);
// @ts-ignore
[designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens,];
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "slot-picker" },
});
/** @type {__VLS_StyleScopedClasses['slot-picker']} */ ;
const __VLS_0 = BaseInput;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.selectedDate),
    label: "撮影希望日",
    type: "date",
    required: (true),
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.selectedDate),
    label: "撮影希望日",
    type: "date",
    required: (true),
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "spinner" },
    });
    /** @type {__VLS_StyleScopedClasses['spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert alert-error" },
    });
    /** @type {__VLS_StyleScopedClasses['alert']} */ ;
    /** @type {__VLS_StyleScopedClasses['alert-error']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
        cx: "12",
        cy: "12",
        r: "10",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line, __VLS_intrinsics.line)({
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line, __VLS_intrinsics.line)({
        x1: "12",
        y1: "16",
        x2: "12.01",
        y2: "16",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.error);
}
else if (__VLS_ctx.slots.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "time-slots" },
    });
    /** @type {__VLS_StyleScopedClasses['time-slots']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "slot-instruction" },
    });
    /** @type {__VLS_StyleScopedClasses['slot-instruction']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "slot-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['slot-grid']} */ ;
    for (const [slot, index] of __VLS_vFor((__VLS_ctx.slots))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.slots.length > 0))
                        return;
                    __VLS_ctx.selectSlot(index);
                    // @ts-ignore
                    [selectedDate, rules, loading, error, error, slots, slots, selectSlot,];
                } },
            key: (index),
            type: "button",
            disabled: (!slot.available),
            ...{ class: "slot-chip" },
            ...{ class: ({
                    'slot-selected': __VLS_ctx.selectedSlotIndex === index,
                    'slot-available': slot.available,
                    'slot-disabled': !slot.available
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['slot-chip']} */ ;
        /** @type {__VLS_StyleScopedClasses['slot-selected']} */ ;
        /** @type {__VLS_StyleScopedClasses['slot-available']} */ ;
        /** @type {__VLS_StyleScopedClasses['slot-disabled']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "slot-time" },
        });
        /** @type {__VLS_StyleScopedClasses['slot-time']} */ ;
        (__VLS_ctx.formatTime(slot.start));
        (__VLS_ctx.formatTime(slot.end));
        if (!slot.available) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "slot-badge" },
            });
            /** @type {__VLS_StyleScopedClasses['slot-badge']} */ ;
        }
        // @ts-ignore
        [selectedSlotIndex, formatTime, formatTime,];
    }
}
else if (__VLS_ctx.selectedDate) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert alert-info" },
    });
    /** @type {__VLS_StyleScopedClasses['alert']} */ ;
    /** @type {__VLS_StyleScopedClasses['alert-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
        cx: "12",
        cy: "12",
        r: "10",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line, __VLS_intrinsics.line)({
        x1: "12",
        y1: "16",
        x2: "12",
        y2: "12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line, __VLS_intrinsics.line)({
        x1: "12",
        y1: "8",
        x2: "12.01",
        y2: "8",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[selectedDate,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
