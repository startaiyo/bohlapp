import axios from 'axios';
import React, {Component}from 'react';
import qs from 'qs';
class Container extends Component {
  state ={
    selectedFile: null,
    keyname: null,
    results: [],
    f_data: []
  }
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  } 
  fileUploadHandler = e =>{
    const fd = new FormData();
    fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
    axios.post('https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/',fd).then((response)=>{console.log(response); this.setState({keyname: response.data['key']})}).then(()=>{setTimeout(()=>{axios.get(`https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/${this.state.keyname}`).then( (res)=>{ console.log(res.data); this.setState({results: res.data})})},10000)}).catch((e)=>{console.log(e);})
    e.preventDefault();
  }
  dataGetter = e =>{
    e.preventDefault();
    axios.get(`https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/${this.state.keyname}`).then( (res)=>{ console.log(res.data); this.setState({results: res.data})})
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
    axios.post('http://127.0.0.1:8000/meals/register/',fd).then((res)=>{console.log(res);})
  }
  render(){
    const rs = this.state.results.map((item,index)=><p><label key={index}><input type="radio" value={index} onChange={this.dataRegister} checked={this.state.f_data['food_name'] === item.food_name}/>{item.food_name}</label></p>)
    return (
    <div> 
      <form>
          <label htmlFor="img">画像</label>
          <input id="img" type="file" onChange={this.fileSelectedHandler} encType="image/jpeg"/>
          <button onClick={this.fileUploadHandler}>send</button>
          <button onClick={this.dataGetter}>get</button>
      </form>
      <form onSubmit={this.dataSubmitter}>
        <p>{rs}</p>
        <button>今日の食事を更新</button>
      </form>
    </div>
   );
  }
}
export default Container;