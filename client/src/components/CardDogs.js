import React from 'react'
import {Link} from 'react-router-dom'
import styles from './CardDogs.module.css'

export default function CardDogs({id, image, name, weight_min, weight_max, temperaments}) {
    return (
        <div>
            <img src={image} alt='img dogs' className={styles.img}/>
            <h4 className={styles.text}>{name}</h4>
            <p className={styles.paf}>Weight min:{weight_min} kg</p>
            <p className={styles.paf}>Weight max:{weight_max} kg</p>
            <p className={styles.paf}>Temperaments: {temperaments}</p>
            <div className={styles.paf2}>
            <Link to={`/dogs/${id}`}><button className={styles.button}>View Details</button></Link>
            </div>
        </div>
    )
}
