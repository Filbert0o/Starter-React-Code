### Learning Objectives

* Combine your knowledge of stateful and stateless components, React array collections (arrays), and synthetic events
* Become familiar with the concept of controlled components and complex state management across multiple components

In this tutorial-type exercise, we will begin to apply our knowledge of state to manage a list of groceries.

Take your time and slowly code along with the tutorial. You may want to revisit this again in the future in order to fully understand all of the moving parts involved.

### Getting Started

Run the following commands and visit <http://localhost:8080> to see the current state of the application.

```sh
$ et get react-grocery-list-form
$ cd react-grocery-list-form
$ npm install
$ npm start
```

## State

Take a moment to get familiar with the structure of this React application. What components do we have? How do they relate to each other?

Start at `main.js`. Then, take a look at `App.js`. Follow through to `GroceryList` and the `Grocery` components. Notice how props are passed between components. Note, too, how a `GroceryForm` component might work.

## Stateful Grocery List

First, let's extract out the event handlers into their own methods.

```javascript
// App.js
import React, { Component } from 'react'
import GroceryForm from './GroceryForm'
import GroceryList from './GroceryList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [
        { id: 1, name: "Oranges" },
        { id: 2, name: "Bananas" },
        { id: 3, name: "Bread" }
      ]
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    alert('Form was submitted')
  }

  handleButtonClick(event) {
    alert('Button was clicked')
  }

  render() {
    return(
      <div>
        <h1>Grocery List React</h1>
        <GroceryForm handleFormSubmit={this.handleFormSubmit} />
        <GroceryList
          groceries={this.state.groceries}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    )
  }
}

export default App
```

Can you see similarities to our earlier lessons on state? Let's start by examining the relationships and responsibilities at play among these components:

* When defining event handlers in a React class, we need to explicitly bind them to `this`, meaning the instance of the component. Otherwise, the `this` may refer contextually to the element that _triggered_ the event. By binding `this`, we guard against this funky JavaScript behavior.
* The `handleFormSubmit` and `handleButtonClick` methods were defined on our `App` component, and they will continue to refer back to `App` *even if we pass the function to a separate component.*
* `handleFormSubmit` is passed to `GroceryForm` as a prop, and `handleButtonClick` is passed to `GroceryList`. (We'll come back to this later).
* In our App component's state, we defined a `groceries` array, which we can use to hold the state of any groceries we wish to keep track of.
* We then pass this data down into the `GroceryList` component as `props`. The `GroceryList` then makes a collection of `Grocery` presentational (or stateless) components to display on the page.
* If we wanted to store more information in our state, such as the total cost of our groceries, we could define additional data to track in state. State in React is simply a JSON object.

**Note**: If you don't want to have groceries exist by default, you can remove them from state and leave `groceries` as an empty array.

## Adding Groceries to the List

Our top level component `App` is both stateful and the parent to `GroceryList` and `GroceryForm`. Let's now focus on adding some groceries to our application via the form.

We currently have a problem with our `GroceryForm` component.

```javascript
// GroceryForm.js
import React from 'react'

const GroceryForm = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <input type="text" placeholder="name of grocery" />
      <input type="submit" value="Add To List" />
    </form>
  )
}

export default GroceryForm
```

If a user types "avocados" into the browser, the text input element will now have a value of "avocados" in the browser DOM, but the virtual DOM's text input will still have no value. Therefore, our virtual DOM and browser DOM no longer match each other.

On initial rendering, both the virtual DOM and browser DOM have a text input element with no value. If a user types "avocados" into the browser, however, the text `input` element will now have a value of "avocados" in the browser DOM, but the virtual DOM's text input will still have no value.

Our current view is the product of what we tell React's version of the DOM to render. But we haven't told React to start listening for user inputs, particularly changes to the input field of our grocery form.

Once we do, `ReactDOM`, which you may have noticed that you imported into your `main.js` file,  will notice that change, create its own "virtual" representation of the DOM, compare it against the browserDOM, and then reconcile the differences. This process, unsurprisingly, is called _reconciliation_.

We can fix this by adding another property to our `App` component's state (in this case, `name`) and passing another event handler (a method that we'll call `handleChange`) to the `GroceryForm` component. This event handler will watch for changes in the form field's value and update the state accordingly.

```javascript
// App.js
...

class App extends Component {
  constructor(props) {
    this.state = {
      groceries: [],
      name: ''
    }
    ...
    this.handleChange = this.handleChange.bind(this)
  }

  ...
  // our new event handler, that will be tracking the value of the text field
  handleChange(event) {
    let newName = event.target.value
    this.setState({ name: newName })
  }

  render() {
    console.log("App's state name value: ", this.state.name)
    return(
      <div>
        <h1>Grocery List React</h1>
        <GroceryForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          // above, we pass our new event handler down to the GroceryForm component
          name={this.state.name}
        />
        <GroceryList
          groceries={this.state.groceries}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    )
  }
}

export default App
```

```javascript
// GroceryForm.js
import React from 'react'

const GroceryForm = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <input
        type="text"
        placeholder="name of grocery"
        value={props.name}
        onChange={props.handleChange}
      />
      <input type="submit" value="Add To List" />
    </form>
  )
}

export default GroceryForm
```

A `name` attribute has been added to the `App` component's state and with an initial value of an empty string. The `name` attribute is now passed down to the `GroceryForm` component as a prop. In doing this, we're connecting the parent's state to a property of the lower-order component.

Also, the `handleChange` event handler is passed down to `GroceryForm` and is invoked any time there is a change on the text `input` field. When `handleChange` is run, the `name` property of the `App` component's state is updated to be the value presently inside the text `input` field.

That's right...Even though `handleChange` is set to an `onChange` event listener inside your `GroceryForm` component, it updates the state of its **parent** component instead.

Again, this happens because we bound `handleChange` to our `App` component back when it was first defined. We are pointing the `this` of `handleChange`'s `this.setState` method toward `App` rather than `GroceryForm`.

Let's break that down a little more:

* When a user types into the field, React tracks that change.
* It then takes the value of whatever the user types and sets it as the new `name` value in our `App` component's state.
* Finally, it passes that updated state down as a prop back into the `GroceryForm` and sets the input field's value with the `props.name`.

We'll be digging into this more in a future lesson.

To better see how the `name` property in the `App` component's state changes as a user types, we have added a `console.log()` in the beginning of the `App` component's render method. If you open up your browser and type in "avocados" while you have your console open, you will see the following:

![React Stateful Components Photo 17][react-stateful-components-photo-17]

Great! A user can now type into our text `input` field and our virtual and browser DOMs are still in-sync.

What about a user submitting a new grocery?

The `App` component essentially has access to the text in the text `input` field via the `name` property in its state, so now we have to create a `handleSubmit` function.

We make the following changes to our code:

```javascript
// App.js
...

class App extends Component {
  ...

  handleFormSubmit(event) {
    event.preventDefault()
    let newId = this.state.groceries.length + 1
    let newGrocery = {
      id: newId,
      name: this.state.name
    }
    // 'concat' creates a new array with the grocery we wish to add inside. This array is stored in newGroceries.
    let newGroceries = this.state.groceries.concat(newGrocery)

    this.setState({
      groceries: newGroceries,
      name: ''
    })
  }

  ...
}

export default App
```

* First, we prevent the default behavior of the form's submission. As a reminder, we must do this to "block" the behavior of the browser actually submitting the form. `preventDefault()` essentially cancels that default behavior.
* Then, a grocery object is created with the name from the text `input` field. It should have a unique `id`. We find the id of the last grocery of our array and increment the value by 1.
* We then create a new array using the current `groceries` in the `App` component's state and append the grocery object we just created.
* We update the component's state with the new groceries, and we also set the `name` property to an empty string to clear the text `input` field.

If we visit the application, we should now be able to submit grocery items.

![React Stateful Components Photo 18][react-stateful-components-photo-18]

Boom! We can now update our list of groceries. Doing so requires changing `App`'s state, which triggers a re-render. When `App` re-renders, so, too, does our `GroceryList` component, which is now being passed a list of groceries that contains our new avocados.

By the way: The reason `GroceryList` re-renders when `App` does is because it's a lower-order or "child" component of `App`.

## Deleting Groceries

Finally we want to be able to delete groceries.

In order to accomplish this, we will update our `handleButtonClick` event handler -- which was defined and bound in `App.js` -- and we will update the `GroceryList` component to use our event handler for each grocery.

```javascript
// App.js
...

class App extends Component {
  ...

  handleButtonClick(id) {
    let newGroceries = this.state.groceries.filter(grocery => {
      return grocery.id !== id
    })
    this.setState({ groceries: newGroceries })
  }

  ...
}

export default App
```

To keep things functional or pure -- a JavaScript best practice! -- in our `handleButtonClick`, we'll create a new array of groceries that does _not_ include the grocery whose `id` was given as an argument to the function.

To do this, we use JavaScript's built-in `filter` function. Then we set the new state of the `App` component using this new array of groceries.

The `handleButtonClick` function is passed down to `GroceryList` through `props`.

[MDN: Filter Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control)

```javascript
// GroceryList.js
import React from 'react'
import Grocery from './Grocery'

const GroceryList = (props) => {
  let groceries = props.groceries.map((grocery) => {
    let id = grocery.id
    let name = grocery.name

    let handleButtonClick = () => props.handleButtonClick(id)

    return (
      <Grocery
        key={id}
        name={name}
        handleButtonClick={handleButtonClick}
      />
    )
  })

  return (
    <ul>
      {groceries}
    </ul>
  )
}

export default GroceryList
```

In the `map` function, we redefine the `handleButtonClick` (which, again, is bound to the `App` component). For each of the groceries that were passed down as `props`, `handleButtonClick` is fed the `id` of that grocery.

This version of `handleButtonClick` is then passed into each `Grocery` component, and now executes differently and specifically for _each_ grocery when the delete button is clicked. Nice!

If we go back to our browser now, we should be able to delete grocery items.

![React Stateful Components Photo 19][react-stateful-components-photo-19]

See ya avocados!

## The Final Code

```javascript
// App.js
import React, { Component } from 'react'
import GroceryForm from './GroceryForm'
import GroceryList from './GroceryList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: [],
      name: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let newId = this.state.groceries.length + 1
    let newGrocery = {
      id: newId,
      name: this.state.name
    }

    let newGroceries = this.state.groceries.concat(newGrocery)

    this.setState({
      groceries: newGroceries,
      name: ''
    })
  }

  handleButtonClick(id) {
    let newGroceries = this.state.groceries.filter(grocery => {
      return grocery.id !== id
    })
    this.setState({ groceries: newGroceries })
  }

  handleChange(event) {
    let newName = event.target.value
    this.setState({ name: newName })
  }

  render() {
    return(
      <div>
        <h1>Grocery List React</h1>
        <GroceryForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          name={this.state.name}
        />
        <GroceryList
          groceries={this.state.groceries}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    )
  }
}

export default App
```

```javascript
// GroceryForm.js
import React from 'react'

const GroceryForm = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <input
        type="text"
        placeholder="name of grocery"
        value={props.name}
        onChange={props.handleChange}
      />
      <input type="submit" value="Add To List" />
    </form>
  )
}

export default GroceryForm
```

```javascript
// GroceryList.js
import React from 'react'
import Grocery from './Grocery'

const GroceryList = (props) => {
  let groceries = props.groceries.map((grocery) => {
    let id = grocery.id
    let name = grocery.name

    let handleButtonClick = () => props.handleButtonClick(id)

    return (
      <Grocery
        key={id}
        name={name}
        handleButtonClick={handleButtonClick}
      />
    )
  })

  return (
    <ul>
      {groceries}
    </ul>
  )
}

export default GroceryList
```

```javascript
// Grocery.js
import React from 'react'

const Grocery = (props) => {
  return (
    <li>
      {props.name}
      <button type="button" onClick={props.handleButtonClick}>Delete</button>
    </li>
  )
}

export default Grocery
```

Take a few moments to review what you've accomplished!

We started with an application that had a list of groceries that were hard coded into state. Now, we have an application that can
accept user input and manage the state of those groceries efficiently.

This was no easy task, but this example should drive the development of future React applications!

## Additional Resources

* [React Docs: Forms][react-forms]

[grocery-list-react-design]: https://s3.amazonaws.com/horizon-production/images/grocery_list_react.png
[grocery-list-react-no-styling]: https://s3.amazonaws.com/horizon-production/images/grocery_list_react_no_styling.png
[localhost-8080]: http://localhost:8080
[react-blog-es6-syntax-announcement]: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#plain-javascript-classes
[react-child-reconciliation]: https://facebook.github.io/react/docs/multiple-components.html#child-reconciliation
[react-docs-thinking-in-react]: https://facebook.github.io/react/docs/thinking-in-react.html
[react-forms]: http://facebook.github.io/react/docs/forms.html
[react-array-example-repository]: https://github.com/LaunchAcademy/react-stateful-components-react-fragment-example.git
[react-interactivity-and-dynamic-uis]: http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
[react-reconciliation]: https://facebook.github.io/react/docs/reconciliation.html
[react-stateful-component-es6-syntax]: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
[react-stateful-components-photo-17]: https://s3.amazonaws.com/horizon-production/images/react-stateful-components-photo-17.png
[react-stateful-components-photo-18]: https://s3.amazonaws.com/horizon-production/images/react-stateful-components-photo-18.png
[react-stateful-components-photo-19]: https://s3.amazonaws.com/horizon-production/images/react-stateful-components-photo-19.png
[react-synthetic-event]: https://facebook.github.io/react/docs/events.html#syntheticevent
[stateful-component-example-repository]: https://github.com/LaunchAcademy/react-stateful-components-stateful-component-example.git
[react-stateful-components-repository]: https://github.com/LaunchAcademy/react-stateful-components.git
