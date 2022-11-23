import React,{useEffect} from "react";


export default function SearchBar({handle}){
function handleSearch(name){
        handle(name)
    }
    return(
        <div>
            <input style={{backgroundColor:'transparent',color:"rgb(33, 214, 247)"}} type="search" placeholder="Search videogame" onChange={(e)=>handleSearch(e.target.value)}/>
        </div>
    )


}