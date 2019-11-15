import React from 'react'
import axios from 'axios'
import styles from './moviepage.module.css'
import { Typography } from '@material-ui/core'
import DetailShow from './Detailshow'
export default class Moviepage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:""
        }
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
        .then(res=>{
            console.log(res)
            this.setState({
                data:res.data
            })
        })
        .catch(err=>alert(err))
    }
    render(){
        console.log("hey bhai")
        return(
            <div style={{marginTop:"3%",width:"100vw",height:"100vh",backgroundColor:"black"}}>
            <br/> <br/> <br/><br/>
                {this.state.data!=""?(
                    <div className={styles.dataContainer}>
                        <DetailShow data={this.state.data} />
                    </div>
                ):null}
            </div>
        )
    }
}
