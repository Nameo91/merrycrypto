import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Client } from 'twitter-api-sdk';

@Injectable()
export class TwitterService {
  static API_ROOT = 'https://api.twitter.com/2/tweets/search/recent?';
  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}

  async getTwitterData(coinname: string): Promise<any> {
    const client = new Client(
      this.configService.get<string>('TWITTER_API_KEY'),
    );
    const json = await client.tweets.tweetsRecentSearch({
      query: `has:hashtags lang:en entity:${coinname}`,
      max_results: 10,
      'tweet.fields': ['author_id', 'created_at', 'text'],
      expansions: ['author_id'],
      'user.fields': ['created_at', 'profile_image_url', 'username'],
    });

    const tweets = json.data;
    const users = json.includes.users;

    interface TwitterData {
      created_at: string;
      text: string;
      author_id: string;
      user: { name: string; id: string; username: string };
    }

    function getSpecificTwitData(tweet: any) {
      const twitterObject: TwitterData = {
        created_at: new Date(tweet.created_at).toLocaleString(),
        author_id: tweet.author_id,
        text: tweet.text,
        user: users.find((obj) => {
          return obj.id === tweet.author_id;
        }),
      };
      return twitterObject;
    }

    const finalData = tweets.map(getSpecificTwitData);
    return finalData;
  }
}
