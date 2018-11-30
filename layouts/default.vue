<template>
  <v-app>
    <v-toolbar
      fixed
      app>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <div class="speed-dial-container">
      <v-speed-dial
        v-model="fab"
        :bottom="true"
        :right="true"
        direction="top"
        transition="scale-transition">
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          dark
          fab>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>

        <AddExpenseDialog/>

        <AddIncomeDialog/>
        
      </v-speed-dial>
    </div>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent">
      <v-btn
        :replace="true"
        color="teal"
        flat
        value="overview"
        to="/">
        <span>Overview</span>
        <v-icon>bubble_chart</v-icon>
      </v-btn>

      <v-btn
        :replace="true"
        color="teal"
        flat
        value="transactions"
        to="/transactions">
        <span>Transactions</span>
        <v-icon>swap_horiz</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import AddIncomeDialog from '../components/AddIncomeDialog.vue'
import AddExpenseDialog from '../components/AddExpenseDialog.vue'

export default {
  components: {
    AddIncomeDialog,
    AddExpenseDialog
  },
  data() {
    return {
      bottomNav: 'overview',
      fab: false,
      tooltips: false,
      tooltipsDisabled: false
    }
  },
  computed: {
    title() {
      return this.bottomNav.replace(/^\w/, c => c.toUpperCase())
    }
  },
  watch: {
    fab(val) {
      this.tooltips = false
      this.tooltipsDisabled = false
      val &&
        setTimeout(() => {
          this.tooltips = true
          this.$nextTick(() => (this.tooltipsDisabled = true))
        }, 250)
    }
  },
  methods: {
    goTo(path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="styl">
.speed-dial-container
  position absolute
  bottom 56px
  right 0
</style>
