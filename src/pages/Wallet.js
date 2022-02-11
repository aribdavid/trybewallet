import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expense from '../components/Expense';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      currency: 'BRL ',
    };
  }

  handleExpenses = (expense) => {
    this.setState((prevState) => ({
      totalExpenses: prevState.totalExpenses + Number(expense),
    }));
  }

  render() {
    const { userEmail } = this.props;
    const { totalExpenses, currency } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{userEmail}</h2>
          <h3 data-testid="total-field">{totalExpenses}</h3>
          <h3 data-testid="header-currency-field">{currency}</h3>
          <Header />
          <Expense handleExpenses={ this.handleExpenses } />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Wallet);
