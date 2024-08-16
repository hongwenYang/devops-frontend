<template>
  <div id="app">
    <router-view>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
h1 {
  margin: 0;
  padding: 20px;
  font-size: 24px;
  color: #333;
}
</style>
