import React from 'react';
import { Rate, Row, Col, Input, Button, message, Form } from 'antd';
import { reduxForm, Field, getFormValues } from 'redux-form';
import createComment from 'utils/comment/comment';
import { connect } from 'react-redux';
const { TextArea } = Input;

const FieldizeRate = () => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Rate allowHalf {...input} {...rest} children={children} />
    </FormItem>
  );
};

const FieldizeComment = (height, width) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  const heightPx = `${height}px`;
  const widthPx = `${width}px`;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <TextArea
        bordered={false}
        {...input}
        {...rest}
        children={children}
        style={{
          height: heightPx,
          width: widthPx,
          overflowY: 'auto',
        }}
      />
    </FormItem>
  );
};
const FieldizeInput = (height, width) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  ...rest
}) => {
  const FormItem = Form.Item;
  const hasError = meta.touched && meta.invalid;
  const heightPx = `${height}px`;
  const widthPx = `${width}px`;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Input
        bordered={false}
        {...input}
        {...rest}
        children={children}
        style={{
          height: heightPx,
          width: widthPx,
          overflowY: 'auto',
        }}
      />
    </FormItem>
  );
};
const RateScore = FieldizeRate();
const CommentScore = FieldizeComment(200, 400);
const NameScore = FieldizeInput(40, 200);
// Reference: https://codesandbox.io/s/jzyl70wpk?file=/SimpleForm.js:611-1048

class AddNewScoreFormRedux extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.props.handleSubmit(async data => {
      const id = this.props.questionid;
      const params = {
        commentRecordId: id,
        author: data.name,
        quality: data.quality,
        hint: data.hint,
        completeness: data.completeness,
        tags: 'no more comment',
        content: data.comment,
      };
      await createComment(params);
      message.success('Add Overall Score successfully');
      this.props.reset();
    });
    this.handleSubmit = event => {
      event.preventDefault();
      this.submitForm();
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.submitForm();
  };

  render() {
    const shouldEnableSubmitButton =
      this.props.formStates?.name &&
      Number.isFinite(this.props.formStates?.quality) &&
      Number.isFinite(this.props.formStates?.completeness) &&
      Number.isFinite(this.props.formStates?.hint);
    return (
      <>
        <Row type="flex" align="middle">
          <h2 style={{ fontSize: '20px', marginTop: '-10px' }}>
            Interviewer：
          </h2>
          <Field
            name="name"
            component={NameScore}
            type="text"
            placeholder="please leave your name"
            style={{ width: '240px', height: '50px', marginTop: '-10px' }}
          />
        </Row>
        <form>
          <Row type="flex" align="middle">
            <Col type="flex">
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '120px' }}>
                  Skills
                </h4>
                <Field
                  style={{ marginLeft: '140px', marginTop: '110px' }}
                  name="quality"
                  component={RateScore}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '10px' }}>
                  Potential
                </h4>
                <Field
                  style={{ marginLeft: '115px', marginBottom: '-130px' }}
                  name="completeness"
                  component={RateScore}
                />
              </Row>
              <Row type="flex">
                <h4 style={{ display: 'inline', marginTop: '10px' }}>
                  Adaptability
                </h4>
                <Field
                  name="hint"
                  style={{ marginLeft: '100px' }}
                  component={RateScore}
                />
              </Row>
            </Col>
            <>
              <Col
                type="flex"
                span={10}
                offset={5}
                style={{ marginTop: '-60px' }}
              >
                <h2 style={{ marginBottom: '150px' }}>Comment </h2>

                <Field
                  name="comment"
                  component={CommentScore}
                  type="text"
                  placeholder="please leave your comment"
                  style={{ marginTop: '500px' }}
                />
              </Col>
              <Row>
                <Button
                  align="middle"
                  style={{
                    marginTop: '50px',
                    marginLeft: '150px',
                    width: '100px',
                  }}
                  disabled={!shouldEnableSubmitButton}
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                >
                  Add Score
                </Button>
              </Row>
            </>
          </Row>
        </form>
      </>
    );
  }
}
const formName = 'AddScore';
function mapStateToProps(state) {
  return {
    formStates: getFormValues(formName)(state),
  };
}

export default connect(mapStateToProps)(
  reduxForm({ form: 'AddScore' })(AddNewScoreFormRedux),
);
