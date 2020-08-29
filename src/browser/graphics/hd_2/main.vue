<template>
  <race-view-component
    :paddings="['16px', '64px']"
    :video-paths="[{x: 0, y: 182, width: 636, height: 636 * ( 9 / 16) }, {x: 644, y: 182, width: 636, height: 636 * ( 9 / 16) }]"
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
