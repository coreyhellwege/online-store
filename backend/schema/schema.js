import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id           : { type: GraphQLID },
    name         : { type: GraphQLString },
    image        : { type: GraphQLString },
    brand        : { type: GraphQLString },
    category     : { type: GraphQLString },
    description  : { type: GraphQLString },
    price        : { type: GraphQLInt },
    countInStock : { type: GraphQLInt },
    rating       : { type: GraphQLInt },
    numReviews   : { type: GraphQLInt },
    // Foreign keys
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
    reviews: [{
      type: ReviewType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }]
  })
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id            : { type: GraphQLID },
    paymentMethod : { type: GraphQLString },
    itemsPrice    : { type: GraphQLInt },
    taxPrice      : { type: GraphQLInt },
    shippingPrice : { type: GraphQLInt },
    totalPrice    : { type: GraphQLInt },
    isPaid        : { type: GraphQLBoolean },
    paidAt        : { type: GraphQLString }, // todo: update to custom date scalar type
    isDelivered   : { type: GraphQLBoolean },
    deliveredAt   : { type: GraphQLBoolean }, // todo: update to custom date scalar type
    // Foreign keys
    paymentResult: {
      type: PaymentResultType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
    shippingAddress: {
      type: ShippingAddressType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
    orderItems: [{
      type: OrderItemType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }]
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id       : { type: GraphQLID },
    name     : { type: GraphQLString },
    email    : { type: GraphQLString },
    password : { type: GraphQLString },
    isAdmin  : { type: GraphQLBoolean }
  })
})

const PaymentResultType = new GraphQLObjectType({
  name: 'PaymentResult',
  fields: () => ({
    id            : { type: GraphQLID },
    status        : { type: GraphQLString },
    update_time   : { type: GraphQLString },
    email_address : { type: GraphQLString }
  })
})

const ShippingAddressType = new GraphQLObjectType({
  name: 'ShippingAddress',
  fields: () => ({
    id       : { type: GraphQLID },
    address  : { type: GraphQLString },
    city     : { type: GraphQLString },
    postCode : { type: GraphQLString },
    country  : { type: GraphQLString }
  })
})

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id      : { type: GraphQLID },
    name    : { type: GraphQLString },
    rating  : { type: GraphQLString },
    comment : { type: GraphQLString },
    user    : {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }
  })
})

const OrderItemType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id      : { type: GraphQLID },
    name    : { type: GraphQLString },
    qty     : { type: GraphQLString },
    image   : { type: GraphQLString },
    price   : { type: GraphQLInt },
    product : {
      type: ProductType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find()
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id)
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find()
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      },
    },
  },
})

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })

        return client.save()
      },
    },
    // Delete a client
    deleteClient: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ userId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove()
          })
        })

        return Client.findByIdAndRemove(args.id)
      },
    },
    // Add a project
    addProject: {
      type: ProductType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          userId: args.userId,
        })

        return project.save()
      },
    },
    // Delete a project
    deleteProject: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      },
    },
    // Update a project
    updateProject: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        )
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
