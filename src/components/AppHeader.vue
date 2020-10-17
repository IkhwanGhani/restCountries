<template lang="html">
    <v-app-bar app class="px-10">
        <v-toolbar-title class="pointer font-weight-bold">Where in the world?</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text class="ma-2 text-capitalize" @click="themeDark">
          <v-icon left dark>
            mdi-moon-waning-crescent
          </v-icon>
          Dark Mode
        </v-btn>
    </v-app-bar>
</template>

<script>
import { EventBus } from "@/main";

export default {
  data() {
    return {
    };
  },
  methods: {
    themeDark() {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer !important;
}
</style>
