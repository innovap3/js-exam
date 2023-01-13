import sinon from 'sinon';
import vm from 'vm';
import runCode from './runCode';

describe('runCode spec', () => {
  const testCode =
    '"use strict";' +
    '/**\n' +
    " * Implement the function 'sequential'\n" +
    ' * to execute async functions in sequence.\n' +
    ' *\n' +
    " * 'sequential' takes an array of async functions as parameter,\n" +
    ' * and execute each of them after previous one has done.\n' +
    ' */' +
    ' \n' +
    '/**\n' +
    ' * Implement function body\n' +
    ' */\n' +
    'function sequential() {\n' +
    '  var tasks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n' +
    '}';

  const testLoopCode =
    '"use strict";' +
    ' \n' +
    '/**\n' +
    ' * Implement function body\n' +
    ' */\n' +
    'function loop(n) {\n' +
    '  for (let i = 0; i < n; i++) { \n' +
    '  }\n' +
    '}';

  const testErrorCode =
    '"use strict";' +
    ' \n' +
    '/**\n' +
    ' * Implement function body\n' +
    ' */\n' +
    'loop(1);\n' +
    'function loop(n) {\n' +
    '  let k = 1;\n' +
    '  while (let i = 0; i < 10001; i++) { \n' +
    '    k = k + i;\n' +
    '  }\n' +
    '}';

  it('should wrap code correctly', () => {
    expect(testCode).toMatchSnapshot();
  });

  it('should wrap loop code correctly', () => {
    expect(testLoopCode).toMatchSnapshot();
  });

  it('should runCode correctly', () => {
    const mockLog = jest.fn();
    const runInContext = jest.fn();
    const vmMock = sinon.mock(vm);
    vmMock
      .expects('Script')
      .once()
      .returns({ runInContext });
    runCode({ code: testCode, wrappedConsole: { log: mockLog } });
    expect(mockLog).not.toBeCalled();
    vmMock.verify();
    expect(runInContext).toBeCalled();
    vmMock.restore();
  });

  it('should run code with error correctly', () => {
    const mockLog = jest.fn();
    runCode({ code: testErrorCode, wrappedConsole: { log: mockLog } });
    expect(mockLog).toBeCalled();
  });
});
