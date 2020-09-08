<template>
  <run-overlay-base
    v-if="currentRun"
    :run-data="currentRun"
    :clip-paths="[videoPath]"
    :paddings="paddings"
  >
    <div :style="{
				position: 'absolute',
				bottom: '0px',
				left: '0px',
				height: `144px`,
				width: `${videoPath.width}px`,
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				borderTop: '2px solid #0067bc',
				font: 'bold 32px kosugi'
			}">
      <game-nameplate
        v-if="currentRun"
        :run-data="currentRun"
      ></game-nameplate>
    </div>
    <div :style="{
				position: 'absolute',
				top: '0px',
				right: '0px',
				height: `${(1280 - videoPath.width) * (3/4)}px`,
				width: `${1280 - videoPath.width}px`,
				borderLeft: '2px solid #0067bc',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				font: '12px Kosugi'
			}">
      <bingo-card></bingo-card>
      <transition name="bingo-row">
        <div
          v-if="bingoFocusRow.row !== null"
          :style="{
					position: 'absolute',
					top: '0px',
					left: '0px',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					display: 'flex',
					justifyContent: 'center',
					fontSize: '16px'
				}"
        >
          <bingo-row :bingo-row="bingoFocusRow"></bingo-row>
        </div>
      </transition>
      <transition name="twitter">
        <div
          v-if="tweet"
          :style="{
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						font: '18px kosugi',
						backgroundColor: 'white',
						color: 'black',
						padding: '0.5em',
						border: '3px #1DA1F2 solid',
						borderTop: 'none',
						borderRight: 'none',
						borderRadius: '0 0 0 10px'
					}"
        >
          <twitter-notification-tweet :tweet="tweet"></twitter-notification-tweet>
        </div>
      </transition>
    </div>
    <div :style="{
				position: 'absolute',
				bottom: '0px',
				right: '0px',
				height: `${720 - ( (1280 - videoPath.width) * (3/4))}px`,
				width: `${1280 - videoPath.width}px`,
				borderLeft: '2px solid #0067bc',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}">
      <div :style="{
				width: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				font: '24px Kosugi',
				padding: '0.3em'
			}">
        <race-nameplate
          v-if="currentRun.teams[0]"
          :name="currentRun.teams[0].players[0].name"
          :social="currentSocials[0]"
          :display-social="displaySocial"
          :finished-time="finishedTime[0]"
          sideColor="#e53935"
          :time="finishedTime[0]"
        ></race-nameplate>
      </div>
      <div :style="{
				width: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				font: '24px Kosugi',
				padding: '0.3em'
			}">
        <race-nameplate
          v-if="currentRun.teams[1]"
          opposite
          :name="currentRun.teams[1].players[0].name"
          :social="currentSocials[1]"
          :display-social="displaySocial"
          :finished-time="finishedTime[1]"
          sideColor="#1e88e5"
          :time="finishedTime[1]"
        ></race-nameplate>
      </div>
      <div :style="{
				width: '80%',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				font: '42px Russo One',
				padding: '0.3em',
			}">
        <timer
          :formatted-time="timer.formattedTime"
          :time-status="timer.status"
          :estimate="currentRun.estimate"
        ></timer>
      </div>
    </div>
  </run-overlay-base>
</template>

<style scoped>
#side {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 400px;
}

#side p {
  display: block;
  position: relative;
}

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

.twitter-enter-active,
.twitter-leave-active {
  transition: all 4s;
}
.twitter-enter,
.twitter-leave-to {
  transform: translateY(-360px);
}

.bingo-row-enter-active,
.bingo-row-leave-active {
  transition: all 1s;
}

.bingo-row-enter,
.bingo-row-leave-to {
  opacity: 0;
  transform: translateX(25px);
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
import GameNameplate from '../components/Nameplate/GameNameplate.vue';
import BingoCard from '../components/Bingo/BingoCardComponent.vue';
import Timer from '../components/Timer/Timer.vue';
import TwitterNotificationTweet from '../components/TwitterNotification/TwitterNotificationTweet.vue';
import BingoRow from '../components/Bingo/BingoRowComponent.vue';

import { SpeedcontrolUserAdditionArray } from '../../../nodecg/speedcontrol-additions';
import { Timer as SpeedcontrolTimer } from '../../../nodecg/speedcontrol';
import { Social } from '../components/Nameplate/types';
import { existsSocialIn } from '../util';
import { ClipPath } from '../components/ClippedCanvas/types';
import { additionNodecg, twitterNodecg, bingoNodecg } from '../../plugin/nodecg';
import { speedcontrolModule } from '../../plugin/speedcontrol';
import { ActiveTweet } from '../../../nodecg/nodecg-twitter-widget';
import { BingoFocusRow } from '../../../nodecg/replicants';

@Component({
  components: {
    RunOverlayBase,
    RaceNameplate,
    GameNameplate,
    BingoCard,
    Timer,
    TwitterNotificationTweet,
    BingoRow
  }
})
export default class SingleCoopViewComponent extends Vue {
  @Prop(Object)
  readonly videoPath!: ClipPath;

  @Prop(Array)
  readonly paddings!: string[];

  currentIndex = 0;
  userAdditionArray: SpeedcontrolUserAdditionArray = [];
  displaySocial = 0;
  tweet: ActiveTweet | null = null;
  bingoFocusRow: BingoFocusRow = {
    row: null,
    slots: []
  };

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
    additionNodecg.Replicant('speedcontrolCurrentRunIndex', 'speedcontrol-additions').on('change', (newVal) => {
      this.currentIndex = newVal;
    });
    additionNodecg.Replicant('speedcontrolUserAdditionArray', 'speedcontrol-additions').on('change', (newVal) => {
      this.userAdditionArray = clone(newVal);
    });
    twitterNodecg.Replicant('activeTweet', 'nodecg-twitter-widget').on('change', (newVal) => {
      this.tweet = newVal;
    });
    bingoNodecg.Replicant('bingoFocusRow').on('change', (newVal) => {
      this.bingoFocusRow = newVal;
    });
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

  get runDataArray(): RunDataArray {
    return speedcontrolModule.runDataArray;
  }

  get speedcontrolTimer(): SpeedcontrolTimer {
    return speedcontrolModule.timer;
  }
}
</script>
