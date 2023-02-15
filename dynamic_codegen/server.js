const {
  REPLY_DATA,
  GRPC_ADDR
} = require('../config');
const grpc = require('@grpc/grpc-js');
const { packageDefinitionFactory } = require('./utils');

const message_proto = grpc.loadPackageDefinition(packageDefinitionFactory()).message;

function ReplyFunc(call, callback) {
  console.log(`message_id: ${call.request.message_id}, data: ${call.request.data}`);
  callback(null, { message_id: call.request.message_id, data: Buffer.from(REPLY_DATA) });
}

function main() {
  var server = new grpc.Server();
  server.addService(message_proto.Transporter.service, { sendMessage: ReplyFunc });
  server.bindAsync(GRPC_ADDR, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();