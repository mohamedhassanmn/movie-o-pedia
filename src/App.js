import React from 'react'
import Login from './components/login'
import {Route,Redirect} from 'react-router-dom'
import Home from './components/Home'
import axios from 'axios'
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            entry:false,
            user_data:"",
            user_password:"",
            user_name:""
        }
    }
    componentDidMount(){
        this.handleAxios()
    }
    handleAxios=()=>{
        axios({method:"get",url:"https://jsonplaceholder.typicode.com/users"})
        .then(res=>{
            console.log(res)
            this.setState({
                user_data:res.data
            })
        })
        .catch(err=>alert(err))
    }
    handleEntry=()=>{
        console.log('dont remove')
        this.setState({entry:true})
    }
    render(){
        // localStorage.removeItem("zoom")
        return(
            <>
                <Route path="/"exact render={()=><Login 
                                                    userdata={this.state.user_data} 
                                                    indicate={this.handleEntry}
                                                />} 
                />  
                {localStorage.getItem("username")?(
                    <Route path="/home" render={(props)=><Home {...props}/>} /> 
                    ):(
                    <Redirect to="/" />
                )}       
            </>
        )
    }
} 