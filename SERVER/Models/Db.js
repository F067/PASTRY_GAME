import dotenv from 'dotenv'
dotenv.config()
import { connect } from 'mongoose';

connect(`mongodb+srv://foisgregory38:${process.env.MONGO_PWD}@pastrygame.ro5y77v.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((error)=>{
    console.error('Error connecting to MongoDB', error)
})