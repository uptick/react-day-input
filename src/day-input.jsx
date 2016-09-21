import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

class CalendarDay extends React.Component {
  handleClick() {
    this.props.setDateValue(this.props.day.format('x'));
  }

  render() {
    return (
      <div
        className={classNames('day', {
          'in-month': this.props.inMonth,
          'selected': this.props.selected,
        })}
        onClick={this.handleClick.bind(this)}
      >
        <span className="number">{this.props.day.format('D')}</span>
      </div>
    );
  }
}

class DayInput extends React.Component {
  constructor(props) {
    super(props);

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

  componentDidMount() {
    document.addEventListener('click', this.handlePageClick.bind(this));
    this.refs.textValue.addEventListener('blur', this.handleBlur.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handlePageClick.bind(this));
    this.refs.textValue.removeEventListener('blur', this.handleBlur.bind(this));
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

  handlePageClick() {
    if (
      this.refs.widget
      && this.state.calendarOpen
      && !(this.refs.widget !== event.target && this.refs.widget.contains(event.target))
    ) {
      this.hideCalendar();
    }
  }
  handleBlur(event) {
    if (this.state.calendarOpen && event.relatedTarget !== null) {
      this.hideCalendar();
    }
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

  renderCalendar() {
    var firstMonthDay = moment([this.state.currentYear, this.state.currentMonth, 1]);
    var firstDay = firstMonthDay.clone();
    while (firstDay.weekday() !== 0) {
      firstDay.subtract(1, 'days');
    }

    var weeks = [];
    var day = firstDay.clone();
    while (day.month() == this.state.currentMonth || day.month() == firstDay.month()) {
      var days = [];
      while (days.length < 7) {
        days.push(
          <CalendarDay
            key={`day-${day.format('x')}`}
            day={day.clone()}
            inMonth={(day.month() == this.state.currentMonth)}
            selected={(day.format('x') === this.props.dateValue)}
            setDateValue={(newValue) => {this.props.onDateChange(newValue)}}
          />
        );
        day.add(1, 'days');
      }
      weeks.push(
        <div
          className={classNames('week')}
          key={`week-${day.format('x')}`}
        >
          {days}
        </div>
      );
    }

    return (
      <div className="date-calendar">
        <div className="header">
          <div className="button" onClick={this.previousMonth.bind(this)}>Prev</div>
          <div className="title">{firstMonthDay.format('MMMM YYYY')}</div>
          <div className="button" onClick={this.nextMonth.bind(this)}>Next</div>
        </div>
        <div className="day-labels">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {weeks}
      </div>
    );
  }
  render() {
    var calendar;
    if (this.state.calendarOpen) {
      calendar = this.renderCalendar();
    }
    return (
      <div className="rendered-react-day-input" ref="widget">
        <input
          ref="textValue"
          type="text"
          value={this.props.textValue}
          className="form-control"
          onFocus={this.showCalendar.bind(this)}
          onChange={() => {this.props.onTextChange(this.refs.textValue.value)}}
          placeholder={this.props.placeholder}
        />
        {calendar}
      </div>
    );
  }
}

export default DayInput
