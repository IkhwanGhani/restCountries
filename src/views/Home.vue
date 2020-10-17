<template>
  <v-container>
    <v-toolbar flat class="transparent">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        hide-details
        solo
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-select
        v-model="selectedRegion"
        :items="regionItems"
        label="Filter by region"
        hide-details
        solo
      ></v-select>
    </v-toolbar>
    <v-row class="pa-4">
      <v-col
        cols="12"
        md="3"
        lg="3"
        xl="3"
        v-for="(i, x) in filterRegion"
        :key="x"
      >
        <v-row>
          <v-col>
            <v-card elevation="10">
              <router-link :to="`/details/${i.name}`">
                <v-img :aspect-ratio="16 / 9" :src="i.flag"></v-img>
              </router-link>
              <v-card-text class="text-xs-h6 font-weight-black">{{
                i.name
              }}</v-card-text>
              <v-card-text>{{ i.population }}</v-card-text>
              <v-card-text>{{ i.region }}</v-card-text>
              <v-card-text>{{ i.capital }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedRegion: "All Countries",
      search: "",
      listCountryDetails: [],
      regionItems: [
        {
          text: "All Countries",
        },
        {
          text: "Africa",
        },
        {
          text: "Americas",
        },
        {
          text: "Asia",
        },
        {
          text: "Europe",
        },
        {
          text: "Oceania",
        },
      ],
    };
  },
  methods: {
    getCountryAll() {
      axios
        .get(
          `https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital`
        )
        .then((response) => {
          console.log(response.data);
          this.listCountryDetails = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    filterRegion() {
      if (this.selectedRegion == "All Countries" && this.search == "") {
        return this.listCountryDetails;
      }
      if (this.selectedRegion != "All Countries" && this.search == "") {
        return this.listCountryDetails.filter((item) =>
          item.region.toLowerCase().includes(this.selectedRegion.toLowerCase())
        );
      }
      if (this.selectedRegion == "All Countries" && this.search != "") {
        return this.listCountryDetails.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.selectedRegion != "All Countries" && this.search != "") {
        return this.listCountryDetails.filter(
          (item) =>
            item.region
              .toLowerCase()
              .includes(this.selectedRegion.toLowerCase()) &&
            item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.getCountryAll();
  },
};
</script>

<style scoped>
</style>
