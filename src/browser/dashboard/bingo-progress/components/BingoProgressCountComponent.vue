<template>
  <v-text-field
    class="timer-input ma-2"
    solo
    readonly
    :value="countString"
    full-width
    hide-details
  ></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BingoProgressCountComponent extends Vue {
  @Prop(Number)
  readonly done!: number;

  get countString(): string {
    return `${this.done} / 25`;
  }
}
</script>

