import { ActiveTweet } from "./external/nodecg-twitter-widget/activeTweet";
import { TweetDataArray } from "./external/nodecg-twitter-widget/tweetDataArray";

type TwitterWidgetReplicantMap = {
    activeTweet: ActiveTweet,
    tweetDataArray: TweetDataArray
};

export {
    ActiveTweet,
    TweetDataArray,
    TwitterWidgetReplicantMap
};
