<template>
  <div
    :id="index === 0 ? 'upcoming-game' : `next-game-${index}`"
    class="game"
    :class="{
      upcoming: index === 0,
      next: index > 0
    }"
  >
    <div class="text-datas">
      <p class="coming-time">
        {{ upcomingTimeSeconds === 0 ? 'このあとすぐ！' : `あと${upcomingTime.hours}時間${upcomingTime.minutes}分` }}
      </p>
      <p class="title">
        <span>{{ setupRun.game }}</span>
      </p>
      <p class="category">
        Category: {{ setupRun.category }}
      </p>
      <div v-if="index === 0">
        <p class="platform">
          Platform: {{ setupRun.system }}
        </p>
        <p class="runner">
          Runner: {{ runnerText }}
        </p>
      </div>
      <div v-else>
        <p class="platform">
          Platform: {{ setupRun.system }} | Runner: {{ runnerText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RunData } from '../../../../nodecg/external/speedcontrol/RunData';

@Component
export default class SetupRunComponent extends Vue {
  @Prop(Object)
  readonly setupRun!: RunData;

  @Prop(Number)
  readonly index!: number;

  @Prop(Number)
  readonly upcomingTimeSeconds!: number;

  get runnerText(): string {
    return this.setupRun.teams.flatMap((team) => {
      return team.players.map((player) => {
        return player.name;
      });
    }).join('/');
  }

  get upcomingTime(): {
    hours: number;
    minutes: number;
  } {
    return {
      hours: Math.floor(this.upcomingTimeSeconds / 3600),
      minutes: Math.floor((this.upcomingTimeSeconds / 60) % 60)
    }
  }
}
</script>

<style scoped>
.game {
  background-color: rgba(32, 64, 128, 50%);
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
</style>