import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Typography, Modal, Row, Col, Table } from 'antd';
import PropTypes from 'prop-types';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import QuestionComment from 'components/Summary/QuestionComment';
import { onCreateComment } from 'graphql/subscriptions';
import AddNewScoreRedux from 'components/Summary/AddNewScoreRedux';
import moment from 'moment-timezone';
import { getTest2 } from './queries';

const toInterviewResult = data => {
  const interviewers = data.users.items.filter(x => x).map(v => v.user);

  const questions = data.records.items.map(v => ({
    id: v.id,
    name: v.ques.name,
  }));
  const comments = [];
  data.records.items.forEach(r => {
    r.comment.items.forEach(c => {
      comments.push({
        questionID: r.id,
        ...c,
      });
    });
  });
  const summaries = data.results.items;
  return { interviewers, questions, comments, summaries };
};

const handleScoreSubscription = (prev, { onCreateComment: newComment }) => {
  const newData = {
    author: newComment.author,
    completeness: newComment.completeness,
    content: newComment.content,
    hint: newComment.hint,
    quality: newComment.quality,
    time: newComment.time,
  };
  prev.getTest.records.items[0].comment.items.push(newData);
  return prev;
};
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const columns = [
  {
    title: 'Author',
    dataIndex: 'Author',
    key: 'Author',
    sorter: (a, b) => a.Author.localeCompare(b.Author),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Content',
    dataIndex: 'Content',
    key: 'Content',
  },
  {
    title: 'Time',
    dataIndex: 'Time',
    key: 'Time',
    sorter: (a, b) => a.Time.localeCompare(b.Time),
    sortDirections: ['descend', 'ascend'],
  },
];

const InterviewSummaryModal = props => (
  <Modal
    title={props.title}
    visible={props.visible}
    onCancel={props.onCancel}
    footer={props.footer}
    width={props.width}
  >
    <Connect
      query={graphqlOperation(getTest2, {
        id: props.testID,
      })}
      subscription={graphqlOperation(onCreateComment)}
      onSubscriptionMsg={handleScoreSubscription}
    >
      {({ data, loading, error }) => {
        const test = data && data.getTest;
        let questions = [];
        let comments = [];
        let records = [];
        let questionid = '';
        if (data && !loading && !error) {
          const interviewResult = toInterviewResult(test);
          questions = interviewResult.questions;
          comments = interviewResult.comments;
          records = data.getTest.records.items;
          questionid = data.getTest.records.items[0].id;
          comments.sort((a, b) => a.time.localeCompare(b.time));
        }
        let newScore = '';

        newScore = (
          <AddNewScoreRedux
            questionid={questionid}
            uppervisible={props.visible}
          />
        );

        // data part
        return (
          <PageSpin spinning={loading}>
            {!loading && error && (
              <PageEmpty description={<span>Error Occuring</span>} />
            )}

            {!loading && !test && (
              <PageEmpty
                description={<span>Data Not Found</span>}
                image="default"
              />
            )}

            {!loading && test && (
              <>
                <Typography.Title level={4}>Overall Score</Typography.Title>
                {comments.map(comment => {
                  const questioncomment = (
                    <>
                      <QuestionComment
                        interviewer={comment.author}
                        questions={[questions[0]]}
                        comments={[comment]}
                      />
                    </>
                  );

                  return questioncomment;
                })}
                <br />
                {newScore}
                <br />
                <Typography.Title level={4}>Comments</Typography.Title>
                <Row type="flex" justify="space-around">
                  {records.map(record => {
                    const singleQuestion = record.ques;
                    const wrapData = record.history.items
                      .map(x => x.snapComments)
                      .map(y => y.items)
                      .flat()
                      .map(z => ({
                        Author: z.author, // 2013-11-18T08:55:00-08:00
                        Content: z.content,
                        Time: moment.tz(z.time, timezone).format('HH:mm'),
                      }))
                      .sort((a, b) => a.Time.localeCompare(b.Time));
                    return (
                      <Col key={singleQuestion.id} span={10}>
                        <Row type="flex" align="middle" justify="space-around">
                          <h3 style={{ marginTop: '50px' }}>
                            Questions：{singleQuestion.name}
                          </h3>
                        </Row>
                        <Row>
                          <Table
                            width={40}
                            dataSource={wrapData}
                            columns={columns}
                            pagination={false}
                            style={{ height: '300px', overflowY: 'auto' }}
                          />
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </PageSpin>
        );
      }}
    </Connect>
  </Modal>
);
InterviewSummaryModal.propTypes = {
  testID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  footer: PropTypes.object,
  width: PropTypes.number.isRequired,
};
const mapDispatchToProps = dispatch => ({
  resetForm: (form, field, newValue) => dispatch(reset(form)),
});
export default connect(null, mapDispatchToProps)(InterviewSummaryModal);
