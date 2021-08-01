import axios from 'axios';
import React, {Component}from 'react';
import qs from 'qs';
class Container extends Component {
  state ={
    selectedFile: null,
    keyname: null,
    results: [],
    f_data: [],
    msg: null,
  }
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  } 
  fileUploadHandler = e =>{
    const fd = new FormData();
    let dg;
    fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
    axios.post('https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/',fd).then((response)=>{console.log(response); this.setState({keyname: response.data['key'], msg: "ロード中..."})}).then(()=>{setInterval(()=>{dg = this.dataGetter(); if(this.state.msg==null){clearInterval(dg);}},10000)}).catch((e)=>{console.log(e);})
    e.preventDefault();
  }
  dataGetter = e =>{
    // e.preventDefault();
    axios.get(`https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/${this.state.keyname}`).then( (res)=>{ console.log(res.data); this.setState({results: res.data, msg: null})})
  }
  dataRegister = e =>{
    let num = Number(e.target.value)
    let data = this.state.results[num]
    let uio = window.location.search.substring(1)
    let ui = uio.split('=')
    data.user_id = ui[1]
    console.log(data)
    this.setState({
      f_data: data
    })
  }
  dataSubmitter = e => {
    e.preventDefault();
    const fd=qs.stringify(this.state.f_data)
    axios.post('https://bohlapp.herokuapp.com/meals/register/',fd).then((res)=>{console.log(res);})
  }
  render(){
    const rs = this.state.results.map((item,index)=><p><label key={index}><input type="radio" value={index} onChange={this.dataRegister} checked={this.state.f_data['food_name'] === item.food_name}/>{item.food_name}</label></p>)
    const msg = this.state.msg
    return (
    <div> 
      <form>
          <label htmlFor="img">画像</label>
          <input id="img" type="file" onChange={this.fileSelectedHandler} encType="image/jpeg"/>
          <button onClick={this.fileUploadHandler}>send</button>
      </form>
      <form onSubmit={this.dataSubmitter}>
        <h4>{msg}</h4>
        <p>{rs}</p>
        <button>今日の食事を更新</button>
      </form>
      <a href="https://bohlapp.herokuapp.com/meals/">食事登録表に戻る</a>
    </div>
   );
  }
}
export default Container;