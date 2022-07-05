import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div>
             <p className={styles.title}>Loading...</p>
             <img className={styles.img}src='https://c.tenor.com/eWD0v1SeTY8AAAAi/hh.gif' alt=''/>
     </div>
    )
}