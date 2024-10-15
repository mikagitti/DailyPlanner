import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {

     return (

          <div className={styles.main}>
               <div className={styles.card}>
                    <div className={styles.welcome}>Welcome</div>
                    <div className={styles.text}>Start planning your day</div>
               </div>
               <button className={styles.button}>
                    <Link className={styles.link} href="/timetable">Timetable</Link>
               </button>
          </div>

     );
}
