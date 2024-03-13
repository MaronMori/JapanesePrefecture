import styles from "./prefectures_section.module.css";
import React, { useEffect, useState } from "react";

interface Prefecture {
  prefName: string;
  prefCode: number;
}

interface Prefectures_section_Props {
  handleSelectPref: (
    prefName: string,
    prefCode: number,
    isChecked: boolean,
  ) => void;
}
export const Prefectures_section: React.FC<Prefectures_section_Props> = ({
  handleSelectPref,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    async function getPrefectures() {
      try {
        const result = await fetch("api/getPrefectures", {
          method: "GET",
        });
        if (!result.ok) {
          console.log("APIのリクエストを失敗しました。");
          return;
        }
        const data = await result.json();
        setPrefectures(data.result);
      } catch (error) {
        console.log("APIにリクエストを送れませんでした。");
        return;
      }
    }
    getPrefectures();
  }, []);

  if (!prefectures || prefectures[0] == undefined) {
    return <div>Loading</div>;
  }
  return (
    <div className={styles.prefectures}>
      {prefectures.map((prefecture, index) => {
        return (
          <div key={index} className={styles.prefecture}>
            <input
              type={"checkbox"}
              id={prefecture.prefName}
              onChange={(e) =>
                handleSelectPref(
                  prefecture.prefName,
                  prefecture.prefCode,
                  e.target.checked,
                )
              }
            />
            <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
          </div>
        );
      })}
    </div>
  );
};
