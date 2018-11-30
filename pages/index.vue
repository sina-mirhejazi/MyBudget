<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <h1>This is Overview Page</h1>
      <div>Balance: {{ balance }}</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    balance() {
      return this.$store.state.balance
    }
  }
}
</script>
