import React from "react";
import dynamic from "next/dynamic";

const TransactionPage = dynamic(() => import("transaction/TransactionPage"), {
  ssr: false,
});

const Transaction = () => {
  return <TransactionPage />;
}

export default Transaction;