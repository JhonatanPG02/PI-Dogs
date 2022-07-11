import {React, useState} from 'react'
import style from './Paginated.module.css'
import {useSelector} from 'react-redux'


export default function Paginated({pageFunction, data, current}) {

    const allDogs = useSelector((state) => state.dogs);

    const [pageDisplayed, /*setPageDisplayed*/] = useState(4);
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(4);
    const [minPageDisplayed, setMinPageDisplayed] = useState(0);


    const arrayPaginado = [];
    const max = Math.ceil(allDogs.length / data);

    for (let n = 1; n <= max; n++) {
        arrayPaginado.push(n)
    }

    const movePages = (page) => {
        if (page === arrayPaginado?.length) {
            movePagesPrevius(0)
            setMaxPageDisplayed(4);
            setMinPageDisplayed(0);

        } else {
            if (page === 0) page = arrayPaginado?.length;
            let maxi = page + pageDisplayed - 1;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi);
            setMinPageDisplayed(mini);
        }
    }

    const movePagesPrevius = (page) => {
        if (page === 1) movePages(0)
        else if (page <= 2 && page > 0) {
            setMaxPageDisplayed(4);
            setMinPageDisplayed(0);
        }
        else {
            if (page === 0) page = 1;
            let maxi = page + pageDisplayed - 3;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi);
            setMinPageDisplayed(mini);
        }
    }


    const handleClik = (page) => {
        movePages(page);
        pageFunction(page);
    }

    const firstPage=(e) => {
        e.preventDefault()
        movePages(1)
        pageFunction(1)
    }

    const lastPage=(e) => {
        e.preventDefault()
        movePages(max - 1 )
        pageFunction(max)
    }

    const previous = (e, page) => {
        e.preventDefault();
        movePagesPrevius(page);
        if (page === 1) {
            pageFunction(arrayPaginado?.length);
        }
        else pageFunction(page - 1);
    }

    const next = (e, page) => {
        e.preventDefault()
        movePages(page);
        if (page === arrayPaginado?.length) {
            pageFunction(1);
        }
        else {
            pageFunction(page + 1)
        }
    }

    const renderPageNumber = arrayPaginado?.map((pages) => {

        if (pages < maxPageDisplayed + 1 && pages > minPageDisplayed - 1) {
            return <li key={pages} id={pages} className={current === pages ? style.active : null} onClick={() => handleClik(pages)}>
                <ul className={style.listaPag} >{pages}</ul>
            </li>
        } else {
            return null;
        }
    });


    return (
        <nav className={style.all}>
            <button className={style.previous} onClick={(e) => firstPage(e)} disabled={current <= 1} >{'|< First'}</button>
            <button className={style.previous} onClick={(e) => previous(e, current)} disabled={current <= 1}> {'< Prev'} </button>

            <ul className={style.listaPag}>
                {renderPageNumber}
            </ul >
            
            <button className={style.next} onClick={(e) => next(e, current)} disabled={current >= max} > {'Next >'} </button>
            <button className={style.next} onClick={(e) => lastPage(e)} disabled={current >= max}>{'Last >|'}</button>
        </nav>
    )
}