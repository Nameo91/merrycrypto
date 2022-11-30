import { Component, OnInit } from '@angular/core';
import { RelatedTweetService } from 'src/app/services/related-tweet.service';
import { ActivatedRoute } from '@angular/router';

type Tweets = {
  created_at: string;
  text: string;
  author_id: string;
  user: {
    name: string;
    id: string;
    profile_image_url: string;
    username: string;
  }
}[];

@Component({
  selector: 'app-related-tweet',
  templateUrl: './related-tweet.component.html',
  styleUrls: ['./related-tweet.component.css']
})

export class RelatedTweetComponent implements OnInit {
  public id!: any;
  relatedTweets: Tweets=[];
  showTweets: boolean = false;
  buttonName: 'Show' | 'Hide' = 'Show';

  constructor(
    private relatedTweetService: RelatedTweetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRelatedTweet(this.id);
  }

  getRelatedTweet(id: string) {
    this.relatedTweetService.getRelatedTweets(id).subscribe((tweets: Tweets) => {
      this.relatedTweets = tweets;
    })
  }

  toggleTweetButtons() {
    this.showTweets = !this.showTweets;
    
    if(this.showTweets) {
      this.buttonName = 'Hide'
    } else {
      this.buttonName = 'Show'
    }
  }
}
