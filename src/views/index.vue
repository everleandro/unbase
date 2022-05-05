<template>
  <v-container>
    <user-loader v-if="loading" />
    <v-row v-else>
      <v-col
        v-for="user in userList"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <card-user
          :value="user"
          @update="showUserForm"
          :loading="loadingCardUser(user.id)"
          @delete="deleteUser"
        />
      </v-col>
    </v-row>
    <v-dialog
      v-model="userFormDialogModel"
      scrollable
      persistent
      max-width="600px"
    >
      <userForm
        :value="userEntity"
        @success:creation="handleSuccessUserCreation"
        @success:update="handleSuccessUserUpdate"
        @cancel="closeUserForm"
        @error="$flash('Error inesperado')"
      ></userForm>
    </v-dialog>

    <v-btn color="primary" dark fixed bottom right fab @click="showUserForm()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import cardUser from "@/components/card/user";
import userForm from "@/components/card/user-form";
import userLoader from "@/components/card/user-loader";
import { routes } from "@/constant/api-route";

export default {
  name: "HomeHome",
  components: { cardUser, userForm, userLoader },
  data: () => ({
    userFormDialogModel: false,
    userInDeletingProcess: [],
    loading: false,
    userList: [],
    userEntity: null,
  }),
  mounted() {
    this.loading = true;
    fetch(`${routes.users}`)
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("Error inesperado");
        }
      })
      .then((json) => {
        this.userList = json;
      })
      .catch((message) => {
        console.error(message);

        this.$flash({ message, color: "red" });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    loadingCardUser(userId) {
      return !!this.userInDeletingProcess.find((id) => id === userId);
    },
    showUserForm(user) {
      this.userEntity = user ? JSON.parse(JSON.stringify(user)) : null;
      this.userFormDialogModel = true;
    },
    closeUserForm() {
      this.userEntity = null;
      this.userFormDialogModel = false;
    },
    async deleteUser(user) {
      const response = await this.$confirm(
        `Esta a punto de eliminar el usuario ${user.name} esta accion no es reversible`
      );
      if (response) {
        this.userInDeletingProcess.push(user.id);
        fetch(`${routes.users}/${user.id}`)
          .then((response) => {
            if (response.ok) return response.json();
            else {
              throw new Error("Error inesperado");
            }
          })
          .then((json) => {
            this.loading = false;
            if (json.id) {
              const index = this.userList.findIndex(({ id }) => id === user.id);
              this.userList.splice(index, 1);
            } else {
              this.$flash({ message: "Error inesperado", color: "red" });
            }
          })
          .catch((message) => {
            this.$flash({ message, color: "red" });
          })
          .finally(() => {
            const index = this.userInDeletingProcess.findIndex(
              (e) => e === user.id
            );
            this.userInDeletingProcess.slice(index, 1);
          });
      }
    },
    handleSuccessUserUpdate(user) {
      const index = this.userList.findIndex(({ id }) => id === user.id);
      this.userList.splice(index, 1, user);
      this.closeUserForm();
      this.$flash("Usuario actualizado correctamente");
    },
    handleSuccessUserCreation(user) {
      this.userList.splice(0, 0, user);
      this.closeUserForm();
      this.$flash("Usuario creado correctamente");
    },
  },
};
</script>
