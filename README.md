# questr-backend


## Schemas

###### Questions
        id: { type: GraphQLID },
        questionTitle: { type: GraphQLString },
        questionBody: { type: GraphQLString },
        votes: { type: GraphQLInt },
        createdBy: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        user_id
        
###### Tags
        question_id: { type: GraphQLID },
        tag: { type: GraphQLString }

###### Answers
        id: { type: GraphQLID },
        answer: { type: GraphQLString },
        question_id: { type: GraphQLID },
        votes: { type: GraphQLInt },
        AnsweredBy: { type: GraphQLString },
        createdAt: { type: GraphQLString }


## Root Queries
  
## collections

## Built with

  - Node.js
  - Express
  - MongoDb
  - GraphQL
