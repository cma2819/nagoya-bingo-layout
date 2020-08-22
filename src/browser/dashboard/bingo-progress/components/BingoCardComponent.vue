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
/* global nodecg */
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import BingoCardSlot from './../../components/BingoCardSlotComponent.vue';

import { BingoSlot } from '../../../../nodecg/generated/lib/bingoSlot';
import clone from 'clone';
import { DoneSlotArray } from '../../../../nodecg/generated/lib/doneSlotArray';

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
    nodecg.Replicant('bingoCard').on('change', (newVal) => {
      this.bingoSlots = clone(newVal);
    });
    this.isBlue ?
      nodecg.Replicant('blueBingoDoneArray').on('change', (newVal) => {
        this.doneIndexArray = clone(newVal);
      }) :
      nodecg.Replicant('redBingoDoneArray').on('change', (newVal) => {
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
  toggleSlot(slot: BingoSlot, isDone: boolean) {
    this.isBlue ?
      (isDone ? nodecg.sendMessage('undoBlue', slot.id) : nodecg.sendMessage('doneBlue', slot.id)) :
      (isDone ? nodecg.sendMessage('undoRed', slot.id) : nodecg.sendMessage('doneRed', slot.id));
  }
}
</script>
