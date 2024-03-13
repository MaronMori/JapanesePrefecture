import styles from "./page.module.css";
import { Header } from "@/app/components/header/header";
import { Body } from "@/app/components/body/body";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Body />
    </main>
  );
}
