import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

const changeTheme = () => {
  let theme = localStorage.getItem("blog-theme");
  if (theme === "dark") {
    theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    theme = "dark";
    document.documentElement.classList.remove("light");
  }

  document.documentElement.classList.add(theme);
  localStorage.setItem("blog-theme", theme);
};
const Header = () => {
  return (
    <header className="flex justify-between py-5 items-center ">
      <nav className={styles.nav}>
        <ul className="flex items-center">
          <li>
            <Link href="/" className="flex items-center">
              <Image
                src={require("@/assets/images/favicon.png")}
                width={25}
                height={25}
                alt="Picture of the author"
                className="mr-2"
              />
              Home
            </Link>
          </li>
          <li className="mx-8">
            <a href="http://mocaii.cn/" target="_blank">
              ·灵感漫游记
            </a>
          </li>
          <li>
            <a href="https://mocaii.github.io/" target="_blank">
              ·旧博客
            </a>
          </li>
        </ul>
      </nav>

      <label className={styles.switch}>
        <input type="checkbox" id="switchToggle" onClick={() => changeTheme()} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </header>
  );
};

export default Header;
