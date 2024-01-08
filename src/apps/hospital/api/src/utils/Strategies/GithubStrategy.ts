import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(@Inject('OAUTH2_CONFIGURATION') config: any) {
    super({
      clientID: config.githubClientID,
      clientSecret: config.githubClientSecret,
      callbackURL: 'http://localhost:3000/auth/github/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any) => void): Promise<any> {
    const payload = {
      profile,
      accessToken,
    };

    done(null, payload);
  }
}
