### setup
- aff `rfc` to app.js to get boilerplate code and rmeove addTests, webvitals etc files as we won't be using them for analytics of the application
- make a new folder in `src` folder called `utils` with files  `stateProvider.jsx` and `reducer.js`
- create stateContext and stateProvider in `stateProvider.jsx` file
- create reducer in `reducer.js` file
### logging in functionality
- create new folder components in src called `components` and then make 1st component called `Login.jsx`
- initialize this login component using rfc to get another boilerplate code to get started
- make a container  and style it like a div using styled components which we have already installed and need to import `styled` from `styled-components`
- NOTE: WE ALWAYS `IMPORT AND USE COMPONENTS INSIDE APP.JS` so import the login component in app.js
- make a button to connect to spotify and add a start image of spotify, then also style them using container and `styled.div` with styling properties given to `container` and `image` and `button`
