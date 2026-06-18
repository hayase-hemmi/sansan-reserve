/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, watch, onUnmounted } from 'vue';
const props = defineProps();
watch(() => props.menu, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});
onUnmounted(() => {
    document.body.style.overflow = '';
});
const emit = defineEmits();
const isSelected = computed(() => props.menu && props.selectedMenu === props.menu.value);
const handleSelect = () => {
    if (props.menu) {
        emit('select', props.menu.value);
        emit('close');
    }
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
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.menu) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.menu))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [menu, $emit,];
            } },
        ...{ class: "mdm-overlay" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-overlay']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "mdm-sheet" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-sheet']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.menu))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [$emit,];
            } },
        type: "button",
        ...{ class: "mdm-close" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.5",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-header" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "mdm-title" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-title']} */ ;
    (__VLS_ctx.menu.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-price-block" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-price-block']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "mdm-price" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-price']} */ ;
    (__VLS_ctx.menu.price);
    if (__VLS_ctx.menu.priceNote) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "mdm-price-note" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-price-note']} */ ;
        (__VLS_ctx.menu.priceNote);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-body" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mdm-description" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-description']} */ ;
    (__VLS_ctx.menu.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-meta-list" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-meta-list']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "mdm-meta-label" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-meta-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "mdm-meta-value" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-meta-value']} */ ;
    (__VLS_ctx.menu.duration);
    if (__VLS_ctx.menu.capacity) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mdm-meta" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-meta']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "mdm-meta-label" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-meta-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "mdm-meta-value" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-meta-value']} */ ;
        (__VLS_ctx.menu.capacity);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-sections" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-sections']} */ ;
    for (const [section, sIdx] of __VLS_vFor((__VLS_ctx.menu.sections))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (sIdx),
            ...{ class: "mdm-section" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-section']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
            ...{ class: "mdm-section-title" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-section-title']} */ ;
        (section.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mdm-section-content" },
        });
        /** @type {__VLS_StyleScopedClasses['mdm-section-content']} */ ;
        for (const [item, iIdx] of __VLS_vFor((section.items))) {
            (iIdx);
            if (item.type === 'text') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                    ...{ class: "mdm-item-text" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-text']} */ ;
                (item.text);
            }
            else if (item.type === 'bullet') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mdm-item-bullet" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-bullet']} */ ;
                (item.text);
            }
            else if (item.type === 'note') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mdm-item-note" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-note']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "mdm-note-mark" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-note-mark']} */ ;
                (item.text);
            }
            else if (item.type === 'sub-item') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mdm-item-sub" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-sub']} */ ;
                (item.text);
            }
            else if (item.type === 'example-ok') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mdm-item-example mdm-example-ok" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-example']} */ ;
                /** @type {__VLS_StyleScopedClasses['mdm-example-ok']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "mdm-example-mark" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-example-mark']} */ ;
                (item.text);
            }
            else if (item.type === 'example-ng') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mdm-item-example mdm-example-ng" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-item-example']} */ ;
                /** @type {__VLS_StyleScopedClasses['mdm-example-ng']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "mdm-example-mark" },
                });
                /** @type {__VLS_StyleScopedClasses['mdm-example-mark']} */ ;
                (item.text);
            }
            // @ts-ignore
            [menu, menu, menu, menu, menu, menu, menu, menu, menu,];
        }
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mdm-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-footer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleSelect) },
        type: "button",
        ...{ class: "mdm-select-btn" },
        ...{ class: ({ 'is-selected': __VLS_ctx.isSelected }) },
    });
    /** @type {__VLS_StyleScopedClasses['mdm-select-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-selected']} */ ;
    (__VLS_ctx.isSelected ? '選択中' : 'このメニューを選択');
}
// @ts-ignore
[handleSelect, isSelected, isSelected,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
