<template>
  <div
    id="root"
    :style="{backgroundImage: `url(${backgroundUri})`, backgroundSize: 'cover'}"
  >
    <slot />
  </div>
</template>

<style>
html {
  overflow: hidden;
}
#root {
  color: white;
  font-family: "M PLUS Rounded 1c", sans-serif;
  margin: 0;
  padding: 16px 32px 0;
  width: 1280px;
  height: 720px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class OverlayBase extends Vue {
  backgroundUri = '';

  created(): void {
    nodecg.Replicant('assets:background').on('change', (newVal) => {
      if (newVal.length > 0) {
        this.backgroundUri = newVal[0].url;
      }
    });
  }
}
</script>