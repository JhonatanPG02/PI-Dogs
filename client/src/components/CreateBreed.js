import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTemperaments, postDogs} from '../action'
import {Link, useHistory} from 'react-router-dom'
import Footer from './Footer'
import styles from './CreateBreed.module.css'
import img1 from '../images/perro1.jpeg'
import img2 from '../images/perro2.jpeg'
import Swal from 'sweetalert2'

export default function CreateBreed() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allDogs = useSelector( (state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_spanmin: '',
        life_spanmax: '',
        temperaments: []
    })
//Validaciones
function validate(input) {
    const existeName = allDogs.filter(e => e.name.toLowerCase() === input.name.toLowerCase())
    console.log(existeName)
    let errors = {}
    if(!input.name) {
        errors.name='Name is required'
    } else if(input.name.length < 3) {
        errors.name = 'The name is invalid'
    } else if(!input.name.match( (/^[A-Za-z]+$/))){
        errors.name = 'Name of breed must contain only letters'
    } else if(existeName.length > 0){
        errors.name = 'breed name already exists'
    }
    if(!input.height_min){
        errors.height_min = 'height_min is required'
    } else if (parseInt(input.height_min) >= parseInt(input.height_max)){
        errors.height_min = 'height_min cannot be greater than or equal to height_max'
    }
    if(!input.height_max){
        errors.height_max = 'height_max is required'
    } else if (parseInt(input.height_max) < parseInt(input.height_min)){
        errors.height_max = 'height_max cannot be less than height_min'
    }
    if(!input.weight_min){
        errors.weight_min = 'weight_min is required'
    } else if (parseInt(input.weight_min) >= parseInt(input.weight_max)){
        errors.weight_min = 'weight_min cannot be greater than or equal to weight_max'
    }
    if(!input.weight_max){
        errors.weight_max = 'weight_max is required'
    } else if (parseInt(input.weight_max) < parseInt(input.weight_min)){
        errors.weight_max = 'weight_max cannot be less than weight_min'
    }
    if(!input.life_spanmin){
        errors.life_spanmin = 'life_spanmin is required'
    } else if (parseInt(input.life_spanmin) >= parseInt(input.life_spanmax)){
        errors.life_spanmin = 'life_spanmin cannot be greater than or equal to life_spanmax'
    }
    if(!input.life_spanmax){
        errors.life_spanmax = 'life_spanmax is required'
    } else if (parseInt(input.life_spanmax) < parseInt(input.life_spanmin)){
        errors.life_spanmax = 'life_spanmax cannot be greater than life_spanmin'
    }
    return errors
}

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch])

    function handleChange(e){
        setInput({...input, [e.target.name]: e.target.value})
        setErrors(validate({...input, [e.target.name] : e.target.value}))
    }

    function handleSumbit(e){
        e.preventDefault()
        if(!input.name || !input.height_min || !input.height_max || !input.weight_max || !input.weight_min  || !input.life_spanmin || !input.life_spanmax || input.temperaments.length === 0) {
            Swal.fire('Complete all options')
        } else if (errors.name || errors.height_min || errors.height_max || errors.weight_max || errors.weight_min || errors.life_span || errors.temperaments) {
            Swal.fire('incorrect data')
        } else {setErrors(validate(input))
        dispatch(postDogs(input))
        Swal.fire('Breed created succesfully!')
        setInput({
        name: '',
        image: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_spanmin: '',
        life_spanmax: '',
        temperaments: []
        })
        history.push('/home')
        }
    }

    function handleSelect(e) {
        if(Object.values(input.temperaments).includes(e.target.value)){
            alert('duplicate temperament')
        } else {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
        }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t => t !== e)
        })
    }

    return (
        <div>
            <nav className={styles.nav}>
                <Link to='/home'><button className={styles.buttonhome}>HOME</button></Link>
            </nav>
            <div className={styles.containerTotal}>
            <div className={styles.imgTotal}>
                <img src={img1} alt='imagen dog' className={styles.img1}/>
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>CREATE BREED</h2>
                <form onSubmit={(e) => handleSumbit(e)} className={styles.form}>
                    <div>
                        <label>Name:</label>
                        <input type='text' placeholder='breed name' value={input.name} name='name' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>
                    <div>
                        <label>Picture:</label>
                        <input type='url' placeholder= 'enter image url' value={input.image} name='image' onChange={(e)=> handleChange(e)} className={styles.input}/>
                    </div>
                    <div>
                        <label>Height min:</label>
                        <input type='number' placeholder= 'cm' value={input.height_min} name='height_min' min='1' max='150' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.height_min && <p className={styles.error}>{errors.height_min}</p>}
                    </div>
                    <div>
                        <label>Height max:</label>
                        <input type='number' placeholder= 'cm' value={input.height_max} name='height_max' min='1' max='150' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.height_max && <p className={styles.error}>{errors.height_max}</p>}
                    </div>
                    <div>
                        <label>Weight min:</label>
                        <input type='number' placeholder= 'kg' value={input.weight_min} name='weight_min' min='1' max='150' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.weight_min && <p className={styles.error}>{errors.weight_min}</p>}
                    </div>
                    <div>
                        <label>Weight max:</label>
                        <input type='number' placeholder= 'kg' value={input.weight_max} name='weight_max' min='1' max='150' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.weight_max && <p className={styles.error}>{errors.weight_max}</p>}
                    </div>
                    <div>
                        <label>Life_spanmin:</label>
                        <input type='number' placeholder= 'year' value={input.life_spanmin} name='life_spanmin' min='1' max='100' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.life_spanmin && <p className={styles.error}>{errors.life_spanmin}</p>}
                    </div>
                    <div>
                        <label>Life_spanmax:</label>
                        <input type='number' placeholder= 'year' value={input.life_spanmax} name='life_spanmax' min='1' max='100' onChange={(e)=> handleChange(e)} className={styles.input}/>
                        {errors.life_spanmax && <p className={styles.error}>{errors.life_spanmax}</p>}
                    </div>
                    <div>
                        <label>Temperaments: </label>
                        <select onChange={(e) => handleSelect(e)} className={styles.input}>
                        <option hidden>All Temperaments</option> 
                            {
                                allTemperaments.map(e=> (
                                <option key={e.id} value={e.name}>{e.name}</option>
                                ))
                            }
                        </select>
                        {errors.temperaments && <p className={styles.error}>{errors.temperaments}</p>}
                    </div>
                        { input.temperaments.map(e =>
                            <div key={e} className={styles.elements}>
                                <p className={styles.element}>{e}
                                <button type='button' onClick={() => handleDelete(e)} className={styles.buttonX}>x</button>
                                </p>
                            </div>
                    
                        )}  
                    <div className={styles.divbutton}>
                        <button type='submit' className={styles.button}>CREATE</button>
                    </div>
                </form>
            </div>
            <div className={styles.imgTotal}>
                <img src={img2} alt='imagen dog' className={styles.img2}/>
            </div>
            </div>
            <Footer/>
        </div>
    )
}