import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Rate, Divider, Comment } from 'antd';

class QuestionComment extends React.Component {
  render() {
    const { interviewer, questions, comments } = this.props;
    if (!comments || !comments.length) {
      return (
        <h4 style={{ display: 'inline', color: 'red' }}>Not Available !</h4>
      );
    }
    return (
      <>
        <h2>Interviewer：{interviewer}</h2>
        {questions.map(
          ques => (
            <Row key={ques.id} type="flex" align="middle">
              <Col>
                <Row>
                  <h4 style={{ display: 'inline' }}> Skills</h4>
                  <Rate
                    style={{ marginLeft: '145px' }}
                    allowHalf
                    value={comments[0].quality}
                  />
                </Row>
                <Row>
                  <h4 style={{ display: 'inline' }}> Potential</h4>
                  <Rate
                    style={{ marginLeft: '122px' }}
                    allowHalf
                    value={comments[0].completeness}
                  />
                </Row>
                <Row>
                  <h4 style={{ display: 'inline' }}> Adaptability </h4>
                  <Rate
                    style={{ marginLeft: '100px' }}
                    allowHalf
                    value={comments[0].hint}
                  />
                </Row>
              </Col>
              <>
                <Col
                  type="flex"
                  span={10}
                  offset={5}
                  style={{ marginTop: '-40px' }}
                >
                  <h2 style={{ marginBottom: '50px' }}>Comment </h2>

                  <Comment
                    style={{
                      height: '200px',
                      width: '400px',
                      overflowY: 'auto',
                    }}
                    type="flex"
                    content={comments[0].content}
                  />
                </Col>
              </>
            </Row>
          ),
          // the if statement
        )}
        <Divider dashed />
      </>
    );
  }
}
QuestionComment.propTypes = {
  interviewer: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionComment;
