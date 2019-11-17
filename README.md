# questr-backend


## Schemas

###### Questions
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        questionTitle: { type: GraphQLString },
        questionBody: { type: GraphQLString },
        votes: { type: GraphQLInt },
        createdBy: { type: GraphQLString },
        createdAt: { type: GraphQLString }
        
###### Tags
        question_id: { type: GraphQLID },
        tag: { type: GraphQLString }

###### Answers
        id: { type: GraphQLID },
        question_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        answer: { type: GraphQLString },
        votes: { type: GraphQLInt },
        user_id: { type: GraphQLID },
        createdAt: { type: GraphQLString }


## Root Queries
       
###### question(id)

- should return all questions by id with all answers associated to the question id

         type: QuestionType,
         args: { id: { type: GraphQLInt } }
         
###### questions 

- should return a list of all questions

         type: QuestionType,
         args: {}
         
         
###### answer(id)

- should return answers by user_id
        
         type: AnswerType,
         args: { id: { type: GraphQLInt } }
         
###### answers

- should return a list of all answers

         type: AnswerType,
         args: {}


###### tags

- should return a list of all tags

         type: TagType,
         args: {}

  

## Built with

  - Node.js
  - Express
  - MongoDb
  - GraphQL
