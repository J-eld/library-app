import React from "react";
import styles from "../styles/Header.module.css";
import Book from "../assets/book.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.root}>
      <Link href="/">
        <div className={styles.title}>
          <Image src={Book} />
          <h1 className={styles.titleText}>Library App</h1>
        </div>
      </Link>
      <div className={styles.loginSignupButtons}>
        <Link href="/login">
          <button className="btn">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
}
