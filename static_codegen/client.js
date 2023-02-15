const grpc = require('@grpc/grpc-js');
const {
    GRPC_ADDR,
    MESSAGE_ID,
    REQUEST_DATA
} = require('../config');
const messages = require('./message_pb');
const services = require('./message_grpc_pb');

function main() {
    var client = new services.TransporterClient(
        GRPC_ADDR,
        grpc.credentials.createInsecure());

    var request = new messages.Request();
    request.setMessageId(MESSAGE_ID);
    request.setData(Buffer.from(REQUEST_DATA));
    client.sendMessage(request, function (err, response) {
        if (!err) {
            console.log(`[recive] message_id : ${response.getMessageId()} data : ${(new TextDecoder().decode(response?.getData()))}`);
        } else {
            console.log('error:', err);
        }
    });
}

main();