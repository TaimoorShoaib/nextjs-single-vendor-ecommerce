import style from "./loader.module.css";
import { ThreeCircles } from "react-loader-spinner";
export default function Loader({ text }) {
  return (
    <div className={style.loaderWrapper}>
      <h2>Loading {text}</h2>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
