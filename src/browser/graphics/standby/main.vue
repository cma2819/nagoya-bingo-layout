<template>
  <overlay-base>
    <div :style="{fontSize: '24px', position: 'absolute', top: '48px', left: '48px', padding: '16px', width: '640px', backgroundColor: 'rgba(0, 0, 0, 0.7)'}">
      <upnext-run :upnext-run="upnextRun"></upnext-run>
    </div>
    <div :style="{fontSize: '20px', position: 'absolute', top: '312px', left: '48px', padding: '16px', width: '760px', backgroundColor: 'rgba(0, 0, 0, 0.7)'}">
      <schedule-run
        :current-index="currentRunIndex"
        :runArray="runArray"
      ></schedule-run>
    </div>

    <div :style="{
				position: 'absolute',
				right: '48px',
				bottom: '24px',
				width: '360px',
				height: '360px',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				padding: '24px'
			}">
      <transition
        name="twitter"
        mode="out-in"
      >
        <div
          v-if="tweet"
          :style="{font: '18px kosugi'}"
          key="notify"
        >
          <twitter-notification-tweet :tweet="tweet"></twitter-notification-tweet>
        </div>
        <div
          v-else
          :style="{
					width: '100%',
					height: '100%'
				}"
          key="default"
        >
          <transition
            name="logo"
            mode="out-in"
          >
            <logo v-if="showLogo"></logo>
            <twitter-hashtag v-else></twitter-hashtag>
          </transition>
        </div>
      </transition>
    </div>
  </overlay-base>
</template>

<style scoped>
.logo-enter-active,
.logo-leave-active,
.twitter-enter-active,
.twitter-leave-active {
  transition: all 1s 1s;
}

.logo-enter {
  opacity: 0;
  transform: translateX(10px);
}
.logo-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.twitter-enter,
.twitter-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import { RunDataArray } from '../../../nodecg/speedcontrol';
import { SpeedcontrolCurrentRunIndex } from '../../../nodecg/speedcontrol-additions';

import OverlayBase from '../OverlayBase.vue';
import UpnextRun from './components/UpnextRunComponent.vue';
import ScheduleRun from './components/ScheduleRunComponent.vue';
import TwitterNotification from '../components/TwitterNotification/TwitterNotification.vue';
import Logo from '../components/Logo/LogoComponent.vue';
import TwitterHashtag from '../components/TwitterNotification/TwitterNotificationHashtag.vue'
import TwitterNotificationTweet from '../components/TwitterNotification/TwitterNotificationTweet.vue';

import { SpeedcontrolInstance } from '../../global';
import { additionNodecg, twitterNodecg } from '../../plugin/nodecg';
import { speedcontrolModule } from '../../plugin/speedcontrol';
import { RunData } from '../../../nodecg/external/speedcontrol/RunData';
import { ActiveTweet } from '../../../nodecg/nodecg-twitter-widget';

@Component({
  components: {
    OverlayBase,
    ScheduleRun,
    UpnextRun,
    TwitterNotification,
    Logo,
    TwitterHashtag,
    TwitterNotificationTweet,
  }
})
export default class App extends Vue {
  speedcontrol = nodecg as SpeedcontrolInstance;
  currentRunIndex: SpeedcontrolCurrentRunIndex = 0;
  showLogo = true;
  tweet: ActiveTweet | null = null;

  get upnextRun(): RunData {
    return this.runArray[this.currentRunIndex];
  }

  get showRuns(): RunDataArray {
    return this.runArray.slice(this.currentRunIndex, this.currentRunIndex + 4);
  }

  get upcomings(): number[] {
    return this.showRuns.map((_, idx) => {
      return this.showRuns.slice(0, idx).map((calcRun) => {
        return (calcRun.estimateS || 0) + (calcRun.setupTimeS || 0);
      }).reduce((prev, current) => {
        return prev + current;
      }, 0);
    });
  }

  created(): void {
    additionNodecg.Replicant('speedcontrolCurrentRunIndex', 'speedcontrol-additions').on('change', (newVal) => {
      this.currentRunIndex = newVal;
    });
    twitterNodecg.Replicant('activeTweet', 'nodecg-twitter-widget').on('change', (newVal) => {
      this.tweet = newVal;
    });
    setInterval(() => {
      this.showLogo = !this.showLogo;
    }, 10000)
  }

  get runArray(): RunDataArray {
    return speedcontrolModule.runDataArray;
  }
}
</script>
