import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRealestates } from "../../store/actions/index";
import SummaryCard from "../../components/summarycard/SummaryCard";

import styles from "./style.module.css";

const Map = props => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    props.fetchRealestates();

    fetch("https://api.npms.io/v2/search?q=react")
      .then(response => response.json())
      .then(data => console.log("data total ", data.results));

    fetch("https://api.npms.io/v2/search?q=react")
      .then(response => response.json())
      .then(data => console.log("data total ", data));

      fetch("/items/summaries.json?query=stocksund")
      .then(response => response.json())
      .then(data => console.log("pooper ", data));
  }, []);

  useEffect(() => {
    console.log("reduxstate", props.realestates.realestates.results);
    if (props.realestates.realestates.organizations !== undefined && props.realestates.realestates.organizations.length > 0) {
      console.log("true")
      setItems(items.concat(props.realestates.realestates.organizations));
    }
    

    console.log("items", items);
  }, [props.realestates]);
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

  const sortBy = val => {
    //BÖR RESETTA TIDIGARE SÖKARRAY
    console.log(val);
    //props.fetchRealestates();
  };

  const fetchMoreData = () => {
    /* Alla BRF ger oss "total": 52" från API:t (max 240) 12 sidor etc*/
    if (items.length >= `${240}`) { //behöver bättre tweaking här för att få ett helt korrekt, förväntat resultat
      setHasMore(false);
      return;
    }
    //vi vet att vi sannolikt bryr oss om pages så vi kan ha en counter (om detta nu hade fungerat som det skulle);
    //var page; page++ etc och skickas med eller ännu bättre, ändra urlen som skickas in som parameter?
    //http://www.drewleague.com/blog/ eller inte ändring av urlen? hmm
    props.fetchRealestates();
  };

  return (
    <div className={styles.colmd12}>
      <div className={`${styles.row} ${styles.summarybrowser}`}>
        <div
          id="scrollableDiv"
          className={`${styles.colsm8} ${styles.colmd6} ${styles.listbox}`}
          style={{ height: 1838 }}
        >
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            style={{ overflow: 'hidden',}}
          >
            <div className={styles.summaryList}>
              <div className={`${styles.row} ${styles.summaryHeaderRow}`}>
                <div className={styles.colsm12}>
                  <small className={styles.resulttop}>
                    {/*Visar 20 resultat av 240*/}
                    Visar {items.length} resultat av {props.realestates.realestates.total !== undefined ? props.realestates.realestates.total : 0}
                  </small>
                  <div className={styles.pullRight}>
                    <label htmlFor="sorting">
                      <small>sortera:</small>
                    </label>
                    <select
                      className={`${styles.boxySelect} ${styles.boxySelectSmall}`}
                      name="sorting"
                      onChange={e => sortBy(e.target.value)}
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
                      <option value="debt_per_m2;asc">
                        Belåning (Stigande)
                      </option>
                      <option value="fee_per_m2;desc">
                        Avgift/m2 (Fallande)
                      </option>
                      <option value="fee_per_m2;asc">
                        Avgift/m2 (Stigande)
                      </option>
                      <option value="rating;desc">Betyg (Fallande)</option>
                      <option value="rating;asc">Betyg (Stigande)</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.summaryList}>
              {items.map((i, index) => (
                  <SummaryCard key={index} realestate={i}/>
                ))}
                {/*<div style={{ height: 500, width: "100%", paddingBottom: 40, marginTop: 20}}></div>*/}
                {/*<SummaryCard />
              <SummaryCard />*/}
                {/*<div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {items.map((i, index) => (
                  <SummaryCard key={index}/>
                ))}
              </InfiniteScroll>*}
                </div>*/}
              </div>
              {/*<div className={styles.textCenter}></div> verkar då inte längre ingå*/}
            </div>
          </InfiniteScroll>
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
