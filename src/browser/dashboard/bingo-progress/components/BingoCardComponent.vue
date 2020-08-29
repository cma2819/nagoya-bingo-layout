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
        <bingo-card-slot
          :bingo-slot="slot"
          :done-color="color"
          :is-done="doneIndexArray.includes(slot.id)"
          :on-click-card="toggleSlot"
        ></bingo-card-slot>
      </v-col>
    </v-row>
  </div>
  <v-alert v-else>
    ビンゴカードが未設定です。
  </v-alert>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import BingoCardSlot from './../../components/BingoCardSlotComponent.vue';

import { BingoSlot } from '../../../../nodecg/generated/lib/bingoSlot';
import clone from 'clone';
import { DoneSlotArray } from '../../../../nodecg/generated/lib/doneSlotArray';
import { bingoNodecg } from '../../../plugin/nodecg';

@Component({
  components: {
    BingoCardSlot
  }
})
export default class BingoCardComponent extends Vue {
  bingoSlots: Array<BingoSlot> = [];
  doneIndexArray: DoneSlotArray = [];

  @Prop(String)
  color!: string;

  @Prop(Boolean)
  isBlue!: boolean;

  created(): void {
    bingoNodecg.Replicant('bingoCard').on('change', (newVal) => {
      this.bingoSlots = clone(newVal);
    });
    this.isBlue ?
      bingoNodecg.Replicant('blueBingoDoneArray').on('change', (newVal) => {
        this.doneIndexArray = clone(newVal);
      }) :
      bingoNodecg.Replicant('redBingoDoneArray').on('change', (newVal) => {
        this.doneIndexArray = clone(newVal);
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

  @Emit()
  toggleSlot(slot: BingoSlot, isDone: boolean): void {
    this.isBlue ?
      (isDone ? bingoNodecg.sendMessage('undoBlue', slot.id) : bingoNodecg.sendMessage('doneBlue', slot.id)) :
      (isDone ? bingoNodecg.sendMessage('undoRed', slot.id) : bingoNodecg.sendMessage('doneRed', slot.id));
  }
}
</script>
