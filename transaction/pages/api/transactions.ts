import sqlite3 from 'better-sqlite3';
import _ from 'lodash';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

type Transaction = {
  id?: number | string;
  amount?: number; 
  type?: string; 
  description?: string, 
  dateTransaction?: Date | string, 
  file?: string
};

interface UpdatedTransaction {
  amount: number;
  type: string;
  description?: string;
}

// Initialize the SQLite database (synchronously)
const db = new sqlite3('./database.db', { verbose: console.log });

// Create the transactions table if it doesn't exist
const initializeDatabase = (): void => {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Run CORS middleware
  await new Promise<void>((resolve, reject) => cors(req, res, (result: unknown) => {
    if (result instanceof Error) {
      reject(result);
    } else {
      resolve();
    }
  }));

  try {
    if (req.method === 'GET') {
      const { id, description, type } = req.query;

      const transactions = getTransactions(id as string, description as string, type as string);

      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const transaction: Transaction = req.body;
      createTransaction(transaction);
      return res.status(201).json({ message: 'Transaction created' });
    }

    if (req.method === 'PUT') {
      // Update an existing transaction
      const { id } = req.query; // assuming the transaction ID is passed in the query
      const updatedTransaction: UpdatedTransaction = req.body; // assuming the body contains the updated transaction data
      if (!_.isEmpty(id)) {
        updateTransaction(id as string, updatedTransaction); // Removed await
        return res.status(200).json({ message: 'Transaction updated' });
      }
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    if (req.method === 'DELETE') {
      // Delete a transaction
      const { id } = req.query; // assuming the transaction ID is passed in the query
      if (!_.isEmpty(id)) {
        deleteTransaction(id as string); // Removed await
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
const createTransaction = (transaction: Transaction): void => {
  const { amount, type, description, dateTransaction, file } = transaction;
  const transactionDate = dateTransaction || new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO transactions (amount, type, description, dateTranscription, file)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(amount, type, description, transactionDate, file || null);
};

const getTransactions = (id?: number | string, description?: string, type?: string): Transaction[] => {
  let query = 'SELECT * FROM transactions WHERE 1=1';
  const params: (string | number)[] = [];

  if (id) {
    query += ' AND id = ?';
    params.push(id);
  }

  if (description) {
    query += ' AND description LIKE ?';
    params.push(`%${description}%`);
  }

  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }

  const stmt = db.prepare(query);

  return stmt.all(...params) as Transaction[];
};



const updateTransaction = (id: number | string, transaction: Transaction): void => {
  const { amount, type, description } = transaction;
  const stmt = db.prepare(`
    UPDATE transactions SET amount = ?, type = ?, description = ? WHERE id = ?
  `);
  stmt.run(amount, type, description, id);
};

const deleteTransaction = (id: number | string): void => {
  const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
  stmt.run(id);
};
