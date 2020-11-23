import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRealestates } from "../../store/actions/index";
import SummaryCard from "../../components/summarycard/SummaryCard";

import styles from "./style.module.css";

const Map = props => {
  useEffect(() => {
    fetchRealestates();
  }, []);

  /*
  _score;desc - relevans - börjar på denna
  https://www.allabrf.se/items/summaries?query=Stockholm
  med klick
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=_score%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  price_per_m2;desc
  https://www.allabrf.se/items/summaries?query=Stockholm&page=1&order=price_per_m2%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  price_per_m2;asc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=price_per_m2%3Basc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  debt_per_m2;desc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=debt_per_m2%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  debt_per_m2;asc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=debt_per_m2%3Basc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  fee_per_m2;desc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=fee_per_m2%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  fee_per_m2;asc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=fee_per_m2%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  rating;desc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=rating%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  rating;asc
  https://www.allabrf.se/items/summaries?query=stocksund&page=1&order=rating%3Basc&debt_category=all&tax_status=pure%2Cunpure%2Cactive

  */
 const sortBy = (val) => {
    console.log(val);
 }

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
                  <label htmlFor="sorting">
                    <small>sortera:</small>
                  </label>
                  <select
                    className={`${styles.boxySelect} ${styles.boxySelectSmall}`}
                    name="sorting"
                    onChange={(e) => sortBy(e.target.value)}
                  >
                    <option value="_score;desc">Relevans</option>
                    <option value="price_per_m2;desc">
                      Snittpris/m2 (Fallande)
                    </option>
                    <option value="price_per_m2;asc">
                      Snittpris/m2 (Stigande)
                    </option>
                    <option value="debt_per_m2;desc">
                      Belåning (Fallande)
                    </option>
                    <option value="debt_per_m2;asc">Belåning (Stigande)</option>
                    <option value="fee_per_m2;desc">
                      Avgift/m2 (Fallande)
                    </option>
                    <option value="fee_per_m2;asc">Avgift/m2 (Stigande)</option>
                    <option value="rating;desc">Betyg (Fallande)</option>
                    <option value="rating;asc">Betyg (Stigande)</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.summaryList}>
              {/*<div style={{ height: 500, width: "100%", paddingBottom: 40, marginTop: 20}}></div>*/}
              <SummaryCard />
              <SummaryCard />
            </div>
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

//export default Map;

const mapStateToProps = state => ({
  realestates: state.realestates
});

export default connect(mapStateToProps, {
  fetchRealestates
})(Map);
