<p align="center">
  <h1 align="center">Show Me Crypto</h1>

  <p align="center">
    An application .
    <br />
  </p>
</p>

## About:
An application designed to show you a list of USD Cryptocurrencies, which upon selection will render a 5-day price chart. Using websockets, realtime price data will also render underneath the chart. Hovering over the chart line will show you the price at that time. Upon load, this application will capture your IP address to create a record in which we can save your email if you would like to be notified of future features. If you don’t want your email stored, we can remove it upon request.


## Architecture/ File structure:
```bash
$ tree
├── database
│   └── index.ts
│
├── dist
│   └── bundle.js
│   └── bundle.js.LICENSE.txt
│   └── index.html
├── public
│   └── index.html
│   └── manifest.json
│   └── robots.txt
├── server
│   ├── server.ts
├── src
│   ├── CryptoDetails
│           └── CryptoChart.tsx
│           └── CryptoDetails.tsx
│           └── CryptoInfo.tsx
│   ├── Menu
│           └── CryptoItem.tsx
│           └── CryptoMenu.tsx
├── App.tsx
├── App.css
├── Index.css
├── Index.tsx
├── Utils.ts
└.babelrc, gitignore, readme, config files etc.
```
I thought this would be a single-page app detailing cryptocurrency information when I started this app. The view is 2 Main components, the List of Cryptocurrencies and the details upon selection, stored in CryptoDetails and Menu. Within those components are children’s components stored in their directories.

CryptoMenu has the menu itself, along with a menuItem for each cryptocurrency. The menu is being rendered with data from the coinbase API, filtered by USD.

<p align="center">
  <img src="https://i.imgur.com/9tP1dyZm.jpg" alt="animated" />
</p>

CryptoDetails houses the info page, where data travels to render the chart (cryptoChart) and additional details (CryptoInfo) regarding the coin selected, which is being access from the coinbase API.

<p align="center">
  <img src="https://i.imgur.com/D8Dozcjm.jpg" alt="animated" />
</p>

There are multiple Axios requests to the controller to retrieve and store information within the components ( for code cleanliness, there is a utils file for functions being used in the controller and view).
Once the controller (Express server) receives these requests, it will ping the API and retrieve data to render or interact with the Model (MongoDB database) to delete or modify records in the database.



## Features:


- _Simplistic Design_: This page was designed utilizing Material UI - styled simply.

- _List_: When a user visits the page, a list is rendered with all the cryptos available in USD. This list is scrollable, meaning the user doesn’t have to scroll through the whole site to find the crypto they desire, they can just scroll the list rendered.

- _Chart_: A chart of prices will render upon load (Defaulting to BTC-USD). Upon click of a list item, the chart will re-render with information from the coin selected.

- _Email Storage / Deletion of Record_: Using MongoDB/Express, your IP address is captured and creates a record for you when the page loads. If you do not want your IP address stored, there is a button you can click to delete it. There is also an option to keep your email and be notified of new features when implemented.


<p align="center">
  <img src="https://media.giphy.com/media/4yUvi1zbcm5ckaRoDr/giphy.gif" alt="animated" />
</p>

# Stack

<table align="center">
  <tbody>
    <tr>
      <th>Frontend Languages</th>
      <td>
        <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
         <img alt="HTML" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
         <img alt="CSS" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" />
         <img alt="MaterialUI" src="https://img.shields.io/badge/material-ui%20-%231572B6.svg?&style=for-the-badge&logo=material-ui&logoColor=white" />
      </td>
    </tr>
    <tr>
      <th>Frameworks & Libraries</th>
      <td>
        <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB" />
        <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
        <img alt="Typescript" src="https://img.shields.io/badge/typescript-%23404d59.svg?style=for-the-badge&logo=typescript&logoColor=%2361DAFB" />
      </td>
    </tr>
        <tr>
      <th>Backend Languages</th>
      <td>
        <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%2300f.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Utilities</th>
      <td>
        <img alt="Webpack" src="https://img.shields.io/badge/webpack%20-%2320232a.svg?&style=for-the-badge&logo=webpack&logoColor=%2361DAFB" />
        <img alt="Babel" src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" />
        <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
        <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
      </td>
    </tr>
     <tr>
      <th>Workflow</th>
      <td>
        <img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        <img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?&style=for-the-badge&logo=Trello&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>
        <img alt="Heroku" src="https://img.shields.io/badge/heroku-%230db7ed.svg?style=for-the-badge&logo=heroku&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>

## Run the app:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `npm test`

Launches the server.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

