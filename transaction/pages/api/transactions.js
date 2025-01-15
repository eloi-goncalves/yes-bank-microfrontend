import sqlite3 from 'better-sqlite3';
import _ from 'lodash';
import Cors from 'cors';

// Initialize the SQLite database (synchronously)
const db = new sqlite3('./database.db', { verbose: console.log });

// Create the transactions table if it doesn't exist
const initializeDatabase = () => {
  const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      dateTranscription TEXT NOT NULL,
      file TEXT
    )
  `);
  stmt.run();
};

// Initialize the database when the server starts
initializeDatabase();

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  origin: 'http://localhost:3000',  // Allow requests from this origin (your frontend)
  allowedHeaders: ['Content-Type', 'Authorization'], // Optional: specify headers you expect
});

export default async function handler(req, res) {

  // Run CORS middleware
  await new Promise((resolve, reject) => cors(req, res, (result) => {
    if (result instanceof Error) {
      reject(result);
    } else {
      resolve(result);
    }
  }));

  try {
    if (req.method === 'GET') {
      // Get all transactions
      const transactions = getTransactions();
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      // Create a new transaction
      const transaction = req.body; // assuming the body is a JSON object
      await createTransaction(transaction);
      return res.status(201).json({ message: 'Transaction created' });
    }

    if (req.method === 'PUT') {
      // Update an existing transaction
      const { id } = req.query; // assuming the transaction ID is passed in the query
      const updatedTransaction = req.body; // assuming the body contains the updated transaction data
      if (!_.isEmpty(id)) {
        await updateTransaction(id, updatedTransaction);
        return res.status(200).json({ message: 'Transaction updated' });
      }
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    if (req.method === 'DELETE') {
      // Delete a transaction
      const { id } = req.query; // assuming the transaction ID is passed in the query
      if (!_.isEmpty(id)) {
        await deleteTransaction(id);
        return res.status(200).json({ message: 'Transaction deleted' });
      }
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    // If the method is not allowed, return a 405 status
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error handling the request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper functions to interact with the SQLite database

const createTransaction = (transaction) => {
  const { amount, type, description, dateTransaction, file } = transaction;
  const transactionDate = dateTransaction || new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO transactions (amount, type, description, dateTranscription, file)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(amount, type, description, transactionDate, file || null);
};

const getTransactions = () => {
  const stmt = db.prepare('SELECT * FROM transactions');
  return stmt.all();
};

const updateTransaction = (id, updatedTransaction) => {
  const { amount, type, description } = updatedTransaction;
  const stmt = db.prepare(`
    UPDATE transactions SET amount = ?, type = ?, description = ? WHERE id = ?
  `);
  stmt.run(amount, type, description, id);
};

const deleteTransaction = (id) => {
  const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
  stmt.run(id);
};
