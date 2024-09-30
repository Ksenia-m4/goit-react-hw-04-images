import { Circles } from "react-loader-spinner";
import { Spinner } from "./Loader.styled";

export const Loader = () => {
  return (
    <Spinner>
      <Circles height="80" width="80" ariaLabel="loading" color="#3f51b5" />
    </Spinner>
  );
};
