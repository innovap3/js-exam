import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import sinon from 'sinon';
import vm from 'vm';
import spy from './spy';
import getPatchedTape from './tape';

const runCode = ({ code, wrappedConsole = console, onTapeUpdate }) => {
  let script = null;
  let context = null;
  const clock = sinon.useFakeTimers();
  let test = null;
  if (onTapeUpdate) {
    test = getPatchedTape(onTapeUpdate);
  }
  // should hijack setTimeout before pass to sandbox
  const sandbox = {
    setTimeout: window.setTimeout, // need to be passed also...
    console: wrappedConsole,
    sinon,
    describe: test,
    test,
    clock,
    spy,
    React,
    ReactDOM,
    root: document.getElementById('result'),
    answer: document.getElementById('answer'),
    renderToString,
  };
  try {
    script = new vm.Script(code);
    // eslint-disable-next-line
    context = new vm.createContext(sandbox);
    script.runInContext(context);
  } catch (e) {
    script = new vm.Script('');
    // eslint-disable-next-line
    context = new vm.createContext(sandbox);
    script.runInContext(context);
    wrappedConsole.log(e);
  }
  clock.restore();
};

// const debouncedRunCode = _.debounce(runCode, 200);

export default runCode;
