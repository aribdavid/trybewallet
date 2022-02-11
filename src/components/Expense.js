import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import defaultAction, { fetchCurrencies } from '../store/actions';

class Expense extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      exchangeRates: '',
    };
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    this.mountedEverything();
  }

   mountedEverything = () => {
     const { currencies } = this.props;
     this.setState({ exchangeRates: currencies });
   }

  handleChange =({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClick = () => {
    const { saveExpense, getCurrencies, handleExpenses } = this.props;
    const { value, exchangeRates, currency } = this.state;
    const selectedRate = exchangeRates[currency].ask;
    handleExpenses(value * selectedRate);
    getCurrencies();
    saveExpense(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    }));
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <input
          onChange={ this.handleChange }
          name="value"
          type="number"
          step="any"
          data-testid="value-input"
          value={ value }
        />
        <input
          onChange={ this.handleChange }
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
        />
        <label htmlFor="currency-input">
          Moeda
          <select
            onChange={ this.handleChange }
            name="currency"
            data-testid="currency-input"
            id="currency-input"
            value={ currency }

          >
            { currencies && Object.keys(currencies)
              .filter((elem) => elem !== 'USDT').map((type) => (
                <option
                  data-testid={ type }
                  key={ type }
                  value={ type }
                >
                  {type}
                </option>
              )) }
          </select>
        </label>
        <select
          onChange={ this.handleChange }
          name="method"
          data-testid="method-input"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          onChange={ this.handleChange }
          name="tag"
          data-testid="tag-input"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(defaultAction(state, 'SAVE_EXPENSE')),
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  fetching: state.wallet.fetching,
});

Expense.propTypes = {
  saveExpense: Proptypes.func.isRequired,
  getCurrencies: Proptypes.func.isRequired,
  handleExpenses: Proptypes.func.isRequired,
  currencies: Proptypes.objectOf.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Expense);
