<script setup lang="ts">
interface Skill {
  name: string
  level: number // 0-100
}

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <div class="space-y-sm">
    <div class="flex justify-between items-center">
      <span class="text-sm font-semibold text-accent-dark-gray">{{ skill.name }}</span>
      <span class="text-xs text-accent-text-secondary">{{ skill.level }}%</span>
    </div>
    <div class="w-full h-2 bg-accent-light-gray rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-primary-blue to-primary-orange rounded-full transition-all duration-1000 ease-out"
        :style="{ width: `${skill.level}%` }"
      ></div>
    </div>
  </div>
</template>
