// StockTable.js

import React from 'react';
import styles from './StockTable.module.css'; // Import CSS for styling the table

const StockTable = ({ tableData }) => {
  const headers = Object.keys(tableData); // Get the keys of the payload data as table headers

  return (
    <div className= {styles["stock-table-container"]}>
      <table className={styles["stock-table"]}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{tableData[header]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
