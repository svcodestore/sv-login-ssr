// GENERATED CODE -- DO NOT EDIT!

// package: user
// file: users.proto

import * as users_pb from "./users_pb";
import * as grpc from "grpc";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUserById: grpc.MethodDefinition<users_pb.GetUserByIdRequest, users_pb.GetUserByIdReply>;
}

export const UserService: IUserService;

export interface IUserServer extends grpc.UntypedServiceImplementation {
  getUserById: grpc.handleUnaryCall<users_pb.GetUserByIdRequest, users_pb.GetUserByIdReply>;
}

export class UserClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getUserById(argument: users_pb.GetUserByIdRequest, callback: grpc.requestCallback<users_pb.GetUserByIdReply>): grpc.ClientUnaryCall;
  getUserById(argument: users_pb.GetUserByIdRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<users_pb.GetUserByIdReply>): grpc.ClientUnaryCall;
  getUserById(argument: users_pb.GetUserByIdRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<users_pb.GetUserByIdReply>): grpc.ClientUnaryCall;
}
