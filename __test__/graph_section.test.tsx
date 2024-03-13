import { Graph_section } from "../src/app/components/body/graph_section/graph_section";
import { SelectPref } from "../src/app/components/body/body";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("graph_sectionのテスト", () => {
  test("人口グラフのタイプ選択があるか", () => {
    const dummyProps: SelectPref[] = [];
    render(<Graph_section selectPref={dummyProps} />);
    expect(screen.getByText("総人口")).toBeInTheDocument();
    expect(screen.getByText("年少人口")).toBeInTheDocument();
    expect(screen.getByText("生産年齢人口")).toBeInTheDocument();
    expect(screen.getByText("老年人口")).toBeInTheDocument();
  });
});
