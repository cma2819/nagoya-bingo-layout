<template>
  <div id="tweet-off">
    <p id="tweet-with">
      Tweet with hashtag:
    </p>
    <p
      id="hashtag"
      :class="{run: isRunLayout}"
    >
      #758RTA
    </p>
  </div>
</template>

<style scoped>
#tweet-off {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: rgba(255, 255, 255, 70%);
  text-align: left;
}

#tweet-with {
  text-align: left;
  margin-bottom: -0.4em;
  font-size: 1.2em;
}

#hashtag {
  font-size: 4em;
  font-family: "Gugi", cursive;
}
#hashtag.run {
  font-size: 3em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ActiveTweet } from '../../../../nodecg/nodecg-twitter-widget';

@Component
export default class TwitterNotificationHashtag extends Vue {
  @Prop(Object)
  tweet!: ActiveTweet;

  @Prop(Boolean)
  isRunLayout!: boolean;
}
</script>