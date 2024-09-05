/* eslint-disable @typescript-eslint/semi */
import { sailsInstance, signerFromAccount } from './utils';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing for incoming requests
app.use(express.json());
app.use(cors());

// Data to create a keyring (name and mnemonic from a wallet)
const accountName = '';
const accountMnemonic = '';

// Data to set SailsCalls (network, contract id and idl)
const network = 'wss://testnet.vara.network'; // network, testnet
const contractId = '';
const idl = ``;

/**
 * GET endpoint to read state (query) from a contract   
 */
app.get('/query/:service/:method', async (req, res) => {
    // Get service, service method and arguments for the query
    const service = req.params.service;
    const method = req.params.method;
    const callArguments = Array.isArray(req.body)
        ? req.body
        : [];

    // Set the SailsCalls instance
    const sailsCalls = await sailsInstance(
        network,
        contractId,
        idl
    );

    try {
        // Send query to the program
        const response = await sailsCalls.query(
            `${service}/${method}`,
            {
                callArguments
            }
        );

        console.log('Response:');
        console.log(response);

        // Return response
        res.send(JSON.stringify(response));
    } catch (e) {
        console.error(e);
        res.status(500).send(
            `Error while read state: ${e}`
        );
    }
});

/**
 * POST endpoint to send a command to the contract
 */
app.post('/command/:service/:method', async (req, res) => {
    // Get service, service method and arguments for the query
    const service = req.params.service;
    const method = req.params.method;
    const callArguments = Array.isArray(req.body)
        ? req.body
        : [];

    // Set the SailsCalls instance
    const sailsCalls = await sailsInstance(
        network,
        contractId,
        idl
    );

    // Set the keyring to sign the message (command)
    const keyring = await signerFromAccount(accountName, accountMnemonic);

    try {
        // Send command to the program
        const response = await sailsCalls.command(
            `${service}/${method}`,
            keyring,
            {
                callArguments
            }
        );
        
        console.log('Response:');
        console.log(response);

        // Return response
        res.send(JSON.stringify(response));
    } catch (e) {
        console.error(e);
        res.status(500).send(
            `Error while read state: ${e}`
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`) 
});