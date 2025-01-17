import dynamic from "next/dynamic";
const ContainerComponent = dynamic(() => import('yes-bank-components').then((mod) => mod.ContainerComponent), { ssr: false });
import { createTransactionAPI, getTransactionsAPI, deleteTransactionsAPI, updateTransactionsAPI } from "transaction/TransactionAPI";

const StatementComponent = () => {
  return (
    <div
      className="statement"
      style={{
        display: 'grid',
        gridTemplateColumns: '19% 51% 28%',
        gridTemplateRows: '100%',
        gap: '1%',
        height: '100%',
      }}
    >
      <ContainerComponent
        componentType={"menu"}
        className="border-gradient menu"
        createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      />
      <ContainerComponent
        componentType={"extrato-detalhado"}
        className="extrato"
        createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}
      />
      <div className="saldo-cartao-colum">
        <ContainerComponent componentType={"saldo"} className="saldo" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} />
        <ContainerComponent componentType={"cartao"} className="cartao" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI} />
      </div>
    </div>
  );
};

export default StatementComponent;
