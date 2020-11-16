import axios from 'axios'

export const instance = axios.create({baseURL: 'https://pokeapi.co/api/v2/'})

export const PokeApi = {

    PokesGet: ( pageSize:number, page:number) => {
        const offset=pageSize*(page-1)
        return instance.get(`pokemon/?limit=${pageSize}&offset=${offset}`).then(res => {
            console.log(res.status)
            return res
        })
    },

    PokemonGet:(name:string)=>{
        return instance.get(`pokemon/${name}`).then(res=> {
            return res
        })

    }
}