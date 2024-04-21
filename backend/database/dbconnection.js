import mongoose from 'mongoose'

const dbconn = async () => {
    const conn_done = await mongoose.connect(process.env.MONGO_URI)
    if (conn_done) console.log("Databases Connection done Successfully")
    else console.log("Fail Database connestion")
}


export default dbconn