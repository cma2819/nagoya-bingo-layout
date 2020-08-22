<template>
  <run-overlay-base
    v-if="currentRun"
    :run-data="currentRun"
    :clip-paths="videoPaths"
    :paddings="paddings"
    :small="small"
  >
    <div
      class="p1"
      :style="{
        position: 'absolute',
        top: `${(videoPaths[0].y + videoPaths[0].height)}px`,
        left: `${videoPaths[0].x}px`,
        width: `${videoPaths[0].width}px`
      }"
    >
      <race-nameplate
        v-if="currentRun.teams[0]"
        :name="currentRun.teams[0].players[0].name"
        :social="currentSocials[0]"
        :display-social="displaySocial"
        :finished-time="finishedTime[0]"
      ></race-nameplate>
    </div>
    <div
      class="p2"
      :style="{
        position: 'absolute',
        top: `${(videoPaths[1].y + videoPaths[1].height)}px`,
        left: `${videoPaths[1].x}px`,
        width: `${videoPaths[1].width}px`
      }"
    >
      <race-nameplate
        v-if="currentRun.teams[1]"
        opposite
        :name="currentRun.teams[1].players[0].name"
        :social="currentSocials[1]"
        :display-social="displaySocial"
        :finished-time="finishedTime[1]"
      ></race-nameplate>
    </div>

    <div :style="{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: `${videoPaths[0].height + 70 + 144}px`}">
      <timer
        small
        :style="{width: '560px'}"
        :formatted-time="timer.formattedTime"
        :time-status="timer.status"
        :estimate="currentRun.estimate"
      ></timer>
      <div>
        <twitter-notification
          :style="{width: '560px', height: '144px'}"
          is-run-layout
        ></twitter-notification>
      </div>
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

import RaceNameplate from '../components/Nameplate/RaceNameplate.vue';
import Timer from '../components/Timer/Timer.vue';
import TwitterNotification from '../components/TwitterNotification/TwitterNotification.vue';

import { SpeedcontrolUserAdditionArray } from '../../../nodecg/speedcontrol-additions';
import { Timer as SpeedcontrolTimer } from '../../../nodecg/speedcontrol';
import { Social } from '../components/Nameplate/types';
import { existsSocialIn } from '../util';
import { ClipPath } from '../components/ClippedCanvas/types';

@Component({
  components: {
    RunOverlayBase,
    RaceNameplate,
    Timer,
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

  get currentSocials(): Social[] {
    const players = this.currentRun?.teams.map((team) => {
      return team.players[0];
    });
    if (!players) {
      return [];
    }
    return players.map((player) => {
      const additions = this.userAdditionArray.find((addition) => {
        return (addition.id === player.externalID);
      });
      if (additions) {
        return Object.assign({}, additions.social, player.social);
      }
      return { ...player.social };
    });
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
      const existsSocialNums = this.currentSocials.map((social) => {
        return existsSocialIn(social);
      }).flat().filter((num, idx, ary) => {
        return ary.indexOf(num) === idx;
      });
      this.displaySocial = existsSocialNums[(this.displaySocial + 1) % existsSocialNums.length];
    }, 20 * 1000);
  }
}
</script>