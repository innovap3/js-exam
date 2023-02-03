import React from 'react';
import { inspect } from 'util';
import styles from './ConsoleWidget.module.scss';

const isError = e =>
  e &&
  e.stack &&
  e.message &&
  typeof e.stack === 'string' &&
  typeof e.message === 'string';

const Text = ({ text }) => <>{`${text.join(' ')}`}</>;

const ConsoleWidget = ({ data, className }) => (
  <div className={`${styles['console-widget']} ${className || ''}`}>
    {data
      ? data.map((text, index) => (
          <div className={styles.console} key={index}>
            <div className={styles.text}>
              {isError(text) ? inspect(text) : <Text text={text} />}
            </div>
          </div>
        ))
      : []}
  </div>
);

export default ConsoleWidget;
