<template lang="pug">
  div
    v-app-bar#nav
      v-layout(wrap)
        v-app-bar-nav-icon
        v-flex#search(xs6 sm4 md3 lg3 xl3)
          v-text-field(
            hide-details
            append-icon="search"
            outlined
            label="Search"
            )
        v-spacer
        v-flex(xs1 align-self-center)
          router-link#login-btn(:to="{ name: 'Login'}")
            v-btn(
              color="success"
              outlined
            ) 登入
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss" scoped>
#nav {
  min-height: 70px;
  #search {
  margin-left: 30px;
  height: 30px;
  }
}

#login-btn {
  text-decoration: none;
}

</style>
