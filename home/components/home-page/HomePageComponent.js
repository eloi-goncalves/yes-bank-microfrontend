import ContainerComponent from "../container/ContainerComponent";

export default function HomePageComponent() {
    const children = (
        <div className="home"> 
            <div className="header-components">
                <ContainerComponent type={"welcome"} classname="border-normal welcome"/>
                <ContainerComponent type={"saldo"} classname="saldo"/>
            </div>
            <div className="body-components">
                <ContainerComponent type={"menu"} classname="border-gradient menu"/>
                <ContainerComponent type={"nova-transacao"} classname="border-gradient nova-transacao"/>
                <ContainerComponent type={"extrato-simplificado"} classname="extrato"/>
            </div>
        </div>
    );

    return (
        <>  
            {children}
        </>
    );
}
