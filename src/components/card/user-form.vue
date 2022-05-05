<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Datos de usuario</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="formModel" @submit="">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="localValue.name"
                :rules="[required_rule]"
                label="nombre*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="localValue.username"
                :rules="[required_rule]"
                label="nombre de usuario*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="localValue.email"
                label="E-mail*"
                :rules="[required_rule, email_rule]"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="localValue.phone"
                label="tel"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="localValue.website"
                label="sitio web"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="localValue.address.city" label="ciudad" />
              <v-text-field v-model="localValue.address.street" label="calle" />
              <v-text-field v-model="localValue.address.suite" label="piso" />
              <v-text-field
                v-model="localValue.address.zipcode"
                label="zipcode"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <small>*indicador de campos requeridos</small>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" :disabled="loading" text @click="cancel">
        Cancelar
      </v-btn>
      <v-btn
        color="blue darken-1"
        :loading="loading"
        :disabled="!formModel"
        text
        @click="save"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { routes } from "@/constant/api-route";
const userObject = {
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: "",
  website: "",
};

export default {
  name: "user-form",
  props: {
    value: { type: Object, default: null },
  },
  data: () => ({
    loading: false,
    formModel: false,
    required_rule: (v) => !!v || "Este campo es requerido",
    email_rule: (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
    localValue: { ...userObject },
  }),
  computed: {
    isCreating() {
      return !this.value;
    },
  },
  watch: {
    value(val) {
      this.localValue = val ? { ...val } : { ...userObject };
    },
  },
  mounted() {
    this.localValue = this.value || { ...userObject };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.$refs.form.reset();
    },
    save() {
      this.loading = true;
      const route = this.isCreating
        ? `${routes.users}`
        : `${routes.users}/${this.value.id}`;
      const method = this.isCreating ? "POST" : "PATCH";
      const emitKey = this.isCreating ? "success:creation" : "success:update";
      fetch(route, {
        method,
        body: JSON.stringify(this.localValue),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else {
            throw new Error("Error inesperado");
          }
        })
        .then((json) => {
          if (json.id) {
            this.$refs.form.reset();
            this.$emit(emitKey, json);
          } else {
            this.$emit("error");
          }
        })
        .catch((message) => {
          console.error(message);
          this.$flash({ message, color: "red" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
