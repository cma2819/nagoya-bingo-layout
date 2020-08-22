<template>
  <div id="tweet-on">
    <div id="tweet-account">
      <p id="tweet-name">
        {{ tweet.name }}
      </p>
      <p id="tweet-id">
        @{{ tweet.screenName }}
      </p>
    </div>
    <p id="tweet-body">
      {{ tweet.text }}
    </p>
  </div>
</template>

<style scoped>
#tweet-on {
  position: relative;
  text-align: left;
  font-family: "Kosugi Maru", sans-serif;
  display: flex;
  flex-direction: column;
  z-index: 99;
}

#tweet-account {
  flex-basis: 64px;
  margin-left: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#tweet-account > * {
  vertical-align: middle;
  margin-right: 16px;
}

#tweet-id {
  font-size: 0.8em;
}

#tweet-body {
  margin: auto 16px;
  line-height: 1.2em;
  font-size: 0.9em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ActiveTweet } from '../../../../nodecg/nodecg-twitter-widget';

@Component
export default class TwitterNotificationTweet extends Vue {
  @Prop(Object)
  tweet!: ActiveTweet
}
</script>