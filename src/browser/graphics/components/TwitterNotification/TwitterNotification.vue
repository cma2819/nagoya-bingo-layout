<template>
  <div id="tweet">
    <div :style="{position: 'absolute', left: '0px'}">
      <transition
        name="icon"
        mode="out-in"
      >
        <div
          v-if="activeTweet"
          key="profileIcon"
        >
          <v-avatar
            size="48px"
            :style="{margin: '8px'}"
          >
            <img :src="activeTweet.profileImageUrl">
          </v-avatar>
        </div>
        <div
          v-else
          key="twitterIcon"
        >
          <v-avatar
            width="64px"
            height="64px"
          >
            <img src="../../../common/img/twitter.svg">
          </v-avatar>
        </div>
      </transition>
    </div>
    <transition
      name="tweet"
      mode="out-in"
    >
      <twitter-notification-tweet
        v-if="activeTweet"
        :tweet="activeTweet"
      ></twitter-notification-tweet>
      <twitter-notification-hashtag
        v-else
        :is-run-layout="isRunLayout"
      ></twitter-notification-hashtag>
    </transition>
  </div>
</template>

<style scoped>
.tweet-enter-active,
.tweet-leave-active {
  transition: all 1s ease;
}

.tweet-enter,
.tweet-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.icon-enter-active,
.icon-leave-active {
  transition: all 1s ease;
}

.icon-enter,
.icon-leave-to {
  opacity: 0;
}

#tweet {
  border-bottom: solid 4px rgb(29, 161, 242);
  border-radius: 4px;
  background-color: rgba(32, 64, 128, 50%);
  text-align: center;
  position: relative;
}

#tweet > img {
  position: absolute;
  left: 0px;
  width: 64px;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ActiveTweet } from '../../../../nodecg/nodecg-twitter-widget';
import TwitterNotificationTweet from './TwitterNotificationTweet.vue';
import TwitterNotificationHashtag from './TwitterNotificationHashtag.vue';

@Component({
  components: {
    TwitterNotificationTweet,
    TwitterNotificationHashtag
  }
})
export default class TwitterNotification extends Vue {
  @Prop(Boolean)
  isRunLayout!: boolean;

  activeTweet: ActiveTweet = null;

  created(): void {
    nodecg.Replicant('activeTweet', 'nodecg-twitter-widget').on('change', (newVal) => {
      this.activeTweet = newVal;
    });
  }
}
</script>