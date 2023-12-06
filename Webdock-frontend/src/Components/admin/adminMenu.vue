<template>
  <div class="AdminMenu_Container">
    <router-link to="/admin/users" active-class="Route_Active" class="AdminMenu_Route">Users</router-link>
    <!-- Add more links as needed -->
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
};
</script>

<style scoped>
.AdminMenu_Container {
  flex: 1;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
}

.AdminMenu_Route {
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  transition: all 0.2s ease-in-out;
  padding: 10px 0;
}

.AdminMenu_Route:hover {
  background: rgba(0, 0, 0, .25)
}

.Route_Active {
  background: rgba(0, 0, 0, .25)
}
</style>