import { createClient } from "redis"; // redis always connects to 6379 on this machine
const client = createClient();
const startServer = async() => {
    try {
        await client.connect();
        console.log("client connected");
    } catch (error) {
        console.log(error);
    }
}
startServer();

const main = async() => {
    while(1) {
        const response = await client.brPop("problems", 0);
        // run user's code in some container
        await new Promise((resolve) => setTimeout(resolve,2000));
        // send it to pubsub
        console.log('processed requesst:' + JSON.stringify(response));
    }
}
main();