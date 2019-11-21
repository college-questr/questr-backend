const graphql = require('graphql');
const _ = require('lodash');
const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const Tags = require('../models/tagModel');
const School = require('../models/schoolModel');

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
        id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        questionTitle: {
            type: GraphQLString
        },
        questionBody: {
            type: GraphQLString
        },
        votes: {
            type: GraphQLInt
        },
        createdBy: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLDateTime
        },
        answer: {
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                return Answer.find({
                    question_id: parent.id
                });
            }
        },
        tag: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return Tags.find({
                    question_id: parent.id
                });
            }
        },
        school: {
            type: new GraphQLList(SchoolType),
            resolve(parent, args) {
                return School.find({
                    question_id: parent.id
                });
            }
        }
    })
})

const AnswerType = new GraphQLObjectType({
    name: "Answer",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        answer: {
            type: GraphQLString
        },
        votes: {
            type: GraphQLInt
        },
        answeredBy: {
            type: GraphQLID
        },
        createdAt: {
            type: GraphQLDateTime
        },
        question: {
            type: QuestionType,
            resolve(parent, args) {
                return Question.findById(parent.answer_id);
            }
        }
    })
})

const TagType = new GraphQLObjectType({
    name: "Tag",
    fields: () => ({
        question_id: {
            type: GraphQLID
        },
        tag: {
            type: GraphQLString
        },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    tag_id: parent.id
                });
            }
        }
    })
})

const SchoolType = new GraphQLObjectType({
    name: "School",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        question_id: {
            type: GraphQLID
        },
        school: {
            type: GraphQLString
        },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    school_id: parent.id
                });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        question: {
            type: QuestionType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Question.findById(args.id);
            }
        },
        answer: {
            type: AnswerType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Answer.findById(args.id)
            }
        },
        tag: {
            type: TagType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Tags.findById(args.id)
            }
        },
        school: {
            type: SchoolType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return School.findById(args.id)
            }
        },
        search: {
            type: new GraphQLList(QuestionType),
            args: {
                searchKey: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Question.find({
                    '$text': {
                        '$search': `\*${args.searchKey}\*`,
                    }
                });
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({});
            }
        },
        answers: {
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                return Answer.find({});
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve(parent, args) {
                return Tags.find({});
            }
        },
        schools: {
            type: new GraphQLList(SchoolType),
            resolve(parent, args) {
                return School.find({});
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
                questionTitle: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                questionBody: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                votes: {
                    type: GraphQLInt
                },
                user_id: {
                    type: GraphQLInt
                },
                createdAt: {
                    type: GraphQLDateTime
                }
            },
            resolve(parent, args) {
                let question = new Question({
                    questionTitle: args.questionTitle,
                    questionBody: args.questionBody,
                    votes: args.votes == undefined ? 0 : args.votes,
                    createdAt: new Date().toISOString()
                });
                return question.save()
            }
        },
        addAnswer: {
            type: AnswerType,
            args: {
                user_id: {
                    type: GraphQLID
                },
                question_id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                answer: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                votes: {
                    type: GraphQLInt
                },
                createdAt: {
                    type: GraphQLDateTime
                }
            },
            resolve(parent, args) {
                let answerQuestion = new Answer({
                    answer: args.answer,
                    votes: args.votes == undefined ? 0 : args.votes,
                    question_id: args.question_id,
                    createdAt: new Date().toISOString()
                });
                return answerQuestion.save()
            }
        },
        addTags: {
            type: TagType,
            args: {
                tag: {
                    type: GraphQLString
                },
                question_id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let tags = new Tags({
                    tag: args.tag,
                    question_id: args.question_id
                });
                return tags.save()
            }
        },
        addSchool: {
            type: SchoolType,
            args: {
                user_id: {
                    type: GraphQLID
                },
                school: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                question_id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let schools = new School({
                    school: args.school,
                    question_id: args.question_id
                });
                return schools.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})