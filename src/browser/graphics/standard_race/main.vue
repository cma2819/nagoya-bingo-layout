<template>
  <race-view-component
    :paddings="['16px', '64px']"
    :video-paths="[{x: 160, y: 128, width: 472, height: 472 * ( 3 / 4) }, {x: 656, y: 128, width: 472, height: 472 * ( 3 / 4) }]"
    small
  ></race-view-component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import RaceViewComponent from '../views/RaceViewComponent.vue';

@Component({
  components: {
    RaceViewComponent
  }
})
export default class App extends Vue { }
</script>