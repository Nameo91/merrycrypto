import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import type { News } from '../tagged-news/tagged-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})

export class NewsComponent implements OnInit {
  news!: News;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().subscribe((news) => {
      this.news = news;
    });
  }

  get loading(): boolean {
    return this.news === undefined;
  }
}
