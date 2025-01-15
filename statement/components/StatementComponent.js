import dynamic from "next/dynamic";

const ContainerComponent = dynamic(() => import("home/ContainerComponent"), {
  ssr: false,
});

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
        type={"menu"}
        className="border-gradient menu"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      />
      <ContainerComponent
        type={"extrato-detalhado"}
        className="extrato"
      />
      <div className="saldo-cartao-colum">
        <ContainerComponent type={"saldo"} className="saldo" />
        <ContainerComponent type={"cartao"} className="cartao" />
      </div>
    </div>
  );
};

export default StatementComponent;
