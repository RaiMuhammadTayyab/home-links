import  React,{useState} from "react"
import {useQuery,useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import { navigate } from "@reach/router";

const Person_Query=gql`
{
  person{
    id
    title
    name
    Link
  }
}
`
const Add_person=gql`
mutation addperson ($title:String!, $name:String!){
addperson(title:$title, name:$name){
id
}

}
`
const Home= () => {
  const[tit,settit]=useState('Manager')
  const[nam,setname]=useState('Tayyab')
  const[update,setupdate]=useState(undefined)

let inputtitle
let inputname
const[addperson]=useMutation(Add_person)

const submithandle=()=>{
  addperson({
    variables:{
     title:inputtitle.value,
     name:inputname.value
    },

   refetchQueries:[{query:Person_Query}],
update:(proxy,mutationresult)=>{
console.log(mutationresult)
setupdate(mutationresult)
navigate(`/Card/${mutationresult.data.addperson.title}`,{
  state:{
    data: mutationresult.data.addperson.title,
  },
  
}) 
}

  })

  console.log(update)
  settit(inputtitle.value)
  setname(inputname.value)
inputtitle.value= ""
inputname.value= ""
}
const { loading,error,data }=useQuery(Person_Query)
if (loading)
  return <h1>Loading</h1>
if (error) {
  return <h1> Error </h1>
  
}
console.log(error)
console.log(tit)
console.log(nam)
  return (
    <>
    <h1>Personal Data base</h1>
   <div>
<h2>Enter the title</h2>
<br/>
<input type='text' placeholder="title" ref={node=>{inputtitle=node}}/>
<br/>
<h2> Enter the name</h2>
<br/>
<input type="text" placeholder="name" ref={node=>{inputname=node}}/>
<br/>
<br/>
<button onClick={submithandle}> Enter please</button>
<br/>
{JSON.stringify(data.person)}
   </div>
 </> )
}

export default Home
