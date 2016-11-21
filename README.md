# react-day-input

[![npm version](https://badge.fury.io/js/react-day-input.svg)](http://badge.fury.io/js/react-day-input)
![Downloads](http://img.shields.io/npm/dm/react-day-input.svg?style=flat)

A simple date picker for React, powered by Moment.

## Live Demo

Check out the live demo here: http://abasystems.github.io/react-day-input/

## Installation

Install the package with npm:

```
npm install react-day-input
```

Then require and use with ES6 imports:

```javascript
import React from 'react'

import { StrictDayInput } from 'react-day-input'

class MyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,

      dueBy: null,
    };
  }

  render() {
    return (
      <form>
        <StrictDayInput
          value={this.state.dueBy}
          onChange={(newDate) => {
            this.setState({dueBy: newDate});
          }}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

And include the built css with an import:

```scss
@import 'node_modules/react-day-input/dist/react-day-input.css';

```

or tag:

```html
<link href="static/node_modules/react-day-input/dist/react-day-input.css" rel="stylesheet">
```

Full reference documentation coming soon. For now, take a look at the reference on the live demo at
http://abasystems.github.io/react-day-input/.
