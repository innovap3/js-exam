const loopControl = babel => {
  const MAX_LOOP_COUNT = 100000;
  const t = babel.types;
  return {
    visitor: {
      WhileStatement: path => {
        const variableName = path.scope.generateUidIdentifier('counter');
        const declaration = t.declareVariable(variableName);
        path.scope.parent.push(declaration);
        const definition = t.assignmentExpression(
          '=',
          variableName,
          t.NumericLiteral(0),
        );
        path.insertBefore(t.expressionStatement(definition));
        path
          .get('body')
          .pushContainer(
            'body',
            t.assignmentExpression(
              '=',
              variableName,
              t.binaryExpression('+', variableName, t.NumericLiteral(1)),
            ),
          );
        path
          .get('body')
          .pushContainer(
            'body',
            t.ifStatement(
              t.binaryExpression(
                '>',
                variableName,
                t.NumericLiteral(MAX_LOOP_COUNT),
              ),
              t.breakStatement(),
              null,
            ),
          );
      },
    },
  };
};

export default loopControl;
