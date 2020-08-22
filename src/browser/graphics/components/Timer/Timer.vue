<template>
  <div>
    <div id="time-info">
      <p
        id="timer-label"
        class="label"
      >
        Time
      </p>
      <p
        id="timer"
        class="time"
        :class="[timeStatus, {small}]"
      >
        {{ formattedTime }}
      </p>
    </div>
    <div id="est-info">
      <p
        id="est-label"
        class="label"
      >
        EST
      </p>
      <p
        id="est"
        class="time"
        :class="{small}"
      >
        {{ estimate }}
      </p>
    </div>
  </div>
</template>

<style scoped>
p.label {
  font-size: 2em;
  text-align: left;
}

#time-info {
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px solid white;
  bottom: 0;
}

.time {
  text-align: center;
}

.time.stopped,
.time.paused {
  color: rgba(255, 255, 255, 60%);
}

.time.finished {
  color: rgb(247, 255, 25);
}

#timer {
  font-size: 3.6em;
}

#timer.small {
  font-size: 3.2em;
}

#est-info {
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px solid white;
}

#est {
  font-size: 2.8em;
}

#est.small {
  font-size: 2.6em;
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
}
</script>