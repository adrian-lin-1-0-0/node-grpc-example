gen-static-proto:
	grpc_tools_node_protoc --proto_path=protos --js_out=import_style=commonjs,binary:static_codegen/ --grpc_out=grpc_js:static_codegen message.proto
