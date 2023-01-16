/* eslint-disable guard-for-in */
import { createHarness } from 'tape';

const tryCatchPatch = t => (description, testBlock) => {
  try {
    t.comment(description);
    testBlock(t);
  } catch (e) {
    t.fail(e);
  }
};

const combinePatch = (tape, patches) => (...args) => {
  const [cb] = args.slice(-1);
  if (typeof cb !== 'function') {
    throw new Error('should provide callback');
  }
  tape(...args.slice(0, -1), t => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in patches) {
      t[key] = patches[key](t);
    }
    try {
      cb(t);
    } catch (e) {
      t.fail(e);
    }
  });
};

const getPatchedTape = onUpdate => {
  const harness = createHarness();
  const stream = harness.createStream({ objectMode: true });
  stream.on('data', onUpdate);
  return combinePatch(harness, {
    subtest: tryCatchPatch,
    should: tryCatchPatch,
  });
};

export default getPatchedTape;
