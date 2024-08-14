import { connect } from "amqplib";
import { getEnvironmentVariableOrFail } from "./getEnvironmentVariableOrFail.js";

async function doSendingDemo() {
    const exchangeURL = getEnvironmentVariableOrFail("AMQP_EXCHANGE_URL");
    const conn = await connect(exchangeURL);

    const queueName = "neill-tasks";
    const channel = await conn.createChannel();
    //will only create the queue if it doesn't already exist
    await channel.assertQueue(queueName, { durable: false });
    console.log("Sender ready to start sending messages to channel");

    setInterval(() => {
        const messageText = makeMessage();
        const msgToSend = Buffer.from(messageText);
        channel.sendToQueue(queueName, msgToSend);
    }, 2000);

    setTimeout(async () => {
        channel.sendToQueue(queueName, Buffer.from("last message for now!"));

        conn.close();
        process.exit(0);
    }, 10000);
}
doSendingDemo();

function makeMessage() {
    const time = performance.now();
    const playerName = "MysteryScholar";
    const hitPoints = 100;
    const data = { playerName, time, hitPoints };
    return JSON.stringify(data);
}
