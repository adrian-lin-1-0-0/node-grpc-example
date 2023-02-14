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

function ReplyFunc(call, callback) {
  callback(null, { messageID: call.request.messageID, data: Buffer.from("hello,this is server") });
}

function main() {
  var server = new grpc.Server();
  server.addService(message_proto.Transporter.service, { SendMessage: ReplyFunc });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();