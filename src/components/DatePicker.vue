<template>
  <div class="flex flex-row justify-center items-center w-full py-2 rounded-md bg-white">
    <div v-if="title" class="pl-3">{{ title }}</div>
    <input
      class="px-2 text-center"
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

<!-- <style>
input[type='date']::-webkit-calendar-picker-indicator {
  opacity: 0;
}
</style> -->
