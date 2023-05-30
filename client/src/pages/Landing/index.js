import { NavLink } from "react-router-dom"
import styles from "./index.module.css"
import pug from "../../pug.jpg"
import golden from "../../golden.jpg"
import family from "../../family.jpg"
import littleDog from "../../littleDog.jpg"

export default function Landing() {

    return (
        <div style={{display: 'flex'}}>
            <div className={styles.imagesContainer}>
                <img alt="Home" className={styles.dog} src={pug} />
                <img alt="Home" className={styles.dog} src={golden} />
                <img alt="Home" className={styles.dog} src={family} />
                <img alt="Home" className={styles.dog} src={littleDog} />
            </div>
            <nav className={styles.navBar} >
                <h1 className={styles.title}>Dog App</h1>
                <div className={styles.homeButton} ><NavLink className={styles.link} to="/dogs">Home</NavLink></div>
            </nav>
        </div>
    )
}