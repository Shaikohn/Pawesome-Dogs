import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import styles from "./index.module.css"

export default function NavBar() {

    let history = useHistory();

    function handleClick(){
        history.goBack()
    }

    return (
        <div className={styles.navContainer}>
            <button className={styles.button} onClick={handleClick}>{"<== Go Back"}</button>
            <Link to="/dogs" className={styles.linkStyle}>Home</Link>
            <Link to="/dogs/create" className={styles.linkStyle}>Create a Breed</Link> 
        </div>
    )
}