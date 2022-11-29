import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute } from '@angular/router';

export type News = {
  body: string;
  image: string;
  tags: string;
  title: string;
  url: string;
}[];

@Component({
  selector: 'app-tagged-news',
  templateUrl: './tagged-news.component.html',
  styleUrls: ['./tagged-news.component.css'],
})
export class TaggedNewsComponent implements OnInit {
  filteredNews: News=[];
  public id!: any;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getfilteredNews();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getfilteredNews() {
    this.newsService.getNews().subscribe((news: News) => {
      console.log(news)
      this.filteredNews = this.newsFilter(news);
    });
  }
  
  // noRelatedNews() {
  //   if(this.filteredNews.length === 0) {
  //     return `No ${this.id} related news today`
  //   } else {
  //     return ''
  //   }
  // }
  
  private newsFilter(news: News) {
    const filtered = news.filter((singleNews) =>
      singleNews.tags.includes(this.id) || singleNews.tags.includes(this.id.toLowerCase())
    );
    return filtered;
  }
}
