<template>
  <v-app>
    <!-- APP HEADER -->
    <app-header></app-header>

    <!-- CONTENT -->
    <v-content class="px-8 mt-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    "app-header": AppHeader,
  },
  data() {
    return {};
  },
};
</script>
