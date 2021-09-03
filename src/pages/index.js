import  React,{useState} from "react"
import {useQuery,useMutation } from '@apollo/client';
import gql from 'graphql-tag'
//import { navigate } from "@reach/router";

const Person_LinkQuery=gql`
{
person_link {
  Link
  name
  title
}

}
`
const Person_Query=gql`
{
  person {
    name 
    title 
    Link
    id 
  }

}`

const Add_person=gql`
mutation addperson ($title:String!, $name:String!){
addperson(title:$title, name:$name){
name
title
id
Link
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

const submithandle= async()=>{
  addperson({
    variables:{
     title:inputtitle.value,
     name:inputname.value
    },
    refetchQueries:[{query:Person_Query},{query:Person_LinkQuery}],

  /* update:(proxy,mutationresult)=>{
      console.log(mutationresult)
      setupdate(mutationresult)
      navigate(`/Card/${mutationresult.data.addperson.Link}`,{
        state:{
          data: mutationresult.data.addperson,
        },
        
      }) */
    
    })    
  //console.log(update)
  settit(inputtitle.value)
  setname(inputname.value)
inputtitle.value= ""
inputname.value= ""
  }
const Persons=useQuery(Person_Query)
const Personquery=useQuery(Person_LinkQuery)
/*if (loading)
  return <h1>Loading</h1>
if (error) {
  return <h1> Error </h1>*/


/*
  if (loading){
    return <h1>Loading</h1>
  
  }
if (error){
  return  <h3 style={{ color: 'red' }}>error</h3>

}
console.log(error)
console.log(data)
/*
}
  <Query query={Person_Query}>
    {({ loading,data })=>{
      if (loading)
      return <h1>Loading</h1>
    const {person, person_link}=data
  return 
const { data:personData,error:Person_QueryError,loading:Person_Queryloading}=useQuery(Person_Query);
const { data:person_linkData,error:PersonLink_Queryerror,loading:PersonLink_Queryloading}=useQuery(PersonLink_Query);
const Person = useQuery(Person_Query);
const Person_link = useQuery(Person_LinkQuery);*/

const errors = Persons.error || Personquery.error;
const loading = Persons.loading || Personquery.loading;

if (loading) {
  return <p>loading...</p>;
}
  if (errors){
    return  <h3 style={{ color: 'red' }}>errors</h3>
  }
  console.log(errors)
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


  {JSON.stringify(Persons.data.person)}
<br/>
  <br/>                                                                                                                                                                                                                                                                                                                                                         
  {JSON.stringify(Personquery.data.person_link)} 


</div>
 </> )
}

export default Home
