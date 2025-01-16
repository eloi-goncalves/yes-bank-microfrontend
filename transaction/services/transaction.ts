type Transaction = {
    id?: string | number;
    amount?: number; 
    type?: string; 
    description?: string, 
    dateTransaction?: Date | string, 
    file?: string
};

type FetchResponse<T> = {
    ok: boolean;
    statusText: string;
    json: () => Promise<T>;
};

async function fetchJson<T>(url: string, options: RequestInit): Promise<T> {
    const response: FetchResponse<T> = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
}

export async function createTransactionAPI(transaction: Transaction): Promise<void> {
    try {
        const url = 'http://localhost:3001/api/transactions';
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        };
        const result = await fetchJson<Transaction>(url, options);
        console.log('Transaction created:', result);
    } catch (error) {
        console.error('Failed to create transaction:', error);
    }
}

export async function getTransactionsAPI(id?: number | string): Promise<Transaction[]> {
    try {
        const url = id ? `http://localhost:3001/api/transactions?id=${id}` : 'http://localhost:3001/api/transactions';
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const result = await fetchJson<Transaction[]>(url, options);
        console.log(id ? 'Transaction retrieved:' : 'Transactions retrieved:', result);
        return result;
    } catch (error) {
        console.error('Failed to retrieve transactions:', error);
        return [];
    }
}

export async function updateTransactionsAPI(id: number | string, transaction: Transaction): Promise<Transaction | undefined> {
    try {
        const url = `http://localhost:3001/api/transactions?id=${id}`;
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        };
        const result = await fetchJson<Transaction>(url, options);
        console.log('Transaction updated:', result);
        return result;
    } catch (error) {
        console.error('Failed to update transaction:', error);
        return undefined;
    }
}

export async function deleteTransactionsAPI(id: number | string): Promise<Transaction | undefined> {
    try {
        const url = `http://localhost:3001/api/transactions?id=${id}`;
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const result = await fetchJson<Transaction>(url, options);
        console.log('Transaction deleted:', result);
        return result;
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        return undefined;
    }
}