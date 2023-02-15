const config = require('./config');
const protoLoader = require('@grpc/proto-loader');
const packageDefinitionFactory = ()=>{
    const {PROTO_PATH} = config;
    return  protoLoader.loadSync(
        PROTO_PATH,
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true
        });
}

module.exports = {
    packageDefinitionFactory
};