import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div className={styles.page}>
        <p className={styles.h1}>Welcome to the dog app</p>
        <Link to='/home'>
            <button className={styles.button}>Enter</button>
        </Link>
    </div>
    )
}