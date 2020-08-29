<template>
  <div :style="{
			height: '100%',
			padding: '0.5em 0.5em',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center',
		}">
    <div>
      {{ runData.game }}
    </div>
    <div :style="{
				width: '100%',
				borderBottom: '2px solid #0067bc'
			}"></div>
    <div :style="{
			fontSize: '75%'
		}">
      {{ runData.category }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RunData } from '../../../../nodecg/external/speedcontrol/RunData';

@Component
export default class GameNameplate extends Vue {
  @Prop(Object)
  runData!: RunData
}
</script>
