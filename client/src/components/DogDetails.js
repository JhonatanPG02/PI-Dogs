import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import { getDetails, clearState } from '../action'
import Footer from './Footer'
import Loader from './Loader'
import styles from './DogDetails.module.css'
import img1 from '../images/can1.jpeg'
import img2 from '../images/can2.jpeg'

export default function DogDetails() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const dog = useSelector((state) => state.details)

    useEffect(() =>{
        dispatch(getDetails(id))
        return(() => dispatch(clearState()))
    }, [dispatch, id])
    
    return (
        <div>
            <nav className={styles.nav}>
                <Link to='/home'><button className={styles.button}>Home</button></Link>
            </nav>
            <div>
                <div className={styles.containerTotal}>
                    <div className={styles.imgTotal}>
                        <img src={img1} alt='imagen not found' className={styles.img2}/>
                    </div>
                    
                    <div className={styles.container}>
                    {dog.name  ?
                    <div>
                        <img src={dog.image} alt="no flag founded" className={styles.img}/>
                        <h2>🐶 {dog.name} 🐶</h2>
                        <p>Height Min: {dog.height_min} cm</p>
                        <p>Height Max: {dog.height_max} cm</p>
                        <p>Weight Min: {dog.weight_min} kg</p>
                        <p>Weight Max: {dog.weight_max} kg</p>
                        <p>Life Span: {dog.life_span} years</p>
                        <p className={styles.temp}>Temperaments: {dog.temperaments}</p>
                    </div>
                        : 
                    <div> 
                        <Loader/>   
                    </div>
                }
                    </div>
                    

                    <div className={styles.imgTotal}>
                    <img src={img2} alt='imagen not found' className={styles.img2}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}