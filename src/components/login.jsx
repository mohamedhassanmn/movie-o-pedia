import React from 'react'
import styles from './login.module.css'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            signup:false,
            signedup:false,
            new_name:"",
            new_email:"",
            new_password:"",
            make_entry:false,
            loader:false,
            user_login:"",
            user_password:"",
            error_show:false
        }
    }
    handleSigning=()=>{
       localStorage.setItem("username",this.state.new_name)
       console.log("pressed")
       this.setState({loader:true})
        let obj={
            id:2,
            name:this.state.new_name,
            password:this.state.new_password,
            email:this.state.new_email
        }
        axios({method:"post",url:"http://my-json-server.typicode.com/mohamedhassanmn/login_data/user",data:obj})
        .then(res=>{
            console.log(res)
            this.setState({
                make_entry:true
            })
        })
        .catch(err=>alert(err))
    }
    handleSignup=()=>{
        this.setState({
            signup:true
        })
    }
    handleLogin=()=>{
        this.setState({
            signup:false
        })
    }
    checkLogin=()=>{
        let flag=true
        this.props.userdata.forEach((e)=>{
            if(this.state.user_login==e.email){
                localStorage.setItem("username",e.name)
                this.setState({
                    make_entry:true
                })
                flag=false
            }
        })
        if(flag){
            this.setState({
                error_show:true
            })
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    render(){
        return(
            <>
                <video autoPlay muted loop id="myVideo">
                    <source src="/bg-video.mp4" type="video/mp4"/>
                        Your browser does not support HTML5 video.
                </video>
                {this.state.signup?(
                    <React.Fragment>
                        {this.state.loader?(
                            <Paper className={styles.login_box}>
                                <CircularProgress />
                            </Paper>
                            ):(
                            <Paper className={styles.login_box}>
                            <Icon style={{fontSize:"50px",color:"rgba(223, 249, 251,1.0)"}} className="fas fa-film"></Icon>
                            <Typography className={styles.logo_name}>Movie-O-pedia</Typography>
                            <br/> <br/>
                            <TextField
                                className={styles.login_input}
                                onChange={this.handleChange}
                                id="input-with-icon-textfield"
                                label="Name"
                                name="new_name"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <Icon className="far fa-user"/>
                                    </InputAdornment>
                                ),
                                }}
                            />
                            <br/> <br/>
                            <TextField
                                className={styles.login_input}
                                onChange={this.handleChange}
                                id="input-with-icon-textfield"
                                label="Email"
                                type="email"
                                name="new_email"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <Icon className="fas fa-envelope-open-text"/>
                                    </InputAdornment>
                                ),
                                }}
                            />
                            <br/> <br/>
                            <TextField
                                className={styles.login_input}
                                onChange={this.handleChange}
                                id="input-with-icon-textfield"
                                label="Password"
                                type="password"
                                name="new_password"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <Icon className="fas fa-key"></Icon>
                                    </InputAdornment>
                                ),
                                }}
                            />
                            <br/> <br/> <br/>
                            <div onClick={this.props.indicate}><Button onClick={this.handleSigning} className={styles.btn} variant="contained" color="primary">SignUp</Button></div>
                            <br/> <br/>
                            <Link><Typography onClick={this.checkLogin} variant="subtitle1">login ,if you are already an user</Typography></Link>
                            </Paper>
                            )}
                    </React.Fragment>
                    
                ):(
                    <Paper className={styles.login_box}>
                    <Icon style={{fontSize:"50px",color:"rgba(223, 249, 251,1.0)"}} className="fas fa-film"></Icon>
                    <Typography className={styles.logo_name}>Movie-O-pedia</Typography>
                    <br/> <br/>
                    {this.state.error_show?(
                        <Paper className={styles.error}>
                            <Icon color="secondary" className="far fa-times-circle"></Icon>
                            &nbsp; &nbsp;
                            <Typography color="secondary" variant="subtitle1">Invalid username or password</Typography>
                        </Paper>):null}
                    <br/> <br/>
                    <TextField
                        className={styles.login_input}
                        onChange={this.handleChange}
                        id="input-with-icon-textfield"
                        label="Email"
                        name="user_login"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Icon className="fas fa-envelope-open-text"/>
                            </InputAdornment>
                        ),
                        }}
                    />
                    <br/> <br/>
                    <TextField
                        className={styles.login_input}
                        id="input-with-icon-textfield"
                        onChange={this.handleChange}
                        label="Password"
                        type="password"
                        name="user_password"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Icon className="fas fa-key"></Icon>
                            </InputAdornment>
                        ),
                        }}
                    />
                    <br/> <br/> <br/>
                    <div onClick={this.props.indicate}><Button onClick={this.checkLogin} className={styles.btn} variant="contained" color="primary">Login</Button></div>
                    <br/> <br/>
                    <Link><Typography onClick={this.handleSignup} variant="subtitle1">create a new account</Typography></Link>
                    </Paper>
                )}
                {this.state.make_entry?(<Redirect to="/home"/>):(null)}
            </>
        )
    }
} 