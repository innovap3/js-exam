import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import actions from 'redux-form/es/actions';
import { Button, Menu, Dropdown, Tag, Input, Icon, message } from 'antd';

import { RfInput } from 'components/RfInput';
import { createSnapComment } from 'redux/snapComment/actions';
import { FORM_ID as SNAP_COMMENT_FORM_ID } from 'containers/DispatchPage/SnapCommentBar';
import { cannedMessages } from './constants';
import styles from './SnapCommentBar.module.scss';

export const FORM_ID = 'SnapCommentBar';
const InputGroup = Input.Group;

class SnapCommentBar extends PureComponent {
  handleClickTag = content => () => {
    if (content) this.props.onChangeSnapComment(content);
  };

  handleMenuClick = evt => {
    const comment = cannedMessages.find(
      message => Number(evt.key) === message.key,
    );
    this.props.onChangeSnapComment(comment.content);
  };

  renderCannedMessagesMenu = () => (
    <Menu onClick={this.handleMenuClick}>
      {cannedMessages.map(message => (
        <Menu.Item key={message.key}>{message.content}</Menu.Item>
      ))}
    </Menu>
  );

  renderTags = () => {
    const messages = cannedMessages.slice(0, 4);
    return messages.map(message => (
      <Tag
        className={styles.pointer}
        key={message.content}
        color={message.color}
        onClick={this.handleClickTag(message.content)}
      >
        {message.content}
      </Tag>
    ));
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      onCreateSnapComment,
    } = this.props;
    return (
      <div className={styles.root}>
        {/*
        <Dropdown overlay={this.renderCannedMessagesMenu()} placement="topLeft">
          <Button className={styles.dropdownBtn}>Canned Messages</Button>
        </Dropdown>
        */}

        <div className={styles.rightSide}>
          <div className={styles.tags}>{this.renderTags()}</div>
          <form onSubmit={handleSubmit(onCreateSnapComment)}>
            <InputGroup compact style={{ display: 'flex' }}>
              <Dropdown
                overlay={this.renderCannedMessagesMenu()}
                placement="topLeft"
              >
                <Button className={styles.dropdownBtn}>
                  Canned Messages
                  <Icon type="up" />
                </Button>
              </Dropdown>
              <Field name="content" component={RfInput} placeholder="Comment" />
              <Button
                type="primary"
                htmlType="submit"
                disabled={pristine || submitting}
              >
                Send
              </Button>
            </InputGroup>
          </form>
        </div>
      </div>
    );
  }
}

SnapCommentBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onChangeSnapComment: PropTypes.func,
  onCreateSnapComment: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeSnapComment: content =>
      dispatch(actions.change(FORM_ID, 'content', content)),
    onCreateSnapComment: data => {
      dispatch(
        createSnapComment(data, () => {
          // Reset snap-comment form field
          dispatch(actions.reset(SNAP_COMMENT_FORM_ID));
          message.success('Add comment succeeded');
        }),
      );
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReduxForm = reduxForm({
  form: FORM_ID,
});

export default compose(withReduxForm, withConnect)(SnapCommentBar);
