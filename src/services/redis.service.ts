/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisService {
  private client: RedisClientType

  constructor() {
    this.client = createClient()
    this.client.connect()
  }

  async setData(key: string, value: string) {
    await this.client.set(key, value)
  }

  async getData(key: string): Promise<string> {
    return this.client.get(key)
  }
}