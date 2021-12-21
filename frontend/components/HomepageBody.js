import React, { useState, useEffect } from "react";
import styles from "../styles/HomepageBody.module.css";
import axios from "axios";

export default function HomepageBody() {
  const [activeRadio, setActiveRadio] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookList, setBookList] = useState([]);

  function handleRadioChange(e) {
    setActiveRadio(e.target.value);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    if (searchQuery.length)
      axios
        .get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/books/getBooks/" + searchQuery
        )
        .then((res) => {
          setBookList(res.data.data);
          console.log(res.data.data);
        });
    else {
      setBookList([]);
    }
  }, [searchQuery]);

  return (
    <div className={styles.root}>
      <div className={styles.searchDiv}>
        <h1 className={styles.searchTitle}>Search</h1>
        <div className={styles.radioGroup}>
          <input
            value="books"
            checked={activeRadio === "books"}
            onChange={handleRadioChange}
            type="radio"
          />
          <label>Books</label>
          <input
            value="authors"
            checked={activeRadio === "authors"}
            onChange={handleRadioChange}
            type="radio"
          />
          <label>Authors</label>
        </div>
        <input
          onChange={handleInputChange}
          className={styles.bigSearch}
          type="text"
        />
      </div>
      <div className={styles.autoComplete}>
        {bookList.slice(0, 10).map((book) => (
          <div className={styles.bookItem} key={book.id}>
            {book.title}
          </div>
        ))}
      </div>
    </div>
  );
}
