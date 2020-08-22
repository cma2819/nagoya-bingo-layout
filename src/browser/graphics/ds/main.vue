<template>
  <multi-view-component
    :paddings="['16px', '32px']"
    :video-paths="[{x: 178, y: 160, width: 450 * (4 / 3), height: 450 }, {x: 784, y: 370, width: 240 * (4 / 3), height: 240 }]"
  ></multi-view-component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import MultiViewComponent from '../views/MultiViewComponent.vue';

@Component({
  components: {
    MultiViewComponent
  }
})
export default class App extends Vue { }
</script>