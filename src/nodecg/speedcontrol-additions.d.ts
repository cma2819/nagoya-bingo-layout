import { GoogleApiDefined } from './external/speedcontrol-additions/googleApiDefined';
import { SpeedcontrolUserAdditionArray } from './external/speedcontrol-additions/speedcontrolUserAdditionArray';
import { SpeedcontrolPlayerArray } from "./external/speedcontrol-additions/speedcontrolPlayerArray";
import { CommentatorArray } from "./external/speedcontrol-additions/commentatorArray";
import { SpeedcontrolCurrentRunIndex } from "./external/speedcontrol-additions/speedcontrolCurrentRunIndex";

type SpeedcontrolAdditionsReplicantMap = {
    commentatorArray: CommentatorArray,
    googleApiDefined: GoogleApiDefined,
    speedcontrolCurrentRunIndex: SpeedcontrolCurrentRunIndex,
    speedcontrolUserAdditionArray: SpeedcontrolUserAdditionArray,
    speedcontrolPlayerArray: SpeedcontrolPlayerArray,
};

export {
    CommentatorArray,
    GoogleApiDefined,
    SpeedcontrolCurrentRunIndex,
    SpeedcontrolUserAdditionArray,
    SpeedcontrolPlayerArray,
    SpeedcontrolAdditionsReplicantMap
};
