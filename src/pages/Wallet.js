import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expense from '../components/Expense';
import Header from '../components/Header';
import Table from '../components/Table';

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
          <thead>
            <tr>
              <th data-testid="email-field">
                Email:
                {' '}
                {userEmail}
              </th>
              <th data-testid="total-field">
                Despesa Total: R$
                {' '}
                {totalExpenses}
                {' '}
              </th>
              <th data-testid="header-currency-field">{currency}</th>
            </tr>
          </thead>
          <Expense handleExpenses={ this.handleExpenses } />
          <Header />
          <Table />
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
