"use client";

import React from "react";
import styles from "../page.module.css";

export default function Home() {
  const worker = useWorker("./worker.ts");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={() => worker.current?.postMessage("hello world")}>
          send message (check console)
        </button>
      </main>
    </div>
  );
}

function useWorker(path: string) {
  const workerRef = React.useRef<Worker>();

  React.useEffect(() => {
    workerRef.current = new Worker(new URL(path, import.meta.url));

    return () => {
      workerRef.current?.terminate();
    };
  }, [path]);

  return workerRef;
}
