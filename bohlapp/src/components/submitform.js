import axios from 'axios';
import React, {Component}from 'react';


class Container extends Component {
  state ={
    selectedFile: null
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
    axios.post('https://vyq3zznjx3.execute-api.ap-northeast-1.amazonaws.com/default/bohlfunc/',fd).then((response)=>{console.log(response);}).catch((e)=>{console.log(e);})
    e.preventDefault();
  }
  render(){
    return (
    <form>
        <label htmlFor="img">画像</label>
        <input id="img" type="file" onChange={this.fileSelectedHandler} encType="image/jpeg"/>
        <button onClick={this.fileUploadHandler}>send</button>
    </form>
   );
  }
}
export default Container;