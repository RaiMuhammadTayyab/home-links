import React,{useEffect} from 'react'


 const Card=(location )=>{
    useEffect(() => {
        fetch("https://api.netlify.com/build_hooks/60254a4a06092a276e098b0e", {
          method: "post",
          body: JSON.stringify({}),
        }).then(function (response) {
          console.log("Build Triggered")
        })
      }, [])
    
      if (location.state !== undefined) {
        const {name,title, Link } = location.state.data

    return(
        <>
        <h1>Details</h1>
    <p>{name}</p>
<p>{title}</p>
<br/>
<p>url={`https://virtual-lolly-12e-bootcamp.netlify.app/Card/${Link}`} </p>

</>
)
    }
}
export default Card