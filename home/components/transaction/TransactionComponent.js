import dynamic from "next/dynamic";
import Fallback from "../fallback/FallbackComponent";

const TransactionComponent = dynamic(() => import("transaction/TransactionComponent"), {
  ssr: false,
  loading: (props) => <Fallback {...props} />
});


export {
  TransactionComponent,
}



