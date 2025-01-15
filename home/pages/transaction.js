import React from "react";
import { TransactionComponent } from '../components/transaction/TransactionComponent';
import ErrorBoundary from "../components/fallback/ErrorBoundary";

const TransactionPage = () => {
  return (
    <ErrorBoundary>
      <TransactionComponent />
    </ErrorBoundary>
  );
}

export default TransactionPage;