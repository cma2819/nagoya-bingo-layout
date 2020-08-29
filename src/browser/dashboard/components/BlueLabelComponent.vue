<template>
  <v-toolbar color="blue darken-4">
    <v-toolbar-title>
      <slot />
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BlueLabelComponent extends Vue { }
</script>

