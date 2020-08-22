<template>
  <div id="root">
    <clipped-canvas
      v-if="backgroundUri"
      :clip-paths="clipPaths"
      :background-image="backgroundUri"
    ></clipped-canvas>
    <div :style="{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: paddings ? paddings.join(' ') : null}">
      <div id="top">
        <img
          id="logo"
          :class="{small}"
          src="../common/img/logo.png"
        >
        <div id="game-info">
          <p id="title">
            {{ runData.game }}
          </p><br>
          <p id="category">
            {{ runData.category }}
          </p>
        </div>
      </div>
      <slot />
    </div>
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
  width: 1280px;
  height: 720px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
#top {
  width: auto;
  margin-bottom: 16px;
}

#top * {
  display: inline-block;
  vertical-align: middle;
}

#logo {
  width: 128px;
  margin-right: 24px;
}

#logo.small {
  width: 96px;
}

#title {
  font-size: 2.5em;
}

#category {
  margin-top: -0.6em;
  font-size: 1.5em;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop } from 'vue-property-decorator';
import ClippedCanvas from './components/ClippedCanvas/ClippedCanvas.vue';
import { ClipPath } from './components/ClippedCanvas/types';
import { RunData } from '../../nodecg/external/speedcontrol/RunData';

@Component({
  components: {
    ClippedCanvas
  }
})
export default class OverlayBase extends Vue {
  backgroundUri = '';

  @Prop(Array)
  readonly clipPaths!: ClipPath[];

  @Prop(Object)
  readonly runData!: RunData;

  @Prop(Array)
  readonly paddings!: string[];

  @Prop(Boolean)
  readonly small!: boolean;

  created(): void {
    nodecg.Replicant('assets:background').on('change', (newVal) => {
      if (newVal.length > 0) {
        this.backgroundUri = newVal[0].url;
      }
    });
  }
}
</script>