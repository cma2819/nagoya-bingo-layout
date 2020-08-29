<template>
  <v-responsive :aspect-ratio="1/1">
    <v-sheet
      tile
      class="slot pa-2 align-center"
      :class="{
				clickable: onClickCard,
			}"
      elevation="1"
      width="100%"
      height="100%"
      @click="onClickCard ? onClickCard(bingoSlot, isDone) : null"
      :style="{
				backgroundColor: isDone ? doneColor : null
			}"
    >

      {{ bingoSlot.name }}
    </v-sheet>
  </v-responsive>
</template>

<style scoped>
* {
  font-size: 0.7rem;
}
.slot {
  border: 1px solid gray;
}
.clickable {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BingoSlot } from '../../../nodecg/generated/lib/bingoSlot';

@Component
export default class BingoCardSlotComponent extends Vue {
  @Prop(Object)
  bingoSlot!: BingoSlot;

  @Prop(Function)
  onClickCard!: Function;

  @Prop(String)
  doneColor!: string;

  @Prop(Boolean)
  isDone!: boolean;
}
</script>
