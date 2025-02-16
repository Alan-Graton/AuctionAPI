import { Module } from "@nestjs/common";
import { BidsGateway } from "./websocket.gateway";

@Module({ providers: [BidsGateway] })
export class WebsocketModule {}
