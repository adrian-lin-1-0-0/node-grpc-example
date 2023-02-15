const grpc = require('@grpc/grpc-js');
const {
    GRPC_ADDR,
    REPLY_DATA
} = require('../config');
const messages = require('./message_pb');
const services = require('./message_grpc_pb');


function ReplyFunc(call, callback) {
    var reply = new messages.Reply();
    console.log(`message_id: ${call.request.getMessageId()}, data: ${(new TextDecoder().decode(call.request.getData()))}`);
    reply.setMessageId(call.request.getMessageId());
    reply.setData(Buffer.from(REPLY_DATA));
    callback(null, reply);
}

function main() {
    var server = new grpc.Server();
    server.addService(services.TransporterService, { sendMessage: ReplyFunc });
    server.bindAsync(GRPC_ADDR, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();