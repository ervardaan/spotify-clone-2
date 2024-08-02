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
- use `useStateProvider` in `app.js`
- add dispatch logic in `useEffect` method calling of `app.js`

### creating spotify component to use API to get data in components folder aside the login
- check in `app.js` if a token is present- is yes then give spotify component otherwise render login component
- styling of spotify: `spotify` then `spotify body` then `body contents` and at end `footer`. Add all of these divisions in spotify component
- make 4 extra components- `Navbar` and `Sidebar` and `Body` and `Footer`. All of them are `.jsx` files in `components` folder
- add `sidebar` in `spotify body` and `navbar` in `body` and `body` in `body contents` and `footer` in `footer` division of spotify coomponent
- define `Container` in `spotify` component and style spotify body and body divisions
- define `Container` in `sidebar` and `Footer` components as well and style it using `styled.div` in same way we styled `spotify` component
### creating sidebar
- 2 divisions for `top links` and `logo`
- one `unordered list` using 3 items( `Home` and `Search` and `Your Library`)
- import icons from `react-icons`
### making playlists and getting them from spotify API
- make component `playlists` in components folder and add this component in `sidebar` as well

### working and getting content from API
- when we have to work with APIs we use `useEffect`
- we will also be using `axios` to make api calls and retrieve content
- we use `await and async` cycle to get content from api( mostly `static data` from API)
- another method which i am not using is to use `promises` rather than `async cycle`
- follow these steps inside the Playlists component file to get content from api calls
  - import `useEffect` and `useStateProvider`
  - import `axios`
  - get `token` and `dispatch` values in an array from calling `useStateProvider()`
  - call`useEffect()` method with dependencies of `token` and `dispatch` in an array
  - Getting data from asycn cycle in `useEffect` method call
      - make async function `getPlaylistData()` and get a response from axios inside it
          - parameter to axios call is a `MODEL` of the `API` we are using
          - model1 is `getting user's playlists`
          - https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
          - add `url` and `headers containing authorization` to this request we are sending
          - then at end, send the method or call this method to send an async request
          - note that `axios.get()` method is used to give this request for the data
          - additional scopes to add in app.js `scopes` arraylist are `playlist-read-private` and `playlist-read-collaborative`
          - 'Authorization': `Bearer ${token}` ( actually including back ticks) is the right way
          - OR we can use Authorization: "Bearer "+token
          - TROUBLESHOOTING
              - we have to make a new token to get a response( to get it, stop the whole application and restart it to again login via the login page into your spotify account)
          - get playlists and store them in reducer inside `Constants.js` file
          - STEPS to store
              - make a SET_PLAYLISTS constant in `constants` file
              - make a case for the same in `reducer` and returning corresponding playlists array and action
              - After this stage, we have stored two things-API and PLAYLISTS of current user
          - dispatch `reducerCases.SET_PLAYLISTS` inside `playlists.jsx` component
          - display playlists as a list( unordered list) inside playlists.jsx component
          - perform styling of playlists component
          - add scrollbar for scenario when many playlists are present
### developing Navbar
- make another api call to get user data for the navbar-again follow same steps to `get api data`
- same template we copy from `playlists` and apply in `spotify` to get data for `navbar`
- steps are
    - import useEffect
    - get token and dispatch from useStateProvider()
    - call useEffect method with `token` and `dispatch` dependencies
        - make a function inside useEffect() method  which does `asynchronous await  cycle`
            -  make a constatnt data variable which uses `axios` to get `api data` using `get() method`
            -  2nd api used: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
            -  parameters in api call for `axios.get() method`
                - url
                - headers
                    - Authorization: "Bearer "+token
            - console and print this data variable to show us the data received by making call
        - call this `async function` to call the api
    - make another constant called `SET_USER` to store this 3rd type of data we fetch from api( store in `constants.js` file)
    - make a case in `reducer.js` file with `SET_USER` and return an action of `userInfo`
    - go back to `spotify.jsx` component and add this new data( user info)
        - make another method to get userInfo( make two properties of userId and userName) from the data variable we got earlier and use `dipatch` service with type and userInfo
![image](https://github.com/user-attachments/assets/87905b24-22e9-478a-a155-e9c8201ca40d)

### working on Navbar definition and styling
- add divisions for search bar and avatar( each with FaSearch and CgProfile from `react-icons`)
- style the divisions using `styled.div` for `Container` tag
### designing body
-  import styled and AiFilledClockCircle, and useEffect
-  create container with `styled.div` and replace the previous div with `Container`
-  convert body to `export default function type` so we don't have to export it explicitly
-  fetch data from API inside the `body function`
    - 


  

