<template>
  <single-run-view-component
    :paddings="['16px', '64px']"
    :video-path="{x: 64, y: 160, width: 544 * (4 / 3), height: 544 }"
  ></single-run-view-component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SingleRunViewComponent from '../views/SingleRunViewComponent.vue';

@Component({
  components: {
    SingleRunViewComponent
  }
})
export default class App extends Vue { }
</script>