import Menu from "@/components/menu/menu";
import styles from "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Menu/>
      <Component {...pageProps}/>
    </>
  );
}
