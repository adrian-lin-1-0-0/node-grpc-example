// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var message_pb = require('./message_pb.js');

function serialize_message_Reply(arg) {
  if (!(arg instanceof message_pb.Reply)) {
    throw new Error('Expected argument of type message.Reply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_message_Reply(buffer_arg) {
  return message_pb.Reply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_message_Request(arg) {
  if (!(arg instanceof message_pb.Request)) {
    throw new Error('Expected argument of type message.Request');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_message_Request(buffer_arg) {
  return message_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransporterService = exports.TransporterService = {
  sendMessage: {
    path: '/message.Transporter/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.Request,
    responseType: message_pb.Reply,
    requestSerialize: serialize_message_Request,
    requestDeserialize: deserialize_message_Request,
    responseSerialize: serialize_message_Reply,
    responseDeserialize: deserialize_message_Reply,
  },
};

exports.TransporterClient = grpc.makeGenericClientConstructor(TransporterService);
