import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class Moviepage extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
        this.handleAxios()
    }
    handleAxios=()=>{
        let str=this.props.match.url.split("/")
        str.pop()
        str=str[str.length-1]
        axios({method:"get",url:`http://www.omdbapi.com/?apikey=215e4f09&t=${str}`})
        .then(res=>console.log(res))
        .catch(err=>alert(err))
    }
    render(){
        console.log("hey bhai")
        return(
           <Link to="/home">&lt;--back</Link>
        )
    }
}
