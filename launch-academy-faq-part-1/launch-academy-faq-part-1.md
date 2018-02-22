### Introduction

Launch Academy is rebuilding its main website in React, and they need your help
to recreate their FAQ accordion in React!

![Launch Academy FAQ 1][launch-academy-faq-1]

### Setup

From your challenges directory, run the following:

```no-highlight
$ et get launch-academy-faq-part-1
$ cd launch-academy-faq-part-1
$ npm install
$ npm start
```

Then, visit <http://localhost:8080> in your browser. You should see a blank page
and there should be no errors in the JavaScript console.

### Instructions

This is a multi-part challenge. You should not expect to complete this assignment
in one sitting. Expect that there will be other lessons you will need to complete
in order gain the knowledge and experience to complete this challenge.

### Requirements, Part One: Basic React with Single Question

The data for this application is found in `src/constants/data.js`, but in `src/main.js`, we will only focus on the first question and answer by specifying it in the props passed into the App component like so: `<App data={data[0]} />`

Create a React application that displays the following:

1.  Your application should start out with a single question tab closed:
    ![Launch Academy FAQ 2][launch-academy-faq-2]

2.  Clicking on the question tab will open it so it shows the answer for the question:
    ![Launch Academy FAQ 3][launch-academy-faq-3]

3.  Clicking on the open question tab will close it, changing it back to how the application looked initially:
    ![Launch Academy FAQ 2][launch-academy-faq-2]

4. At Launch Academy, Jim Bruno is in charge of accepting and rejecting tickets:

   ![Jim][jim]

   Jim rejects tickets where the application does not match the given design.
   Don't let Jim reject your ticket because it lacks styling.

**Tips:**

* Manage the visible **state** of the answer on the React Component that
    renders the answer. This component should have an `onClick` handler, which
    toggles whether or not the answer is rendered.

* Start by rendering a static version of the site. Then, add state to your component when necessary.

Once you have completed this functionality, and you are satisfied with the styling
of the application, run `et submit` to submit your code.

### Requirements, Part Two: Refactor Your Application into Nested Components

Let's change `src/main.js` so that it takes in all the questions instead of the first one by passing all the data into props with `<App data={data} />`. You should create a child component for each portion of the FAQ.

The application should also only have one question displayed at a time, so clicking a different question should reveal the new answer while hiding the answer for the previously opened question.

For example, if the "What is Launch Academy?" tab is opened like so:

![Launch Academy FAQ 4][launch-academy-faq-4]

and we click on the
"What Languages do you teach? What will I learn?" tab, then our site will
look like so:

![Launch Academy FAQ 5][launch-academy-faq-5]

Then clicking the "What Languages do you teach? What will I learn?" tab again will close that question like so:

![Launch Academy FAQ 1][launch-academy-faq-1]

Refactor your code to meet the new requirements. Once you have completed this
functionality, and you are satisfied with the styling of the application, run
`et submit` to submit your code.

[jim]: https://launchpass-production.s3.amazonaws.com/uploads/user/profile_photo/229/me.jpg
[launch-academy-faq-1]: https://s3.amazonaws.com/horizon-production/images/launch-academy-faq-1.png
[launch-academy-faq-2]: https://s3.amazonaws.com/horizon-production/images/launch-academy-faq-1new.png
[launch-academy-faq-3]: https://s3.amazonaws.com/horizon-production/images/launch-academy-faq-2new.png
[launch-academy-faq-4]: https://s3.amazonaws.com/horizon-production/images/launch-academy-faq-2.png
[launch-academy-faq-5]: https://s3.amazonaws.com/horizon-production/images/launch-academy-faq-3.png
