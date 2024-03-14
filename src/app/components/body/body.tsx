"use client";

import { Prefectures_section } from "@/app/components/body/prefectures_section/prefectures_section";
import { Graph_section } from "@/app/components/body/graph_section/graph_section";
import styles from "./body.module.css";
import { SelectPrefProvider } from "@/app/provider/select_pref_provider";

export const Body = () => {
  return (
    <SelectPrefProvider>
      <section className={styles.body}>
        <Prefectures_section />
        <Graph_section />
      </section>
    </SelectPrefProvider>
  );
};
