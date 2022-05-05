<template>
  <v-row class="text-center">
    <v-col v-for="id in 4" :key="id" cols="12" sm="6" md="4" lg="3">
      <v-skeleton-loader type="card" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserLoader",
};
</script>

<style></style>
