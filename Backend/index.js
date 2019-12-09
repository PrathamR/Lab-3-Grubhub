const express=require('express');
const graphqlHTTP = require('express-graphql');
const {database} = require('./config/config');
var mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const schema = require('./schema/schema');
app.use(cors({ origin: 'http://localhost:3200', credentials: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};
connectDB();

//allow cross origin request

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,() => {
    console.log('Listening to port 4000');
})