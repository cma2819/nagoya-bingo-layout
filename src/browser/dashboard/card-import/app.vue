<template>
  <v-app>
    <v-container class="pa-0 ma-0">
      <v-row justify="space-between">
        <v-col>
          <v-select
            solo
            :items="cardTitles"
            label="ビンゴカード"
            hide-details
            v-model="title"
          ></v-select>
          <v-btn
            class="mt-4"
            color="success"
            block
            @click="importBingo"
            :disabled="!titleSelected"
          >
            インポート
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <bingo-card></bingo-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Emit } from 'vue-property-decorator';
import BingoCard from './components/BingoCardComponent.vue';

import { BingoSlot } from '../../../nodecg/generated/lib/bingoSlot';

const bingoNodeCG = nodecg;

@Component({
  components: {
    BingoCard
  }
})
export default class App extends Vue {
  cardTitles: Array<string> = [];
  title: string = '';
  bingoSlots: Array<BingoSlot> = [];

  created(): void {
    bingoNodeCG.sendMessage('loadBingoSpreadsheet').then((titles) => {
      this.cardTitles = titles;
    });
  }

  @Emit()
  importBingo(): void {
    if (this.title) {
      nodecg.sendMessage('importBingoCard', this.title);
    }
  }

  get titleSelected(): boolean {
    if (this.title) {
      return true;
    }
    return false;
  }
}
</script>

