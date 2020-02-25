export const queryRecordWithHistory = `
  query  GetRecord(
    $id: ID!
    $limit: Int
    $nextToken: String
  ) {
    getRecord(id: $id) {
      id
      subjectId
      comment(limit: $limit nextToken: $nextToken) {
        items {
          author
          time
          quality
          hint
          completeness
          content
        }
        nextToken
      }
      history(limit: $limit nextToken: $nextToken) {
        items {
          time
          code
          snapComments(limit: $limit nextToken: $nextToken) {
            items {
              time
              author
              content
            }
          }
        }
        nextToken
      }
      ques {
        type
        content
        test
        name
      }
    }
  }
`;
