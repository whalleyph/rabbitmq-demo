tiny node.js demos of talking to rabbitmq.

Using promise API, and using ESModules.

The content is modified from one of two sources:

-   rabbitmq tutorials: https://www.rabbitmq.com/tutorials/tutorial-one-javascript
-   amqplib examples: https://www.npmjs.com/package/amqplib

See also AMQPLib's port of rabbitmq tutorials: https://github.com/amqp-node/amqplib/tree/main/examples/tutorials

# Suggested first demo

```bash
cp .env.example .env
```

then edit `.env` with a connection-string for an AMQP-broker

Then run

```bash
yarn start-receiver-2
```

Then in another terminal run

```bash
yarn start-sender-2
```

Then modify and write your own sender code.

Try stopping the consumer and having the sender send messages when your consumer is stopped.

_Then_ run the consumer. What do you notice?

Then run the two processes on different machines! (e.g. with a colleague)
