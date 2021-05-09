import axios from 'axios';
import React, {Component}from 'react';


class Container extends Component {
  state ={
    selectedFile: null,
    keyname: null,
    results: []
  }
  fileSelectedHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  } 
  fileUploadHandler = e=>{
    const fd = new FormData();
    fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
    console.log(fd)
    axios.post('https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/',fd).then((response)=>{console.log(response); this.setState({keyname: response.data['key']})}).then(()=>{setTimeout(()=>{axios.get(`https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/${this.state.keyname}`).then( (res)=>{ console.log(res.data); this.setState({results: res.data})})},10000)}).catch((e)=>{console.log(e);})
    e.preventDefault();
  }
  dataGetter = e =>{
    e.preventDefault();
    axios.get(`https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/${this.state.keyname}`).then( (res)=>{ console.log(res.data); this.setState({results: res.data})})
  }
  render(){
    const rs = this.state.results.map((item)=><p>{item.food_name}</p>)
    return (
    <form>
        <label htmlFor="img">画像</label>
        <input id="img" type="file" onChange={this.fileSelectedHandler} encType="image/jpeg"/>
        <button onClick={this.fileUploadHandler}>send</button>
        <button onClick={this.dataGetter}>get</button>
        <p>{rs}</p>
    </form>
   );
  }
}
export default Container;