import React, {component} from 'react'
import ReactHover from 'react-hover'
import Card from '../Card/Card'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setlist } from '../../productlistslice'
import { seturl } from '../../urlSlice'
import { setPno } from '../../PnoSlice'
import './Home.css'
import banner from '../../banner.png'
import Filterbar from '../Filterbar/Filterbar'
import { useState } from 'react'
import Cart from '../Cart/Cart'
import CardListView from '../CardListView/CardListView'


const Home = () => {

  const ProductNo= useSelector((state) => state.Pno.data );
  const [container, setcontainer] = useState("cont1");
  const pList = useSelector((state) => state.list.data);
  const url = useSelector((state) => state.url.data);
  const ViewIsCliked = useSelector((state) => state.view.data);
  const dispatch = useDispatch();
useEffect(()=>{

  if(ViewIsCliked)
  {
    console.log("hi");
    setcontainer("cont2");
  }
  else
  {
    console.log("bye");
    setcontainer("cont1");

  }
});

useEffect(() => {
  const fetchProducts = async () => {
    const data = await fetch('https://dummyjson.com/products');
    const prod = await data.json();
    dispatch(setlist(prod.products));
    console.log(pList);
  };
  fetchProducts();
}, []);


useEffect(() => {
  const fetchProducts = async () => {
    const data = await fetch(url);
    const prod = await data.json();
    dispatch(setlist(prod.products));
    console.log(pList);
  };
  fetchProducts();
}, [url]);


function setId(id){
  dispatch(setPno(id));
  console.log(ProductNo);
}


function setlink(string){
  console.log('hi');
  dispatch(seturl(string));
  console.log(url);
}

  return (
    <>
    <div className='Header'>
    <div>
      <img className='banner' src={banner} alt="" />
    </div>  
    <Filterbar/>
    </div>

    <div className='Product'>
      <div className='sidebaar'>
        <div className='cate'>
          <div className='h'><h2>Category</h2><span className="material-symbols-outlined">category</span></div>
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/skincare')}} >Skincare</p></div>
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/laptops')}} >Laptops</p></div>
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/smartphones')}} >Smartphones</p></div>
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/home-decoration')}}>Home Decoratives</p></div>
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/furniture')}}>Furniture</p></div>     
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/tops')}}>tops</p></div>     
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/mens-shirts')}}>Mens Shirts</p></div>     
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/lighting')}}>Lighting</p></div>     
          <div className='c'><p onClick={()=>{setlink('https://dummyjson.com/products/category/sunglasses')}}>Sunglasses</p></div> 
        <h3>{ProductNo}</h3>
        </div>
      </div>
      <div className={container}>
       {
       pList.map(product => {
        if(ViewIsCliked)
        {
        return (<div onClick={()=>{setId(product.id)}}><a href={`product/id=${product.id}`} ><CardListView hoverable key={product.id} title={product.title} img={product.thumbnail} price={product.price} descrip={product.description} rating={product.rating} brand={product.brand} discount={product.discountPercentage} /></a></div>);
        }
        else{
          return (<div onClick={()=>{setId(product.id)}}><a href={`product/id=${product.id}`} ><Card hoverable key={product.id} title={product.title} img={product.thumbnail} price={product.price} descrip={product.description} rating={product.rating} brand={product.brand} discount={product.discountPercentage} /></a></div>);
        }
      })
      
      }
    </div>
    </div>
    </>
  )
}

export default Home






