<template>
  <Teleport to="body">
    <div v-if="menu" class="mdm-overlay" @click="$emit('close')">
      <div class="mdm-sheet" @click.stop>
        <button type="button" class="mdm-close" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="mdm-header">
          <h3 class="mdm-title">{{ menu.title }}</h3>
          <div class="mdm-price-block">
            <span class="mdm-price">{{ menu.price }}</span>
            <span v-if="menu.priceNote" class="mdm-price-note">{{ menu.priceNote }}</span>
          </div>
        </div>

        <div class="mdm-body">
          <p class="mdm-description">{{ menu.description }}</p>

          <div class="mdm-meta-list">
            <div class="mdm-meta">
              <span class="mdm-meta-label">所要時間</span>
              <span class="mdm-meta-value">約{{ menu.duration }}分</span>
            </div>
            <div v-if="menu.capacity" class="mdm-meta">
              <span class="mdm-meta-label">定員</span>
              <span class="mdm-meta-value">{{ menu.capacity }}</span>
            </div>
          </div>

          <div class="mdm-sections">
            <div
              v-for="(section, sIdx) in menu.sections"
              :key="sIdx"
              class="mdm-section"
            >
              <h4 class="mdm-section-title">{{ section.title }}</h4>
              <div class="mdm-section-content">
                <template v-for="(item, iIdx) in section.items" :key="iIdx">
                  <p v-if="item.type === 'text'" class="mdm-item-text">
                    {{ item.text }}
                  </p>
                  <div v-else-if="item.type === 'bullet'" class="mdm-item-bullet">
                    {{ item.text }}
                  </div>
                  <div v-else-if="item.type === 'note'" class="mdm-item-note">
                    <span class="mdm-note-mark">※</span>{{ item.text }}
                  </div>
                  <div v-else-if="item.type === 'sub-item'" class="mdm-item-sub">
                    {{ item.text }}
                  </div>
                  <div v-else-if="item.type === 'example-ok'" class="mdm-item-example mdm-example-ok">
                    <span class="mdm-example-mark">○</span>{{ item.text }}
                  </div>
                  <div v-else-if="item.type === 'example-ng'" class="mdm-item-example mdm-example-ng">
                    <span class="mdm-example-mark">×</span>{{ item.text }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="mdm-footer">
          <button
            type="button"
            class="mdm-select-btn"
            :class="{ 'is-selected': isSelected }"
            @click="handleSelect"
          >
            {{ isSelected ? '選択中' : 'このメニューを選択' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import type { MenuOption } from '../data/menuData'
import type { Menu } from '../services/api'

interface Props {
  menu: MenuOption | null
  selectedMenu?: Menu | ''
}

const props = defineProps<Props>()

watch(() => props.menu, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const emit = defineEmits<{
  close: []
  select: [value: Menu]
}>()

const isSelected = computed(() => props.menu && props.selectedMenu === props.menu.value)

const handleSelect = () => {
  if (props.menu) {
    emit('select', props.menu.value)
    emit('close')
  }
}
</script>

<style>
/* Global styles - no scoped, no v-bind() to avoid Teleport issues */
.mdm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: mdmFadeIn 0.2s ease-out;
}

.mdm-sheet {
  position: relative;
  background-color: #ffffff;
  border-radius: 0.75rem 0.75rem 0 0;
  width: 100%;
  max-width: 480px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -4px 24px rgba(66, 62, 62, 0.12);
  animation: mdmSlideUp 0.3s cubic-bezier(0.0, 0, 0.2, 1);
}

.mdm-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #5a6c7d;
  cursor: pointer;
  border-radius: 9999px;
  transition: background-color 0.15s ease;
}

.mdm-close:hover {
  background-color: #e1f4fb;
}

.mdm-header {
  padding: 2rem 2rem 1rem;
}

.mdm-title {
  font-family: "Shippori Antique", "Shippori Antique B1", serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  letter-spacing: 0.04em;
  padding-right: 2rem;
}

.mdm-price-block {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mdm-price {
  font-family: "Lato", "Inter", "Zen Kaku Gothic Antique", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #52372d;
  letter-spacing: 0.04em;
}

.mdm-price-note {
  font-size: 0.75rem;
  color: #5a6c7d;
  letter-spacing: 0.01em;
}

.mdm-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem 1.5rem;
}

.mdm-description {
  font-size: 0.875rem;
  color: #5a6c7d;
  line-height: 1.75;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.01em;
}

.mdm-meta-list {
  border-top: 1px solid #d9e8f2;
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.mdm-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}

.mdm-meta-label {
  color: #5a6c7d;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  min-width: 56px;
}

.mdm-meta-value {
  color: #2c3e50;
  font-size: 0.875rem;
}

/* ── Sections ── */
.mdm-sections {
  border-top: 1px solid #d9e8f2;
  padding-top: 1.5rem;
}

.mdm-section {
  margin-bottom: 1.75rem;
}

.mdm-section:last-child {
  margin-bottom: 0;
}

.mdm-section-title {
  font-family: "Shippori Antique", "Shippori Antique B1", serif;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #52372d;
  letter-spacing: 0.08em;
  margin: 0 0 0.625rem 0;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid #d9cdc5;
}

.mdm-section-content {
  padding-left: 0;
}

/* Text (plain paragraph) */
.mdm-item-text {
  font-size: 0.8125rem;
  color: #2c3e50;
  line-height: 1.75;
  margin: 0 0 0.25rem 0;
}

/* Bullet items */
.mdm-item-bullet {
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.8125rem;
  color: #2c3e50;
  line-height: 1.75;
  margin-bottom: 0.375rem;
}

.mdm-item-bullet::before {
  content: '\30FB';
  position: absolute;
  left: 0;
  color: #a68a7b;
}

/* Note items */
.mdm-item-note {
  font-size: 0.75rem;
  color: #5a6c7d;
  line-height: 1.75;
  margin: 0.25rem 0 0.5rem 0;
  padding: 0.5rem 0.75rem;
  background-color: #f5f0ec;
  border-left: 2px solid #a68a7b;
  border-radius: 0 0.25rem 0.25rem 0;
}

.mdm-note-mark {
  color: #a68a7b;
  font-weight: 500;
  margin-right: 0.25rem;
}

/* Sub-items (indented detail lines) */
.mdm-item-sub {
  padding-left: 1rem;
  font-size: 0.75rem;
  color: #5a6c7d;
  line-height: 1.75;
  margin-bottom: 0.125rem;
}

/* Example items */
.mdm-item-example {
  padding-left: 1.75rem;
  font-size: 0.75rem;
  line-height: 1.75;
  margin-bottom: 0.25rem;
  position: relative;
}

.mdm-example-mark {
  position: absolute;
  left: 0.25rem;
  font-weight: 500;
}

.mdm-example-ok {
  color: #6ba572;
}

.mdm-example-ng {
  color: #c87c7c;
}

.mdm-footer {
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid #d9e8f2;
}

.mdm-select-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  font-family: "Lato", "Inter", "Zen Kaku Gothic Antique", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  border: 1px solid #52372d;
  border-radius: 0.25rem;
  background-color: #52372d;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mdm-select-btn:hover {
  background-color: #a68a7b;
  border-color: #a68a7b;
}

.mdm-select-btn.is-selected {
  background-color: transparent;
  color: #52372d;
  border-color: #52372d;
}

@keyframes mdmFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes mdmSlideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@media (min-width: 769px) {
  .mdm-overlay {
    align-items: center;
  }

  .mdm-sheet {
    border-radius: 0.25rem;
    max-height: 70vh;
    animation-name: mdmFadeUp;
  }
}

@keyframes mdmFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
