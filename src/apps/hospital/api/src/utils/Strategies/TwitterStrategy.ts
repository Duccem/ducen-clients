import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(@Inject('OAUTH2_CONFIGURATION') config: any) {
    super({
      consumerKey: config.twitterClientID,
      consumerSecret: config.twitterClientSecret,
      oauth_callback: 'http://localhost:3000/auth/twitter/redirect',
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true&skip_status=true',
    });
  }
  async validate(accessToken: string, tokenSecret: string, profile: Profile, cb: (err: any, user: any) => void) {
    const payload = {
      profile,
      accessToken,
    };

    cb(null, payload);
  }
}
