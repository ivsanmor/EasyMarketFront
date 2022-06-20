<template>
<div>
<div v-if="currentUser.authorities[0].authority == 'ROLE_ADMIN'"> 
  <DataTable :value="usuarios" :paginator="true" :rows="10">
            <Column field="id" header="Usuario ID" sortable></Column>
            <Column field="nombre" header="Nombre" sortable></Column>
            <Column field="nombreUsuario" header="Nombre Usuario" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="password" header="Password"></Column>
</DataTable>

</div>
<div v-if="currentUser.authorities[0].authority != 'ROLE_ADMIN'">
  <div class="container">
    <div class="main-body">
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                    <div class="mt-3">
                      <h4>{{this.usuario.nombre}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nombre</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{this.usuario.nombre}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{this.usuario.email}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nombre Usuario</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{this.usuario.nombreUsuario}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-12">
                       <Button icon="pi pi-fw pi-pencil" class="p-button-rounded  mr-2" @click="editUsuario(this.usuario)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
    <div> 
      <Dialog :visible="displayModal" :style="{width: '450px'}" header="Detalles del Usuario" :modal="true" class="p-fluid">
<!-- <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
      <div class="field">
          <label for="nombre">Nombre</label>
          <InputText id="nombre" v-model.trim="usuario.nombre" required="true" autofocus :class="{'p-invalid': submitted && !usuario.nombre}" />
          <small class="p-error" v-if="submitted && !usuario.nombre">El nombre es obligatorio.</small>
      </div>
      <div class="field">
          <label for="nombreUsuario">Nombre Usuario</label>
          <InputText id="nombreUsuario" v-model.trim="usuario.nombreUsuario" required="true" autofocus :class="{'p-invalid': submitted && !usuario.nombreUsuario}" />
          <small class="p-error" v-if="submitted && !usuario.nombreUsuario">El nombre de usuario es obligatorio.</small>
      </div>
        
          <div class="field">
              <label for="email">Email</label>
              
          <InputText id="email" v-model.trim="usuario.email" required="true" autofocus :class="{'p-invalid': submitted && !usuario.email}" />
          <small class="p-error" v-if="submitted && !usuario.email">El email del usuario es obligatorio.</small>
          </div>
          <!-- <div class="field">
              <label for="password">Password</label>
              <Password id="password" v-model="usuario.password" toggleMask></Password>
          </div> -->
        
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="updateUsuario(this.usuario)" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeModal"/>     
      </template>
    </Dialog>




    </div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
export default {
  name: 'Profile',
  data() {
    return {
      displayModal: false
    }
  },
  computed: {
    
    currentUser() {
      return this.$store.state.auth.user;
    },
      ...mapGetters([
      'usuario', 'usuarios'
    ])
  },
  methods: {
    ...mapActions(["getUsuarioByNombre", "updateUsuario"]),

    closeModal() {
      this.usuario = null;
      this.displayModal = false;
    },
    editUsuario(usuario) {
      this.usuario = {...usuario};
      this.displayModal= true;
    },
  },
  created() {
    this.$store.dispatch('getUsuarios');
    this.getUsuarioByNombre(this.currentUser);

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.$store.dispatch('getUsuarios');
    this.getUsuarioByNombre(this.currentUser);
  }
};
</script>