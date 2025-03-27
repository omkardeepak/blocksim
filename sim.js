const crypto = require('crypto');

class Block {
    constructor(index, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0; // Used for proof-of-work
        this.hash = this.calculateHash();
    }

    // Function to calculate hash of the block
    calculateHash() {
        const blockData = this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
        return crypto.createHash('sha256').update(blockData).digest('hex');
    }

    // POW Mine the block by finding a valid hash
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // Difficulty level for proof-of-work
    }

    // Create the first block/genesis block
    createGenesisBlock() {
        return new Block(0, "Genesis Block", "0");
    }

    // Get the latest block on the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // Validate the integrity of the blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the current block's hash is valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if the previous block's hash is correctly stored in the current block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // Print the blockchain for inspection
    printBlockchain() {
        this.chain.forEach(block => {
            console.log(`Block ${block.index} [`);
            console.log(`  Timestamp: ${new Date(block.timestamp).toUTCString()}`);
            console.log(`  Transactions: ${JSON.stringify(block.transactions)}`);
            console.log(`  Previous Hash: ${block.previousHash}`);
            console.log(`  Hash: ${block.hash}`);
            console.log(`  Nonce: ${block.nonce}`);
            console.log(']');
        });
    }
}

// Creating new chain
const myBlockchain = new Blockchain();

// Adding dummy transactions and blocks
myBlockchain.addBlock(new Block(1, ['Transaction 1', 'Transaction 2']));
myBlockchain.addBlock(new Block(2, ['Transaction 3', 'Transaction 4']));
myBlockchain.addBlock(new Block(3, ['Transaction 5', 'Transaction 6']));


console.log('Blockchain before tampering:');
myBlockchain.printBlockchain();

// Check if the chain is valid
console.log(`\nIs blockchain valid? ${myBlockchain.isChainValid()}`);

// Tampering with the blockchain
myBlockchain.chain[1].transactions = ['Tampered Transaction'];

console.log('\nBlockchain after tampering:');
myBlockchain.printBlockchain();

// Check if the chain is still valid
console.log(`\nIs blockchain valid? ${myBlockchain.isChainValid()}`);
