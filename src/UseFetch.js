import React from "react";
import { useEffect, useState } from "react";
import './UseFetch.css'

const UseFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState({
    state:true,
    data:[]
  });
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
       setError((values)=>({...values,state:false}));
      })
      .catch((err)=>{
        setIsLoading(true);
        setError((values)=>({
            ...values,
            data:[err]
        }));
      });
  }, []);

  if(isLoading){
    return(
        <h2 className="loading">Please.... Wait some time</h2>
    )
  }
  if(!isLoading && error.data.length>0){
    console.log(error.data);
    return(
        <div className="error">
          <h1>Error</h1>
        </div>
    )
  }

  return (
    <>
    <h1 className="heading">Shopper</h1>
    <div className="container">
      {data.map((item) => (
        <div className="card">
          <p className="title">Name: {item.title}</p>
          <p className="price">Price: ${item.price}</p>
          <img src={item.images[0]} alt="name"/>
        </div>
      ))}
    </div>
    </>
  );
};

export default UseFetch;
