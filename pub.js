var amqp = require('amqplib/callback_api');
var dotenv = require('dotenv');

dotenv.config();

amqp.connect(process.env.AMQP_URL, function (err, conn) {

  conn.createChannel(function (err, ch) {
    console.log('🍿publisher of questions to cellphones🍿')
    var ex = 'questions';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', { durable: false });
    ch.publish(ex, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () { conn.close(); process.exit(0) }, 500);


})
