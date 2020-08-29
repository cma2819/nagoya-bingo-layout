<template>
  <v-app>
    <v-container class="pa-0 ma-0">
      <v-row>
        <v-col cols="4">
          <v-select
            :items="[
							'ROW1',
							'ROW2',
							'ROW3',
							'ROW4',
							'ROW5',
							'COL1',
							'COL2',
							'COL3',
							'COL4',
							'COL5',
							'TL-BR',
							'BL-TR'
						]"
            label="表示列"
            solo
            v-model="selectedRow"
          ></v-select>
          <v-btn
            block
            class="mb-2"
            color="success"
            @click="focusBingo"
          >更新</v-btn>
          <v-btn
            block
            color="info"
            @click="removeFocus"
          >リセット</v-btn>
        </v-col>
        <v-col cols="8">
          <bingo-focus-row-component :focus-row="focusRow"></bingo-focus-row-component>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import BingoFocusRowComponent from './components/BingoFocusRowComponent.vue';
import { bingoNodecg } from '../../plugin/nodecg';
import { BingoFocusRow } from '../../../nodecg/generated/bingoFocusRow';
import { RowType } from '../../../extension/focus';

@Component({
  components: {
    BingoFocusRowComponent
  }
})
export default class App extends Vue {
  selectedRow: string | null = null;
  focusRow: BingoFocusRow | null = null;

  created(): void {
    bingoNodecg.Replicant('bingoFocusRow').on('change', (newVal) => {
      this.focusRow = newVal;
      this.selectedRow = this.focusRow.row;
    });
  }

  @Emit()
  focusBingo(): void {
    if (this.selectedRow !== null) {
      bingoNodecg.sendMessage('focusTo', (this.selectedRow as RowType));
    }
  }

  @Emit()
  removeFocus(): void {
    bingoNodecg.sendMessage('removeFocus');
  }
}
</script>

