import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute, Params } from '@angular/router'

type News = {
  title: string;
  url: string;
  image: string;
  body: string;
  tags: string;
}[];

@Component({
  selector: 'app-tagged-news',
  templateUrl: './tagged-news.component.html',
  styleUrls: ['./tagged-news.component.css']
})
export class TaggedNewsComponent implements OnInit {
  filteredNews!: News;
  id!: string | null;

  constructor(
    private newsService: NewsService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getfilteredNews();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  getfilteredNews() {
    this.newsService.getNews().subscribe((news: News) => {
      this.filteredNews = this.newsFilter(news);
    });
  }

  private newsFilter(news: News) {
    const filteredNews = news.filter((singleNews) => singleNews.tags.includes(this.id!));
    return filteredNews
  }
}
