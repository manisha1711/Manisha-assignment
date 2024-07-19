# Trip Dashboard Application

## Overview

The Trip Dashboard application is a web-based tool for managing and tracking trips. It provides features to view trip details, update trip statuses, and add new trips. The application is built using React and Vite, and uses Material-UI for its user interface components.


## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- Docker (for containerized deployment)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/manisha1711/Manisha-assignment.git
   cd Manisha-assignment


## Prerequisites
- Docker: Make sure Docker is installed and running on your machine. 

1. Open a terminal and navigate to the root directory of the project (where the `Dockerfile` is located).

2. Build the Docker image using the following command:

    ```bash
    docker build -t manisha-assignment .
    ```

    - `manisha-assignment` is the name you are giving to your Docker image.

## Running the Docker Container

1. Once the image is built, you can run it with the following command:

    ```bash
    docker run -p 3000:3000 manisha-assignment
    ```

    - `-p 3000:3000` maps port 3000 of your host to port 3000 of the container.
    - `manisha-assignment` is the name of the Docker image you built.

2. Open your web browser and go to `http://localhost:3000` to view your Trip dashboard Application.

## Stopping the Docker Container

To stop the running Docker container, you can use the following command:

```bash
docker ps
```

## Run on Local Machine
## Prerequisites
- Make sure node 18 or above is installed

1. open a terminal and navigate to the root directory of your project and run this command
    ```bash
    npm install
    ```
2. Run this command to see preview
    ```bash
    npm run build
    npm run preview
    ```
3. For Dev mode 
    ```bash
    npm run dev
    ```


## Project Structure

- `src/`: Contains the source code of the application
  - `components/`: Reusable UI components
  - `pages/`: Application pages
  - `utils/`: Utility functions
  - `App.js`: Main application component
  - `index.js`: Entry point of the application

## Important Files

- `Dockerfile`: Configuration file for Docker
- `package.json`: Contains project metadata and dependencies
- `vite.config.js`: Configuration file for Vite
