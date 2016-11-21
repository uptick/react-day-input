import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'

import { StrictDayInput } from 'react-day-input'

const GUI_FORMAT = 'DD/MM/YYYY';

class DemoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      deliveryDate: null,
    };
  }

  handleDeliveryDateChange(newDate) {
    this.setState({deliveryDate: newDate});
  }

  render() {
    var deliveryDisplay = 'Nothing';
    if (this.state.deliveryDate !== null) {
      deliveryDisplay = Moment(this.state.deliveryDate, 'x').format(GUI_FORMAT);
    }

    return (
      <div>
        <p>The chosen delivery date is: {deliveryDisplay}</p>
        <label>Delivery Date</label>
        <StrictDayInput
          placeholder="Choose a date"
          value={this.state.deliveryDate}
          onChange={(newDate) => {
            this.setState({deliveryDate: newDate});
          }}
        />
      </div>
    );
  }
}

var mount = document.querySelectorAll('div.demo-mount-strict');
ReactDOM.render(
  <DemoForm />,
  mount[0]
);
