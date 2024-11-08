"use client";

import { useParams } from "next/navigation";
import styles from "./bulkdeletepage.module.css";
// import styles from '../detail.module.css'
import { ReactNode } from "react";

// test

const BulkDeletePage = () :ReactNode => {
  const params = useParams();
  const releaseId = params.id; 
  console.log(releaseId);

  // Sample data to populate the table
  const data = [
    { name: "Component 1",
      type: "Type A",
      operation: "Delete"},
    // Add your sample data here
  ];

  const handleBulkDelete = () => {
    console.log(`Executing bulk delete for release ID: ${releaseId}`);
    // Add your bulk delete logic here
  };

  return (
    <div className={styles.container}>
      <h1>Components</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.operation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        className={styles.bulkDeleteButton}
        onClick={handleBulkDelete}
      >
        Bulk Delete Execution
      </button>
    </div>
  );
};

export default BulkDeletePage;
