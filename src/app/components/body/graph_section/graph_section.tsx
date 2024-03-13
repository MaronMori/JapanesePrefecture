import React, { useEffect, useState } from "react";
import { SelectPref } from "../body";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Styles from "./graph_section.module.css";

interface Graph_section_props {
  selectPref: SelectPref[];
  isFetching: boolean;
  setIsFetching: (argument: boolean) => void;
}

export const Graph_section: React.FC<Graph_section_props> = ({
  selectPref,
  isFetching,
  setIsFetching,
}) => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [graphType, setGraphType] = useState(0);

  useEffect(() => {
    const series: Highcharts.SeriesOptionsType[] = [];
    const categories: string[] = [];

    for (const pref of selectPref) {
      const data: number[] = [];

      const popData = pref.data.result.data[graphType];
      popData.data.map((value) => data.push(value.value));
      if (categories.length == 0) {
        popData.data.map((value) => categories.push(String(value.year)));
      }
      series.push({
        type: "line",
        name: pref.prefName,
        data: data,
      });
    }

    setOptions({
      title: {
        text: "都道府県人口",
      },
      series:
        series.length === 0
          ? [{ type: "line", name: "都道府県名", data: [] }]
          : series,
      xAxis: {
        title: {
          text: "年度",
        },
        categories: categories,
      },
      yAxis: {
        title: {
          text: "人口数",
        },
      },
    });
    setIsFetching(false);
  }, [selectPref, graphType]);

  const handleSelectGraph = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: number,
  ) => {
    e.preventDefault();

    setGraphType(type);
  };

  return (
    <div className={Styles.section}>
      <div className={Styles.type_pop}>
        <h2 className={Styles.type_title}>グラフの種類</h2>
        <div className={Styles.radio_buttons}>
          <div>
            <input
              name={"type"}
              id={"総人口"}
              type={"radio"}
              checked={graphType == 0}
              onChange={(e) => handleSelectGraph(e, 0)}
            />
            <label htmlFor={"総人口"}>総人口</label>
          </div>
          <div>
            <input
              name={"type"}
              id={"年少人口"}
              type={"radio"}
              checked={graphType == 1}
              onChange={(e) => handleSelectGraph(e, 1)}
            />
            <label htmlFor={"年少人口"}>年少人口</label>
          </div>
          <div>
            <input
              name={"type"}
              id={"生産年齢人口"}
              type={"radio"}
              checked={graphType == 2}
              onChange={(e) => handleSelectGraph(e, 2)}
            />
            <label htmlFor={"生産年齢人口"}>生産年齢人口</label>
          </div>
          <div>
            <input
              name={"type"}
              id={"老年人口"}
              type={"radio"}
              checked={graphType == 3}
              onChange={(e) => handleSelectGraph(e, 3)}
            />
            <label htmlFor={"老年人口"}>老年人口</label>
          </div>
        </div>
      </div>
      {isFetching && <div className={Styles.loading}>Loading</div>}
      <div className={Styles.graph_section}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
