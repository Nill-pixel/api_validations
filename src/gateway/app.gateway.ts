/* eslint-disable prettier/prettier */
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
@WebSocketGateway()
export class AppGateWay {
  @SubscribeMessage('validate')
  handleValidation(@MessageBody() data: any): string {
    return 'validated: ' + JSON.stringify(data)
  }
}