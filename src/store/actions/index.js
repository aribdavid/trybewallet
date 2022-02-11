const defaultAction = (state, actionType) => ({
  type: actionType,
  state,
});

export default defaultAction;

function requestCurrencies() {
  return { type: 'REQUEST_CURRENCIES' };
}

function receiveCurrencies(state) {
  return { type: 'RECEIVE_CURRENCIES',
    state };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
