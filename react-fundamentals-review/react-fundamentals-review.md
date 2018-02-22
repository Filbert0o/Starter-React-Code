### Learning Goals

* Summarize ReactJS fundamentals
* Examine state relationships in related React Components within a sample application
* Illustrate the difference between presentational and container components

## Following Along - Code Example

In this article we'll be walking through an app and bringing together the concepts we've learned thus far.

To get set up, run the following in your terminal:
```sh
$ et get react-fundamentals-review
$ cd react-fundamentals-review
$ npm install
$ npm start
```

Then in another terminal tab run:
```sh
$ bundle install
$ bundle exec ruby server.rb -o 0.0.0.0
```
Visit http://localhost:4567/

### Remind Me: What is React again?

React is a lightweight, scalable JavaScript framework (e.g. a library of code) that is used to create user interfaces.  

React developers (that's you!) use JSX, which is an inline HTML-like markup that is converted to a virtual DOM. That virtual DOM is compared to the real DOM and then only the parts that have changed are updated. The fact that only the differences get applied is what makes React so fast.  

#### Stateless Component Arrays

Sometimes we want a component that will just take the props that are passed down from a parent component and render the markup. We know these as **stateless** components because they will always return the same output given the same input.

When we want to display a list of similar items in React, we iterate over any array of data we have and return a new array of similar React components.

The best way to do this is to use Javascript's `.map` function, which iterates over a given array, and returns a new array with modified data. In this case, we can call `.map` on our data array and turn that data into the React components we need.

Let's start exploring our app. All of these files are located in the `/react/src` directory.

The first thing we'll want to do is set up our app so it will display data to the screen in its simplest format. In our case, we want a list of pies. Let's take a look at our `data.js` file, which is located in the `constants` directory:

```javascript
// constants/data.js

const data = [
  {
    id: 1,
    name: 'Key Lime Pie',
  },
  {
    id: 2,
    name: 'Sweet Potato Pie',
  },
  {
    id: 3,
    name: 'Apple Pie',
  },
  {
    id: 4,
    name: 'Coconut Cream Pie',
  }
];

export default data;
```

That's one tasty set of pies! We can import this data into our `main.js` file, and pass it to our `App` component as **props**.

```javascript
// main.js

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'
import data from '../src/constants/data';

$(function() {
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('app')
  );
});

```

Our `App` component can then access this information via `props.data`, which we pass to our `PieList` component as **props** (with the key of `pies`).

```javascript
// components/App.js
import React from 'react';
import PieList from '../containers/PieList';

const App = props => {
  return (
    <div>
      <h1>Pie Decider!</h1>
      <h3>What Is Your Favorite Pie?</h3>
      <PieList
        pies={props.data}
      />
    </div>
  );
};

export default App;
```

When creating new components, we need to make sure we are importing and exporting them. It's good practice to initially set up your child component to render a simple `<h1>` element to make sure everything is hooked up properly.

Add the `<h1>` element to the `PieList` component as shown below.

```javascript
// containers/PieList.js
import React from 'react';

const PieList = props => {
    return (
      <div>
        <h1>Hello! Pie please?</h1>
      </div>
    );
}

export default PieList;
```

Great! Everything is all hooked up! Now in our `PieList.js` file, we can `map` through the array that we passed down as `props` from our `App` component. Note that this data was actually passsed as `props` twice. Once from `main.js` into our `App` component, and a second time from the `App` component into the `PieList` component.

We can then `map` over our array in order to transform each element into a `Pie` component. Again, `.map` returns these `Pie` components in the form of an array, which we can call `pies`. We can then render the array of `Pie` components inside the `<ul>` element.

Let's add those in now.

```javascript
// containers/PieList.js
import React from 'react';
import Pie from '../components/Pie';

const PieList = props => {
  let pies = props.pies.map (pie => {
    return (
      <Pie
        key={pie.id}
        id={pie.id}
        name={pie.name}
      />
    )
  })

  return (
    <div>
      <ul>{pies}</ul>
    </div>
  );
}

export default PieList
```

In our `Pie.js` file, we will take the data that is passed into each `Pie` component and define how that data is to be rendered to the screen. In this case, we can simply take the `name` that we received as `props` and put it in a JSX `li` tag.

```javascript
// components/Pie.js
import React from 'react';

const Pie = props => {
  return (
    <li> {props.name} </li>
  )
}

export default Pie

```
Ta-da! We have our list of pies!

#### Stateful Components

Of course, this is React! We want some of our components to be able to change and update our DOM with new data in the blink of an eye, right? We can do that with **Stateful Components**.

Let's update our pie app so that when we click on a pie, it changes color to reflect that we've selected it as our favorite.

If we look at our `home.css` file inside our `public` directory, we will see that there's already styling for a class called `.selected`.
```css
.selected {
  color: #f66923;
}
```
So we just need to set up our React app to add this `.selected` class to the `<li>` tag of the pie we click.

Remember, stateless components by their very nature cannot contain state. Yet we need state in order to keep track of which Pie components are selected. We will need to update our `PieList` component so that it uses `class` syntax, instead of functional syntax (or `const` syntax).

```javascript
// containers/PieList.js
...
class PieList extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    let pieList = this.props.pies.map((pie) => {
      return (
        <Pie
        key={pie.id}
        id={pie.id}
        name={pie.name}
        />
      );
    });

    return (
      <div>
        <ul>{pieList}</ul>
      </div>
    )
  }
}

export default PieList;
```

Recall that with `class` syntax, we now have a `constructor` method, and a `render` method that returns our JSX. Additionally, in order to access props given to a component that uses the `class` syntax, we will need to use `this.props` instead of simply `props` alone.

We will also want to create a `classString` variable (which can also be named anything else, such as className or styleString, etc.) that gets passed down from `PieList.js` to `Pie.js` via **props**. Eventually, `classString` will conditionally hold the value that determines whether or not a pie component''s color has changed. We will declare this variable inside the `render` method but before we start mapping through our list of pies, because we want to assign the `classString` variable for each of the React elements within our array.

```javascript
render(){
  let classString;
  let pieList = this.props.pies.map((pie) => {
    return (
      <Pie
      key={pie.id}
      id={pie.id}
      name={pie.name}
      classString={classString}
      />
    );
  });

  return (
    <div>
      <ul>{pieList}</ul>
    </div>
  )
}
```

Note: `classString={classString}` is a property / value pair. In this case, we actually name the prop `classString` and the value `classString`. The value must refer to the earlier variable we defined, `classString`, but the prop could be named whatever we wished, as long as we use the same naming inside of our child Pie component. In this case, we call the prop and value the same thing for simplicity.

Now we can set the initial state inside our constructor for PieList:

```javascript
// containers/PieList.js

  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    }
  }
```

Great! We created a `selectedId` that initializes as `null`, because we don't want a pie to be selected when we first render the page. Later, this variable in state will track the currently selected `Pie` component in our `PieList`.

Now let's create our function for clicking on a pie. We can create this right below our constructor.

```javascript
// containers/PieList.js
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    }

    this.handlePieClick = this.handlePieClick.bind(this)
  }

  handlePieClick( id ) {
    this.setState( { selectedId: id } )
  }
```

We've set up our `handlePieClick` function so that it take an argument and then updates `selectedId` using React's `this.setState`. Notice that we have also made sure to `bind` our function inside of our constructor, so that the reference to `this` in `handlePieClick` is always referring to our `PieList` component when it gets called.

Now for the fun part! We're going to add some logic inside of our `.map` loop so that it will set `classString` equal to `"selected"` when selectedId matches the `id` of the pie we click on. In this way, `classString` is going to equal different values for each `Pie` component, particularly for the selected pie.

```javascript
// containers/PieList.js
render(){
  let classString;
  let pieList = this.props.pies.map((pie) => {
    if(pie.id === this.state.selectedId) {
      classString = "selected"
    } else {
      classString = ""
    }

  ...
```
Great! Now we just need to pass down our `handlePieClick` function down to `Pie.js` through props. We need also need to pass in the `id` of each pie as we loop through the our array of `PieList`.

To do this, we're going to create a variable that is set equal to our `handlePieClick` function, taking `pie.id` as an argument. Thus, when we click on a pie, our `handlePieClick` will update selectedId with the `id` of the pie we clicked on. It will then compare `selectedId` with each pie's `id`, and only set `className` to  `"selected"` when the ids match. `className` will equal an empty string for all other `Pie` components, since those components will not have matching ids.

```javascript
// containers/PieList.js
render(){
  let classString;
  let pieList = this.props.pies.map((pie) => {

    if(pie.id === this.state.selectedId) {
      classString = "selected"
    } else {
      classString = ""
    }

    let onPieClick = () => this.handlePieClick(pie.id)


    return (
      <Pie
        key={pie.id}
        id={pie.id}
        name={pie.name}
        handleClick={onPieClick}
        classString={classString}
      />
    );
  });
}

...
```

Excellent! Now we just need to update our Pie.js to use the `handleClick` and `classString` props that we're handing down.

```javascript
// components/Pie.js
const Pie = props => {
  return (
    <li onClick={props.handleClick} className={props.classString}> {props.name} </li>
  )
}
```
Now when we click on pie we should see it change color!

Let's throw a `debugger` into our `handlePieClick` function to better understand how `setState` operates.

```javascript
// containers/PieList.js
handlePieClick( id ) {
  this.setState( { selectedId: id }  )
  debugger;
}
```
Now let's open up our console and click on our favorite pie to hit our `debugger`!

![Debugger Hit](	https://s3.amazonaws.com/horizon-production/images/1-selected-null.png)

Check it out. We clicked on the second pie but if we check `this.state` we see that `selectedId` is still `null`. Let's try moving that `debugger` to the top of the render and refresh the page.

```javascript
render(){
    debugger;

    let classString;
    let pieList = this.props.pies.map((pie) => {
```

Because we've put the `debugger` in our `render` method, we hit it as soon as we re-render the page, so let's exit out of our `debugger` so that we can click on our favorite pie. We should hit our `debugger` again because we're re-rendering our component. Now we can check `this.state` again.   

![PieList Selected Id 2](				https://s3.amazonaws.com/horizon-production/images/2-selected-id-assigned.png)

Cool! So this time `selectedId` is updated to the pie's id (in this case `2`). Why are we seeing `this.state.selectedId` when we put our `debugger` at the top of our render function but not when put it inside our `handlePieClick` function? It's because `setState()` does not *immediately* mutate `this.state`. Rather it creates a pending state transition and returns a new Virtual DOM which will be compared to the actual DOM. By the time we are inside of our `render` however, `this.state` has been updated.

If you're ever totally lost and don't know what the heck is going on with your react app, a good first step is to throw a `debugger` into your `render`.

#### Containers: Organizing Our React Apps

Let's dig into how we structured our app and why we organized our code the way we did. Let's take a look at our `PieList.js` file again to see what it's actually doing.

```javascript
// containers/PieList.js
class PieList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    }

    this.handlePieClick = this.handlePieClick.bind(this)
  }

  handlePieClick( id ) {
    this.setState( { selectedId: id } )
  }


  render(){
    let classString;
    let pieList = this.props.pies.map((pie) => {

      if(pie.id === this.state.selectedId) {
        classString = "selected"
      } else {
        classString = ""
      }

      let onPieClick = () => this.handlePieClick(pie.id)

      return (
        <Pie
          key={pie.id}
          id={pie.id}
          name={pie.name}
          handleClick={onPieClick}
          classString={classString}
        />
      );
    });

    return (
      <div>
        <ul>{pieList}</ul>
      </div>
    )
  }
}
```

All this component is responsible for is getting the data and rendering its child component. It's almost entirely a component built of logic rather than presentational JSX. These components we often call **containers**. Containers deal with logic and behavior. Presentational components, like Pie.js, deal with how things look and are typically stateless.

By having a `PieList` component that just deals with the data and rendering its child component (in this case `Pie`) we've made it so that `Pie`, our presentational component, is easily reusable. This is helpful if we wanted to display our list of pies on another page and increases the flexibility of our React code.

It's good practice to organize our files so that containers are in their own directory and components are another. When trying to figure out if a component should go in the `containers` directory or the `components` directory, a good place to start is to ask yourself whether or not it deals with state. If not, it should probably go in the components directory. If it does deal with state it likely belongs in in the containers directory.

![Organizing Containers and Components](				https://s3.amazonaws.com/horizon-production/images/app-architecture.png)

While this might seem silly for a component that is just a list of pies, think of how useful it would be if our component was a credit card payment form. If you had an e-commerce site, you might want that form to appear on multiple pages. By breaking up our code into containers and presentational components, we make it much easier to reuse components, thus DRYing up our code.  

#### Wrap Up

In this article we've created a stateless react app, added state to it, investigated `setState` using `debugger` and talked about why we organize our components the way we do.
