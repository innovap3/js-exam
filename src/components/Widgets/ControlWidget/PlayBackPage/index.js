import React from 'react';
import PropTypes from 'prop-types';
import PageControlBar from 'components/PageControlBar';
import RecordSelector from 'components/Selectors/RecordSelector';
import { Icon, Input } from 'antd';
import { formatTime } from 'utils/format';
import styles from './ControlWidget.module.scss';

const InputGroup = Input.Group;

const ControlWidget = ({
  recordIndex,
  onChangeRecord,
  recordList,
  candidate,
  testDate,
}) => (
  <PageControlBar>
    <div className={styles.info}>
      <span className={styles.icon} id={styles.date}>
        <Icon className={styles.icon} type="calendar" />
        {formatTime(testDate)}
      </span>
      <span className={styles.icon} id={styles.name}>
        <Icon className={styles.icon} type="user" />
        {candidate}
      </span>
    </div>
    <div>
      <InputGroup compact style={{ width: 'auto', display: 'inline-block' }}>
        <RecordSelector
          onChange={onChangeRecord}
          recordIndex={recordIndex}
          list={recordList}
        />
      </InputGroup>
    </div>
  </PageControlBar>
);

ControlWidget.propTypes = {
  testDate: PropTypes.string,
  candidate: PropTypes.string,
  recordIndex: PropTypes.number,
  onChangeRecord: PropTypes.func,
  recordList: PropTypes.array,
  onClickSummary: PropTypes.func,
  summaryDisabled: PropTypes.bool,
};

export default ControlWidget;
