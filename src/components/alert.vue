<template>
  <v-dialog v-model="dialog" :persistent="loading" max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        {{ config.title || "Alerta" }}
      </v-card-title>

      <v-card-text>
        {{ config.message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          :disabled="loading"
          text
          @click="dialog = false"
        >
          Cancelar
        </v-btn>

        <v-btn color="green darken-1" text :loading="loading" @click="accept">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppAlert",
  props: {
    value: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    config: {
      type: Object,
      default: () => ({
        title: "Alerta",
        message: "",
      }),
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    accept() {
      this.$emit("click:accept");
    },
  },
};
</script>

<style></style>
