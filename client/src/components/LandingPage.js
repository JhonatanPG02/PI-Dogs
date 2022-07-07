import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import img1 from '../images/huella.png'

export default function LandingPage() {
    return(
        <div className={styles.page}>
        <p className={styles.h1}>Dog App</p>
        <Link to='/home'>
            <button className={styles.button}><img className={styles.img}src={img1} alt='imagen dog'/></button>
        </Link>
    </div>
    )
}