<template>
  <div>
    <div class="schedule">
      SCHEDULE
    </div>
    <div :style="{padding: '0.5em'}">
      <div
        class="detail"
        :class="{
				upnext: index === currentIndex
			}"
        v-for="(run, index) in runArray"
        :key="run.id"
      >
        <div :class="{
				done: index < currentIndex
			}">
          <span v-if="index === currentIndex">
            <i class="fas fa-caret-right"></i>
          </span>
          {{ run.game }} - {{ run.category }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule {
  font-size: 125%;
  border-bottom: 2px #0067bc solid;
}

.upnext {
  background-color: rgba(0, 103, 188, 0.5);
}

.detail {
  font-weight: bold;
  font-family: "Kosugi";
  padding: 0.5em 0.5em;
}

.schedule {
  font-family: "Russo One";
}

.done {
  color: gray;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RunDataArray } from '../../../../nodecg/speedcontrol';

@Component
export default class ScheduleRunComponent extends Vue {
  @Prop(Number)
  readonly currentIndex!: number;

  @Prop(Array)
  readonly runArray!: RunDataArray;
}
</script>
