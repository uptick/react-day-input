import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'

import { DayInput } from 'react-day-input'

const GUI_FORMAT = 'DD/MM/YYYY';

class DemoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      deliveryText: '',
      deliveryDate: null,
    };
  }

  handleDeliveryTextChange(newText) {
    this.setState(state => {
      state.deliveryText = newText;
      var parsed = Moment(newText, GUI_FORMAT);
      if (parsed.isValid()) {
        state.deliveryDate = parsed.format('x');
      }
      else {
        state.deliveryDate = null;
      }
      return state;
    });
  }
  handleDeliveryDateChange(newDate) {
    this.setState(state => {
      state.deliveryDate = newDate;
      if (newDate === null) {
        state.deliveryText = '';
      }
      else {
        state.deliveryText = Moment(newDate, 'x').format(GUI_FORMAT);
      }
      return state;
    });
  }
  handleDeliveryDateBlur() {
    this.setState(state => {
      if (this.state.deliveryDate !== null) {
        state.deliveryText = Moment(this.state.deliveryDate, 'x').format(GUI_FORMAT);
      }
      return state;
    });
  }

  render() {
    return (
      <div>
        <label>Delivery Date</label>
        <DayInput
          placeholder="Select or start typing a date"
          textValue={this.state.deliveryText}
          dateValue={this.state.deliveryDate}
          onTextChange={this.handleDeliveryTextChange.bind(this)}
          onDateChange={this.handleDeliveryDateChange.bind(this)}
          onBlur={this.handleDeliveryDateBlur.bind(this)}
        />
      </div>
    );
  }
}

var mount = document.querySelectorAll('div.demo-mount-direct');
ReactDOM.render(
  <DemoForm />,
  mount[0]
);
