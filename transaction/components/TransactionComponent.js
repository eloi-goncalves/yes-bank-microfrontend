import dynamic from "next/dynamic";

const ContainerComponent = dynamic(() => import("home/ContainerComponent"), {
  ssr: false,
});

const TransactionComponent = () => {
  return (
    <div
      className="transaction"
      style={{
        display: "grid",
        gridTemplateColumns: "19% 51% 28%",
        gridTemplateRows: "100%",
        gap: "1%",
        height: "100%",
      }}>
      <ContainerComponent type={"menu"} className="border-gradient menu" />
      <ContainerComponent type={"nova-transacao"} className="border-gradient nova-transacao" />

      <div className="saldo-cartao-colum">
        <ContainerComponent type={"saldo"} className="saldo" />
        <ContainerComponent type={"cartao"} className="cartao" />
      </div>
    </div>
  );
};

export default TransactionComponent;
