<template>
  <div :style="{
		width: '100%',
		height: '100%',
		backgroundImage: `url(${logoUri})`,
		backgroundSize: 'contain',
		backgroundPosition: 'center',
	}" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { bingoNodecg } from '../../../plugin/nodecg';
@Component
export default class LogoComponent extends Vue {
  logoUri = '';

  created(): void {
    bingoNodecg.Replicant('assets:logo').on('change', (newVal) => {
      if (newVal.length > 0) {
        this.logoUri = newVal[0].url;
      }
    });
  }
}
</script>

