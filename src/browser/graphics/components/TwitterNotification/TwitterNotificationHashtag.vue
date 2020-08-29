<template>
  <div :style="{
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}">
    <div>#758RTA</div>
  </div>
</template>

<style scoped>
div {
  font-family: "Russo One";
  font-size: 36px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TwitterNotificationHashtag extends Vue { }
</script>
