import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
//import { Prisma } from '@prisma/client';
import { Server, Socket } from 'Socket.IO';
import { AppService } from './app.service';
import * as svgCaptcha from 'svg-captcha';
import { CaptchaService } from './captcha/captcha.service';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
  serveClient: false,
  namespace: 'comments',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly appService: AppService,
    private readonly captchaService: CaptchaService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket) {
    const userName = client.handshake.query.userName as string;
    const socketId = client.id;
    users[socketId] = userName;
    client.broadcast.emit('log', `${userName} connected`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];
    client.broadcast.emit('log', `${userName} disconnected`);
  }

  @SubscribeMessage('comments:get')
  async handleCommentsGet(
    @MessageBody()
    payload,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(payload);
    const { page, pageSize, sort } = payload;
    const comments = await this.appService.getRootComments(
      page,
      pageSize,
      sort,
    );
    client.emit('comments:get', { data: comments });
  }

  @SubscribeMessage('comment:id')
  async handleCommentGetById(
    @MessageBody()
    payload,
    @ConnectedSocket() client: Socket,
  ) {
    const comment = await this.appService.getCommentById(payload.id);
    client.emit('comment:id', comment);
  }

  @SubscribeMessage('comment:post')
  async handleCommentPost(
    @MessageBody()
    payload,
    @ConnectedSocket() client: Socket,
  ) {
    const sessionId = client.id;
    if (!this.captchaService.verifyCaptcha(sessionId, payload.data.captcha)) {
      const captcha = svgCaptcha.create();
      this.captchaService.storeCaptcha(sessionId, captcha.text);
      client.emit('captcha:get', { data: captcha.data });
      return;
    }
    const createdComment = await this.appService.createComment(payload);
    this.server.emit('comment:post', createdComment);
  }

  @SubscribeMessage('comment:put')
  async handleCommentPut(
    @MessageBody()
    payload,
  ) {
    const updatedComment = await this.appService.updateComment(
      payload.id,
      payload.body,
    );
    this.server.emit('comment:put', updatedComment);
  }

  @SubscribeMessage('comment:delete')
  async handleCommentDelete(
    @MessageBody()
    payload,
  ) {
    const removedComment = await this.appService.removeComment(payload.id);
    this.server.emit('comment:delete', removedComment);
  }

  @SubscribeMessage('captcha:get')
  async handleCaptchaGet(@ConnectedSocket() client: Socket) {
    const sessionId = client.id;
    const captcha = svgCaptcha.create();
    this.captchaService.storeCaptcha(sessionId, captcha.text);
    client.emit('captcha:get', { data: captcha.data });
  }
}
