# Directions from Dog

Hi, I'm Bruce.  

![alt text][bruce]

My human is well-intentioned, but sometimes needs some guidance. So I've made a list of how to do my favorite things so that my human can follow along.

We want to help Bruce better communicate with his human. Right now we have a React app that displays how to do Bruce's favorite things, but we think his human might need more guidance than that. Let's build the functionality to allow Bruce's human to highlight an individual instruction and follow along one step at a time.

## Getting Started
Run the following commands to get the app up and running
```no-highlight
bundle
npm install
ruby server.rb
npm start
```
Then navigate to `localhost:4567`

This is a React app running on top of Sinatra. Don't worry too much if it looks a little unfamiliar to have to two running together. You should be able to complete all of the *required* sections using just the files inside the `react` directory!

### What's going on here:
Let's take a look at what the code is doing. The `main.js` file is importing a constant called `data`, which stores all of the information about Bruce's favorite things. It then renders an `InstructionsContainer` component, and passes the `data` to that component as `props`.

The `InstructionsContainer` currently has a `state` with nothing in it. The `render` method `map`s over the `supplies` and `directions` that Bruce has specified, and returns a respective `ItemTile` or `StepTile` for those things. The final `return` renders a header with the name of the activity and the previous collections of `steps` and `items`.


### Your job
Set the `state` of our React app to keep track of which `StepTile` is selected.

#### Setting the State
Let's first set up our App to keep track of which step is selected in `state`. To do that:

* Add a key-value pair into `state` to keep track of the `id` of the selected step. This should be initialized to `null`.
* Write a function in the `InstructionsContainer` class that will take in an `id` and set the `state` to that `id`.

### Changing the State with Synthetic Events
Great! Now our app can handle state, but we have to make sure that Bruce's human can change the state by clicking around. To do that:

* Pass the function that you just wrote down as `props` to `StepTile`. The name of the `prop` passed down should be `setSelectedStep`.
* You'll notice that the `StepTile` component is defining a `handleClick` function that calls the function you just passed down from `props`. This is how we specify which `id` to pass in.
* Use the `onClick` synthetic event on the `StepTile`'s `li` element to call the `handleClick` function defined there.
* At this point, you should be able to `console.log(this.state)` at the top of the `render` in the `InstructionsContainer` and see the `state` change as you click!

### Giving Visual Feedback
We're getting really close now! Since we're good UX designers, we want to make sure that Bruce's human can actually *see* the state being set. Let's turn the selected step blue to make it easy to follow along. To do that:

* Take a look at the `render` method on the `InstructionsContainer`. For each `StepTile` we render, we want to check if that `direction`'s `id` is the same as the `id` stored in our `state`. Write a conditional to compare those values, and set the `className` variable to `selected` if they are equal.
* Pass that `className` variable down as props to the `StepTile`
* Add the `className` attribute to the `li` in `StepTile`, and set it equal to the value you just passed down through `props`.
* The "selected" `className` is defined in the `style/app.scss` file. At this point, your app should have the selected step turn blue!

### Extra Challenge
Let's refactor to use `fetch` to get our data instead of importing `data.js` into `main.js`. To get set up:

* Write a function that makes a fetch request to `/api/v1/favorite_things.json`. This endpoint has been set up for you in `server.rb`.
* This method should be called when the `FetchButton` is clicked, and should store the results of the `fetch` request in `state`. Refactor your container to read the data from `state`!

### Tips
* Remember that your container will re-render every time the `state` changes. Placing a `debugger` or `console.log` at the top of your `render` is a good place to see what's going on.
* Remember that we call properties and functions belonging to a JavaScript class with `this` (ie. `this.state`, `this.props`, `this.functionName`). We do not use `this` in presentational components with `const` syntax.
* Remember that we **never** directly mutate `state` outside of the `constructor`. All functions should **always** use the `setState` function to change the state.
* Remember to bind functions that set `state` to your `constructor`!

[bruce]: https://s3.amazonaws.com/horizon-production/images/bruce.jpg "dog photo"
