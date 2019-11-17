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

## Mutations

###### addQuestion(user_id:<user_id>,questionTitle:"questionTitle", questionBody:"questionBody",votes: 0 )

- should add a question to the question collection

        type:QuestionType,
        args:{
                id: { type: GraphQLID },
                user_id: { type: GraphQLID },
                questionTitle: { type: new GraphQLNonNull(GraphQLString) },
                questionBody: { type: new GraphQLNonNull(GraphQLString) },
                votes: { type: new GraphQLNonNul(GraphQLInt) },
                createdBy: { type: GraphQLString },
                createdAt: { type: GraphQLString }
        }

###### AddAnswer(question_id:<question_id>,user_id:<user_id>,answer:"answer",votes: 0 )

        type:AnswerType,
        args:{
                id: { type: GraphQLID },
                question_id: { type: new GraphQLNonNull(GraphQLID) },
                user_id: { type: new GraphQLNonNull(GraphQLID) },
                answer: { type: new GraphQLNonNull(GraphQLString) },
                votes: { type: new GraphQLNonNull(GraphQLInt) },
                createdAt: { type: GraphQLString }
       }
       


## Built with

  - Node.js
  - Express
  - MongoDb
  - GraphQL
