<template>
  <v-dialog 
    v-model="dialog" 
    fullscreen 
    hide-overlay 
    transition="dialog-bottom-transition">
    <v-btn
      slot="activator"
      fab
      dark
      small
      color="green darken-2">
      <v-icon>trending_up</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar>
        <v-toolbar-items>
          <v-btn 
            icon 
            @click="resetAndCloseForm">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title>Add Income</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn 
            icon
            flat 
            @click="addAndCloseForm">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <v-container grid-list-md>
        <v-flex 
          xs12
          sm6
          md4>
          <v-text-field 
            v-model="amount"
            type="number"
            prefix="$"
            label="Amount" 
            autofocus
            required/>
        </v-flex>

        <v-textarea
          v-model="description"
          auto-grow
          label="Description"
          rows="1"/>
      
        <v-select
          :items="categoryList"
          v-model="category_id"
          menu-props="auto"
          label="Select"
          item-text="name"
          item-value="id"
          hide-details
          single-line/>

        <v-dialog
          ref="dialog"
          v-model="datePicker"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px">
          <v-text-field
            slot="activator"
            v-model="date"
            prepend-icon="event"
            readonly/>
          <v-date-picker 
            v-model="date" 
            scrollable>
            <v-spacer/>
            <v-btn 
              flat 
              color="primary" 
              @click="datePicker = false">Cancel</v-btn>
            <v-btn 
              flat 
              color="primary"
              @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      datePicker: false,

      amount: null,
      description: '',
      date: new Date().toISOString().substr(0, 10),
      category_id: -1,

      notifications: false,
      sound: false,
      widgets: false
    }
  },
  computed: {
    categoryList() {
      return this.$store.state.incomeCategories
    }
  },
  methods: {
    addAndCloseForm() {
      const { date, amount, description, category_id } = this

      const item = {
        date,
        description,
        category_id,
        amount: parseInt(amount, 10),
        type: 'income'
      }

      console.log(item)

      this.$store.commit('addTransition', item)

      this.resetAndCloseForm()
    },
    resetAndCloseForm() {
      this.dialog = false
      this.amount = null
      this.description = ''
      this.date = new Date().toISOString().substr(0, 10)
      this.category_id = -1
    }
  }
}
</script>
