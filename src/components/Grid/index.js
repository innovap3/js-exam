import React from 'react';
import PropTypes from 'prop-types';
import Border from './Border';
import styles from './Grid.module.scss';

export default class Grid extends React.Component {
  static propTypes = {
    layout: PropTypes.array,
    totalWidth: PropTypes.string,
    totalHeight: PropTypes.string,
    autoResize: PropTypes.bool,
    borderSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const { layout, borderSize } = this.props;

    this.ref = React.createRef();
    this.borderSize = borderSize || 5;
    this.layout = layout;
    this.columns = layout
      .reduce((cal, item) => {
        const newCal = [...cal];
        const { x } = item;
        newCal[x] = [...(newCal[x] || []), item];
        return newCal;
      }, [])
      .map(column => column || [])
      .map(column => column.sort((a, b) => a.y - b.y));

    this.state = {
      data: this.columns.map(column =>
        column.map(item => ({
          width: item.width,
          height: item.height,
        })),
      ),
    };
  }

  componentDidMount() {
    const { autoResize } = this.props;
    if (autoResize) {
      window.addEventListener('resize', this.onResize);
      window.dispatchEvent(new Event('resize'));
    }
  }

  componentWillUnmount() {
    const { autoResize } = this.props;
    if (autoResize) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize = () => {
    this.updateFullState();
  };

  updateFullState = () => {
    const {
      clientWidth: totalWidth,
      clientHeight: totalHeight,
    } = this.ref.current;
    const { data } = this.state;
    const newData = data.map((column, indexOfColumn) =>
      column.map((item, indexOfItem) => {
        const sumOfWidth = data
          .slice(0, -1)
          .map(c => c[0] || { width: 0 })
          .map(c => c.width)
          .reduce((cal, val) => cal + val, 0);
        const sumOfHeight = column
          .slice(0, -1)
          .map(c => c.height)
          .reduce((cal, val) => cal + val, 0);
        return {
          width:
            indexOfColumn === data.length - 1
              ? totalWidth - sumOfWidth
              : item.width,
          height:
            indexOfItem === column.length - 1
              ? totalHeight - sumOfHeight
              : item.height,
        };
      }),
    );
    this.setState({ data: newData });
  };

  updateGridState = ({ indexOfColumn, indexOfItem, width, height }) => {
    const {
      clientWidth: totalWidth,
      clientHeight: totalHeight,
    } = this.ref.current;
    const { data } = this.state;
    const newData = [...data];
    if (width !== newData[indexOfColumn][0].width) {
      newData[indexOfColumn] = newData[indexOfColumn].map(item => ({
        ...item,
        width,
      }));
      newData[newData.length - 1] = newData[newData.length - 1].map(item => ({
        ...item,
        width: totalWidth - width,
      }));
    } else if (
      height !== undefined &&
      indexOfColumn !== undefined &&
      indexOfItem !== undefined
    ) {
      newData[indexOfColumn][indexOfItem].height = height;
      newData[indexOfColumn][newData[indexOfColumn].length - 1].height =
        totalHeight - newData[indexOfColumn][indexOfItem].height;
    }
    this.setState({ data: newData });
  };

  render() {
    const { columns } = this;
    const { children, totalWidth, totalHeight } = this.props;
    const { data } = this.state;
    return (
      <div
        className={styles.grid}
        style={{
          width: totalWidth,
          height: totalHeight,
        }}
        ref={this.ref}
      >
        {columns.map((column, indexOfColumn) => {
          const maxWidth = Math.max(
            ...column.map(
              item =>
                (item.width > item.maxWidth ? item.width : item.maxWidth) || 0,
            ),
          );
          const minWidth = Math.min(
            ...column.map(item => item.minWidth || 999999),
          );
          const isDisabledForWidth = indexOfColumn === columns.length - 1;
          const finalWidth = isDisabledForWidth
            ? data[indexOfColumn][0].width
            : data[indexOfColumn][0].width + this.borderSize;
          return (
            <Border
              allowWidth
              borderSize={this.borderSize}
              width={finalWidth}
              maxWidth={maxWidth}
              minWidth={minWidth}
              onUpdate={({ width: w }) =>
                this.updateGridState({
                  indexOfColumn,
                  width: w,
                })
              }
              disabled={indexOfColumn === columns.length - 1}
              key={JSON.stringify(column)}
            >
              {column.map((item, indexOfItem) => {
                const itemInData = data[indexOfColumn][indexOfItem];
                const itemInColumns = columns[indexOfColumn][indexOfItem];
                const isDisabled =
                  indexOfItem === column.length - 1 || itemInColumns.static;
                return (
                  <Border
                    allowHeight
                    borderSize={this.borderSize}
                    width={itemInData.width}
                    height={itemInData.height}
                    maxHeight={itemInColumns.maxHeight}
                    minHeight={itemInColumns.minHeight}
                    onUpdate={({ width: w, height: h }) =>
                      this.updateGridState({
                        indexOfItem,
                        indexOfColumn,
                        width: w,
                        height: h,
                      })
                    }
                    disabled={isDisabled}
                    key={JSON.stringify(item)}
                  >
                    {children.find(({ key }) => key === item.key)}
                  </Border>
                );
              })}
            </Border>
          );
        })}
      </div>
    );
  }
}
