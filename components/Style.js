import React from 'react';
import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

const Style = Component =>
  class StyleWrapper extends React.PureComponent {
    static propTypes = {
      stylesheet: PropTypes.string.isRequired,
    };

    static rewind() {
      const stylesheet = Component.rewind();
      return (
        <style
          id="stylesCollector"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: stylesheet }}
        />
      );
    }

    render() {
      return <Component {...this.props} />;
    }
  };

const StyleSideEffect = withSideEffect(
  propsList => {
    const styles = {};

    propsList.forEach(props => {
      styles[props.stylesheet] = true;
    });

    return Object.keys(styles).join('\n');
  },
  css => {
    /* global document */
    let style = document.getElementById('stylesCollector');
    if (!style) {
      style = document.createElement('style');
      style.id = 'stylesCollector';
      document.head.appendChild(style);
    }

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.innerHTML = '';
      style.appendChild(document.createTextNode(css));
    }
  },
  s => s,
)(() => null);

const StyleExport = Style(StyleSideEffect);
StyleExport.rewind = StyleExport.rewind;

export { StyleExport as Helmet };
export default StyleExport;
