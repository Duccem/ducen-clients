//import { ExternalSignQuery } from '@ducen/hospital';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { QueryBus } from 'core';
import { ResponseModeler } from '../utils/Responses/ResponseInterceptor';

@Controller('oauth')
@UseInterceptors(ResponseModeler)
export class OAuthController {
  constructor(@Inject('QUERY_BUS') private queryBus: QueryBus) {}

  // @Get('/facebook')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/facebook/redirect')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookLoginRedirect(@Req() req: any): Promise<any> {
  //   //const query = new ExternalSignQuery(req.user.user);
  //   await this.queryBus.ask(query);
  // }

  // @Get('/google')
  // @UseGuards(AuthGuard('google'))
  // async googleLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleLoginRedirect(@Req() req: any): Promise<any> {
  //   const query = new ExternalSignQuery(req.user.user);
  //   return await this.queryBus.ask(query);
  // }

  // @Get('/twitter')
  // @UseGuards(AuthGuard('twitter'))
  // async twitterLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/twitter/redirect')
  // @UseGuards(AuthGuard('twitter'))
  // async twitterLoginRedirect(@Req() req: any): Promise<any> {
  //   const query = new ExternalSignQuery(req.user.user);
  //   return await this.queryBus.ask(query);
  // }

  // @Get('/linkedin')
  // @UseGuards(AuthGuard('linkedin'))
  // async linkedinLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/linkedin/redirect')
  // @UseGuards(AuthGuard('linkedin'))
  // async linkedinLoginRedirect(@Req() req: any): Promise<any> {
  //   const query = new ExternalSignQuery(req.user.user);
  //   return await this.queryBus.ask(query);
  // }

  // @Get('/github')
  // @UseGuards(AuthGuard('github'))
  // async githubLogin(): Promise<any> {
  //   return HttpStatus.OK;
  // }

  // @Get('/github/redirect')
  // @UseGuards(AuthGuard('github'))
  // async githubLoginRedirect(@Req() req: any): Promise<any> {
  //   const query = new ExternalSignQuery(req.user.user);
  //   return await this.queryBus.ask(query);
  // }
}
