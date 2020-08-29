<template>
  <div id="tweet-on">
    <div :style="{
			backgroundImage: `url(${tweet.profileImageUrl})`,
			backgroundSize: 'cover',
			position: 'absolute',
			top: 0,
			left:0,
			height: '3em',
			width: '3em'
		}">
    </div>
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
  display: flex;
  flex-direction: column;
  z-index: 99;
}

#tweet-account {
  flex-basis: 3em;
  margin-left: 4em;
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
  margin: 1em 0.5em;
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
