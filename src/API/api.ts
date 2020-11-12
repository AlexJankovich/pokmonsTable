import axios from 'axios'

export const instance = axios.create({baseURL: 'https://pokeapi.co/api/v2/'})

export const PokeApi = {
    PokesGet: (id?: number) => {
        return instance.get(`pokemon/${id || '?limit=20&offset=0'}`).then(res => {
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