"use client";

import { Prefectures_section } from "@/app/components/body/prefectures_section/prefectures_section";
import { Graph_section } from "@/app/components/body/graph_section/graph_section";
import styles from "./body.module.css";
import React, { useState } from "react";

interface Population {
  message: boolean;
  result: {
    boundaryYear: number;
    data: [
      {
        label: string;
        data: [
          {
            year: number;
            value: number;
          },
        ];
      },
    ];
  };
}

export interface SelectPref {
  prefName: string;
  prefCode: number;
  data: Population;
}

export const Body = () => {
  const [selectPref, setSelectPref] = useState<SelectPref[]>([]);
  const handleSelectPref = async (
    e: React.ChangeEvent<HTMLInputElement>,
    prefName: string,
    prefCode: number,
    isCheck: boolean,
  ) => {
    if (isCheck) {
      try {
        const result = await fetch("api/getPopulation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prefCode: prefCode,
          }),
        });
        if (!result.ok) {
          console.log("バックエンドからのデータの取得に失敗しました。");
        }
        const data: Population = await result.json();
        const newSelectPref: SelectPref = {
          prefName: prefName,
          prefCode: prefCode,
          data: data,
        };
        setSelectPref([...selectPref, newSelectPref]);
      } catch (error) {
        console.log("バックエンドへのリクエストに失敗しました: " + error);
      }
    } else {
      const filterSelectPref = selectPref.filter(
        (pref) => pref.prefCode !== prefCode,
      );
      setSelectPref(filterSelectPref);
    }
  };

  return (
    <section className={styles.body}>
      <Prefectures_section handleSelectPref={handleSelectPref} />
      <Graph_section selectPref={selectPref} />
    </section>
  );
};
