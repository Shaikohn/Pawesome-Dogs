import { useHistory } from "react-router-dom";
import sad_dog from "../../dog-sad.gif"
import styles from "./Error404.module.css"

export default function Error404() {

    let history = useHistory();

    function handleClick(){
        history.goBack()
    }

    return (
        <div className={styles.container} >
            <h1>Sorry, that page doesn't exist</h1>
            <img alt="sad_dog"  className={styles.img} src={sad_dog} />
            <div  className={styles.buttonContainer}><button className={styles.button} onClick={handleClick}>{"<== Go Back"}</button></div>
        </div>
    )
}