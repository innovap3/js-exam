import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import * as subscriptions from 'graphql/subscriptions';

const RECORD_STATUS = {
  inprogress: 'inprogress',
  closed: 'closed',
};

const createRecord = async ({ recordTestId, subjectId, roomId, ques }) => {
  const params = {
    input: {
      recordTestId,
      subjectId,
      syncCode: ques.content,
      status: RECORD_STATUS.inprogress,
      timeBegin: new Date(),
      ques,
      recordRoomId: roomId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params),
  );
  return data.createRecord;
};

const updateRecord = async (id, newCode) => {
  const params = {
    input: {
      id,
      syncCode: newCode,
      timeEnd: new Date(),
    },
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params),
  );
  return result;
};

const endRecord = async id => {
  const params = {
    input: {
      id,
      status: RECORD_STATUS.closed,
      timeEnd: new Date(),
    },
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params),
  );
  return result;
};

const subscribeOnCreateRecord = callback =>
  API.graphql(graphqlOperation(subscriptions.onCreateRecord)).subscribe({
    next: ({ value }) => {
      callback(value.data.onCreateRecord);
    },
    error: error => {
      console.error(error);
    },
  });

const subscribeOnUpdateRecordByRecordId = (id, callback) =>
  API.graphql(
    graphqlOperation(subscriptions.onUpdateRecordByRecordId, { id }),
  ).subscribe({
    next: ({ value }) => {
      callback(value.data.onUpdateRecordByRecordId);
    },
    error: error => {
      console.error(error);
    },
  });

export {
  RECORD_STATUS,
  createRecord,
  updateRecord,
  endRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId,
};
