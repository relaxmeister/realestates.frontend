import React from "react";

import styles from "./style.module.css";

const estate = 
{
    name: "Erik Dahlbergsgatan 52",
    org: "55555-555",
    average: undefined,
    mortgage: 5555,
    fee: 3333,
}

const SummaryCard = props => {
const { name, org, average, mortgage, fee} = estate;

  return (
    <div className={styles.summaryOrganization}>
      <div>
        <div className={styles.summaryTableContainer}>
          <table
            className={`${styles.table} ${styles.tableCondensed} ${styles.factoidTable} ${styles.hiddenXs} ${styles.pullLeft}`}
          >
            <tbody>
              <tr>
                <td>
                  <strong>{name}</strong>
                </td>
              </tr>
              <tr>
                <td>{org}</td>
                <td className={styles.colXs2}>
                  <small>Snittpris/m²</small>
                </td>
                <td className={styles.colXs2}>
                  <small>Belåning</small>
                </td>
                <td className={styles.colXs1}>
                  <small>Avgift/m²</small>
                </td>
              </tr>

              <tr>
                <td>Stockholm</td>
                <td className={styles.colXs2}>
                  <small>{average !== undefined ? average : "-"} kr</small>
                </td>
                <td className={styles.colXs2}>
                  <small>{mortgage !== undefined ? mortgage : "-"}</small>
                </td>
                <td className={styles.colXs1}>
                  <small>{fee !== undefined ? fee : "-"} kr</small>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            className={`${styles.table} ${styles.tableCondensed} ${styles.factoidTable} ${styles.hiddenSm} ${styles.hiddenMd} ${styles.hiddenLg} ${styles.pullLeft}`}
          >
            <tbody>
              <tr>
                <td colSpan="2" className={styles.colXs12}>
                  <strong>{name}</strong>
                </td>
              </tr>
              <tr>
                <td className={styles.colXs4}>Org.nr</td>
                <td className={styles.colXs8}>{org}</td>
              </tr>
              <tr>
                <td className={styles.colXs4}>Snittpris/m²</td>
                <td className={styles.colXs8}>{average !== undefined ? average : "-"} kr</td>
              </tr>
              <tr>
                <td className={styles.colXs4}>Belåning</td>
                <td className={styles.colXs8}>{mortgage !== undefined ? mortgage + " kr" : "-"}</td>
              </tr>
              <tr>
                <td className={styles.colXs4}>Avgift/m²</td>
                <td className={styles.colXs8}>{fee !== undefined ? fee : "-"} kr</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`${styles.summaryRating} ${styles.textCenter} ${styles.pullRight}`}
        >
          <img
            src={
              "https://www.allabrf.se/assets/rating_aa-cc72a022456ca7b5f97ac61e445a6453b5fc18189a15ea8c77b76fe79db432e2.png"
            }
          />
        </div>
        <div className={styles.clearfix}></div>
      </div>
    </div>
  );
};

export default SummaryCard;
