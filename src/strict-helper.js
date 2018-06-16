import React from 'react'
import Moment from 'moment'

import DayInput from './day-input.js'

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

  updateValue = (wasBlur) => {
    if (this.state.date !== null) {
      this.props.onChange(this.state.date, !!wasBlur);
    }
    else {
      this.props.onChange(this.state.text === '' ? null : undefined, !!wasBlur)
    }
  }

  handleTextChange = (newText) => {
    var parsedDate = Moment(newText, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: parsedDate.format('x'),
        text: newText,
      }, () => {
        this.updateValue(false)
      });
    }
    else {
      this.setState({
        date: null,
        text: newText,
      }, () => {
        this.updateValue(false)
      });
    }
  }
  handleDateChange = (newDate) => {
    this.setState({
      date: newDate,
      text: Moment(newDate, 'x').format(this.props.format),
    }, () => {
      this.updateValue(false)
    });
  }
  handleBlur = () => {
    var parsedDate = Moment(this.state.text, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: parsedDate.format('x'),
        text: parsedDate.format(this.props.format),
      }, () => {
        this.updateValue(true)
      });
    }
    else {
      this.setState({
        date: null,
        text: '',
      }, () => {
        this.updateValue(true)
      });
    }
  }

  render() {
    return (
      <DayInput
        {...this.props}
        textValue={this.state.text}
        dateValue={this.state.date}
        onTextChange={this.handleTextChange}
        onDateChange={this.handleDateChange}
        onBlur={this.handleBlur}
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
