import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import styles from "../../styles/Books.module.css";

export default function Books() {
  const router = useRouter();
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    if (router.query.book_id) {
      axios
        .get(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/books/getBookDetails/" +
            router.query.book_id
        )
        .then((res) => {
          setBookDetails(res.data.data);
        });
    }
  }, [router.query]);

  return (
    <div className="container">
      <Header />
      <div className={styles.root}>
        <div>
          <h2>Title: </h2>
          <div className={styles.bookTitle}>{bookDetails.title}</div>
        </div>
        <div>
          <h2>Author: </h2>
          <div className={styles.bookTitle}>{bookDetails.author}</div>
        </div>
        <div>
          <h2>pages: </h2>
          <div className={styles.bookTitle}>{bookDetails.pages}</div>
        </div>
        <div>
          <h2>subjects: </h2>
          <div className={styles.bookTitle}>{bookDetails.subjects}</div>
        </div>
        <div>
          <h2>overview: </h2>
          <div
            className={styles.bookTitle}
            dangerouslySetInnerHTML={{ __html: bookDetails.overview }}
          ></div>
        </div>
        <div>
          <h2>synopsis: </h2>
          <div
            className={styles.bookTitle}
            dangerouslySetInnerHTML={{ __html: bookDetails.synopsis }}
          ></div>
        </div>
      </div>
    </div>
  );
}
