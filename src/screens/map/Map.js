import React from "react";

import styles from "./style.module.css";

const Map = props => {
  return (
    <div className={styles.colmd12}>
      <div className={`${styles.row} ${styles.summarybrowser}`}>
        <div
          className={`${styles.colsm8} ${styles.colmd6} ${styles.listbox}`}
          style={{ height: 1838 }}
        >
          <div className={styles.summaryList}>
            <div className={`${styles.row} ${styles.summaryHeaderRow}`}>
              <div className={styles.colsm12}>
                <small className={styles.resulttop}>
                  Visar 20 resultat av 240
                </small>
                <div className={styles.pullRight}>
                  <label for="sorting">
                    <small>sortera:</small>
                  </label>
                  <select className={`${styles.boxySelect} ${styles.boxySelectSmall}`} name="sorting">
                    <option>Relevans</option>
                    <option>Snittpris/m2 (Fallande)</option>

                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.summaryList}></div>
            <div className={styles.textCenter}></div>
          </div>
        </div>

        <div
          className={`${styles.colsm4} ${styles.colmd6} ${styles.mapbox} ${styles.hidden}`}
        >
          <div
            style={{
              width: "100%",
              height: 1838,
              position: "relative",
              overflow: "hidden"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
