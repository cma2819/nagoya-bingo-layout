<template>
  <single-run-view-component
    :paddings="['16px', '64px']"
    :video-path="{x: 0, y: 0, width: 576 * (4/3), height: 576 }"
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
