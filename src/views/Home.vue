<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search for a country..."
          hide-details
          solo
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3" lg="2">
        <v-select
          v-model="selectedRegion"
          :items="regionItems"
          label="Filter by region"
          hide-details
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(item, index) in filterCountry"
        :key="index"
      >
        <v-row>
          <v-col>
            <v-card elevation="10" @click="getDetail(item.name)">
              <v-img :aspect-ratio="16 / 9" :src="item.flag"></v-img>
              <v-card-title class="font-weight-bold my-4">
                <h5>{{ item.name }}</h5>
              </v-card-title>
              <v-card-text>
                <p>
                  <span class="font-weight-bold">Population : </span>
                  <span>{{ item.population }}</span>
                </p>
                <p>
                  <span class="font-weight-bold">Region : </span>
                  <span>{{ item.region }}</span>
                </p>
                <p>
                  <span class="font-weight-bold">Capital : </span>
                  <span>{{ item.capital }}</span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedRegion: "",
      search: "",
      listCountryDetails: [],
      regionItems: [
        "All Region",
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
      ],
    };
  },
  methods: {
    getCountryAll() {
      axios
        .get(
          `/rest/v2/all?fields=flag;name;population;region;capital;alpha3Code`
        )
        .then((response) => {
          this.listCountryDetails = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDetail(name) {
      this.$router.push({ path: `/details/${name}` });
    },
  },
  computed: {
    filterCountry() {
      if (this.selectedRegion == "All Region" && this.search == "") {
        return this.listCountryDetails;
      }
      if (this.selectedRegion != "All Region" && this.search == "") {
        return this.listCountryDetails.filter((item) =>
          item.region.toLowerCase().includes(this.selectedRegion.toLowerCase())
        );
      }
      if (this.selectedRegion == "All Region" && this.search != "") {
        return this.listCountryDetails.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.selectedRegion != "All Region" && this.search != "") {
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
