<template>
  <div
    id="runner-info"
    class="info"
    :class="{opposite}"
    :style="{
      display: 'flex'
    }"
  >
    <div>
      <p id="runner-name">
        {{ name }}
      </p>
      <p id="runner-id">
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
      </p>
    </div>
    <div class="time">
      {{ finishedTime }}
    </div>
  </div>
</template>

<style scoped>
p.label {
  font-size: 2em;
  text-align: left;
}

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
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid white;
}

#runner-info.opposite {
  flex-direction: row-reverse;
}

#runner-name {
  text-align: left;
  font-size: 2em;
  margin-bottom: 0.2rem;
}

.opposite #runner-name,
.opposite #runner-id {
  text-align: right;
}

#runner-id {
  text-align: left;
  margin-top: -0.6em;
  margin-bottom: 0.2rem;
  height: 24px;
}

.time {
  font-size: 2.5em;
  color: rgb(247, 255, 25);
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

  @Prop(Boolean)
  readonly opposite!: boolean;

  @Prop(String)
  readonly finishedTime!: string;
}
</script>