/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { ValidationController } from "src/controller/app.controller";
import { RedisService } from "src/services/redis.service";
import { ValidationService } from "src/services/validation.service";

@Module({
  imports: [],
  providers: [RedisService, ValidationService],
  exports: [RedisService],
  controllers: [ValidationController]
})

export class AppModule { }