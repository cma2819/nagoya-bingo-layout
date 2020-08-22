<template>
  <single-run-view-component
    :paddings="['16px', '32px']"
    :video-path="{x: 32, y: 210, width: 784, height: 784 * ( 9 / 16) }"
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