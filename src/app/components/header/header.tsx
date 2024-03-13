import Styles from "./header.module.css";

export const Header = () => {
  return (
    <section className={Styles.header}>
      <h1 className={Styles.title}>都道府県別人口推移</h1>
    </section>
  );
};
