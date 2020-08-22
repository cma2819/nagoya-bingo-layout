<template>
  <v-card color="grey darken-3">
    <v-toolbar>
      <v-toolbar-title>
        操作パネル
      </v-toolbar-title>
    </v-toolbar>

    <v-text-field
      class="timer-input ma-2"
      solo
      readonly
      :value="time"
      :style="{
					fontSize: '1.5rem'
				}"
      full-width
      hide-details
    ></v-text-field>

    <v-row>
      <v-col cols="6">
        <bingo-progress-count :done="redDoneCount"></bingo-progress-count>
      </v-col>
      <v-col cols="6">
        <bingo-progress-count :done="blueDoneCount"></bingo-progress-count>
      </v-col>
    </v-row>

    <div class="pa-4">
      <v-btn
        block
        class="mb-2"
        color="red darken-4"
        @click="resetRedTeam"
      >
        <v-icon>
          fas fa-caret-left
        </v-icon>
        <span class="ml-2">
          赤チームをリセット
        </span>
      </v-btn>
      <v-btn
        block
        class="mb-2"
        color="blue darken-4"
        @click="resetBlueTeam"
      >
        <span class="mr-2">
          青チームをリセット
        </span>
        <v-icon>
          fas fa-caret-right
        </v-icon>
      </v-btn>
      <v-btn
        block
        class="mb-2"
        color="success"
        @click="resetAllTeam"
      >
        <v-icon>
          fas fa-caret-left
        </v-icon>
        <span class="mx-2">
          全てリセット
        </span>
        <v-icon>
          fas fa-caret-right
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<style>
.timer-input input {
  text-align: center;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Emit } from 'vue-property-decorator';

import BingoProgressCount from './BingoProgressCountComponent.vue';
import { speedcontrolModule } from '../../../plugin/speedcontrol';

@Component({
  components: {
    BingoProgressCount
  }
})
export default class ProgressControlComponent extends Vue {
  redDoneCount: number = 0;
  blueDoneCount: number = 0;

  created(): void {
    nodecg.Replicant('redBingoDoneArray').on('change', (newVal) => {
      this.redDoneCount = newVal.length;
    });
    nodecg.Replicant('blueBingoDoneArray').on('change', (newVal) => {
      this.blueDoneCount = newVal.length;
    });
  }

  @Emit()
  resetRedTeam(): void {
    nodecg.sendMessage('resetRed');
  }

  @Emit()
  resetBlueTeam(): void {
    nodecg.sendMessage('resetBlue');
  }

  @Emit()
  resetAllTeam(): void {
    nodecg.sendMessage('resetBothProgress');
  }

  get time(): string {
    return speedcontrolModule.timer.time;
  }
}
</script>

