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
- create a handler for button clicking- connect this `handler` to actual logging in to the spotify application
- Things to add inside the handler for authorization
      - `clientID` which is a unique id to every spotify developer user who makes an account
      - `redirectUrl` which is localhost:3000
      - `apiUrl` which is link to authorize page of spotify
      - `scope`
- getting access token for our app by using the client id
- we have to click the buttona and with al of the details provided, we will accept terms and conditions of spotify, then we will get a response and out of that, we have to extract the `access token` from the url(response)
- getting `hash` and `token` from `window.location` inside `app.js` file
        -- try to extract the hash using `useEffect` function which can be imported in `app.js` file
- split the token by `&` and then get the first element of this array( use `split() method`)
- then do another split of this string by `=` and get second element of this array we get

### using token
- create a `constants.js` file in utils folder to use this token
- create a reducerCases constant to be exported from this file
- add a case into `reducer.js` file for this SET_TOKEN case and return accordingly
