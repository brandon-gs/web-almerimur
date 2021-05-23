import CustomLoader from "react-loader-spinner";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader">
      <CustomLoader type="Bars" color="#fff" height={80} width={80} />
    </div>
  );
}

export default Loader;
