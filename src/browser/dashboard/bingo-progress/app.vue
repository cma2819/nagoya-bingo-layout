<template>
  <v-app>
    <v-container class="pa-0 ma-0">
      <v-row>
        <v-col cols="4">
          <v-card>
            <red-label>Red Team</red-label>
            <bingo-card
              color="#E53935"
              :is-blue="false"
            ></bingo-card>
          </v-card>
        </v-col>
        <v-col cols="4">
          <progress-control></progress-control>
        </v-col>
        <v-col cols="4">
          <blue-label>Blue Team</blue-label>
          <bingo-card
            color="#1E88E5"
            :is-blue="true"
          ></bingo-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import RedLabel from '../components/RedLabelComponent.vue';
import BlueLabel from '../components/BlueLabelComponent.vue';
import BingoCard from './components/BingoCardComponent.vue';
import ProgressControl from './components/ProgressControlComponent.vue';

@Component({
  components: {
    BingoCard,
    RedLabel,
    BlueLabel,
    ProgressControl,
  }
})
export default class App extends Vue { }
</script>

