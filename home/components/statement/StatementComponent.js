import dynamic from "next/dynamic";
import Fallback from "../fallback/FallbackComponent";

const StatementComponent = dynamic(() => import("statement/StatementComponent"), {
  ssr: false,
  loading: (props) => <Fallback {...props} />
});


export {
  StatementComponent,
}



