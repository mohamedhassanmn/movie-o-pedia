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
        axios({method:"get",url:"http://my-json-server.typicode.com/mohamedhassanmn/login_data/user/1"})
        .then(res=>{
            console.log(res)
            this.setState({
                user_data:res.data.email,
                user_password:res.data.password,
                user_name:res.data.name 
            })
        })
        .catch(err=>alert(err))
    }
    handleEntry=()=>{
        console.log('dont remove')
        this.setState({entry:true})
    }
    render(){
        return(
            <>
                <Route path="/"exact render={()=><Login 
                                                    useremail={this.state.user_data} 
                                                    userpassword={this.state.user_password} 
                                                    username={this.state.user_name}
                                                    indicate={this.handleEntry}
                                                />} 
                />  
                {localStorage.getItem("username")?(
                    <Route path="/home" render={()=><Home/>} /> 
                    ):(
                    <Redirect to="/" />
                )}         
            </>
        )
    }
} 