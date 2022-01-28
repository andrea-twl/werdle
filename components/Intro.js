import { path } from "./path-data.js";
import styles from "./Intro.module.css";

const Intro = () => {
  return (
    <div>
      <h1 className={styles.heading}>WERDLE</h1>
      <p className={styles.subHeading}>endless</p>
    </div>
  );
};

export default Intro;
