import React, { useState, useEffect } from "react";
import styles from "../styles/HomepageBody.module.css";
import axios from "axios";
import Link from "next/link";

export default function HomepageBody() {
  const [activeRadio, setActiveRadio] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookList, setBookList] = useState([]);

  function handleRadioChange(e) {
    setActiveRadio(e.target.value);
    setBookList([]);
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    const url =
      activeRadio === "books"
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/books/getBooks/${searchQuery}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/authors/getAuthors/${searchQuery}`;

    if (searchQuery.length) {
      axios.get(url).then((res) => {
        setBookList(res.data.data);
        console.log(res.data.data);
      });
    } else {
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
        {bookList?.slice(0, 10).map((book) => (
          <Link
            href={
              activeRadio === "books"
                ? `/books/${book.id}`
                : `/authors/${book.id}`
            }
          >
            <div className={styles.bookItem} key={book.id}>
              {book.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
