<template>
  <div>
    <div class="upnext">
      UP NEXT
    </div>
    <div class="detail">
      <div class="game">
        <span class="label">GAME:</span>{{ upnextRun.game }}
      </div>
      <div class="category">
        <span class="label">CATEGORY:</span>{{ upnextRun.category }}
      </div>
      <div class="player">
        <span class="label">PLAYER(S):</span>{{ players.join(' / ') }}
      </div>
    </div>
    <div class="estimate">
      {{ upnextRun.estimate }}
    </div>
  </div>
</template>

<style scoped>
.upnext {
  font-size: 125%;
  border-bottom: 2px #bfbc00 solid;
}

.estimate {
  text-align: right;
}

.detail {
  margin: 1em 0;
}

.upnext,
.estimate,
.label {
  font-family: "Russo One";
}

.label {
  font-size: 75%;
  font-weight: inherit;
  margin-right: 0.5em;
}

.game,
.category,
.player {
  font-family: "Kosugi";
  margin: 0.5em 1em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RunData } from '../../../../nodecg/external/speedcontrol/RunData';

@Component
export default class UpnextRunComponent extends Vue {
  @Prop(Object)
  readonly upnextRun!: RunData;

  get players(): Array<string> {
    return this.upnextRun.teams.map((team) => {
      return team.players[0].name;
    })
  }
}
</script>
