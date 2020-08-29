<template>
  <div
    id="runner-info"
    class="info"
    :style="{
      display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
    }"
  >
    <div :style="{
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between'
		}">
      <div
        id="runner-name"
        :style="{
				borderLeft: `4px solid ${sideColor}`
			}"
      >
        {{ name }}
      </div>
      <div
        v-if="time"
        :style="{
				color: 'rgb(247, 255, 25)',
				fontFamily: 'Russo One'
			}"
      >
        {{ time }}
      </div>
    </div>
    <div :style="{
			width: '100%',
			borderBottom: '2px solid #0067bc'
		}"></div>
    <div :style="{
			display: 'flex',
			justifyContent: 'space-between',
			font: '50% Russo One',
			width: '100%',
			padding: '0 0.5em',
		}">
      <div>
        RUNNER
      </div>
      <div class="social">
        <transition
          name="social"
          mode="out-in"
        >
          <div
            v-if="displaySocial === 0 && social.twitch"
            key="twitch"
          >
            <span class="icon">
              <i class="fab fa-twitch" />
            </span>
            <span>{{ social.twitch }}</span>
          </div>
          <div
            v-else-if="displaySocial === 1 && social.nico"
            key="nico"
          >
            <span>{{ social.nico }}</span>
          </div>
          <div
            v-else-if="displaySocial === 2 && social.youtube"
            key="youtube"
          >
            <span class="icon">
              <i class="fab fa-youtube" />
            </span>
            <span>{{ social.youtube }}</span>
          </div>
          <div
            v-else-if="displaySocial === 3 && social.twitter"
            key="twitter"
          >
            <span class="icon">
              <i class="fab fa-twitter" />
            </span>
            <span>{{ social.twitter }}</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.social-enter-active {
  transition: all 1s 0.5s;
}

.social-leave-active {
  transition: all 1s;
}

.social-enter,
.social-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

#runner-info {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

#runner-name {
  text-align: left;
  margin-bottom: 0.2em;
  font-weight: bold;
  padding: 0 0.5em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Social } from './types';

@Component
export default class Nameplate extends Vue {
  @Prop(Number)
  readonly displaySocial!: number;

  @Prop(String)
  readonly name!: string;

  @Prop(Object)
  readonly social!: Social;

  @Prop(String)
  readonly time!: string;

  @Prop(String)
  readonly sideColor!: string;
}
</script>
