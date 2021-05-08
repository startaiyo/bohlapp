import axios from 'axios';
import React, {Component}from 'react';
class Results extends Component{
    constructor(props){
        super(props);
        this.state={
            item:'',
            results: [],
        };
    }
    render(){
        const {results} = this.state;
        const nuts = results.map((value,index)=><li key={index}>{value}</li>) 
        return(
            <ul>{ nuts }</ul>
        )
    }
}

export default Results