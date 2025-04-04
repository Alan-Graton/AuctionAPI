import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ItemsModule } from "./items/items.module";
import { BidsModule } from "./bids/bids.module";
import { WebsocketModule } from "./websockets/websocket.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
      isGlobal: true,
    }),
    AuthModule,
    ItemsModule,
    BidsModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
