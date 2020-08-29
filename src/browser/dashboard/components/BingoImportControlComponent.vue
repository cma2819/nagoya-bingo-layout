<template>
  <div>
    <v-select
      solo
      :items="cardTitles"
      label="ビンゴカード選択"
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
    <v-btn
      class="mt-4"
      color="info"
      block
      @click="resetBingo"
    >
      リセット
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { bingoNodecg } from '../../plugin/nodecg';

@Component
export default class App extends Vue {
  cardTitles: Array<string> = [];
  title = '';

  created(): void {
    bingoNodecg.sendMessage('loadBingoSpreadsheet').then((titles) => {
      this.cardTitles = titles;
    });
  }

  @Emit()
  importBingo(): void {
    if (this.title) {
      bingoNodecg.sendMessage('importBingoCard', this.title);
    }
  }

  @Emit()
  resetBingo(): void {
    bingoNodecg.sendMessage('defaultBingoCard');
  }

  get titleSelected(): boolean {
    if (this.title) {
      return true;
    }
    return false;
  }
}
</script>

