var messages = require('./message_pb');
var services = require('./message_grpc_pb');
var grpc = require('@grpc/grpc-js');

function ReplyFunc(call, callback) {
    var reply = new messages.Reply();
    reply.setMessageid(call.request.getMessageid());
    reply.setData(Buffer.from("hello,this is server"));
    callback(null, reply);
}

function main() {
    var server = new grpc.Server();
    server.addService(services.TransporterService, { sendMessage: ReplyFunc });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();