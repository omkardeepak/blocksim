Basic Blockchain Simulation
This is a simple blockchain simulation built in JavaScript, demonstrating the core concepts of blockchain technology. It mimics the functionality of a blockchain with block creation, hashing, and validation.

Features
Block Structure: Each block contains:

Block index

Timestamp of creation

List of transactions

Hash of the previous block

Current block hash

Hashing: Uses SHA-256 to generate unique hashes based on block data.

Proof-of-Work: Implements a basic proof-of-work mechanism by adjusting the block's nonce until a valid hash is found.

Blockchain Class:

Add new blocks to the chain.

Validate the chain’s integrity to detect tampering.

Tamper Detection: Modifies block data to demonstrate how tampering is detected by hash mismatches.

Usage
Install Node.js: Ensure you have Node.js installed from nodejs.org.

Clone or Download the Code: Place the code into a sim.js file.

Run the Simulation:


node sim.js
Example
Creates a blockchain and adds multiple blocks with sample transactions.

Detects whether the chain is valid after tampering with block data.

Output
The simulation prints the entire blockchain, showing the block details before and after tampering, along with the blockchain’s validation status.
