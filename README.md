# OpenAPI blogger frontend

## Setup
```
        git clone https://github.com/siddharths067/oapi-blogger.git
        cd oapi-blogger
        docker-compose build && docker-compose up -d
        cd ..
        git clone https://github.com/siddharths067/oapi-blogger-fe.git
        cd oapi-blogger-fe
        npm install
        npm start
        echo "open localhost:3000 in browser" 
```

Since this assignment wasn't complex and everything was achievable using simple RDBMS, I didn't post an architecture diagram.

Simple storyboard
- User signups
- User logs in
- User goes to feed page where he can post a story
- When user clicks on a story he enters a story page, here a string is added in the `story_stats` table, this string is deterministically mapped to user and post. This is updated in a non-blocking fashion.
- To generate statistics we just use a simple regex query on the SQL table `story_stats` plus a timestamp clause to filter out users who read story before 1 minute. This gives the number of distinct users in 1 minute interval. 
- As far as efficiency is concerned for P posts and U users we won't ever have more than P*Q entries (AT MAX) no matter how many times user visits.

## Documentation of API
To view backend endpoint documentation goto 
`localhost:8080/docs`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
