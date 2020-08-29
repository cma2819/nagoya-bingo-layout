<template>
  <v-app>
    <v-container class="pa-0 ma-0">
      <v-row justify="space-between">
        <v-col>
          <bingo-import-control></bingo-import-control>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <bingo-card></bingo-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BingoCard from './components/BingoCardComponent.vue';
import BingoImportControl from '../components/BingoImportControlComponent.vue';

@Component({
  components: {
    BingoCard,
    BingoImportControl,
  }
})
export default class App extends Vue { }
</script>

