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
    - import `useStateProvider` from `StateProvider` class
    - get token and dispatch variables from calling `useStateProvider()` method
    - call `useEffect` method with 2 dependencies of `token and dispatch` in dependencies array
    - make an async function inside `useEffect() method` called `getInitialPlaylist
    - Inside this async function, we havr to provide details of one playlist
        - go to reducer.js and paste `id of playlist(some random playlist we have)` into a variable named `selectedPlaylistId`
        - now extract this variable alongside `token` using `useStateProvider` in body.jsx
    - inside the `async function` we add a response variable to use `axios.get() method` using `await and async cycle`
    - we are using the following API yo get this playlist from its ID
        - https://developer.spotify.com/documentation/web-api/reference/get-playlist
    - for url, we add additional `playlist id` using ${} after the standard url
    - for headers. we pass `Authoriztation`-both url and headers are part of get() method
    - At end of getting this response in our variable, we console it and then the `async function` ends.
    - After the async function ends inside the useEffect() method, we `call the async function`
    - now we close the curly braces for useEffect method and provide the dependency array
        - make another method inside `getInitialPlaylist()` method called `selectedPlaylist()`
        - ![image](https://github.com/user-attachments/assets/b5e0a2a0-7bf4-4609-814f-c0e0bacc8610)
    - to export all of these `playlist details` we make a constant in `constants file`
    - then we make a case in reducer cases inside `reducer.js` file and give it an action
        - make a const `selectedPlaylist` and set it to null in `reducer.js` file
        - now make a case for it( case is `SET_PLAYLIST`)
            - return `state as ...state` and `selectedPlaylist:action.selectedPlaylist`
    - now dispatch after completing the `selectedPlaylist` const decaration( we dispatch inside the `getInitialPlaylist` method)
        - type is `reducerCases.SET_PLAYLIST` and we also give `selectedPlaylist`
    - now in depenency array of useEffect, add token, dispatch, and `selectedPlaylistId`
    - now when using `useStateProvider` before calling useEffect method, get token, dispatch, and `selectedPlaylist`
    - also import `reducerCases` from Constants.js file
#### presenting playlist data inside body
- check if `selectedPlaylist is not null` and if yes then use display tags `<> and </>`
- 2 divisions for playlist name and images and then make divs if needed for details and type/title/description etc- give details eclosed in `{}` correspondingly to each div
- display list of objects in the playlist-make another division for it separately
- now style everything
#### styling while scrolling the playlist List inside body
- go to spotify.jsx file
- use `useRef and useState hooks` so import them alongside useEffect hook from react
- create two state constants which use useState()
    - navBackground and setNavBackground
    - headerBackground and setHeaderBackground
- make another method before `useEffect()` method in this file
- conditions for setting these values lie in this method
    - if `bodyRef.current.scrollTop>=30` then setNavBackground=true else false
    - if `bodyRef.current.scrollTop>=30` then setHeaderBackground=true else false
- use this `bodyRef` for the div tag in the `spotify` component
    - go to that tag in return statement which has className=`body`
    - use ref property on this tag like `ref={bodyRef} onScroll={bodyScrolled}`
    - set navbar and body tags in spotify component with `navBackground` and `headerBackground`
      ![image](https://github.com/user-attachments/assets/a81123b0-799a-4983-9c7c-ff0281f636ad)
  - make corresponding changes to `navbar` component as well
      - add {navBackground} to fundion Navbar as a parameter
      - add navBackground now to Container as a property
      - now add it to container.styled for styling and add a corresponding background color
  - go to `body component` and add this styling to it
      - add headerBackground to its body function as a parameter
      - add headerBackground as a property to Container tag in the return statement
      - add it to styling of Container as well and style it similar to that of Navbar
#### converting milliseconds data to seconds for display
- make a method outside of return statement and useEffect() method which has logic to convert milliseconds to minutes and seconds and return a string `minutes:seconds`
- in `duration` span of the return statement( which is the last thing we display in a div), we call this function with the required `duration` as a parameter
#### style scrollbar for tracks of the playlist
- go to playlists component and copy the cody for styling its scrollbar and make some modifications in it accordingly
- go to `spotify component` and add this to its `body tag` inside Container.styled
### design footer
- style it in Container styled.div section
### showcase current track's information in footer
- create a new component called `CurrenTrack.jsx` and do rafce to get template code
    - import styled, useEffect into it
    - change it to become default function and export it
    - initialize a Container and use styled.div
    - get token and dispatch service fro useStateProvider() and also import it to use it
    - call `useEffect()` method to get data about currently running track via api and axios
        - use an arrow function for definition
        - make a new method which gets `asynchronous api data` using `await async cycle`
            - make a `response` variable which stores the repsonse from the api when we call the `get() method from axios` using `await`
            - api to be used: https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
            - send url and headers(only Authorization) as request parameters to get() method
            - after getting the response in the variable, we console it to see its value
        - call this method inside the `useEffect() method`
    - give token and dispatch service to useEffect as dependencies in its dependencies array
- add this `CurrentTrack` component into Footer inside its Container tag and also import it
- store this data about currently playing track into the reducer
    - go to constants.js file and add another property to reducerCases array
    - go to reducer.js and add a case for this property we have added o Constants.js file
        - add a constant variable currentlyPlaying and set it to null
        - now add the case for `SET_PLAYING` reducerCases case
        - return `state` and `currentlyPlaying:action.currentlyPlaying` from this case
- go to current track to show this actual information
    - if response's data is not empty, then get currentplaying item's properties- all of this has to be done inside the aycn method of CurrentTrack component
    - dispatch reducerCases.SET_PLAYING along with `setPlaying` variable we just defined with current playing item's properties
    - import currentPlaying in CurrentTrack component alongside token in useStateProvider call
    - now use this currentPlaying inside Container to display using smoe div tags
### adding player controls to control music ourselves in the clone by getting data from API
- make a new component called `PlayerControls` and add it to footer inside Container of footer
- working in playercontrols.jsx file
    - import styled from styled components
    - change definition to exporting a default function PlayerControls()
    - make a container with `styled.div`
    - replace div in return statement with Container
    - import different icons from `react-icons`
- working in reducer.js file
    - create a state variable( playerState) for playing or not playing and set to false initially
    - go to constants and declare `SET_PLAYER_STATE` constant in `reducerCases` array
    - now make a case for it( case is `SET_PLAYER_STATE`)
            - return `state as ...state` and `playerState:action.playerState`
    - get playerState using `useStateProvider()` inside playercontrols.jsx component
    - then style return Container tag with required div tag for presentation and with icons
    - style player controls using style.div for Container according to your choice
#### actually pausing songs inside clone and linking details to spotify back
- create a method called `changeTrack()` in playerControls defult function of playercontrols
- this method is an async function but we don't wrap this method inside `useEffect()` method

- this change track method is hooked to the div tag which tackles clinking previous button( so use `onClick` property on this tag so that when it gets clicked, the method is called)
- do the same for next button and give a different parameter in both calls to the method
- using api
    - api used: https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
    - https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
    - DON'T create a `response` variable which stores the api response
    - use `await` for `axios.post()` method as we give data to server rather than take from it
        - first parameter to POST request is `url` of api call- we ask server to change songs
        - second parameter is headers which contain `Authorization: Bearer <token of user>`
        - for post requests, we also give a middle parameter called body which is left empty using {}
    - log the response variable inside the async method to show its value we get from API
    - now dispatch the value of playerState using `dispatch()` method inside this async func
    - NOTE: if using free version of spotify, then we can't use next and previous api references and so will get an error on screen
        - to stop this error from showing up on screen, we wrap whole changeTrack() method inside a try and catch block which catches any errors given by this method's asynchronous call
#### adding play/pause functionality
- go to playercontrols.jsx and add a method after the changeTrack method,right before the return statement, which also uses `async await cycle`
    - make a const variable `state` and set  it to some value based on value of playerState: it can be pause or play
    - make a response variable for api response
    - API to be used: https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
    - https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
        - use `await axios.get() method` to give request of type PUT
        - give `url` and `body which is empty` and `headers including Authorization`
    - console log the repsonse
- dispatch the `playerState` after the method ends
- add to div tags such that when button of pase is clicked, the changeState() is called
#### adding volume controls
- create a new component called `Volume.jsx`
- import the component into the footer's Container tag
- In volume component, add Container's styled.div and replace div of return with Container
- add different div in Container




  

