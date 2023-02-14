var messages = require('./message_pb');
var services = require('./message_grpc_pb');
var grpc = require('@grpc/grpc-js');

function main() {
    var target = 'localhost:50051';
    var client = new services.TransporterClient(
        target,
        grpc.credentials.createInsecure());


    var request = new messages.Request();
    request.setMessageid("this is messageID");
    request.setData(Buffer.from("this is data"));
    client.sendMessage(request, function (err, response) {
        if (!err) {
            console.log('reply:', (new TextDecoder().decode(response?.getData())));
        } else {
            console.log('error:', err);
        }
    });
}

main();