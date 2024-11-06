"use client";

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const workerRef = React.useRef<Worker>();

  React.useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));

    workerRef.current.onmessage = (event) => {
      console.log(event.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={() => workerRef.current?.postMessage("hello world")}>
          send message (check console)
        </button>
        <Link href="/issue">go to issue</Link>
      </main>
    </div>
  );
}
