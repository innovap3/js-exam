export const checkAllPass = tape => {
  const size = tape.length;
  if (!size) return false;

  for (let i = 0; i < size; i++) {
    if (typeof tape[i] === 'object' && 'ok' in tape[i] && !tape[i].ok) {
      return false;
    }
  }
  return true;
};
