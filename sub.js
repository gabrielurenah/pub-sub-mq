
var amqp = require('amqplib/callback_api');
var dotenv = require('dotenv');

dotenv.config();

amqp.connect(process.env.AMQP_URL, function (err, conn) {

  conn.createChannel(function (err, ch) {
    var ex = process.argv[2] === 'c' ? "questions" : "answers"
    if (process.argv[2] === 'c') {
      console.log("🌎Subscriber from cellphone to questions🌎")
    } else {
      console.log("🔥Subscriber from computer to answers🔥")
    }

    ch.assertExchange(ex, 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }, function (err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function (msg) {
        console.log(" [x] %s", msg.content.toString());
      }, { noAck: true });
    });
  });

})
