import { NavLink } from "react-router-dom"
import styles from "./index.module.css"
import dog from "../../pug.jpg"
export default function Landing() {

    return (
        <div>
            <nav className={styles.navBar} >
                <h1 className={styles.title}>Dog App</h1>
                <div className={styles.homeButton} ><NavLink className={styles.link} to="/dogs">Home</NavLink></div>
            </nav>
            <img alt="Home" className={styles.dog} src={dog} />
        </div>
    )
}