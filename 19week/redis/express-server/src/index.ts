import express from "express"
import { createClient } from "redis" // redis always connects to 6379 on this machine

const app = express();
const client = createClient();
client.on('error', (err) => console.log(`Redis client error: ${err}`));
app.use(express.json());

const startServer = async() => {
    try {
        await client.connect();
        console.log("client connected");

        app.listen(3000, () => console.log("server on port 3000"));
    } catch (error) {
        console.log(error);
    }
}
startServer();

app.post('/submit', async(req, res) => {
    const {problemid, code, language} = req.body;
    // push to a db also
    try {
        await client.lPush("problems", JSON.stringify({problemid, code, language}));
        res.status(200).json({msg: "submission received and stored"});
    } catch (error) {
        console.log(error);
    }
})