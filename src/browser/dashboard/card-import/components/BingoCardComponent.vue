<template>
  <div v-if="bingoSlots.length !== 0">
    <v-row
      v-for="(slots, rowIndex) in slotRows"
      :key="`row${rowIndex}`"
      no-gutters
    >
      <v-col
        v-for="(slot, colIndex) in slots"
        :key="(rowIndex + 1) * colIndex"
      >
        <bingo-card-slot :bingo-slot="slot"></bingo-card-slot>
      </v-col>
    </v-row>
  </div>
  <v-alert v-else>
    ビンゴカードが未設定です。
  </v-alert>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BingoCardSlot from './../../components/BingoCardSlotComponent.vue';

import { BingoSlot } from '../../../../nodecg/generated/lib/bingoSlot';
import clone from 'clone';
import { bingoNodecg } from '../../../plugin/nodecg';

@Component({
  components: {
    BingoCardSlot
  }
})
export default class BingoCardComponent extends Vue {
  bingoSlots: Array<BingoSlot> = [];

  created(): void {
    bingoNodecg.Replicant('bingoCard').on('change', (newVal) => {
      this.bingoSlots = clone(newVal)
    });
  }

  get slotRows(): Array<Array<BingoSlot>> {
    const rows = [
      new Array<BingoSlot>(),
      new Array<BingoSlot>(),
      new Array<BingoSlot>(),
      new Array<BingoSlot>(),
      new Array<BingoSlot>(),
    ];

    this.bingoSlots.forEach((slot, index) => {
      const rowIndex = Math.floor(index / 5);
      rows[rowIndex].push(slot);
    })

    return rows;
  }
}
</script>
