import { Header } from "../src/app/components/header/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("HeaderTest", () => {
  it("都道府県別人口推移がタイトルとして表示", () => {
    render(<Header />);
    expect(screen.getByText("都道府県別人口推移")).toBeInTheDocument();
  });
});
