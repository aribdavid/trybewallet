import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
      currency: 'BRL ',
    };
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
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Wallet);
