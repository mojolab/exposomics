import React from 'react';
import { shape, arrayOf, any, string } from 'prop-types';
import CalendarHeatmap from './components/Heatmap';

const Tooltip = entry => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: 5,
      border: 'solid #808080 1px',
      padding: 5,
    }}
  >
    <div>
      <strong>{entry.date.substring(0, 10)}</strong>
    </div>
    <div>
      Value: <strong>{entry.value}</strong>
    </div>
  </div>
);

const extractDate = value => new Date(value.date);
const mapValueToColor = ({ value }) => {
  if (value === -1) {
    return '#ccc';
  } else if (value === -2) {
    return '#aaa';
  } else if (value < 50) {
    return '#8cc665';
  } else if (value < 100) {
    return '#ffff00';
  } else if (value < 150) {
    return '#ffa340';
  }
  return '#ff0000';
};

export default class View extends React.PureComponent {
  static propTypes = {
    data: shape({
      startDate: string,
      endDate: string,
      dataList: arrayOf(any),
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    const dataList = data.dataList;
    const endDate = data.endDate;
    const startDate = data.startDate;
    // console.log(dataList);
    return (
      <div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={dataList}
          extractDate={extractDate}
          mapValueToColor={mapValueToColor}
          renderTooltip={Tooltip}
        />
      </div>
    );
  }
}
