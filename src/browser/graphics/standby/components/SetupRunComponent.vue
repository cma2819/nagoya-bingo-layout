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
