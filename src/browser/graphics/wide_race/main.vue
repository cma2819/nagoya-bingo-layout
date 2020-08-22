<template>
  <race-view-component
    :paddings="['16px', '64px']"
    :video-paths="[{x: 64, y: 160, width: 560, height: 560 * ( 9 / 16) }, {x: 656, y: 160, width: 560, height: 560 * ( 9 / 16) }]"
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