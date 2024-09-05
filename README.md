# Node TS Server Template  with SailsCalls (Sails) for Vara Network

This is a Node TS server template for interacting with the Vara Network using SailsCalls (Sails). The server provides endpoints to read the program state and send messages to a specified program on the Vara Network.

## Prerequisites

- Node.js (v18 or higher)
- Yarn
- Vara Network account and access to a program

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/vara-nodejs-server-template.git
    cd vara-nodejs-server-template
    ```

2. Install dependencies:
    ```sh
    yarn
    ```

## Configuration

Update the server code with your own program ID and idl if necessary. You can find these values in the `index.js` file.

## Running the Server

To start the server in dev mode, run:
```sh
yarn dev
```