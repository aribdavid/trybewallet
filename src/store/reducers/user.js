const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default userReducer;
