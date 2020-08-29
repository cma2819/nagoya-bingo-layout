<template>
  <race-view-component
    :paddings="['16px', '64px']"
    :video-paths="[{x: 90, y: 168, width: 380 * ( 4 / 3 ), height: 380 }, {x: 680, y: 168, width: 380 * ( 4 / 3 ), height: 380 }]"
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
