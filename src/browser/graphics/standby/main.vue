<template>
  <overlay-base>
    <div id="top">
      <img
        id="logo"
        src="../../common/img/logo.png"
      >
      <div id="comment">
        <p>
          <span
            ref="comment"
            :class="{scroll: commentScroll}"
          >{{ setupComment }}</span>
        </p>
      </div>
      <twitter-notification :style="{width: '580px', height: '140px'}"></twitter-notification>
    </div>

    <setup-run-component
      v-for="(run, index) in showRuns"
      :key="index"
      :setup-run="run"
      :index="index"
      :upcoming-time-seconds="upcomings[index]"
    >
    </setup-run-component>
  </overlay-base>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import clone from 'clone';
import { SetupComment } from '../../../nodecg/replicants';
import { RunDataArray } from '../../../nodecg/speedcontrol';
import { SpeedcontrolCurrentRunIndex } from '../../../nodecg/speedcontrol-additions';

import OverlayBase from '../OverlayBase.vue';
import SetupRunComponent from './components/SetupRunComponent.vue';
import TwitterNotification from '../components/TwitterNotification/TwitterNotification.vue';

@Component({
  components: {
    OverlayBase,
    SetupRunComponent,
    TwitterNotification
  }
})
export default class App extends Vue {
  setupComment: SetupComment = '';
  currentRunIndex: SpeedcontrolCurrentRunIndex = 0;
  runArray: RunDataArray = [];
  commentScroll = false;

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
    nodecg.Replicant('setup-comment').on('change', (newVal) => {
      this.setupComment = newVal;
    });
    nodecg.Replicant('speedcontrolCurrentRunIndex', 'speedcontrol-additions').on('change', (newVal) => {
      this.currentRunIndex = newVal;
    });
    nodecg.Replicant('runDataArray', 'nodecg-speedcontrol').on('change', (newVal) => {
      this.runArray = clone(newVal);
    });
  }

  updated(): void {
    const commentElm = this.$refs['comment'] as HTMLElement;
    if (commentElm.clientWidth > 400) {
      this.commentScroll = true;
    } else {
      this.commentScroll = false;
    }
  }
}
</script>

<style>
body {
  padding-left: 32px;
  padding-right: 32px;
}

#top {
  margin-top: 8px;
  width: auto;
  margin-bottom: 24px;
}

#top * {
  display: inline-block;
  vertical-align: middle;
}

#logo {
  width: 128px;
  margin-right: 32px;
}

#comment,
.game {
  background-color: rgba(32, 64, 128, 50%);
}

#comment {
  width: 400px;
  font-size: 24px;
  margin-right: 32px;
  padding: 0 0.3em;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.game {
  margin-bottom: 8px;
  padding: 4px 8px;
  border-bottom: solid 4px;
  border-radius: 4px;
}

.text-datas {
  white-space: nowrap;
  overflow: hidden;
}

.upcoming {
  width: 1000px;
  font-size: 1.1em;
  border-color: rgb(247, 255, 25);
}

.upcoming .coming-time {
  margin-bottom: 0.2em;
}

.upcoming .title span {
  position: relative;
  font-size: 1.7em;
  margin-right: 4em;
}

.upcoming .category {
  margin-top: -0.4em;
  margin-bottom: 0.6em;
}

.upcoming .platform,
.upcoming .runner {
  margin-top: -0.4em;
}

.next {
  width: 800px;
  font-size: 0.96em;
}

.next .title span {
  font-size: 1.5em;
  position: relative;
}

.next .category {
  margin-top: -0.4em;
}

#next-game-1 {
  margin-left: 0px;
  border-color: rgb(67, 243, 203);
}

#next-game-2 {
  margin-left: 100px;
  border-color: rgb(36, 114, 198);
}

#next-game-3 {
  margin-left: 200px;
  border-color: rgb(244, 40, 153);
}

.scroll {
  position: relative;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    left: 0;
  }
  10% {
    left: 0%;
  }
  99% {
    left: -100%;
    opacity: 1;
  }
  99.001% {
    left: -100%;
    opacity: 0;
  }
  99.002% {
    left: 0%;
    opacity: 0;
  }
  100% {
    left: 0%;
    opacity: 1;
  }
}
</style>