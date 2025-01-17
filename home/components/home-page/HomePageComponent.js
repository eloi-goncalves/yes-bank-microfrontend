import { ContainerComponent } from '../yes-bank-components';
import { createTransactionAPI, getTransactionsAPI, deleteTransactionsAPI, updateTransactionsAPI } from "transaction/TransactionAPI";

export default function HomePageComponent() {
    const children = (
        <div className="home"> 
            <div className="header-components">
                <ContainerComponent componentType={"welcome"} className="border-normal welcome" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}/>
                <ContainerComponent componentType={"saldo"} className="saldo" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}/>
            </div>
            <div className="body-components">
                <ContainerComponent componentType={"menu"} className="border-gradient menu" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}/>
                <ContainerComponent componentType={"nova-transacao"} className="border-gradient nova-transacao" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}/>
                <ContainerComponent componentType={"extrato-simplificado"} className="extrato" createTransactionAPI={createTransactionAPI} deleteTransactionsAPI={deleteTransactionsAPI} getTransactionsAPI={getTransactionsAPI} updateTransactionsAPI={updateTransactionsAPI}/>
            </div>
        </div>
    );

    return (
        <>  
            {children}
        </>
    );
}
