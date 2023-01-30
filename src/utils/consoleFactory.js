const createWrappedConsole = (console, addConsole) =>
  Object.keys(console).reduce((cal, key) => {
    const newCal = { ...cal };
    newCal[key] = (...args) => {
      addConsole([...args]);
    };
    return newCal;
  }, {});

export default createWrappedConsole;
