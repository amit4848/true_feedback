import mongoose from 'mongoose';
// import {z} from 'zod'

type ConnectionObject ={
    isConnected?:number
}

const connection :ConnectionObject={}

async function  dbConnect():Promise<void> {
    if(connection.isConnected)
    {
        console.log("Alredy connected to database");
        return 
    }

    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||'',{})
        connection.isConnected=db.connections[0].readyState
        console.log("DB Connected Successfully");
    }
    catch(error)
    {
        console.log("Data Base Connection is failed ",error)
        process.exit(1)
    }
}

export default dbConnect 