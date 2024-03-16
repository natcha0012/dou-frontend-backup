<template>
  <div>
    <div v-if="title" class="flex-end">{{ title }}</div>
    <input
      class="px-2 py-2 rounded-md"
      :value="modelValue"
      type="date"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
<script setup lang="ts">
interface IProps {
  modelValue?: string
  title?: string
}
const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])
</script>
