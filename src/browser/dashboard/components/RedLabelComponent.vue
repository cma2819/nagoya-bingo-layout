<template>
  <v-toolbar color="red darken-4">
    <v-toolbar-title>
      <slot />
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RedLabelComponent extends Vue { }
</script>

