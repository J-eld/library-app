import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import styles from "../../styles/Books.module.css";

export default function Authors() {
  const router = useRouter();
  const [authorDetails, setAuthorDetails] = useState([]);

  useEffect(() => {
    if (router.query.author_id) {
      axios
        .get(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/authors/getAuthorDetails/" +
            router.query.author_id
        )
        .then((res) => {
          setAuthorDetails(res.data.data);
        });
    }
  }, [router.query]);
  return (
    <div className="container">
      <Header />
      <div className={styles.root}>
        <div>
          <h2>Title: </h2>
          <div className={styles.bookTitle}>{authorDetails.title}</div>
        </div>
        <div>
          <h2>biography: </h2>
          <div
            className={styles.bookTitle}
            dangerouslySetInnerHTML={{ __html: authorDetails.biography }}
          ></div>
        </div>
      </div>
    </div>
  );
}
