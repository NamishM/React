import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const AntiForgeryToken = ({ tokenName, tokenValue }) => (
  <input type="hidden" name={tokenName} value={tokenValue} />
);

AntiForgeryToken.propTypes = {
  tokenName: PropTypes.string.isRequired,
  tokenValue: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tokenName: state.login.identityServerModel.antiForgery.name,
  tokenValue: state.login.identityServerModel.antiForgery.value,
});

const AntiForgeryTokenConnected = connect(mapStateToProps, null)(AntiForgeryToken);

export default AntiForgeryTokenConnected;
