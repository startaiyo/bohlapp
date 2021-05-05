import axios from 'axios';
import React from 'react';


const Container = () => {
  return (
    <form>
        <label htmlFor="img">画像</label>
        <input id="img" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" />
        <input type="button" value="保存"/>
    </form>
  )
}
export default Container;