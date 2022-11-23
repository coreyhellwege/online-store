<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/coreyhellwege/online-store">
    <img src="./images/online-store-icon.png" alt="Logo" width="90" height="90">
  </a>

  <h1 align="center">Pawsome Snacks</h1>

  <p align="center">
    An E-Commerce online store built with React, Redux, Node, Express, Mongo DB, React Bootstrap, PayPal SDK and more!
    <br />
    <br />
    <a href="https://github.com/coreyhellwege/online-store/issues">Report Bug</a>
    ·
    <a href="https://github.com/coreyhellwege/online-store/issues">Request Feature</a>
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br />

<!-- ABOUT THE PROJECT -->
## About The Project

#### Public Screens

![Screenshot 1][product-screenshot-1]
![Screenshot 2][product-screenshot-2]

#### Admin Screens

![Screenshot 3][product-screenshot-3]
![Screenshot 4][product-screenshot-4]

<p align="right"><a href="#top">back to top</a></p>

### Built With

* [React.js](https://reactjs.org/)
* [Redux.js](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://mongodb.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)

<p align="right"><a href="#top">back to top</a></p>

<!-- GETTING STARTED -->
## Getting Started

To run this project locally follow these steps.

### Prerequisites

* [Node package manager](https://www.npmjs.com/)

  ```sh
  npm install npm@latest -g
  ```

### Setup

1. Clone the repo

   ```sh
   git clone https://github.com/coreyhellwege/online-store.git
   ```

3. Install server dependencies

   ```sh
   npm install
   ```

4. Install client dependencies

   ```sh
   cd frontend
   npm install
   ```

2. Create a `.env` file in the project root directory 

    ```sh
    cd ..
    touch .env
    ```

    Add default values for the following keys:

    ```sh
    NODE_ENV = development
    PORT = 8000
    MONGO_URI = *insert mongo uri connection string*
    JWT_SECRET = *create a jwt secret string*
    ```

    To set up the database you will need to create a MongoDB instance and obtain a connection URI. [Learn more here](https://www.mongodb.com/docs/manual/reference/connection-string/)

5. Start the local development server <br />
   <i>This will run the client & server concurrently</i>

   ```sh
   npm run dev
   ```

<p align="right"><a href="#top">back to top</a></p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project

2. Create your Feature Branch <br />
`git checkout -b feature/AmazingFeature`

3. Commit your Changes <br />
`git commit -m 'Add some AmazingFeature'`

4. Push to the Branch <br />
`git push origin feature/AmazingFeature`

5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<br />

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Traversy Media](https://www.traversymedia.com/)

<p align="right"><a href="#top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/coreyhellwege/online-store.svg?style=for-the-badge
[contributors-url]: https://github.com/coreyhellwege/online-store/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/coreyhellwege/online-store.svg?style=for-the-badge
[forks-url]: https://github.com/coreyhellwege/online-store/network/members
[stars-shield]: https://img.shields.io/github/stars/coreyhellwege/online-store.svg?style=for-the-badge
[stars-url]: https://github.com/coreyhellwege/online-store/stargazers
[issues-shield]: https://img.shields.io/github/issues/coreyhellwege/online-store.svg?style=for-the-badge
[issues-url]: https://github.com/coreyhellwege/online-store/issues
[license-shield]: https://img.shields.io/github/license/coreyhellwege/online-store.svg?style=for-the-badge
[license-url]: /LICENSE.txt
[product-screenshot-1]: ./images/screenshot-1.png
[product-screenshot-2]: ./images/screenshot-2.png
[product-screenshot-3]: ./images/screenshot-3.png
[product-screenshot-4]: ./images/screenshot-4.png