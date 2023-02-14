var PROTO_PATH = __dirname + '/../protos/message.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var message_proto = grpc.loadPackageDefinition(packageDefinition).message;

function main() {
    var target = 'localhost:50051';
    var client = new message_proto.Transporter(
        target,
        grpc.credentials.createInsecure());

    client.SendMessage({
        messageID: "this is transID",
        data: Buffer.from("this is data")
    }, function (err, response) {
        if (!err) {
            console.log('reply:', (response?.data)?.toString());
        } else {
            console.log('error:', err);
        }
    });
}

main();