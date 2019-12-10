const graphql = require('graphql');
const _ = require('lodash');
const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const Tags = require('../models/tagModel');
const School = require('../models/schoolModel');
const Class = require('../models/classModel');
const Instructor = require('../models/instructorModel');
const User = require('../models/userModel');

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
        },
        class: {
            type: new GraphQLList(ClassType),
            resolve(parent, args) {
                return Class.find({
                    question_id: parent.id
                });
            }
        },
        instructor: {
            type: new GraphQLList(InstructorType),
            resolve(parent, args) {
                return Instructor.find({
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

const ClassType = new GraphQLObjectType({
    name: "Class",
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
        instructor_id: {
            type: GraphQLID
        },
        class: {
            type: GraphQLString
        },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    class_id: parent.id
                });
            }
        },
        instructor: {
            type: new GraphQLList(InstructorType),
            resolve(parent, args) {
                return Instructor.find({
                    class_id: parent.id
                });
            }
        }
    })
})

const InstructorType = new GraphQLObjectType({
    name: "Instructor",
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
        class_id: {
            type: GraphQLID
        },
        instructor: {
            type: GraphQLString
        },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    instructor_id: parent.id
                });
            }
        },
        class: {
            type: new GraphQLList(ClassType),
            resolve(parent, args) {
                return Class.find({
                    instructor_id: parent.id
                });
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        question_id: {
            type: GraphQLID
        },
        answer_id: {
            type: GraphQLID
        },
        school_id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        question: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    user_id: parent.id
                });
            }
        },
        answer: {
            type: new GraphQLList(AnswerType),
            resolve(parent, args) {
                return Answer.find({
                    user_id: parent.id
                });
            }
        },
        school: {
            type: new GraphQLList(SchoolType),
            resolve(parent, args) {
                return School.find({
                    user_id: parent.id
                });
            }
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
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
                return Answer.findById(args.id);
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
                return Tags.findById(args.id);
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
                return School.findById(args.id);
            }
        },
        class: {
            type: ClassType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Class.findById(args.id);
            }
        },
        instructor: {
            type: InstructorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Instructor.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
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
                    $text: {
                        $search: `\*${args.searchKey}\*`
                    }
                });
            }
        },
        partialSearch: {
            type: new GraphQLList(QuestionType),
            args: {
                searchKey: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Question.find({
                    questionTitle: { $regex: args.searchKey, $options: "i" }
                });
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            args: {
                pageSize: {
                    type: GraphQLInt
                },
                lastId: {
                    type: GraphQLID
                },
                groupBy: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {

                //pagination logic with optional sort by group
                if (args.lastId && args.groupBy) {
                    return Question.find({ '_id': { '$lt': args.lastId } })
                        .limit(args.pageSize)
                        .sort({ [`${args.groupBy}`]: -1 });
                } else if (args.lastId) {
                    return Question.find({ '_id': { '$lt': args.lastId } })
                        .limit(args.pageSize)
                        .sort({ 'createdAt': -1 });
                } else {
                    return Question.find()
                        .limit(args.pageSize)
                        .sort({ 'createdAt': -1 });
                }

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
        classes: {
            type: new GraphQLList(ClassType),
            resolve(parent, args) {
                return Class.find({});
            }
        },
        instructors: {
            type: new GraphQLList(ClassType),
            resolve(parent, args) {
                return Instructor.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

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
                    type: new GraphQLNonNull(GraphQLID)
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
                    createdAt: new Date().toISOString(),
                    user_id: args.user_id
                });
                return question.save()
            }
        },
        addAnswer: {
            type: AnswerType,
            args: {
                user_id: {
                    type: new GraphQLNonNull(GraphQLID)
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
                    type: new GraphQLNonNull(GraphQLID)
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
        },
        addClass: {
            type: ClassType,
            args: {
                user_id: {
                    type: GraphQLID
                },
                class: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                question_id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let classes = new Class({
                    class: args.class,
                    question_id: args.question_id
                });
                return classes.save()
            }
        },
        addInstructor: {
            type: InstructorType,
            args: {
                user_id: {
                    type: GraphQLID
                },
                instructor: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                question_id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                class_id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let instructors = new Instructor({
                    instructor: args.instructor,
                    question_id: args.question_id,
                    class_id: args.class_id
                });
                return instructors.save()
            }
        },
        addUser: {
            type: UserType,
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                let users = new User({
                    username: args.username,
                    password: args.password,
                });
                return users.save()
            }
        },
        updateQuestion: {
            type: QuestionType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                questionTitle: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return new Promise((resolve, reject) => {
                    const date = Date().toString()
                    Question.findOneAndUpdate(
                        { "_id": args.id },
                        { "$set": { name: args.name, dateUpdated: date } },
                        { "new": true } //returns new document
                    ).exec((err, res) => {
                        console.log('test', res)
                        if (err) reject(err)
                        else resolve(res)
                    })
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})