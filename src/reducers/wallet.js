const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  fetching: false,

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EXPENSE':
    return {
      expenses: [...state.expenses, action.state],
      fetching: false };
  case 'REQUEST_CURRENCIES':
    return { currencies: state.currencies,
      expenses: state.expenses,
      fetching: true };
  case 'RECEIVE_CURRENCIES':
    return { currencies: action.state,
      expenses: state.expenses,
      fetching: false };
  default:
    return state;
  }
};

export default wallet;
