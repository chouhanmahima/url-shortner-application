# URL Shortener Application

This is a simple URL shortener application built using Node.js and Express. The application allows users to shorten long URLs and later retrieve the original URL using the shortened version.

## Features

- Shorten a long URL to a short URL
- Redirect from a short URL to the original long URL

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the Express server:

    ```bash
    node app.js
    ```

2. The server will run on port 5000 by default. You can access it at `http://localhost:5000`.
   
## Endpoints

### 1. post `/url-shortner`
#### Method : POST

#### Example Request

```bash
curl http://localhost:5000/url-shortner
```

### 2. Redirect to the Original URL
#### Endpoint: /:shortUrl
#### Method: GET

Response : Redirects to the original URL or returns a 404 error if the short URL is not found

## Acknowledgments
- Nanoid for generating unique IDs
- Node.js and Express for providing the server framework

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
