import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {

     return (
          <main className={styles.main}>

               <h1>welcome</h1>
               <div>
                    <Link href="/timetable">Start here: Timetable</Link>
               </div>
          </main>
     );
}
