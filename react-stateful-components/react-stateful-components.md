### Learning Objectives

In this reading, we will use **state** to manage user input in a React application.

* Learn to make components stateful using ES6 class syntax
* Understand how to create state in our constructor
* Learn more about the importance of binding `this`

### Getting Started

Run the following commands and visit <http://localhost:8080> to see the current state of the application.

```sh
$ et get react-stateful-components
$ cd react-stateful-components
$ npm install
$ npm start
```

## React State

Be sure to take a glance at the structure of our current application. Remember to check the `main.js` file to see which component will be our top level component. In this case, the `MessageComponent` is our only component. We also pass down a prop of `message` from the `main.js` to the `MessageComponent`.

```javascript
// src/components/MessageComponent.js
import React from 'react';

const MessageComponent = (props) => {
  let message = props.message
  let clickCount = 0
  let sender = "Abraham Lincoln"

  return (
    <div>
      <h1>Component Message: {message}</h1>
      <h1>Component Click Count: {clickCount}</h1>
      <h1>Component Sender: {sender}</h1>
    </div>
  )
};

export default MessageComponent;
```

Currently, our app is entirely `stateless`. We use the `const` component syntax to simply render a component that will render the same thing no matter what the user does. Notice that we created a few variables that we pass down into the return of our component to render the appropriate JSX.

But what if we wanted to change the message that app presents to the user? Or perhaps the click count or sender? Currently, we would have to hard code each of these variables every time we wanted to make a change! Instead we want our application to manage this information for us.

To review, `props` are passed down from a higher-order or "parent" component to a lower-order or "child" component, and are considered to be static by the lower-order component that receives them. In other words, the receiving component treats its `props` as _immutable_ or unable to be changed in any way.

But React components can also use a second form of data storage called `state`, which allows a component to dynamically keep track of changes in response to a user input or server request. In order to create a component that has state (a _stateful_ component), we will have to do the following:

* Update our component to use `class` syntax.
* Add a constructor using the `super` keyword. Calling `super` allows us to access `this` inside the constructor. The _constructor_ is required to set up an initial value for the state (`this.state`) of the component.
* Inside the constructor, set `this.state` equal to a JavaScript object. Basically, `state` will become a variable that points to an object (denoted by curly braces `{}`).
* Inside the state object, we can store the information we plan to -- in response to user input -- update with the `setState()` function!

```javascript
// src/components/MessageComponent.js
class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  ...
};
```

Our stateful app is starting to come together! But, if you've made the above changes, your app will probably be breaking. We'll have to change a few other things as well.

```javascript
// src/components/MessageComponent.js
class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let message = this.props.message
    let clickCount = 0
    let sender = "Abraham Lincoln"

    return(
      <div>
        <h1>Component Message: {message}</h1>
        <h1>Component Click Count: {clickCount}</h1>
        <h1>Component Sender: {sender}</h1>
      </div>
    );
  }
};
```

A few things to note:
 * Our component is no longer just a JavaScript function that returns JSX. It is now a JavaScript class, whose parent is `React.Component`. This class will can now instantiate a `MessageComponent` object.
 * The object can return JSX in any arbitrary function. In order for React to make use of the component for the purposes of display, we must define a `render()` function that returns JSX.

 The `render()` function is technically inherited when we write out `extends React.Component`. We'll dig into this a little bit more when we explore lifecycle methods, but for now, **just know that `render()` is where we will define what JSX our stateful components return, and that this function automatically gets called when React places this component on the ReactDom**.
 * We're now calling `props` *inside* of a JavaScript object, so we need to prepend `this` when we want to access `props`.

In some ways, we can consider `state` analogous to the collection of attributes or instance variables we might use in Ruby objects. Once we have instantiated our object, we can access and change its attributes in `state`.

The last thing we will want to do is make sure that our `message`, `clickCount` and `sender` rely on the state of our application (which is dynamic) rather than hard coded values.

```javascript
// src/components/MessageComponent.js
class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      clickCount: 0,
      sender: "Abraham Lincoln"
    };
  }

  render() {
    let message = this.state.message
    let clickCount = this.state.clickCount
    let sender = this.state.sender

    return(
      <div>
        <h1>Component Message: {message}</h1>
        <h1>Component Click Count: {clickCount}</h1>
        <h1>Component Sender: {sender}</h1>
      </div>
    );
  }
};
```

Wow, that is one heckin' good stateful component. Note that the `message` property in our state receives the message prop that was passed down to it. This will be important when we create more complex stateful React applications.

For now, just know that we can assign `props` that are passed to our component in state, and then use that state to display something on the page.

Note: If you don't want to have a `clickCount` or `sender` exist by default, you can remove them from state and leave their values as nil.

This is great and all, but the user still cannot change anything. We'll need to define some method that will change the state of our app based on user events.

## Changing State

In this example, we have set initial object state to have a `clickCount` of `0` and a `sender` of `'Abraham Lincoln'`. In the browser, we will see the following:

![React Stateful Components Photo 2](https://s3.amazonaws.com/horizon-production/images/react-message-initial-render.png)

The component is now displaying the data from its state, but the page is still static. It would make sense for the component’s `clickCount` to increase every time the component is clicked.

To do so, we need to update the state in response to a click event:

```javascript
// src/components/MessageComponent.js
import React from 'react';

class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      clickCount: 0,
      sender: 'Abraham Lincoln'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let newClickCount = this.state.clickCount + 1;
    this.setState({ clickCount: newClickCount });
  }

  render() {
    let message = this.state.message
    let clickCount = this.state.clickCount
    let sender = this.state.sender

    return(
      <div onClick={this.handleClick}>
        <h1>Component Message: {message}</h1>
        <h1>Component Click Count: {clickCount}</h1>
        <h1>Component Sender: {sender}</h1>
      </div>
    );
  }
};

export default MessageComponent;
```

We have added an `onClick` event listener to the `div` element encompassing our component. We've also defined the `handleClick()` method as the event handler.

When we define methods in a React class, remember that we also need to bind them to `this` so that the method knows which component the `this` is pointing to. Binding helps to _lock in_ the contextual nature of the keyword `this`, and when we properly bind a function, we explicitly define what `this` will point to.

This is particularly important when managing state. If we do not bind here, `this` may point to the DOM element that triggered the event or some other contextual element of the click function. We want to make sure that our `handleClick()` method *specifically* changes the state of our `MessageComponent`, as opposed to some other JavaScript object.

In this event handler, we simply want to determine the new click count value and update the state with the new click count value.

To change component state, we use the `setState()` method which was inherited from `React.Component` and call it with an object containing only the properties that need to be updated.

Most importantly, the `setState()` method-- if there is a change -- **will trigger a new `render()` call, re-rendering the component with the new state and updating the browser page.** This is important to remember. If we have set up our React app correctly, changes to our state will automatically display when our React application re-renders!

If we take a look at the browser now, we will see that the click count increments by one every time we click on the component! Notice that even though the message and sender properties are part of state, that part of our application remains the same.

If we wanted to, we could define a few more methods that could alter the value of the `message` and `sender` properties, but we will leave that for another time.

### Critical Details

Before we review the process, please be mindful of the following details:

* **Only ever change state via the `setState()` method** - Otherwise, you will inadvertently delete state properties and fail to trigger the re-rendering of the component.

The only exception to this rule is that, when you set up your _initial_ state in the constructor, you cannot use the `setState()` function and must assign values directly to `this.state` instead.
* **It is usually necessary to bind `this` to event handlers** - For any event handlers that use `this` and are passed down as `props` to ReactElements in your `render()` method, you must bind `this` in the last line of the `constructor` method. Without binding `this`, you may encounter situations where the event handler is not referring to the object in question.
* **A component's state is lost when we refresh the page** - The information that state holds is temporary. When we reload our application, it will begin with the initial defaults we have set (or, if we so choose, it may load with empty fields).

### A Closer Look
```javascript
render() {
  console.log(this.state.clickCount)

  let message = this.state.message
  let clickCount = this.state.clickCount
  let sender = this.state.sender
}
```

To better see how the clickCount property in the MessageComponent's state changes as a user clicks, we can add a `console.log(this.state.clickCount)` in the beginning of the MessageComponent component's render method. If you open up your browser and then click on the "Click Count" text five times while you have your console open, you will see the following:

![react-stateful-log](https://s3.amazonaws.com/horizon-production/images/react-log.png)

Every time we click, our state is incremented. State is then passed down into the render method and returned in the JSX we have set up.

Let’s also add a `debugger` to the beginning of our `handleClick()` and `render()` methods and go through the component’s initial rendering and the re-rendering whenever it is clicked.

```
// src/components/MessageComponent.js
// ...
  handleClick(event) {
    debugger;
    let newClickCount = this.state.clickCount + 1;
    // ...
  }

  render() {
    debugger;
    return(
    // ...
  }
```

After making these changes, our server will automatically refresh the page for us and we will be in step 1 of the process.

#### Step 1. `render()` is called for the initial rendering of the page.
![React Stateful Components Photo 1](https://s3.amazonaws.com/horizon-production/images/react-message-initial-state.png)

There is nothing on the page because the `render()` method is still in the middle of being called, and has not returned the initial representation of the component.

Exiting out of this debugger will take us to step 2.

#### Step 2. Page shows rendered component with initial state.
![React Stateful Components Photo 2](https://s3.amazonaws.com/horizon-production/images/react-message-initial-render.png)

This displays the component’s prop data and initial state data.
Clicking on the component will take us to step 3.

#### Step 3. Click event is triggered and event handler is invoked.
![React Stateful Components Photo 3](https://s3.amazonaws.com/horizon-production/images/react-message-handleClick.png)

Here, we are determining the new state and then calling `setState()` to update the state and re-render the component.

Exiting out of this debugger will take us to step 4.

#### Step 4. `render()` is called again to re-render the component.
![React Stateful Components Photo 4](https://s3.amazonaws.com/horizon-production/images/react-message-clicl-render.png)

At this point in time, the component has the new state. However, the page has not been updated because the `render()` method is one again in the middle of being called, and has not returned the updated representation of the component.

Exiting out of this debugger will take us to step 5.

#### Step 5. Page shows re-rendered component with the new state.
![React Stateful Components Photo 9](https://s3.amazonaws.com/horizon-production/images/react-message-final-render.png)

If we were to click on the component again, steps 3-5 would be repeated.

## Quick Refactor
One final refactoring we can do is to import `Component` directly from the `react` package, so we can write `extends Component` instead of `extends React.Component`. The reason we can do this is because `Component` is defined in the React library as a _submodule_ to React.

Placing `Component` in brackets allows you to pull in the submodule from `react` (and alias it as `Component`) so you don't have to use the clunkier dot syntax from earlier.

```javascript
// MessageComponent.js
import React, { Component } from 'react';
class MessageComponent extends Component {
...
};
export default MessageComponent;
```

## Conclusion
We can make our components stateful by using ES6 class syntax, creating state in our constructor, binding our methods to our component class and tweaking the way we call `props.`

We can then make our JSX dependent on the values of in our state. By doing so, we can have a dynamic React application that responds to user events.

Whenever a component updates its state using one of our bound methods, our React application invoke the `render()` method whenever there is a change in state.
