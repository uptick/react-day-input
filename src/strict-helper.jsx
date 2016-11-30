import React from 'react'
import Moment from 'moment'

import DayInput from './day-input.jsx'

class StrictDayInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      text: '',
    };
    if (typeof this.props.value === 'undefined') {
      this.state.date = null;
    }
    else {
      this.state.date = this.props.value;
      if (this.state.date !== null) {
        this.state.text = Moment(this.props.value, 'x').format(this.props.format);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (typeof nextProps.value === 'undefined') {
        this.setState({
          date: null,
        });
      }
      else {
        if (nextProps.value === null) {
          this.setState({
            date: null,
            text: '',
          });
        }
        else {
          if (nextProps.value !== this.state.date) {
            this.setState({
              date: nextProps.value,
              text: Moment(nextProps.value, 'x').format(this.props.format),
            });
          }
        }
      }
    }
  }

  updateValue() {
    if (this.state.date !== null) {
      this.props.onChange(this.state.date);
    }
    else {
      this.props.onChange(this.state.text === '' ? null : undefined)
    }
  }

  handleTextChange(newText) {
    var parsedDate = Moment(newText, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: parsedDate.format('x'),
        text: newText,
      }, this.updateValue.bind(this));
    }
    else {
      this.setState({
        date: null,
        text: newText,
      }, this.updateValue.bind(this));
    }
  }
  handleDateChange(newDate) {
    this.setState({
      date: newDate,
      text: Moment(newDate, 'x').format(this.props.format),
    }, this.updateValue.bind(this));
  }
  handleBlur() {
    var parsedDate = Moment(this.state.text, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: parsedDate.format('x'),
        text: parsedDate.format(this.props.format),
      }, this.updateValue.bind(this));
    }
    else {
      this.setState({
        date: null,
        text: '',
      }, this.updateValue.bind(this));
    }
  }

  render() {
    return (
      <DayInput
        {...this.props}
        textValue={this.state.text}
        dateValue={this.state.date}
        onTextChange={this.handleTextChange.bind(this)}
        onDateChange={this.handleDateChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        rightMounted={this.props.rightMounted}
      />
    );
  }
}
StrictDayInput.defaultProps = {
  format: 'DD/MM/YYYY',
  rightMounted: false,
};

export default StrictDayInput
