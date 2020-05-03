<template>
  <div id="app">
    <div id="background">
      <div id="nav">
        <b-container class="bv-example-row">
          <b-row class="text-center">
            <b-col cols="2">
              BLSTM-K
            </b-col>
            <b-col>
              <router-link to="/">Home</router-link>
            </b-col>
            <b-col>
              <router-link to="/about">About</router-link>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #498AC8;
}

#nav {
  padding: 30px;
  background: rgb(0,25,56);
  background: linear-gradient(0deg, rgba(0,25,56,1) 0%, rgba(14,68,114,1) 89%);
  opacity: 50%;

  a {
    font-weight: bold;
    color: #498AC8;

    &.router-link-exact-active {
      color: #5DB9DE;
    }
  }
}

#background {
  background-image: url("./assets/musicwave.jpg");
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
