<template>
  <div :style="{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexWrap: 'wrap'
		}">
    <bingo-card-slot
      v-for="(slot) in bingoCard"
      :key="slot.id"
      :style="{
			width: '20%',
			height: '20%',
		}"
      :done-with="doneArray(slot.id)"
      :name="slot.name"
    ></bingo-card-slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BingoCardSlot from './BingoCardSlotComponent.vue';
import { BingoCard, RedBingoDoneArray, BlueBingoDoneArray } from '../../../../nodecg/replicants';
import { bingoNodecg } from '../../../plugin/nodecg';
import clone from 'clone';

@Component({
  components: {
    BingoCardSlot
  }
})
export default class BingoCardComponent extends Vue {
  bingoCard: BingoCard = [];
  redDoneArray: RedBingoDoneArray = [];
  blueDoneArray: BlueBingoDoneArray = [];

  created(): void {
    bingoNodecg.Replicant('bingoCard').on('change', (newVal) => {
      this.bingoCard = clone(newVal);
    });
    bingoNodecg.Replicant('redBingoDoneArray').on('change', (newVal) => {
      this.redDoneArray = clone(newVal);
    });
    bingoNodecg.Replicant('blueBingoDoneArray').on('change', (newVal) => {
      this.blueDoneArray = clone(newVal);
    });
  }

  doneArray(id: number): Array<string> {
    const dones = [];
    if (this.redDoneArray.includes(id)) {
      dones.push('#e53935');
    }
    if (this.blueDoneArray.includes(id)) {
      dones.push('#1e88e5');
    }
    return dones;
  }
}
</script>
