import React from 'react';
import cx from 'classnames';
import { arrayOf, shape, instanceOf } from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Style } from '../';
import apps from '../../apps';
import { classNames as cs, stylesheet } from './ResultsPage.scss';
import ExposomicsLocationManager from '../../apps/airQuality/server/ExposomicsLocationManager';

export default class ResultsPage extends React.PureComponent {
  static propTypes = {
    places: arrayOf(
      shape({
        location: shape(),
        fromDate: instanceOf(Date),
        toDate: instanceOf(Date),
      }),
    ).isRequired,
    results: shape().isRequired,
  };

  render() {
    const { places, results } = this.props;
    const locationManager = new ExposomicsLocationManager(places);
    // console.log(places)
    const placeTimeSummary = {
      places: locationManager.getCountyList(),
      dates: {
        startDate: locationManager.getStartDate().format('MMM YYYY'),
        endDate: locationManager.getEndDate().format('MMM YYYY'),
      },
    };

    return (
      <div className={cs.ResultsPage}>
        <Style stylesheet={stylesheet} />

        <Tabs>
          <div className={cs.outerHeader}>
            <div className="row">
              <div className="col-xs-6">
                <div className="row">
                  <div className="col-xs-1" />
                  <div className="col-xs-5">
                    <div className="container">
                      <p className={cs.title}>
                        Daily exposure for your places of residence:
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-1" />
                  <div className="col-xs-5">
                    <div className="container">
                      <TabList>
                        {apps.map(app => (
                          <Tab key={app.id} id={app.id} panelId={app.id}>
                            {app.name}
                          </Tab>
                        ))}
                      </TabList>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="row end-xs">
                  <div className="col-xs-6">
                    <div className={cs.socialIcons}>
                      <ul className={cs.linksInline}>
                        <li>
                          <p className={cs.iconsLabel}>SHARE</p>
                        </li>

                        <li>
                          <a
                            className="nav-link"
                            href="https://www.facebook.com/"
                          >
                            <i className="fa fa-facebook fa-2x icon-white" />
                          </a>
                        </li>

                        <li>
                          <a className="nav-link" href="https://twitter.com/">
                            <i className="fa fa-twitter fa-2x icon-white" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xs-1" />
                </div>
                <div className="row" />
                <div className="row end-xs">
                  <div className={cs.oneLinerResults}>
                    {/* <span>In San Francisco from Jan 1990 to Dec 2016</span> */}
                    <span>
                      in
                      <code>
                        {` ${placeTimeSummary.places.join(',')} `}
                        {/* {JSON.stringify(placeTimeSummary.places, null, 2)} */}
                      </code>
                      from
                      <code>{` ${placeTimeSummary.dates.startDate} `}</code>
                      to
                      <code>{` ${placeTimeSummary.dates.endDate}`}</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(cs.content, cs.tabResults)}>
            <div className={cx('col-xs-12', cs.reactTabs)}>
              <div className="row center-xs">
                <div className={cx(cs.heatmap, 'col-xs-12')}>
                  {apps.map(app => (
                    <TabPanel key={app.id} id={app.id} tabId={app.id}>
                      <app.View data={results[app.id]} />
                    </TabPanel>
                  ))}
                </div>
              </div>
            </div>
            <div className="row center-xs">
              <div className="col-xs-11" />
            </div>
          </div>
          <div className={cs.content}>
            <div className="row">
              <div className="col-xs-6">
                <ul className={cs.legend}>
                  <div className="row">
                    <li>
                      <div className={cx('col-xs-1', cs.zero)}>
                        <span />
                        <br />
                        <p>Good</p>
                      </div>
                    </li>
                    <li>
                      <div className={cx('col-xs-1', cs.one)}>
                        <span />
                        <br />
                        <p>Moderate</p>
                      </div>
                    </li>
                    <li>
                      <div className={cx('col-xs-1', cs.two)}>
                        <span />
                        <br />
                        <p>
                          {' '}
                          Unhealthy <br />for <br />sensitive <br />groups
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className={cx('col-xs-1', cs.three)}>
                        <span />
                        <br />

                        <p> Unhealthy</p>
                      </div>
                    </li>
                    <li>
                      <div className={cx('col-xs-1', cs.four)}>
                        <span />
                        <br />

                        <p>
                          {' '}
                          Very <br />unhealthy
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className={cx('col-xs-1', cs.five)}>
                        <span />
                        <br />

                        <p> Hazardous</p>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
              <div className={cx('col-xs-6', cs.moreInfoContent)}>
                <div className="row">
                  <p className={cs.footerTitle}>
                    If you want to know more about the Air Quality Index and how
                    <br />it affects your health check out the following links:
                  </p>
                </div>
                <ul className={cs.moreInfo}>
                  <div className="row">
                    <div className="col-xs-6">
                      <li>
                        <a href="/">EPA&apos;s Air Quality Brochure</a>
                        <br />
                        <span>
                          A comprehensive guide to everything AQI (20 min read)
                        </span>
                      </li>
                    </div>

                    <div className="col-xs-6">
                      <li>
                        <a href="/">How AQI is Calculated</a>
                        <br />
                        <span>5 min read</span>
                      </li>
                    </div>
                  </div>
                </ul>
                <div className="row">
                  <p className={cs.tryAgain}>
                    <a href="/">
                      Try again{' '}
                      <i className="fa fa-repeat" aria-hidden="true" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}
