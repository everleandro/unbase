<template>
  <v-snackbar v-model="show" :color="flash.color">
    {{ flash.message }}
    <template #action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "appFlash",
  data: () => ({}),
  computed: {
    ...mapGetters({
      flash: "flashConfig",
    }),
    show: {
      get() {
        return this.flash.show;
      },
      set(show) {
        const conf = { ...this.flash, show };
        this.setFlash(conf);
      },
    },
  },
  methods: {
    ...mapMutations({
      setFlash: "SET_FLASH_CONFIG",
    }),
    close() {
      this.setFlash({
        message: "",
        show: false,
      });
    },
  },
};
</script>
<style lang="scss"></style>
