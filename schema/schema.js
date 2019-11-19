const graphql = require('graphql');
const _ = require('lodash');
const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const Tags = require('../models/tagModel');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const {
    GraphQLDateTime
} = require('graphql-iso-date');

const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        questionTitle: { type: GraphQLString },
        questionBody: { type: GraphQLString },
        votes: { type: GraphQLInt },
        createdBy: { type: GraphQLString },
        createdAt: {
            type: GraphQLDateTime,
            resolve: () => new Date(Date.now())
        },
        answer: {
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                // return _.filter(answers, { question_id: parent.id })
                return Answer.find({ question_id: parent.id });
            }
        },
        tag: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                // return _.filter(tags, { question_id: parent.id })
                return Tags.find({ question_id: parent.id });
            }
        }
    })
})

const AnswerType = new GraphQLObjectType({
    name: "Answer",
    fields: () => ({
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        answer: { type: GraphQLString },
        votes: { type: GraphQLInt },
        answeredBy: { type: GraphQLID },
        createdAt: {
            type: GraphQLDateTime,
            resolve: () => new Date(Date.now())
        },
        question: {
            type: QuestionType,
            resolve(parent, args) {
                // return _.find(questions, { answer_id: parent.id });
                return Question.findById(parent.answer_id);
            }
        }
    })
})

const TagType = new GraphQLObjectType({
    name: "Tag",
    fields: () => ({
        question_id: { type: GraphQLID },
        tag: { type: GraphQLString },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                // return _.filter(questions, { tag_id: parent.id })
                return Question.find({ tag_id: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Code to get data from db / other source
                // return _.find(questions, { id: args.id})                
                return Question.findById(args.id);
            }
        },
        answer: {
            type: AnswerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(answers, { id: args.id})
                return Answer.findById(args.id)
            }
        },
        tag: {
            type: TagType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(tags, { id: args.id})
                return Tags.findById(args.id)
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                // return questions;
                return Question.find({});
            }
        },
        answers: {
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                // return answers;
                return Answer.find({});
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                // return tags;
                return Tags.find({});
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addQuestion: {
            type: QuestionType,
            args: {
                questionTitle: { type: new GraphQLNonNull(GraphQLString) },
                questionBody: { type: new GraphQLNonNull(GraphQLString) },
                votes: { type: new GraphQLNonNull(GraphQLInt) },
                user_id: { type: GraphQLInt },
                createdAt: { type: GraphQLString }
            },
            resolve(parent, args) {
                let question = new Question({
                    questionTitle: args.questionTitle,
                    questionBody: args.questionBody,
                    votes: args.votes,
                    createdAt: args.createdAt
                });
                return question.save()
            }
        },
        addAnswer: {
            type: AnswerType,
            args: {
                user_id: { type: GraphQLID },
                question_id: { type: new GraphQLNonNull(GraphQLString) },
                answer: { type: new GraphQLNonNull(GraphQLString) },
                votes: { type: new GraphQLNonNull(GraphQLInt) },
                createdAt: { type: GraphQLString }
            },
            resolve(parent, args) {
                let answerQuestion = new Answer({
                    answer: args.answer,
                    votes: args.votes,
                    question_id: args.question_id
                });
                return answerQuestion.save()
            }
        },
        addTags: {
            type: TagType,
            args: {
                tag: { type: GraphQLInt },
                question_id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let tags = new Tags({
                    tag: args.tag,
                    question_id: args.question_id
                });
                return tags.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})