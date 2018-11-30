import Vuex from 'vuex'

const INCOME_CATEGORIES_DEFAULT = [
  {
    id: 0,
    name: 'Savings'
  },
  {
    id: 1,
    name: 'Paycheck'
  },
  {
    id: 2,
    name: 'Bonus'
  },
  {
    id: 3,
    name: 'Interest'
  },
  {
    id: 4,
    name: 'Other'
  }
]

const EXPENSE_CATEGORIES_DEFAULT = [
  {
    id: 0,
    name: 'Food'
  },
  {
    id: 1,
    name: 'Gifts'
  },
  {
    id: 2,
    name: 'Health/Medical'
  },
  {
    id: 3,
    name: 'Home'
  },
  {
    id: 4,
    name: 'Transportation'
  },
  {
    id: 5,
    name: 'Personal'
  },
  {
    id: 6,
    name: 'Pets'
  },
  {
    id: 7,
    name: 'Utilities'
  },
  {
    id: 8,
    name: 'Travel'
  },
  {
    id: 9,
    name: 'Debt'
  },
  {
    id: 10,
    name: 'Other'
  },
  {
    id: 11,
    name: 'Lend	'
  }
]

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      balance: 0,
      incomeCategories: INCOME_CATEGORIES_DEFAULT,
      expenseCategories: EXPENSE_CATEGORIES_DEFAULT,
      transitions: []
    }),
    mutations: {
      increment(state) {
        state.counter++
      },
      addTransition(state, payload) {
        /*
          payload should be like this:
          { date, amount, description, type, category_id }
         */
        const id = makeID(payload)

        state.balance += (payload.type === 'income' ? 1 : -1) * payload.amount
        state.transitions.push({ id, ...payload })
      }
    }
  })
}

function makeID(obj) {
  const timestampSalt = +new Date()
  return btoa(JSON.stringify({ ...obj, timestampSalt }))
}

export default createStore
