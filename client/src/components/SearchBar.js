import {React, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getByName } from '../action'
import styles from './SearchBar.module.css'
import Swal from 'sweetalert2'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName]= useState('')
    
    function handleInputChange(e){
        setName(e.target.value)
    }

    function hundleSubmit(e){
        if(name.length < 3) {
            Swal.fire('Incomplete Data')
        } else {
        e.preventDefault()
        dispatch(getByName(name))
        setName('')
        setCurrentPage(1)
        }
    }

    return (
        <div>
            <input type='text' placeholder='Find your breed' value={name} onChange={(e) => handleInputChange(e)} className={styles.input}/>
            <button type= 'submit' onClick={(e) => hundleSubmit(e)} className={styles.button}>Search 🦴</button>
        </div>
    )
}