<template>
  <v-sheet
    class="pa-2"
    :style="{
			height: '480px'
		}"
  >
    <v-sheet
      v-for="slot in slots"
      :key="slot.id"
      class="pa-2 my-2"
      color="secondary"
      elevation="4"
    >
      {{ slot.name }}
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BingoSlot } from '../../../../nodecg/generated/lib/bingoSlot';
import { BingoFocusRow } from '../../../../nodecg/generated/bingoFocusRow';

@Component
export default class BingoFocusRowComponent extends Vue {
  @Prop(Object)
  readonly focusRow!: BingoFocusRow;

  get slots(): Array<BingoSlot> {
    return this.focusRow ? this.focusRow.slots : [];
  }

}
</script>

