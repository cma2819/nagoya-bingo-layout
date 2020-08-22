<template>
  <run-overlay-base
    v-if="currentRun"
    :run-data="currentRun"
    :clip-paths="videoPaths"
    :paddings="paddings"
    :small="small"
  >
    <div :style="{ position: 'absolute', top: '160px', right: '32px'}">
      <twitter-notification
        :style="{width: '380px', height: '176px'}"
        is-run-layout
      ></twitter-notification>
    </div>

    <div :style="{position: 'absolute', bottom: '16px', width: '1217px', justifyContent: 'space-between', display: 'flex'}">
      <nameplate
        :style="{width: '380px'}"
        :name="currentRun.teams[0].players[0].name"
        :social="currentSocial"
        :display-social="displaySocial"
      ></nameplate>
      <horizontal-timer
        :style="{width: '800px'}"
        :formatted-time="timer.formattedTime"
        :time-status="timer.status"
        :estimate="currentRun.estimate"
        :each-width="380"
      ></horizontal-timer>
    </div>
  </run-overlay-base>
</template>

<style scoped>
.label {
  font-size: 1.2em;
  text-align: left;
}

#bottom {
  position: relative;
  height: 544px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#bottom > div {
  vertical-align: top;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop } from 'vue-property-decorator';
import clone from 'clone';
import RunOverlayBase from '../RunOverlayBase.vue';
import { RunData } from '../../../nodecg/external/speedcontrol/RunData';
import { RunDataArray } from '../../../nodecg/speedcontrol';

import Nameplate from '../components/Nameplate/Nameplate.vue';
import HorizontalTimer from '../components/Timer/HorizontalTimer.vue';
import TwitterNotification from '../components/TwitterNotification/TwitterNotification.vue';

import { SpeedcontrolUserAdditionArray } from '../../../nodecg/speedcontrol-additions';
import { Timer as SpeedcontrolTimer } from '../../../nodecg/speedcontrol';
import { Social } from '../components/Nameplate/types';
import { existsSocialIn } from '../util';
import { ClipPath } from '../components/ClippedCanvas/types';

@Component({
  components: {
    RunOverlayBase,
    Nameplate,
    HorizontalTimer,
    TwitterNotification
  }
})
export default class RaceViewComponent extends Vue {
  @Prop(Array)
  readonly videoPaths!: ClipPath[];

  @Prop(Array)
  readonly paddings!: string[];

  @Prop(Boolean)
  readonly small!: boolean;

  currentIndex = 0;
  runDataArray: RunDataArray | null = null;
  userAdditionArray: SpeedcontrolUserAdditionArray = [];
  displaySocial = 0;
  speedcontrolTimer: SpeedcontrolTimer | null = null;

  get currentRun(): RunData | null {
    if (!this.runDataArray) {
      return null;
    }
    return this.runDataArray[this.currentIndex];
  }

  get currentSocial(): Social {
    const additions = this.userAdditionArray.find((addition) => {
      return (addition.id === this.currentRun?.teams[0]?.players[0]?.externalID);
    });
    if (additions) {
      return Object.assign({}, additions.social, this.currentRun?.teams[0]?.players[0]?.social);
    }
    return { ... this.currentRun?.teams[0]?.players[0]?.social };
  }

  get timer(): {
    formattedTime: string;
    status: string;
  } {
    if (!this.speedcontrolTimer) {
      return {
        formattedTime: '00:00',
        status: 'paused'
      };
    }

    return {
      formattedTime: this.speedcontrolTimer.time,
      status: this.speedcontrolTimer.state
    };
  }

  get finishedTime(): (string | null)[] {
    if (!this.currentRun?.teams) {
      return [];
    }
    return this.currentRun.teams.map((team) => {
      if (!this.speedcontrolTimer) {
        return null;
      }
      return this.speedcontrolTimer.teamFinishTimes[team.id]?.time || null;
    });
  }

  created(): void {
    nodecg.Replicant('speedcontrolCurrentRunIndex', 'speedcontrol-additions').on('change', (newVal) => {
      this.currentIndex = newVal;
    });
    nodecg.Replicant('runDataArray', 'nodecg-speedcontrol').on('change', (newVal) => {
      this.runDataArray = clone(newVal);
    });
    nodecg.Replicant('speedcontrolUserAdditionArray', 'speedcontrol-additions').on('change', (newVal) => {
      this.userAdditionArray = clone(newVal);
    });
    nodecg.Replicant('timer', 'nodecg-speedcontrol').on('change', (newVal) => {
      this.speedcontrolTimer = clone(newVal);
    })
  }

  mounted(): void {
    setInterval(() => {
      const existsSocialNums = existsSocialIn(this.currentSocial);
      this.displaySocial = existsSocialNums[(this.displaySocial + 1) % existsSocialNums.length];
    }, 20 * 1000);
  }
}
</script>