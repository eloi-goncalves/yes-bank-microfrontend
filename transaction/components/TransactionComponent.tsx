import dynamic from "next/dynamic";
import React from "react";
import { createTransactionAPI, getTransactionsAPI, deleteTransactionsAPI, updateTransactionsAPI } from "../services/transaction";

const ContainerComponent = dynamic(() => import('yes-bank-components').then((mod) => mod.ContainerComponent), { ssr: false });

const TransactionComponent: React.FC = () => {
  return (
    <div
      className="transaction"
      style={{
        display: "grid",
        gridTemplateColumns: "19% 51% 28%",
        gridTemplateRows: "100%",
        gap: "1%",
        height: "100%",
      }}
    >
      <ContainerComponent componentType={"menu"} className="border-gradient menu" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} getTransactionsAPI={getTransactionsAPI}/>
      <ContainerComponent componentType={"nova-transacao"} urlUploadPath="http://localhost:3001/api/upload" className="border-gradient nova-transacao" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} getTransactionsAPI={getTransactionsAPI}/>

      <div className="saldo-cartao-colum">
        <ContainerComponent componentType={"saldo"} className="saldo" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} getTransactionsAPI={getTransactionsAPI}/>
        <ContainerComponent componentType={"cartao"} className="cartao" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} getTransactionsAPI={getTransactionsAPI}/>
      </div>
    </div>
  );
};

export default TransactionComponent;
