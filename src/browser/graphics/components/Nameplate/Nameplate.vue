<template>
  <div
    id="runner-info"
    class="info"
    :style="{
      display: 'flex'
    }"
  >
    <p
      id="runner-info-label"
      class="label"
    >
      Runner
    </p>
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
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px solid white;
}

#runner-name {
  text-align: right;
  font-size: 2em;
  margin-bottom: 0.2rem;
}

#runner-id {
  text-align: right;
  font-size: 1.2em;
  margin-top: -0.6em;
  margin-bottom: 0.2rem;
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
}
</script>