<template>
  <div :style="{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	}">
    <div id="time-info">
      <p
        id="timer"
        class="time"
        :class="[timeStatus, {small}]"
      >
        <span
          class="segment"
          v-for="(str, index) in timeSegmented"
          :key="index"
        >{{ str }}</span>
      </p>
    </div>
    <div :style="{
			width: '100%',
			borderBottom: '2px solid #0067bc'
		}"></div>
    <div id="est-info">
      EST:
      {{ estimate }}
    </div>
  </div>
</template>

<style scoped>
#time-info {
  padding: 0.2em 0.2em;
  width: 100%;
  text-align: "center";
}

.time {
  text-align: center;
}

.time.stopped,
.time.paused {
  color: #cccccc;
}

.time.finished {
  color: rgb(247, 255, 25);
}

#timer.small {
  font-size: 80%;
}

#est-info {
  padding: 0.2em 0.5em;
  width: 100%;
  font-size: 60%;
  text-align: right;
}

#est.small {
  font-size: 80%;
}

span.segment {
  display: inline-block;
  width: 0.75em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  @Prop(String)
  readonly timeStatus!: string;

  @Prop(Boolean)
  readonly small!: boolean;

  @Prop(String)
  readonly formattedTime!: string;

  @Prop(String)
  readonly estimate!: string;

  get timeSegmented(): Array<string> {
    return this.formattedTime.split('');
  }
}
</script>
