<template>
  <v-dialog v-model="dialog" width="500" :retain-focus="false">
    <template #activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <v-card>
      <v-card-title class="app-heading--3" :class="`${alert.color}--text`">
        Confirmar
      </v-card-title>
      <v-card-text
        class="pt-5 app-body--2-medium text-justify"
        v-html="alert.message"
      >
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>
        <v-btn @click="close(false)" text> cancelar </v-btn>
        <v-btn @click="close(true)" text :color="alert.color"> acceptar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppConfirm",
  data: () => ({
    value: false,
  }),
  computed: {
    ...mapGetters({
      alert: "confirmConfig",
    }),
    dialog: {
      get() {
        return this.alert.show;
      },
      set(show) {
        const text = show ? {} : { text: "" };
        this.setAlert({ ...text, show, value: this.value });
        setTimeout(() => {
          this.value = false;
        });
      },
    },
  },
  methods: {
    ...mapMutations({
      setAlert: "SET_CONFIRM_CONFIG",
    }),
    async close(val) {
      this.value = val;
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss"></style>
