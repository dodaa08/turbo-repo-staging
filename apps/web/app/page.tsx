"use client";

import { useState, useEffect } from "react";


const Home = ()=>{

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);
  useEffect(()=>{
    const fetchuser = async ()=>{
      try{
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?email=kartikdoda86aa@gmail.com`); 
       
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
       }

      const userData = await response.json();
      console.log("user data", userData);
      setLoading(false);
      setData(userData);
      }
      catch (err) {
        console.error("Error fetching the user", err);
        setData(null); // Clear data on errors
        // setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setLoading(false);
      }

      }

      fetchuser()
  }, []);

  return(
    <>
    <div>
      <h1>User Data</h1>
      <pre>{
        loading ? (
          <div className="flex justify-center items-center">
            <span className="text-center text-2xl">Loading...</span>
          </div>
        ) : (
        data ? (
          
           <div className="">
              {JSON.stringify(data, null, 2)}
           </div>
          
        ) : (
         
          <div className="">  
             Data not found..
          </div>      
          
        )
      )
        }</pre>
    </div>   
    </>
  )
}

export default Home;