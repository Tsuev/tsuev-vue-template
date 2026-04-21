<template>
  <div :class="root()">
    Tsuev Vue Template
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const styles = tv({
  slots: {
    root: 'w-full h-screen flex items-center justify-center text-7xl',
  },
})

const { root } = styles();
</script>

<style lang="scss" scoped></style>
