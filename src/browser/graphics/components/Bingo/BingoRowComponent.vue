<template>
  <div :style="{
			height: '100%',
			padding: '0.5em 0'
		}">
    <div :style="{
			font: '110% Russo One',
			borderBottom: '2px solid #0067bc',
		}">
      {{ bingoRow.row }}
    </div>
    <div :style="{
			height: '88%',
			display: 'flex',
			flexWrap: 'wrap',
			alignContent: 'center',
			flexDirection: 'column',
			justifyContent: 'flex-start',
	}">
      <div
        v-for="slot in bingoRow.slots"
        :key="slot.id"
        :style="{
					padding: '0.5em',
					margin: '0.2em 0.5em'
				}"
        :class="{
					'red-done': isRedDone(slot),
					'blue-done': isBlueDone(slot)
				}"
      >
        {{ slot.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.red-done {
  border-left: 3px solid #e53935;
}
.blue-done {
  border-right: 3px solid #1e88e5;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BingoFocusRow, RedBingoDoneArray, BlueBingoDoneArray } from '../../../../nodecg/replicants';
import { bingoNodecg } from '../../../plugin/nodecg';
import clone from 'clone';
import { BingoSlot } from '../../../../nodecg/generated/lib/bingoSlot';

@Component({
  components: {}
})
export default class BingoRowComponent extends Vue {
  @Prop(Object)
  readonly bingoRow!: BingoFocusRow;

  redDoneArray: RedBingoDoneArray = [];
  blueDoneArray: BlueBingoDoneArray = [];

  created(): void {
    bingoNodecg.Replicant('redBingoDoneArray').on('change', (newVal) => {
      this.redDoneArray = clone(newVal);
    });
    bingoNodecg.Replicant('blueBingoDoneArray').on('change', (newVal) => {
      this.blueDoneArray = clone(newVal);
    });
  }

  isRedDone(slot: BingoSlot): boolean {
    return this.redDoneArray.includes(slot.id);
  }

  isBlueDone(slot: BingoSlot): boolean {
    return this.blueDoneArray.includes(slot.id);
  }
}
</script>
