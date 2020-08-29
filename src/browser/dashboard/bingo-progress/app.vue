<template>
  <v-app>
    <v-container class="pa-0 ma-0">
      <v-row>
        <v-col cols="4">
          <v-card>
            <red-label>Red Team</red-label>
            <bingo-card
              color="#E53935"
              :is-blue="false"
            ></bingo-card>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-sheet
            class="pa-4 mb-4"
            color="secondary"
          >
            <v-alert
              class="mb-4"
              dense
              color="info"
              type="info"
            >
              スプレッドシートにタスクの入力を終えたら、カードを選択して「インポート」してください。
            </v-alert>
            <bingo-import-control></bingo-import-control>
          </v-sheet>
          <progress-control></progress-control>
        </v-col>
        <v-col cols="4">
          <blue-label>Blue Team</blue-label>
          <bingo-card
            color="#1E88E5"
            :is-blue="true"
          ></bingo-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import BingoCard from './components/BingoCardComponent.vue';
import BingoImportControl from '../components/BingoImportControlComponent.vue';
import ProgressControl from './components/ProgressControlComponent.vue';
import BlueLabel from '../components/BlueLabelComponent.vue';
import RedLabel from '../components/RedLabelComponent.vue';

@Component({
  components: {
    BingoCard,
    BingoImportControl,
    ProgressControl,
    BlueLabel,
    RedLabel
  }
})
export default class App extends Vue { }
</script>
