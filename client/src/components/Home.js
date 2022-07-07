import {React, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { getAllDogs,
         getAllTemperaments, 
         orderByName,
         orderByWeight,
         filterTemperaments,
         filterBreeds,
        } from '../action'
import SearchBar from './SearchBar'
import CardDogs from './CardDogs'
import Paginated from './Paginated'
import Footer from './Footer'
import Loader from './Loader'
import styles from './Home.module.css'
import imgdog from '../images/icon1.png'
import imgdog2 from '../images/dog3.png'

export default function Home() {

    const dispatch = useDispatch()
    const allDogs = useSelector( (state) => state.dogs)
    const allTemperaments = useSelector( (state) => state.temperaments)
    const [/*order*/, setOrder] = useState('') 
    //Aplicando paginado
    const [currentPage, setCurrentPage] = useState(1)       //inicia pagina 1
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8)       //8 x pagina
    const lastDogsPerPage = currentPage * dogsPerPage       // 8
    const firstDogsPerPage = lastDogsPerPage - dogsPerPage  // 0
    const currentDogs = allDogs.slice(firstDogsPerPage, lastDogsPerPage)


    const paginar = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getAllTemperaments())
    }, [dispatch])

    function handleClick(e) {
        dispatch(getAllDogs())
        setCurrentPage(1)
    }

    function handleOrderName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleOrderWeight(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleFilterTemperaments(e) {
        e.preventDefault()
        dispatch(filterTemperaments(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterBreeds(e) {
        e.preventDefault()
        dispatch(filterBreeds(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <img src={imgdog} alt='imagen dog' className={styles.imglogo}/>
                    <p>PI DOGS</p> 
                </div>
                <SearchBar setCurrentPage ={setCurrentPage}/>
            </nav>
            <div className={styles.container}>
                <div className={styles.bar1}>
                    <div className={styles.create}>
                        <button className={styles.button} onClick={e => handleClick(e)}>REFRESH</button>
                    </div>
                    <label className={styles.text}>Order</label>
                    <select className={styles.select} onChange={e => handleOrderName(e)}>
                        <option hidden>Order By Name</option>
                        <option value='asc name'>A-Z</option>
                        <option value='desc name'>Z-A</option>
                    </select><br/>
                    <select className={styles.select} onChange={e => handleOrderWeight(e)}>
                        <option hidden>Order By weight</option>
                        <option value='min'>Weight min</option>
                        <option value='max'>Weight max</option>
                    </select><br/>
                    <label className={styles.text}>Filter</label>
                    <select className={styles.select} onChange={e => handleFilterTemperaments(e)}>
                        <option value='All'>All Temperaments</option>
                        {allTemperaments && allTemperaments.map(e => (
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                        )}
                    </select><br/>
                    <select className={styles.select} onChange={e => handleFilterBreeds(e)}>
                        <option value='all breeds'>All Breeds</option>
                        <option value='api'>Existent</option>
                        <option value='created'>Created</option>
                    </select>
                    <div className={styles.create}>
                        <Link to='/create'><button className={styles.button}>CREATE BREED</button></Link><br/>
                    </div>
                        <img src={imgdog2} alt='imagen dog' className={styles.imglogo2}/>
                </div>
                <div className={styles.bar2}>
                    <h2 className={styles.title}>Dog Breed App</h2>
                    <div className={styles.paginated}>
                        <Paginated
                            //dogsPerPage ={dogsPerPage}
                            //allDogs = {allDogs.length}
                            //paginated = {paginated}
                            pageFunction={paginar} 
                            data={dogsPerPage} 
                            current={currentPage}
                        />
                    </div>
                    <div className={styles.cards}>
                        {currentDogs.length ? currentDogs.map( e => (
                            <div key={e.id} className={styles.card}>
                            <CardDogs
                            id={e.id}
                            name={e.name}
                            image={e.image}
                            weight_min={e.weight_min}
                            weight_max={e.weight_max}
                            temperaments={e.temperaments}
                            />
                            </div>
                        )
                        ) : 
                            <div> 
                                <Loader/>
                            </div>
                        }
                    </div>
                </div>              
            </div>
            <Footer/>
        </div>    
    )
}