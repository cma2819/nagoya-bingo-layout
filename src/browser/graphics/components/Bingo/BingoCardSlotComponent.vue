<template>
  <div :style="{
		display: 'flex',
		alignItems: 'center',
		border: '1px solid gray',
		padding: '0.2em',
		overflow: 'hidden',
		position: 'relative',
		... backgroundEntity
	}">
    <div>
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BingoCardSlotComponent extends Vue {
  @Prop(String)
  readonly name!: string;

  @Prop(Array)
  readonly doneWith!: Array<string>;

  get backgroundEntity(): { [k: string]: string } {
    if (this.doneWith.length === 0) {
      return { backgroundColor: '#000000' };
    }
    if (this.doneWith.length > 1) {
      return { backgroundImage: `linear-gradient(${Math.atan2(3, -4) * 180 / Math.PI}deg, ${this.doneWith[0]} 0%, ${this.doneWith[0]} 48%, ${this.doneWith[1]} 52%, ${this.doneWith[1]} 100%)` };
    }
    return { backgroundColor: this.doneWith[0] };
  }
}
</script>
