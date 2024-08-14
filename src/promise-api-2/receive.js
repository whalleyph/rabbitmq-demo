import { connect } from "amqplib";
import { getEnvironmentVariableOrFail } from "./getEnvironmentVariableOrFail.js";

async function doReceivingDemo() {
    console.log("Starting setup for consumer");
    const exchangeURL = getEnvironmentVariableOrFail("AMQP_EXCHANGE_URL");
    const conn = await connect(exchangeURL);

    const queueName = "neill-tasks";
    const channel = await conn.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    // Listener
    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            console.log("Received:", msg.content.toString());
            channel.ack(msg);
        } else {
            console.log("Consumer cancelled by server");
        }
    });
    console.log("Registered consumer.  Awaiting messages!");
}

doReceivingDemo();
