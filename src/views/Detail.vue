<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="5">
        <v-btn @click="goBack()" class="text-capitalize px-6">
          <v-icon left dark> mdi-arrow-left </v-icon>
          <span class="button">Back</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xl="4">
        <v-img
          max-height="500"
          max-width="400"
          :src="countryDetails.flag"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" xl="5">
        <v-card flat class="transparent">
          <v-card-title class="font-weight-bold">
            {{ countryDetails.name }}
          </v-card-title>

          <v-card-text class="body-2">
            <v-row>
              <v-col cols="12" sm="4" md="5" lg="6">
                <p>
                  <span class="font-weight-black">Native Name : </span>
                  <span>{{ countryDetails.nativeName }}</span>
                </p>
                <p>
                  <span class="font-weight-black">Population : </span>
                  <span>{{ countryDetails.population }}</span>
                </p>
                <p>
                  <span class="font-weight-black">Region : </span>
                  <span>{{ countryDetails.region }}</span>
                </p>
                <p>
                  <span class="font-weight-black">Sub Region : </span>
                  <span>{{ countryDetails.subregion }}</span>
                </p>
                <p>
                  <span class="font-weight-black">Capital : </span>
                  <span>{{ countryDetails.capital }}</span>
                </p>
              </v-col>
              <v-col cols="12" sm="4" md="7" lg="6">
                <p>
                  <span class="font-weight-black">Top Level Domain : </span>
                  <span> {{ domain }} </span>
                </p>
                <p>
                  <span class="font-weight-black">Currencies : </span>
                  <span> {{ currencies }} </span>
                </p>
                <p>
                  <span class="font-weight-black">Languages : </span>
                  <span> {{ languages }} </span>
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-black">Border Countries :</p>
                <v-btn
                  v-scroll="onScroll"
                  v-for="(i, x) in border"
                  :key="x"
                  class="ma-2 ml-0 mb-0"
                  @click="getDetail(i), toTop()"
                >
                  {{ i }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      countryDetails: [],
      border: [],
      domain: [],
      currencies: [],
      languages: [],
    };
  },

  methods: {
    getCountryDetails() {
      axios
        .get(`/rest/v2/name/${this.$route.params.name}?fullText=true`)
        .then((response) => {
          response.data.forEach((el) => {
            this.countryDetails = el;

            this.getBorder(el.borders);
            this.getDomain(el.topLevelDomain);
            this.getCurrencies(el.currencies);
            this.getLanguages(el.languages);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getBorder(item) {
      this.border = [];
      item.forEach((i) => {
        axios
          .get(`/rest/v2/alpha/${i}`)
          .then((response) => {
            this.border.push(response.data.name);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    getDomain(item) {
      this.domain = [];
      this.domain = item.map((item) => item).join(", ");
    },
    getCurrencies(item) {
      this.currencies = [];
      this.currencies = item.map((item) => item.name).join(", ");
    },
    getLanguages(item) {
      this.languages = [];
      this.languages = item.map((item) => item.name).join(", ");
    },
    getDetail(name) {
      this.$router.push({ path: `/details/${name}` });
      this.getCountryDetails();
    },
    goBack() {
      // this.$router.back();
      this.$router.push({ path: `/` });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  mounted() {
    // console.log("object");
    this.getCountryDetails();
  },
};
</script>

<style scoped>
</style>
