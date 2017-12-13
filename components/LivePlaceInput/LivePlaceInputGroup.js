import React from 'react';
import { arrayOf, shape, instanceOf, func } from 'prop-types';
// import cx from 'classnames';
import { Style } from '../';
import LivePlaceInput from './LivePlaceInput';
import { classNames as cs, stylesheet } from './LivePlaceInputGroup.scss';

const EMPTY_PLACE = { location: {}, fromDate: new Date(), toDate: new Date() };

export default class LivePlaceInputGroup extends React.PureComponent {
  static propTypes = {
    places: arrayOf(
      shape({
        location: shape(),
        fromDate: instanceOf(Date),
        toDate: instanceOf(Date),
      }),
    ),
    onChange: func,
  };

  static defaultProps = {
    places: [],
    onChange() {},
  };

  changePlace(idx, value) {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    if (idx === 0 && !newPlaces.length) {
      newPlaces.push({ ...EMPTY_PLACE });
    }

    if (newPlaces[idx]) {
      newPlaces[idx] = value;
      onChange(newPlaces);
    }
  }

  addPlace() {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    if (!newPlaces.length) {
      newPlaces.push({ ...EMPTY_PLACE });
    }

    newPlaces.push({ ...EMPTY_PLACE });

    onChange(newPlaces);
  }

  removePlace(idx) {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    newPlaces.splice(idx, 1);

    onChange(newPlaces);
  }

  render() {
    let { places } = this.props;
    if (!places.length) {
      places = [{ ...EMPTY_PLACE }];
    }

    return (
      <div className={cs.LivePlaceInputGroup}>
        <Style stylesheet={stylesheet} />

        {places.map((place, idx) => (
          <LivePlaceInput
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            value={place}
            canRemove={places.length > 1 && idx < places.length - 1}
            onChange={value => this.changePlace(idx, value)}
            onRemove={() => this.removePlace(idx)}
          />
        ))}

        <br />
        <div className="row center-xs">
          <div className="col-xs-1" />
          <div className="col-xs-11">
            <button className={cs.addButton} onClick={() => this.addPlace()}>
              +
            </button>
            <span className={cs.addItems}>
              {' '}
              Add more zipcodes or cities where you lived and select month &
              year{' '}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
