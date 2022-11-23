import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, postGame } from "../actions"
import { Validate } from "./Validation"
import styles from './Modules/card.module.css'

export default function CreateForm(){
    const [error,setError]= useState({});
    const allGames= useSelector((state)=>state.allvideogames)
    const dispatch = useDispatch();
    const history = useNavigate();
    const genres = useSelector((state)=>state.genres)
    const [input,setInput]= useState({
        name:'',
        released:'',
        rating:'',
        platforms:[],
        image:'',
        genres:[],
        description:'',
    })

useEffect(()=>{
    dispatch(getGenres())
},[])

let platforms = allGames.map((el)=>el.platforms) 
let plat=[]
platforms.map((element)=>plat=plat.concat(element))
let allplatforms = [...new Set(plat)]

function handleSumbit(e){
    e.preventDefault();
    setError(Validate(input))
    let validation = Validate(input)
    if(Object.values(validation).length !== 0){
        alert('Complete all the inputs')
    }
    else{
    dispatch(postGame(input))
    alert('Videogame Created')
    history(-1)
}
}

function handleInput(e){
setInput({
    ...input,
    [e.target.name]:e.target.value
})
setError(Validate({
    ...input,
    [e.target.name]:e.target.value
}))
}

function handleOption(e){
    if(!input.genres.includes(e.target.value)){
        setInput({
            ...input,
            genres:[...input.genres,e.target.value]
        })
    }
}

function handlePlatforms(e){
    if(!input.platforms.includes(e.target.value)){
        setInput({
            ...input,
            platforms:[...input.platforms,e.target.value]
        })
    }
}

function handleRemoveGenre(e){
    setInput({
        ...input,
        genres: input.genres.filter(el => el !== e)
    })
    setError(Validate({
        ...input,
        genres:[...input.genres]
    }))
}

function handleRemovePlatform(e){
    setInput({
        ...input,
        platforms: input.platforms.filter(el => el !== e)
    })
    setError(Validate({
        ...input,
        platforms:[...input.platforms]
    }))
}

return(
    <div className={styles.formBackground}>
        <Link to='/Home'><button className={styles.detailbutton} style={{marginRight:'120px', marginBottom:'380%'}}>Back</button></Link>
        <div className={styles.formBox}>
        <div className={styles.formCont}>
        <h1 className={styles.h1}>Create videogame</h1>
        <form>
            <div>
                <label>Nombre:</label>
                <input onChange={e=>handleInput(e)}
                type="text"
                value={input.name}
                name="name"
                />
            </div>
            <div>
                <label>Description:</label>
                <input onChange={e=>handleInput(e)}
                type="text"
                value={input.description}
                name="description"/>
            </div>
            <div>
                <label>Released:</label>
                <input onChange={e=>handleInput(e)}
                type="date"
                value={input.released}
                name="released"/>
            </div>
            <div>
                <label>Image:</label>
                <input onChange={e=>handleInput(e)}
                type="text"
                value={input.image}
                name="image"/>
            </div>
            <div>
                <label>Rating:</label>
                <input onChange={e=>handleInput(e)}
                type="number"
                value={input.rating}
                name="rating"/>
            </div>
            <div>
                <label>Genres:</label>
                <select onChange={e=>handleOption(e)}>
                    <option hidden>genres</option>
                    {genres.map((el)=><option value={el.name}>
                        {el.name}
                    </option>)}
                </select>
                </div>
            <div>
                <label>Platforms:</label>
                <select onChange={e=>handlePlatforms(e)}>
                    <option hidden>platforms</option>
                    {allplatforms.map((el)=><option value={el}>{el}</option>)}
                </select>
            </div>
        </form>
        <button onClick={e=>handleSumbit(e)} className={styles.detailbutton} style={{marginTop:'30%'}}>Create</button>
        </div>
        <div className={styles.formResults}>
                <h1 className={styles.h1}>This is your game</h1>
                <p>{error.name ? error.name : input.name}</p>
                <p>{error.description ? error.description : input.description}</p>
                <p>{error.image? error.image : input.image}</p>
                <p>{error.rating? error.rating : input.rating}</p>
                <div className={styles.list}>
                    <div className={styles.genreContain}>
                        <h3>genres</h3>
                        {error.genres ?
                        <span>{error.genres}</span> :
                        <div className={styles.genresList}>
                        <span style={{cursor: 'pointer'}}>{input.genres?.map((el)=><li onClick={()=>handleRemoveGenre(el)}>{el}</li>)}</span>
                        </div>
                        }
                    </div>
                    <div className={styles.platformContain}>
                        <h3>platforms</h3>
                        {error.platforms ?
                        <span>{error.platforms}</span> :
                        <div className={styles.platformsList}>
                        <span style={{cursor: 'pointer'}}>{input.platforms?.map((el)=><li onClick={()=>handleRemovePlatform(el)}>{el}</li>)}</span>
                        </div>
                        }
                    </div>
                </div>
        </div>
        </div>
    </div>
)
}