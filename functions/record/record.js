const { ApolloServer, gql } = require('apollo-server-lambda')
const shortid = require('shortid')
const faunadb = require('faunadb')
  q = faunadb.query
const typeDefs = gql`
  type Query {
   person:[record],
   person_link:linked 
  }

  type Mutation {
    addperson(
      name:String
      title:String
    ):record
  }
  type record {
    id:  ID!
    name: String!
    title:String!
    Link:String!
  } 
  type linked{
    name: String!
    title:String!
    Link:String!
  }
`
const resolvers = {
  Query: {
   person:async(root,args,context)=>{
      try{
var adminClient=new faunadb.Client({secret:'fnAERNN6VmACQrN3xcoHwWuQfBeG2cTe5RBLWpOu'})
const result= await adminClient.query(
q.Map(
  q.Paginate(
    q.Match(
      q.Index('links'), ) ),
  q.Lambda(x=>q.Get(x))
  )
)
  return result.data.map(d=>{
    return {
      title:d.data.title,
      name:d.data.name,
      id:d.ts,
      Link:d.data.Link

  }})
}
    
catch(error){
  console.log(error)

}
   },



person_link:async(root,args,context)=>{
  try{
var adminClient=new faunadb.Client({secret:'fnAERNN6VmACQrN3xcoHwWuQfBeG2cTe5RBLWpOu'})
const result= await adminClient.query(
  q.Get(
q.Match(
  q.Index('BookMarks-Link-des') ) )
)
  return {
 title: result.data.title,
 name:result.data.name,
 Link:result.data.Link
}
  }
catch(error){
console.log(error)

}

  }
},
Mutation: {
  addperson: async (_,{name,title})=>{
    try{
var adminClient=new faunadb.Client({secret:"fnAERNN6VmACQrN3xcoHwWuQfBeG2cTe5RBLWpOu"})
const result= await adminClient.query(
  q.Create(
    q.Collection('link'),
    {
     data:{
       name,
       title,
      Link: shortid.generate()
     }  
    },
  )
)
return result.data.data 
    }
    catch(error){
      console.log(error)
    }
  }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()
module.exports = { handler }
