import axios from 'axios'

export const instance = axios.create({baseURL: 'https://pokeapi.co/api/v2/'})

export const PokeApi = {
    PokesGet: ( pageSize?:number, page?:number) => {
        return instance.get(`pokemon/?limit=${pageSize}&offset=${page}`).then(res => {
            console.log(res.status)
            return res
        })
    },
    PokesNextGet:(next:string) =>{
        return axios.get(next).then(res=>res)
    },
    PokemonGet:(name:string)=>{
        return instance.get(`pokemon/${name}`).then(res=> {
            return res
        })

    }
}