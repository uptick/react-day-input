import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import Calendar from './calendar.js'

class DayInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleDateChange = ::this.handleDateChange;
    this.handleTextChange = ::this.handleTextChange;
    this.handleBlur = ::this.handleBlur;

    this.showCalendar = ::this.showCalendar;
    this.hideCalendar = ::this.hideCalendar;
    this.previousMonth = ::this.previousMonth;
    this.nextMonth = ::this.nextMonth;

    this.state = {
      ...this.state,

      calendarOpen: false,
      currentMonth: moment().month(),
      currentYear: moment().year(),
    };
    if (this.props.dateValue) {
      this.state.currentMonth = moment(this.props.dateValue, 'x').month();
      this.state.currentYear = moment(this.props.dateValue, 'x').year();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateValue != this.props.dateValue && nextProps.dateValue !== null) {
      this.setState(state => {
        var parsedNextDate = moment(nextProps.dateValue, 'x');
        if (parsedNextDate.isValid()) {
          state.currentMonth = parsedNextDate.month();
          state.currentYear = parsedNextDate.year();
        }
        return state;
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.calendarOpen
      && !nextState.calendarOpen
      && typeof nextProps.onBlur === 'function'
    ) {
      nextProps.onBlur();
    }
  }

  handleDateChange(newValue) {
    this.props.onDateChange(newValue);
  }
  handleTextChange() {
    this.props.onTextChange(this.refs.textValue.value);
  }
  handleBlur(event) {
    var currentTarget = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.hideCalendar();
      }
    }, 0);
  }

  showCalendar() {
    this.setState(state => {
      state.calendarOpen = true;
      return state;
    });
  }
  hideCalendar() {
    this.setState(state => {
      state.calendarOpen = false;
      return state;
    });
  }

  previousMonth() {
    this.setState(state => {
      state.currentMonth--;
      if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
      }
      return state;
    });
  }
  nextMonth() {
    this.setState(state => {
      state.currentMonth++;
      if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
      }
      return state;
    });
  }

  render() {
    return (
      <div
        className={classNames('rendered-react-day-input', this.props.className)}
        style={this.props.style}
        ref="widget"
        tabIndex="-1"
        onBlur={this.handleBlur}
      >
        <input
          ref="textValue"
          type="text"
          value={this.props.textValue}
          className={classNames('form-control', this.props.inputClassName)}
          style={this.props.inputStyle}
          onChange={this.handleTextChange}
          onFocus={this.showCalendar}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
        />
        <Calendar
          year={this.state.currentYear}
          month={this.state.currentMonth}
          value={this.props.dateValue}
          open={this.state.calendarOpen}
          disabled={this.props.disabled}
          rightMounted={this.props.rightMounted}
          weekdayFormat={this.props.weekdayFormat}

          onChange={this.handleDateChange}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
        />
      </div>
    );
  }
}
DayInput.defaultProps = {
  rightMounted: false,
  weekdayFormat: 'ddd',
  className: [],
  style: {},
  inputClassName: [],
  inputStyle: {},
};

export default DayInput
