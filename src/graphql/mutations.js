/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      subjectId
      description
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      createTime
      password
      users {
        items {
          id
          name
        }
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      subjectId
      description
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      createTime
      password
      users {
        items {
          id
          name
        }
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      subjectId
      description
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      createTime
      password
      users {
        items {
          id
          name
        }
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const createJeUser = /* GraphQL */ `
  mutation CreateJeUser(
    $input: CreateJEUserInput!
    $condition: ModelJEUserConditionInput
  ) {
    createJEUser(input: $input, condition: $condition) {
      id
      name
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      hostTest {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
    }
  }
`;
export const updateJeUser = /* GraphQL */ `
  mutation UpdateJeUser(
    $input: UpdateJEUserInput!
    $condition: ModelJEUserConditionInput
  ) {
    updateJEUser(input: $input, condition: $condition) {
      id
      name
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      hostTest {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
    }
  }
`;
export const deleteJeUser = /* GraphQL */ `
  mutation DeleteJeUser(
    $input: DeleteJEUserInput!
    $condition: ModelJEUserConditionInput
  ) {
    deleteJEUser(input: $input, condition: $condition) {
      id
      name
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      hostTest {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
    }
  }
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      description
      users {
        items {
          id
          name
        }
        nextToken
      }
      questionSet {
        items {
          id
          name
          description
          tags
        }
        nextToken
      }
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      description
      users {
        items {
          id
          name
        }
        nextToken
      }
      questionSet {
        items {
          id
          name
          description
          tags
        }
        nextToken
      }
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      description
      users {
        items {
          id
          name
        }
        nextToken
      }
      questionSet {
        items {
          id
          name
          description
          tags
        }
        nextToken
      }
    }
  }
`;
export const createTest = /* GraphQL */ `
  mutation CreateTest(
    $input: CreateTestInput!
    $condition: ModelTestConditionInput
  ) {
    createTest(input: $input, condition: $condition) {
      id
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      subjectId
      users {
        items {
          id
          name
        }
        nextToken
      }
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      description
      timeBegin
      timeEnd
      records {
        items {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        nextToken
      }
      status
      tags
    }
  }
`;
export const updateTest = /* GraphQL */ `
  mutation UpdateTest(
    $input: UpdateTestInput!
    $condition: ModelTestConditionInput
  ) {
    updateTest(input: $input, condition: $condition) {
      id
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      subjectId
      users {
        items {
          id
          name
        }
        nextToken
      }
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      description
      timeBegin
      timeEnd
      records {
        items {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        nextToken
      }
      status
      tags
    }
  }
`;
export const deleteTest = /* GraphQL */ `
  mutation DeleteTest(
    $input: DeleteTestInput!
    $condition: ModelTestConditionInput
  ) {
    deleteTest(input: $input, condition: $condition) {
      id
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      subjectId
      users {
        items {
          id
          name
        }
        nextToken
      }
      host {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      description
      timeBegin
      timeEnd
      records {
        items {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        nextToken
      }
      status
      tags
    }
  }
`;
export const createRecord = /* GraphQL */ `
  mutation CreateRecord(
    $input: CreateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    createRecord(input: $input, condition: $condition) {
      id
      subjectId
      syncCode
      interviewer {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      timeBegin
      timeEnd
      status
      comment {
        items {
          author
          time
          content
        }
        nextToken
      }
      history {
        items {
          id
          time
          code
        }
        nextToken
      }
      ques {
        type
        name
        content
        test
      }
      question {
        id
        type
        name
        content
        test
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
    }
  }
`;
export const updateRecord = /* GraphQL */ `
  mutation UpdateRecord(
    $input: UpdateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    updateRecord(input: $input, condition: $condition) {
      id
      subjectId
      syncCode
      interviewer {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      timeBegin
      timeEnd
      status
      comment {
        items {
          author
          time
          content
        }
        nextToken
      }
      history {
        items {
          id
          time
          code
        }
        nextToken
      }
      ques {
        type
        name
        content
        test
      }
      question {
        id
        type
        name
        content
        test
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
    }
  }
`;
export const deleteRecord = /* GraphQL */ `
  mutation DeleteRecord(
    $input: DeleteRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    deleteRecord(input: $input, condition: $condition) {
      id
      subjectId
      syncCode
      interviewer {
        id
        name
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        hostTest {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
      }
      timeBegin
      timeEnd
      status
      comment {
        items {
          author
          time
          content
        }
        nextToken
      }
      history {
        items {
          id
          time
          code
        }
        nextToken
      }
      ques {
        type
        name
        content
        test
      }
      question {
        id
        type
        name
        content
        test
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
      test {
        id
        room {
          id
          subjectId
          description
          createTime
          password
        }
        team {
          id
          name
          description
        }
        subjectId
        users {
          nextToken
        }
        host {
          id
          name
        }
        description
        timeBegin
        timeEnd
        records {
          nextToken
        }
        status
        tags
      }
      room {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        host {
          id
          name
        }
        createTime
        password
        users {
          nextToken
        }
        currentRecord {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      author
      time
      quality
      hint
      completeness
      content
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      author
      time
      content
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      author
      time
      content
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const createHistory = /* GraphQL */ `
  mutation CreateHistory(
    $input: CreateHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    createHistory(input: $input, condition: $condition) {
      id
      time
      code
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
      snapComments {
        items {
          id
          time
          author
          content
        }
        nextToken
      }
    }
  }
`;
export const updateHistory = /* GraphQL */ `
  mutation UpdateHistory(
    $input: UpdateHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    updateHistory(input: $input, condition: $condition) {
      id
      time
      code
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
      snapComments {
        items {
          id
          time
          author
          content
        }
        nextToken
      }
    }
  }
`;
export const deleteHistory = /* GraphQL */ `
  mutation DeleteHistory(
    $input: DeleteHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    deleteHistory(input: $input, condition: $condition) {
      id
      time
      code
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
      snapComments {
        items {
          id
          time
          author
          content
        }
        nextToken
      }
    }
  }
`;
export const createSnapComment = /* GraphQL */ `
  mutation CreateSnapComment(
    $input: CreateSnapCommentInput!
    $condition: ModelSnapCommentConditionInput
  ) {
    createSnapComment(input: $input, condition: $condition) {
      id
      time
      author
      content
      history {
        id
        time
        code
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        snapComments {
          nextToken
        }
      }
    }
  }
`;
export const updateSnapComment = /* GraphQL */ `
  mutation UpdateSnapComment(
    $input: UpdateSnapCommentInput!
    $condition: ModelSnapCommentConditionInput
  ) {
    updateSnapComment(input: $input, condition: $condition) {
      id
      time
      author
      content
      history {
        id
        time
        code
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        snapComments {
          nextToken
        }
      }
    }
  }
`;
export const deleteSnapComment = /* GraphQL */ `
  mutation DeleteSnapComment(
    $input: DeleteSnapCommentInput!
    $condition: ModelSnapCommentConditionInput
  ) {
    deleteSnapComment(input: $input, condition: $condition) {
      id
      time
      author
      content
      history {
        id
        time
        code
        record {
          id
          subjectId
          syncCode
          timeBegin
          timeEnd
          status
        }
        snapComments {
          nextToken
        }
      }
    }
  }
`;
export const createQuestionSnapshot = /* GraphQL */ `
  mutation CreateQuestionSnapshot(
    $input: CreateQuestionSnapshotInput!
    $condition: ModelQuestionSnapshotConditionInput
  ) {
    createQuestionSnapshot(input: $input, condition: $condition) {
      id
      type
      name
      content
      test
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const updateQuestionSnapshot = /* GraphQL */ `
  mutation UpdateQuestionSnapshot(
    $input: UpdateQuestionSnapshotInput!
    $condition: ModelQuestionSnapshotConditionInput
  ) {
    updateQuestionSnapshot(input: $input, condition: $condition) {
      id
      type
      name
      content
      test
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const deleteQuestionSnapshot = /* GraphQL */ `
  mutation DeleteQuestionSnapshot(
    $input: DeleteQuestionSnapshotInput!
    $condition: ModelQuestionSnapshotConditionInput
  ) {
    deleteQuestionSnapshot(input: $input, condition: $condition) {
      id
      type
      name
      content
      test
      record {
        id
        subjectId
        syncCode
        interviewer {
          id
          name
        }
        timeBegin
        timeEnd
        status
        comment {
          nextToken
        }
        history {
          nextToken
        }
        ques {
          type
          name
          content
          test
        }
        question {
          id
          type
          name
          content
          test
        }
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        room {
          id
          subjectId
          description
          createTime
          password
        }
      }
    }
  }
`;
export const createQuestionSet = /* GraphQL */ `
  mutation CreateQuestionSet(
    $input: CreateQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    createQuestionSet(input: $input, condition: $condition) {
      id
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      questions {
        items {
          id
          type
          name
          content
          test
          tags
        }
        nextToken
      }
      name
      description
      tags
    }
  }
`;
export const updateQuestionSet = /* GraphQL */ `
  mutation UpdateQuestionSet(
    $input: UpdateQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    updateQuestionSet(input: $input, condition: $condition) {
      id
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      questions {
        items {
          id
          type
          name
          content
          test
          tags
        }
        nextToken
      }
      name
      description
      tags
    }
  }
`;
export const deleteQuestionSet = /* GraphQL */ `
  mutation DeleteQuestionSet(
    $input: DeleteQuestionSetInput!
    $condition: ModelQuestionSetConditionInput
  ) {
    deleteQuestionSet(input: $input, condition: $condition) {
      id
      team {
        id
        name
        description
        users {
          nextToken
        }
        questionSet {
          nextToken
        }
      }
      questions {
        items {
          id
          type
          name
          content
          test
          tags
        }
        nextToken
      }
      name
      description
      tags
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      type
      questionSet {
        id
        team {
          id
          name
          description
        }
        questions {
          nextToken
        }
        name
        description
        tags
      }
      name
      content
      test
      tags
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      type
      questionSet {
        id
        team {
          id
          name
          description
        }
        questions {
          nextToken
        }
        name
        description
        tags
      }
      name
      content
      test
      tags
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      type
      questionSet {
        id
        team {
          id
          name
          description
        }
        questions {
          nextToken
        }
        name
        description
        tags
      }
      name
      content
      test
      tags
    }
  }
`;
