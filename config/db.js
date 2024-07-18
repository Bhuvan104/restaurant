const mongoose=require("mongoose")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 80000, // Increase timeout to 30 seconds
  };
async function connectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URI_local,options, options)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB', err));
    }catch(err){
        console.log(err)
    }
}

module.exports=connectDB