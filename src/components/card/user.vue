<template>
  <v-card class="user-card">
    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-speed-dial v-model="speedRedialModel" top right direction="bottom">
      <template v-slot:activator>
        <v-btn
          v-model="speedRedialModel"
          :disabled="loading"
          color="blue darken-2"
          dark
          icon
        >
          <v-icon v-if="speedRedialModel"> mdi-close </v-icon>
          <v-icon v-else> mdi-dots-vertical </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="$emit('update', value)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="$emit('delete', value)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <div class="blue lighten-5 d-flex justify-center">
      <v-avatar color="red" size="60" class="ma-5">
        <span class="white--text text-h5">{{ avatar }}</span>
      </v-avatar>
    </div>
    <v-card-title class="d-flex justify-center">{{ value.name }}</v-card-title>
    <v-card-subtitle>{{ value.company && value.company.name }}</v-card-subtitle>
    <div class="user-card__icon-actions">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            :href="`tel:${value.phone}`"
            target="_blank"
            v-on="on"
          >
            <v-icon>mdi-phone</v-icon>
          </v-btn>
        </template>
        <span>llamar</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            :href="`mailto:${value.email}`"
            target="_blank"
            v-on="on"
          >
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </template>
        <span>enviar email</span>
      </v-tooltip>
      <v-tooltip v-if="value.address.geo" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            :href="`https://www.google.com/maps/@${value.address.geo.lng},${value.address.geo.lat}z`"
            target="_blank"
            v-on="on"
          >
            <v-icon>mdi-map-marker</v-icon></v-btn
          >
        </template>
        <span>Ver en google maps</span>
      </v-tooltip>
    </div>
    <v-card-text v-text="formattedAddress" />
    <div class="user-card__footer blue"></div>
  </v-card>
</template>

<script>
export default {
  name: "card-user",
  props: {
    value: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    speedRedialModel: false,
  }),
  computed: {
    avatar() {
      return this.value.name
        .split(" ")
        .map((e) => e.charAt(0))
        .join("");
    },
    formattedAddress() {
      const { street, suite, city } = this.value.address;
      return [street, suite, city].filter((e) => !!e).join(", ");
    },
  },
};
</script>

<style lang="scss">
/* This is for documentation purposes and will not be needed in your application */
.user-card {
  display: flex !important;
  flex: 1 1 100%;
  flex-direction: column;
  height: 100%;
  position: relative;
  &__footer {
    height: 8px;
  }
  &__icon-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    backface-visibility: hidden;
    flex: 1 1 auto;
    overflow-y: auto;
  }
  .v-speed-dial {
    position: absolute;
  }

  .v-btn--floating {
    position: relative;
  }
}
</style>
