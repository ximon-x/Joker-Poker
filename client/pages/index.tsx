import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Joker Poker</title>
        <meta
          name='description'
          content='A splendid card game deployed on the NEAR blockchain'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <h1 className={styles.title}>Joker Poker</h1>
        <p className={styles.description}>
          Guess the Card! Earn some Tokens in the process!!!
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Higher or Lower?</h2>
            <p>
              Enter a value and then decide if the picked card will be Lower or
              Higher in value. You win 10 points if you guess correctly!
            </p>
            <input placeholder='Enter a number'></input>
          </a>

          <a className={styles.card}>
            <h2>Guess the Card!</h2>
            <p>
              Predict both the Rank and Suit of the card. You win
              <em> 1000 points</em> if you guess correctly
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://simon-samuel.netlify.app/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Created with 🤍 by Simon Samuel 🫣
        </a>
      </footer>
    </div>
  );
}
