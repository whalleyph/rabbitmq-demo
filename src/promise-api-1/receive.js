import { connect } from "amqplib";

//We've put all work in a function just so we can use async/await
async function doReceivingDemo() {
    const queueName = "neill-tasks";
    const conn = await connect("amqp://localhost");

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
}
doReceivingDemo();
