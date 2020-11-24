import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRealestates } from "../../store/actions/index";
import SummaryCard from "../../components/summarycard/SummaryCard";

import styles from "./style.module.css";

const Map = props => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [city, setCity] = useState("stocksund"); //since its probably acquired from a previous page?
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    props.fetchRealestates(
      `/items/summaries?query=${city}&page=${page}${orderBy}&debt_category=all&tax_status=pure%2Cunpure%2Cactive`
    );
  }, []);

  useEffect(() => {
    if (
      props.realestates.realestates.organizations !== undefined &&
      props.realestates.realestates.organizations.length > 0
    ) {
      console.log("true");
      setItems(items.concat(props.realestates.realestates.organizations));
    }

    console.log("items", items);
  }, [props.realestates]);

  useEffect(() => {
    console.log("itemsReal", items);
  }, [items]);
  /*
  _score;desc - relevans - börjar på denna
  //default
  https://www.allabrf.se/items/summaries?query=Stockholm
  https://www.allabrf.se/items/summaries?query=stocksund&page=2&debt_category=all&tax_status=pure%2Cunpure%2Cactive
  https://www.allabrf.se/items/summaries?query=stocksund&page=2&debt_category=all&tax_status=pure%2Cunpure%2Cactive
  med klick
  //riktiga relevans
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
    setItems([]);
    setPage(1);
    setHasMore(true);
    //setOrderBy("");
    switch (val) {
      case "_score;desc":
        return setOrderBy("&order=_score%3Bdesc");
      case "price_per_m2;desc":
        return setOrderBy("&order=price_per_m2%3Bdesc");
      case "price_per_m2;asc":
        return setOrderBy("&order=price_per_m2%3Basc");
      case "debt_per_m2;desc":
        return setOrderBy("&order=debt_per_m2%3Bdesc");
      case "debt_per_m2;asc":
        return setOrderBy("&order=debt_per_m2%3Basc");
      case "fee_per_m2;desc":
        return setOrderBy("&order=fee_per_m2%3Bdesc");
      case "fee_per_m2;asc":
        return setOrderBy("&order=fee_per_m2%3Basc");
      case "price_per_m2;desc":
        return setOrderBy("&order=price_per_m2%3Bdesc");
      case "price_per_m2;asc":
        return setOrderBy("&order=price_per_m2%3Basc");
      case "rating;desc":
        return setOrderBy("&order=rating%3Bdesc");
      case "rating;asc":
        return setOrderBy("&order=rating%3Basc");
      default:
        return ""; //problematisk kanske då det inte blir en sök av det? 
    }
    //props.fetchRealestates("/items/summaries?query=stocksund&page=1&order=_score%3Bdesc&debt_category=all&tax_status=pure%2Cunpure%2Cactive");
  };

  useEffect(() => {
    console.log("currentPage", page);
    // vi vill inte köra en direkt vid start vilket händer iom setState
    // annars kör den direkt vid start vilken skulle kunna fixas genom att ta bort ovanstående, kanske bättre?
    if (orderBy !== "") {
      props.fetchRealestates(
        `/items/summaries?query=${city}&page=${page}${orderBy}&debt_category=all&tax_status=pure%2Cunpure%2Cactive`
      );
    }
  }, [orderBy]);

  const fetchMoreData = () => {
    /* Alla BRF ger oss "total": 52" från API:t (max 240) 12 sidor etc*/
    console.log(
      "fetchtotal",
      props.realestates.realestates.total !== undefined
        ? props.realestates.realestates.total -
            props.realestates.realestates.organizations.length
        : 0
    );
    if (
      items.length >=
      `${
        props.realestates.realestates.total !== undefined
          ? props.realestates.realestates.total
          : 0
      }`
    ) {
      //behöver bättre tweaking här för att få ett helt korrekt, förväntat resultat
      setHasMore(false);
      return;
    }

    //vi vet att vi sannolikt bryr oss om pages så vi kan ha en counter (om detta nu hade fungerat som det skulle);
    //var page; page++ etc och skickas med eller ännu bättre, ändra urlen som skickas in som parameter?
    //mtp sortBy ändrar page så kanske inte bra då
    setPage(page + 1);
    //http://www.drewleague.com/blog/ eller inte ändring av urlen? hmm
  };

  useEffect(() => {
    console.log("currentPage", page);
    if (page > 1) {
      // annars kör den direkt vid start vilken skulle kunna fixas genom att ta bort ovanstående, kanske bättre?
      props.fetchRealestates(
        `/items/summaries?query=${city}&page=${page}${orderBy}&debt_category=all&tax_status=pure%2Cunpure%2Cactive`
      );
    }
  }, [page]);

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
            loader={<h4 style={{ height: 200 }}>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            style={{ overflow: "hidden" }}
          >
            <div className={styles.summaryList}>
              <div className={`${styles.row} ${styles.summaryHeaderRow}`}>
                <div className={styles.colsm12}>
                  <small className={styles.resulttop}>
                    {/*Visar 20 resultat av 240*/}
                    Visar {items.length} resultat av{" "}
                    {props.realestates.realestates.total !== undefined
                      ? props.realestates.realestates.total
                      : 0}
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
                  <SummaryCard key={index} realestate={i} />
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
