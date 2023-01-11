import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { clearUser } from 'redux/login/actions';
import { Auth } from 'aws-amplify';

import { Button } from 'antd';

import styles from './NotFoundPage.module.scss';

class NotFoundPage extends Component {
  onReLoginHandler = () => {
    Auth.signOut()
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    this.props.onClearUser();
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Page Not found</h1>
        <Button type="default" onClick={this.onReLoginHandler}>
          Login Again
        </Button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onClearUser: () => dispatch(clearUser()),
});
const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(NotFoundPage);
