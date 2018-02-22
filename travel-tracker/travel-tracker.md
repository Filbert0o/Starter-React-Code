### Introduction

You've learned a lot! At this point, you should be familiar with:

* Stateless components (using `const`)
* Stateful components
* Event handlers and binding `this`

So let's bring all together in our next coding adventure!

### Setup

From your challenges directory, run the following:

```no-highlight
$ et get travel-tracker
$ cd travel-tracker
$ npm install
$ npm start
```

Open your browser and navigate to http://localhost:8080/. There should be no errors in your console!

### Deliverables

Your goal is to create a travel tracking application that shows a list. When you click on one of the travel items, it should be crossed off your list.

NOTE: Do not worry about the ability to click on the destination again to get rid of the cross through, this is something that will be much easier once we learn databases.

Your requirements:

* Display a list of places you wish to travel to that can be clicked on to cross destinations of the list
  * This list should make use of the `data.js` file in the `constants` folder and be an array of React components.
  * There must be a list of all the destinations, where each destination can be clicked
  * When a destination is clicked, it should receive a strikethrough that crosses it out
  * You should have both a container component and stateless component as part of your app structure

### Planning and Pro-Tips

- Ponder: What are the different components you need to create? Try drawing a diagram before you begin.
- We try and keep components that store state to a minimum, because otherwise, things can get super complex! If you had to pick one component that would have state, which one would it be?
- Make use of the destinations' ids to determine whether they've been visited or not
  - You should also make use of the ids in the `handleClick` HINT HINT!

### Troubleshooting

- Throw in `debugger`s and `console.log`s where necessary!
- Don't forget to import and export components as you define them.
