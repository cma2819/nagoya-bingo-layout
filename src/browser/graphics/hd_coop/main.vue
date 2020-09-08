<template>
  <single-coop-view-component
    :paddings="['16px', '64px']"
    :video-path="{x: 0, y: 38, width: 500 * (16/9), height: 500 }"
  ></single-coop-view-component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SingleCoopViewComponent from '../views/SingleCoopViewComponent.vue';

@Component({
  components: {
    SingleCoopViewComponent
  }
})
export default class App extends Vue { }
</script>
