const {
    MESSAGE_ID,
    REQUEST_DATA,
    GRPC_ADDR
} = require('../config');
const grpc = require('@grpc/grpc-js');
const { packageDefinitionFactory } = require('./utils');

const message_proto = grpc.loadPackageDefinition(packageDefinitionFactory()).message;

function main() {
    const client = new message_proto.Transporter(
        GRPC_ADDR,
        grpc.credentials.createInsecure());

    client.sendMessage({
        message_id: MESSAGE_ID,
        data: Buffer.from(REQUEST_DATA)
    }, function (err, response) {
        if (!err) {
            console.log(`[recive] message_id : ${response.message_id}, data : ${(response?.data)?.toString()}`);
        } else {
            console.log('error:', err);
        }
    });
}

main();