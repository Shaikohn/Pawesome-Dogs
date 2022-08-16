import { Link } from "react-router-dom"
import styles from "./index.module.css"

export default function Dog ({name, image, id, temperament, temperaments, weight_min, weight_max}) {

    return (
        <Link className={styles.linkStyle} to={`/dogs/${id}`}>
        <div key={id} className={styles.container}>
            <div className={styles.div_image} >
                <img alt={name} className={styles.image} src={image} />
            </div>
            <div className={styles.div_info}>
                <div>
                    <p className={styles.name}> {name} </p>
                </div>
                <div>
                    <p className={styles.weight}> {`${weight_min} - ${weight_max}`} KG </p>
                </div>
                <div>
                    <p className={styles.temperaments}>{temperament}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}