import React from 'react'
import Moment from 'moment'

import DayInput from './day-input.jsx'

class StrictDayInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      date: this.props.value,
      text: this.props.value !== null ? Moment(this.props.value, 'x').format(this.props.format) : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === null) {
      this.setState({
        date: null,
        text: '',
      });
    }
    else {
      if (this.state.date === null) {
        this.setState({
          date: nextProps.value,
          text: Moment(nextProps.value, 'x').format(nextProps.format),
        });
      }
      else {
        if (this.state.date !== nextProps.value) {
          this.setState({
            date: nextProps.value,
            text: Moment(nextProps.value, 'x').format(nextProps.format),
          });
        }
      }
    }
  }

  handleTextChange(newText) {
    var parsedDate = Moment(newText, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: +parsedDate,
        text: newText,
      }, () => {
        this.props.onChange(this.state.date);
      });
    }
    else {
      this.setState({
        date: null,
        text: newText,
      }, () => {
        this.props.onChange(this.state.date);
      });
    }
  }
  handleDateChange(newDate) {
    this.setState({
      date: newDate,
      text: Moment(newDate, 'x').format(this.props.format),
    });
  }
  handleBlur() {
    var parsedDate = Moment(this.state.text, this.props.format);
    if (parsedDate.isValid()) {
      this.setState({
        date: +parsedDate,
        text: parsedDate.format(this.props.format),
      }, () => {
        this.props.onChange(this.state.date);
      });
    }
    else {
      this.setState({
        date: null,
        text: '',
      }, () => {
        this.props.onChange(this.state.date);
      });
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
      />
    );
  }
}
StrictDayInput.defaultProps = {
  format: 'DD/MM/YYYY',
};

export default StrictDayInput
