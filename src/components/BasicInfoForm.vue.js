/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, reactive, computed } from 'vue';
import BaseInput from './ui/BaseInput.vue';
import BaseSelect from './ui/BaseSelect.vue';
import BaseButton from './ui/BaseButton.vue';
import MenuCard from './MenuCard.vue';
import MenuDetailModal from './MenuDetailModal.vue';
import SlotPicker from './SlotPicker.vue';
import { createReservation } from '../services/api';
import { designTokens } from '../styles/designTokens';
import { menuOptions } from '../data/menuData';
const guestCountOptions = [
    { value: '1', title: '1人' },
    { value: '2', title: '2人' },
    { value: '3', title: '3人' },
    { value: '4', title: '4人' },
];
const petOptions = [
    { value: 'no', title: 'なし' },
    { value: 'yes', title: 'あり' },
];
const step = ref(1);
const detailMenu = ref(null);
const submitting = ref(false);
const showDialog = ref(false);
const dialogType = ref('success');
const dialogMessage = ref('');
// Input refs
const lastNameInput = ref();
const firstNameInput = ref();
const emailInput = ref();
const phoneInput = ref();
const guestCountSelect = ref();
const hasPetSelect = ref();
const formData = reactive({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    guestCount: '',
    hasPet: '',
    menu: '',
    selectedSlot: '',
});
const rules = {
    required: (value) => !!value || '必須項目です',
    email: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value) || '正しいメールアドレスを入力してください';
    },
    phone: (value) => {
        const pattern = /^[0-9\-]{10,14}$/;
        return pattern.test(value) || '正しい電話番号を入力してください';
    },
};
const formatSelectedDateTime = computed(() => {
    if (!formData.selectedSlot)
        return '';
    const date = new Date(formData.selectedSlot);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = dayNames[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日（${dayOfWeek}）${hours}:${minutes}`;
});
const selectedMenuOption = computed(() => {
    if (!formData.menu)
        return null;
    return menuOptions.find(m => m.value === formData.menu) || null;
});
const guestCountDisplay = computed(() => {
    const option = guestCountOptions.find(o => o.value === formData.guestCount);
    return option?.title || '';
});
const hasPetDisplay = computed(() => {
    const option = petOptions.find(o => o.value === formData.hasPet);
    return option?.title || '';
});
const isFormValid = computed(() => {
    return (formData.lastName &&
        formData.firstName &&
        formData.email &&
        formData.phone &&
        formData.guestCount &&
        formData.hasPet &&
        formData.menu &&
        formData.selectedSlot &&
        rules.email(formData.email) === true &&
        rules.phone(formData.phone) === true);
});
const handleSubmit = async () => {
    if (!isFormValid.value) {
        return;
    }
    if (step.value === 1) {
        step.value = 2;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    submitting.value = true;
    try {
        const response = await createReservation({
            lastName: formData.lastName,
            firstName: formData.firstName,
            email: formData.email,
            phone: formData.phone,
            guestCount: parseInt(formData.guestCount, 10),
            hasPet: formData.hasPet === 'yes',
            menu: formData.menu,
            start: formData.selectedSlot,
        });
        if (response.ok) {
            dialogType.value = 'success';
            dialogMessage.value = 'ご予約ありがとうございます！\n確認メールをお送りいたしました。';
            showDialog.value = true;
            setTimeout(() => {
                handleReset();
            }, 2000);
        }
        else {
            dialogType.value = 'error';
            dialogMessage.value = getErrorMessage(response.errorCode, response.message);
            showDialog.value = true;
        }
    }
    catch (error) {
        dialogType.value = 'error';
        dialogMessage.value = error instanceof Error ? error.message : '予約の送信に失敗しました';
        showDialog.value = true;
    }
    finally {
        submitting.value = false;
    }
};
const getErrorMessage = (errorCode, message) => {
    if (errorCode === 'SLOT_TAKEN') {
        return '申し訳ございません。選択された時間枠はすでに予約済みです。別の時間をお選びください。';
    }
    if (errorCode === 'INVALID_TOKEN') {
        return 'システムエラーが発生しました。管理者にお問い合わせください。';
    }
    return message || '予約の処理中にエラーが発生しました。';
};
const goBack = () => {
    step.value = 1;
};
const handleReset = () => {
    step.value = 1;
    Object.assign(formData, {
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        guestCount: '',
        hasPet: '',
        menu: '',
        selectedSlot: '',
    });
    // バリデーションエラーもクリア
    lastNameInput.value?.clearError();
    firstNameInput.value?.clearError();
    emailInput.value?.clearError();
    phoneInput.value?.clearError();
    guestCountSelect.value?.clearError();
    hasPetSelect.value?.clearError();
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-col']} */ ;
/** @type {__VLS_StyleScopedClasses['form-col']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-label']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-body']} */ ;
/** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
/** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.shadows.lg);
(__VLS_ctx.designTokens.spacing["3xl"]);
(__VLS_ctx.designTokens.spacing["2xl"]);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.borderRadius.sm);
(__VLS_ctx.designTokens.shadows.xl);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.colors.background.card);
(__VLS_ctx.designTokens.colors.status.success);
(__VLS_ctx.designTokens.colors.status.error);
(__VLS_ctx.designTokens.typography.fontFamily.secondary);
(__VLS_ctx.designTokens.typography.fontSize.xl);
(__VLS_ctx.designTokens.typography.fontWeight.regular);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.colors.text.primary);
(__VLS_ctx.designTokens.typography.lineHeight.relaxed);
(__VLS_ctx.designTokens.typography.fontSize.base);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.typography.fontFamily.secondary);
(__VLS_ctx.designTokens.typography.fontSize.xl);
(__VLS_ctx.designTokens.typography.fontWeight.regular);
(__VLS_ctx.designTokens.colors.text.primary);
(__VLS_ctx.designTokens.spacing.sm);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.typography.lineHeight.relaxed);
(__VLS_ctx.designTokens.spacing.md);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.colors.border.light);
(__VLS_ctx.designTokens.typography.fontSize.xs);
(__VLS_ctx.designTokens.typography.fontWeight.medium);
(__VLS_ctx.designTokens.colors.text.secondary);
(__VLS_ctx.designTokens.typography.letterSpacing.wider);
(__VLS_ctx.designTokens.typography.fontSize.base);
(__VLS_ctx.designTokens.colors.text.primary);
(__VLS_ctx.designTokens.typography.lineHeight.normal);
(__VLS_ctx.designTokens.typography.fontFamily.secondary);
(__VLS_ctx.designTokens.typography.letterSpacing.wide);
(__VLS_ctx.designTokens.typography.fontSize.sm);
(__VLS_ctx.designTokens.colors.accent.primary);
(__VLS_ctx.designTokens.spacing.xs);
(__VLS_ctx.designTokens.spacing.xl);
(__VLS_ctx.designTokens.spacing.lg);
(__VLS_ctx.designTokens.spacing.xs);
// @ts-ignore
[designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens, designTokens,];
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-container" },
});
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-card" },
});
/** @type {__VLS_StyleScopedClasses['form-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-body" },
});
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
if (__VLS_ctx.step === 1) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-row" },
    });
    /** @type {__VLS_StyleScopedClasses['form-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-col" },
    });
    /** @type {__VLS_StyleScopedClasses['form-col']} */ ;
    const __VLS_0 = BaseInput;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ref: "lastNameInput",
        modelValue: (__VLS_ctx.formData.lastName),
        label: "お名前（姓）",
        placeholder: "山田",
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }));
    const __VLS_2 = __VLS_1({
        ref: "lastNameInput",
        modelValue: (__VLS_ctx.formData.lastName),
        label: "お名前（姓）",
        placeholder: "山田",
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    var __VLS_3;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-col" },
    });
    /** @type {__VLS_StyleScopedClasses['form-col']} */ ;
    const __VLS_7 = BaseInput;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ref: "firstNameInput",
        modelValue: (__VLS_ctx.formData.firstName),
        label: "お名前（名）",
        placeholder: "太郎",
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }));
    const __VLS_9 = __VLS_8({
        ref: "firstNameInput",
        modelValue: (__VLS_ctx.formData.firstName),
        label: "お名前（名）",
        placeholder: "太郎",
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    var __VLS_12 = {};
    var __VLS_10;
    const __VLS_14 = BaseInput;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        ref: "emailInput",
        modelValue: (__VLS_ctx.formData.email),
        label: "メールアドレス",
        type: "email",
        placeholder: "example@example.com",
        required: (true),
        rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    }));
    const __VLS_16 = __VLS_15({
        ref: "emailInput",
        modelValue: (__VLS_ctx.formData.email),
        label: "メールアドレス",
        type: "email",
        placeholder: "example@example.com",
        required: (true),
        rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.email]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    var __VLS_19 = {};
    var __VLS_17;
    const __VLS_21 = BaseInput;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        ref: "phoneInput",
        modelValue: (__VLS_ctx.formData.phone),
        label: "電話番号",
        type: "tel",
        placeholder: "090-1234-5678",
        required: (true),
        rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.phone]),
    }));
    const __VLS_23 = __VLS_22({
        ref: "phoneInput",
        modelValue: (__VLS_ctx.formData.phone),
        label: "電話番号",
        type: "tel",
        placeholder: "090-1234-5678",
        required: (true),
        rules: ([__VLS_ctx.rules.required, __VLS_ctx.rules.phone]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    var __VLS_26 = {};
    var __VLS_24;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-row" },
    });
    /** @type {__VLS_StyleScopedClasses['form-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-col" },
    });
    /** @type {__VLS_StyleScopedClasses['form-col']} */ ;
    const __VLS_28 = BaseSelect;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        ref: "guestCountSelect",
        modelValue: (__VLS_ctx.formData.guestCount),
        label: "ご来店人数",
        options: (__VLS_ctx.guestCountOptions),
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }));
    const __VLS_30 = __VLS_29({
        ref: "guestCountSelect",
        modelValue: (__VLS_ctx.formData.guestCount),
        label: "ご来店人数",
        options: (__VLS_ctx.guestCountOptions),
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    var __VLS_33 = {};
    var __VLS_31;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-col" },
    });
    /** @type {__VLS_StyleScopedClasses['form-col']} */ ;
    const __VLS_35 = BaseSelect;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        ref: "hasPetSelect",
        modelValue: (__VLS_ctx.formData.hasPet),
        label: "ペット同伴",
        options: (__VLS_ctx.petOptions),
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }));
    const __VLS_37 = __VLS_36({
        ref: "hasPetSelect",
        modelValue: (__VLS_ctx.formData.hasPet),
        label: "ペット同伴",
        options: (__VLS_ctx.petOptions),
        required: (true),
        rules: ([__VLS_ctx.rules.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    var __VLS_40 = {};
    var __VLS_38;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "menu-section" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "menu-label" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "required" },
    });
    /** @type {__VLS_StyleScopedClasses['required']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "menu-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['menu-grid']} */ ;
    for (const [menu] of __VLS_vFor((__VLS_ctx.menuOptions))) {
        const __VLS_42 = MenuCard;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
            ...{ 'onShowDetail': {} },
            key: (menu.value),
            menu: (menu),
            selectedMenu: (__VLS_ctx.formData.menu),
        }));
        const __VLS_44 = __VLS_43({
            ...{ 'onShowDetail': {} },
            key: (menu.value),
            menu: (menu),
            selectedMenu: (__VLS_ctx.formData.menu),
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        let __VLS_47;
        const __VLS_48 = ({ showDetail: {} },
            { onShowDetail: (...[$event]) => {
                    if (!(__VLS_ctx.step === 1))
                        return;
                    __VLS_ctx.detailMenu = menu;
                    // @ts-ignore
                    [step, handleSubmit, formData, formData, formData, formData, formData, formData, formData, rules, rules, rules, rules, rules, rules, rules, rules, guestCountOptions, petOptions, menuOptions, detailMenu,];
                } });
        var __VLS_45;
        var __VLS_46;
        // @ts-ignore
        [];
    }
    const __VLS_49 = SlotPicker;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        modelValue: (__VLS_ctx.formData.selectedSlot),
        menu: (__VLS_ctx.formData.menu),
    }));
    const __VLS_51 = __VLS_50({
        modelValue: (__VLS_ctx.formData.selectedSlot),
        menu: (__VLS_ctx.formData.menu),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
    const __VLS_54 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        ...{ 'onClick': {} },
        variant: "outlined",
        disabled: (__VLS_ctx.submitting),
    }));
    const __VLS_56 = __VLS_55({
        ...{ 'onClick': {} },
        variant: "outlined",
        disabled: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    let __VLS_59;
    const __VLS_60 = ({ click: {} },
        { onClick: (__VLS_ctx.handleReset) });
    const { default: __VLS_61 } = __VLS_57.slots;
    // @ts-ignore
    [formData, formData, submitting, handleReset,];
    var __VLS_57;
    var __VLS_58;
    const __VLS_62 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        type: "submit",
        variant: "primary",
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.submitting),
        loading: (__VLS_ctx.submitting),
    }));
    const __VLS_64 = __VLS_63({
        type: "submit",
        variant: "primary",
        disabled: (!__VLS_ctx.isFormValid || __VLS_ctx.submitting),
        loading: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    const { default: __VLS_67 } = __VLS_65.slots;
    // @ts-ignore
    [submitting, submitting, isFormValid,];
    var __VLS_65;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "confirmation-title" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "confirmation-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-subtitle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dl, __VLS_intrinsics.dl)({
        ...{ class: "confirmation-list" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-list']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.formData.lastName);
    (__VLS_ctx.formData.firstName);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.formData.email);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.formData.phone);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.guestCountDisplay);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.hasPetDisplay);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "confirmation-menu-title" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-menu-title']} */ ;
    (__VLS_ctx.selectedMenuOption?.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "confirmation-menu-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-menu-meta']} */ ;
    (__VLS_ctx.selectedMenuOption?.price);
    (__VLS_ctx.selectedMenuOption?.duration);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "confirmation-item" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({
        ...{ class: "confirmation-label" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({
        ...{ class: "confirmation-value" },
    });
    /** @type {__VLS_StyleScopedClasses['confirmation-value']} */ ;
    (__VLS_ctx.formatSelectedDateTime);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
    const __VLS_68 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        ...{ 'onClick': {} },
        variant: "outlined",
        disabled: (__VLS_ctx.submitting),
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        variant: "outlined",
        disabled: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_73;
    const __VLS_74 = ({ click: {} },
        { onClick: (__VLS_ctx.goBack) });
    const { default: __VLS_75 } = __VLS_71.slots;
    // @ts-ignore
    [formData, formData, formData, formData, submitting, guestCountDisplay, hasPetDisplay, selectedMenuOption, selectedMenuOption, selectedMenuOption, formatSelectedDateTime, goBack,];
    var __VLS_71;
    var __VLS_72;
    const __VLS_76 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        ...{ 'onClick': {} },
        variant: "primary",
        disabled: (__VLS_ctx.submitting),
        loading: (__VLS_ctx.submitting),
    }));
    const __VLS_78 = __VLS_77({
        ...{ 'onClick': {} },
        variant: "primary",
        disabled: (__VLS_ctx.submitting),
        loading: (__VLS_ctx.submitting),
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    let __VLS_81;
    const __VLS_82 = ({ click: {} },
        { onClick: (__VLS_ctx.handleSubmit) });
    const { default: __VLS_83 } = __VLS_79.slots;
    // @ts-ignore
    [handleSubmit, submitting, submitting,];
    var __VLS_79;
    var __VLS_80;
}
const __VLS_84 = MenuDetailModal;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ 'onSelect': {} },
    ...{ 'onClose': {} },
    menu: (__VLS_ctx.detailMenu),
    selectedMenu: (__VLS_ctx.formData.menu),
}));
const __VLS_86 = __VLS_85({
    ...{ 'onSelect': {} },
    ...{ 'onClose': {} },
    menu: (__VLS_ctx.detailMenu),
    selectedMenu: (__VLS_ctx.formData.menu),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
const __VLS_90 = ({ select: {} },
    { onSelect: (...[$event]) => {
            __VLS_ctx.formData.menu = $event;
            // @ts-ignore
            [formData, formData, detailMenu,];
        } });
const __VLS_91 = ({ close: {} },
    { onClose: (...[$event]) => {
            __VLS_ctx.detailMenu = null;
            // @ts-ignore
            [detailMenu,];
        } });
var __VLS_87;
var __VLS_88;
let __VLS_92;
/** @ts-ignore @type {typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    to: "body",
}));
const __VLS_94 = __VLS_93({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
if (__VLS_ctx.showDialog) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showDialog))
                    return;
                __VLS_ctx.showDialog = false;
                // @ts-ignore
                [showDialog, showDialog,];
            } },
        ...{ class: "dialog-overlay" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-overlay']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "dialog-content" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dialog-header" },
        ...{ class: (__VLS_ctx.dialogType === 'success' ? 'success' : 'error') },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.dialogType === 'success' ? '予約完了' : 'エラー');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dialog-body" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.dialogMessage);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dialog-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-actions']} */ ;
    const __VLS_98 = BaseButton || BaseButton;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        ...{ 'onClick': {} },
        variant: "primary",
    }));
    const __VLS_100 = __VLS_99({
        ...{ 'onClick': {} },
        variant: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    let __VLS_103;
    const __VLS_104 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.showDialog))
                    return;
                __VLS_ctx.showDialog = false;
                // @ts-ignore
                [showDialog, dialogType, dialogType, dialogMessage,];
            } });
    const { default: __VLS_105 } = __VLS_101.slots;
    // @ts-ignore
    [];
    var __VLS_101;
    var __VLS_102;
}
// @ts-ignore
[];
var __VLS_95;
// @ts-ignore
var __VLS_6 = __VLS_5, __VLS_13 = __VLS_12, __VLS_20 = __VLS_19, __VLS_27 = __VLS_26, __VLS_34 = __VLS_33, __VLS_41 = __VLS_40;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
