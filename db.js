import mongoose, { mongo } from "mongoose";
//mongoose.connect("mongodb+srv://connect4emoji:na!%237gng!nag@cluster0.yidpscv.mongodb.net/connect4").then(x => console.log(x.version))
const conn = mongoose.connection;

export const addWaiting = async (e) => {
        try {
            await mongoose.connect('mongodb+srv://connect4emoji:na!%237gng!nag@cluster0.yidpscv.mongodb.net/connect4');
            let conn = mongoose.connection
            let record = await conn.collection("waitingroom").insertOne(e)
            return record.acknowledged
            // Your code here
        } catch (error) {
            console.error('Mongoose connection error:', error);
        }
}

export const searchWaiting = async () => {
        try {
            await mongoose.connect('mongodb+srv://connect4emoji:na!%237gng!nag@cluster0.yidpscv.mongodb.net/connect4');
            let conn = mongoose.connection
            let delRecord = (await conn.collection("waitingroom").findOneAndDelete({}))
            return delRecord
            // Your code here
        } catch (error) {
            console.error('Mongoose connection error:', error);
        }
}