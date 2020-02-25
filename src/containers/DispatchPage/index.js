import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from 'graphql/subscriptions';
import { Modal, message } from 'antd';

import {
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId,
  RECORD_STATUS,
} from 'utils/record';
import createComment from 'utils/comment/comment';
import User from 'utils/user';

import { getRoomInfo, deleteRoomAction, setRoomHost } from 'redux/room/actions';
import { fetchQuestionList, fetchQuestion } from 'redux/question/actions';
import { setLatestHistory } from 'redux/history/actions';
import {
  createRecordData,
  setCurrentRecord,
  endRecordData,
} from 'redux/record/actions';

import { updateTestEndTimeData } from 'redux/test/actions';

import PageEmpty from 'components/PageEmpty';
import PageSpin from 'components/PageSpin';
import CommentBox from 'components/CommentBox';
import ControlWidget from 'components/Widgets/ControlWidget/DispatchPage';
import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import ConceptPage from './ConceptPage';
import SnapCommentBar from './SnapCommentBar';
import { EXAM_USER_NAME, QUESTION_TYPE } from '../ExamPage/constants';

const MainView = args => {
  switch (args.categoryIndex) {
    case 1: {
      return <ReactPage {...args} />;
    }
    case 2: {
      return <ConceptPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class Page extends Component {
  subscription = null;

  state = {
    commentBoxVisible: false,
    categoryIndex: 0,
    questionIndex: 0,
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    isLoading: false,
    delConfirmModalVisible: false,
    ran: false,
  };

  async componentDidMount() {
    const roomId = this.props.match.params.roomId;
    if (this.props.hostings.includes(roomId)) {
      this.props.actions.setRoomHost(true);
    } else {
      this.props.actions.setRoomHost(false);
    }
    await this.getRoom(roomId);
    this.subscribeOnCreateHistory();
    this.subscribeSnapCommentForRunCode();
  }

  componentWillUnmount() {
    this.unsubscribeOnCreateHistory();
  }

  async componentWillReceiveProps(nextProps) {
    const { room, history } = this.props;
    const { room: nextRoom } = nextProps;

    if (!room.delSuc && nextRoom.delSuc) {
      message.success('delete room successful');

      setTimeout(() => {
        history.push('/');
      }, 1000);
    } else if (!room.delErr && nextRoom.delErr) {
      message.error('delete room failed');
    }
  }

  subscribeOnCreateHistory = () => {
    if (!this.subscription) {
      this.subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateHistory),
      ).subscribe({
        next: ({ value }) => {
          const { record, actions } = this.props;
          if (value.data.onCreateHistory.record.id === record.id) {
            actions.setLatestHistory(value.data.onCreateHistory);
          }
          if (value.data.onCreateHistory.snapComments.items.length === 0) {
            this.setState({ ran: false });
          }
        },
        error: error => {
          console.error(error);
        },
      });
    }
  };

  unsubscribeOnCreateHistory = () => {
    if (this.subscription) this.subscription.unsubscribe();
  };

  // for observer
  getRoom = async id => {
    this.setState({ isLoading: true });
    await this.props.actions.getRoomInfo(id);
    await this.setRoomSetting();
    this.setState({ isLoading: false });
  };

  setRoomSetting = async () => {
    // when question has dispatched, append the record data
    if (this.props.record.id) {
      this.subscribeRecordUpdate();
      const { ques, syncCode } = this.props.record;
      if (ques) {
        const { type, content, test } = ques;
        // this.getQuestionList(type);
        this.setState({
          categoryIndex: QUESTION_TYPE[type],
          code: syncCode || content,
          test,
        });
        this.handleCodeChange(syncCode || content);
        // to show the question name
        await this.getQuestionList(type);
        const index = this.props.question.list.findIndex(
          question => question.name === ques.name,
        );
        this.setState({
          questionIndex: index >= 0 ? index : 0,
        });
        await this.onChangeQuestion(this.state.questionIndex);
      } else {
        await this.getQuestionList('javascript');
        await this.onChangeQuestion(0);
      }
    } else {
      await this.getQuestionList('javascript');
      await this.onChangeQuestion(0);
    }

    this.subscribeCreateRecord();
  };

  getQuestionList = async category => {
    await this.props.actions.fetchQuestionList(category);
  };

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    await this.props.actions.fetchQuestionList(QUESTION_TYPE[index]);
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async index => {
    if (this.props.question.list.length === 0) {
      return;
    }
    const { id } = this.props.question.list[index];
    this.setState({ isLoading: true, questionIndex: index });
    try {
      await this.props.actions.fetchQuestion(id);
      const { tags, content, test } = this.props.question;
      if (!this.props.record.content) {
        this.setState({
          tags,
          code: content,
          test,
        });
      }
    } catch (error) {
      console.error('get question error', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCodeChange = newCode => {
    const { test } = this.state;
    const fullCode = `${newCode} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.setState({ code: newCode, compiledCode });
    } catch (e) {
      this.setState({ code: newCode });
    }
  };

  onDispatchQuestion = async () => {
    const { room, question } = this.props;
    this.setState({ isLoading: true });
    try {
      // unsubscribe the old record
      if (this.subscriptionForUpdateRecordByRecordId) {
        this.subscriptionForUpdateRecordByRecordId.unsubscribe();
      }
      const ques = {
        name: question.name,
        type: question.type,
        content: question.content,
        test: question.test,
      };
      await this.props.actions.createRecordData({
        recordTestId: room.test.id,
        subjectId: room.subjectId,
        roomId: room.id,
        ques,
      });
      message.success(`Dispatch "${question.name}" successfully.`);
      // re-subscribe the new record
      this.subscribeRecordUpdate();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  addTape = newTape => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  onTagUpdate = tags => {
    this.setState({ tags });
  };

  subscribeCreateRecord = () => {
    this.subscriptionForCreateRecord = subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room && room.id === this.props.room.id) {
        // unsubscribe the old record
        if (this.subscriptionForUpdateRecordByRecordId) {
          this.subscriptionForUpdateRecordByRecordId.unsubscribe();
        }
        this.props.actions.setCurrentRecord(data);
        // to receive new question dispatched
        this.setState({
          code: ques.content,
          test: ques.test,
        });
        this.subscribeRecordUpdate();
      }
    });
  };

  subscribeRecordUpdate = () => {
    this.subscriptionForUpdateRecordByRecordId = subscribeOnUpdateRecordByRecordId(
      this.props.record.id,
      data => {
        const { room, syncCode } = data;
        if (room.id === this.props.room.id) {
          if (
            data.status === RECORD_STATUS.closed &&
            this.props.record.status !== RECORD_STATUS.closed
          ) {
            this.setCommentBox();
          }

          this.props.actions.setCurrentRecord(data);
          this.setState({
            code: syncCode || this.props.record.ques.content,
          });
        }
      },
    );
  };

  subscribeSnapCommentForRunCode = () => {
    API.graphql(graphqlOperation(subscriptions.onCreateSnapComment)).subscribe({
      next: ({ value }) => {
        if (value.data.onCreateSnapComment.author === EXAM_USER_NAME) {
          this.setState({ ran: true });
        }
      },
      error: error => {
        console.error(error);
      },
    });
  };

  onCreateComment = async data => {
    const { id } = this.props.record;
    const params = {
      commentRecordId: id,
      author: User.getUserName(),
      quality: data.input.rateQuality,
      hint: data.input.rateHint,
      completeness: data.input.rateComplete,
      tags: data.input.tags,
      content: data.input.summary,
    };
    await createComment(params);
    message.success('Add Comment successfully');
    this.setCommentBox();
  };

  setCommentBox = () => {
    const { commentBoxVisible } = this.state;
    this.setState({
      commentBoxVisible: !commentBoxVisible,
    });
  };

  showDelConfirmModal = () => {
    this.setState({
      delConfirmModalVisible: true,
    });
  };

  hideDelConfirmModal = () => {
    this.setState({
      delConfirmModalVisible: false,
    });
  };

  handleOnOkDelConfirmModal = async () => {
    const { room, actions } = this.props;

    await actions.deleteRoomAction(room);

    this.hideDelConfirmModal();
  };

  onEndExam = async () => {
    const { record, actions } = this.props;
    const testId = this.props.room.test.id;

    this.setState({ isLoading: true });
    try {
      await actions.endRecordData(record.id);
      await actions.updateTestEndTimeData(testId);
    } catch (error) {
      console.error('end exam error', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      isLoading,
      categoryIndex,
      questionIndex,
      commentBoxVisible,
      delConfirmModalVisible,
      ran,
    } = this.state;
    const {
      onChangeCategory,
      onChangeQuestion,
      onEndExam,
      onDispatchQuestion,
      handleCodeChange,
      addTape,
      resetTape,
      onTagUpdate,
      setCommentBox,
      showDelConfirmModal,
      hideDelConfirmModal,
      handleOnOkDelConfirmModal,
    } = this;
    const { room, question, record } = this.props;
    return (
      <React.Fragment>
        <PageSpin spinning={isLoading}>
          <React.Fragment>
            <ControlWidget
              isHost={room.isHost}
              record={record}
              onDispatchQuestion={onDispatchQuestion}
              onEndExam={onEndExam}
              onChangeCategory={onChangeCategory}
              categoryIndex={categoryIndex}
              questionIndex={questionIndex}
              questionList={question.list}
              onChangeQuestion={onChangeQuestion}
              candidateName={room.subjectId}
              roomId={room.id}
              roomDescription={room.description}
              showDelConfirmModal={showDelConfirmModal}
              hideDelConfirmModal={hideDelConfirmModal}
              ran={ran}
            />
            <MainView
              onDispatchQuestion={onDispatchQuestion}
              onChangeCategory={onChangeCategory}
              onChangeQuestion={onChangeQuestion}
              handleCodeChange={handleCodeChange}
              addTape={addTape}
              resetTape={resetTape}
              onTagUpdate={onTagUpdate}
              {...this.state}
            />
            <SnapCommentBar />
          </React.Fragment>
          {!isLoading && room.error && (
            <PageEmpty description={<span>Room Not Found</span>} />
          )}
        </PageSpin>
        <CommentBox
          onSubmit={this.onCreateComment}
          visible={commentBoxVisible}
          setVisible={setCommentBox}
        />
        <Modal
          title=""
          visible={delConfirmModalVisible}
          okType="danger"
          okText="Delete"
          confirmLoading={room.del}
          onOk={handleOnOkDelConfirmModal}
          onCancel={hideDelConfirmModal}
        >
          Are you sure you want to delete room <b>{room.description}</b> ?
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      room: state.room,
      record: state.record,
      code: state.code,
      question: state.question,
      hostings: state.login.hostings,
    }),
    dispatch => ({
      actions: {
        getRoomInfo: id => dispatch(getRoomInfo(id)),
        deleteRoomAction: room => dispatch(deleteRoomAction(room)),
        fetchQuestionList: type => dispatch(fetchQuestionList(type)),
        fetchQuestion: id => dispatch(fetchQuestion(id)),
        createRecordData: params => dispatch(createRecordData(params)),
        endRecordData: id => dispatch(endRecordData(id)),
        updateTestEndTimeData: id => dispatch(updateTestEndTimeData(id)),
        setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
        setRoomHost: isHost => dispatch(setRoomHost(isHost)),
        setLatestHistory: data => dispatch(setLatestHistory(data)),
      },
    }),
  )(Page),
);
