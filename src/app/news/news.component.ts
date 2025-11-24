import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService, NewsItem, VerificationResult } from '../news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];
  verificationResults: Map<string, VerificationResult> = new Map();
  loading = false;
  error: string | null = null;
  selectedSource: string = 'bbc';
  sources = [
    { value: 'bbc', label: 'BBC News' },
    { value: 'nbc', label: 'NBC New York' }
  ];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  onSourceChange(): void {
    this.verificationResults.clear();
    this.loadNews();
  }

  async loadNews(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;
      this.newsService.getNews(this.selectedSource).subscribe({
        next: (items) => {
          this.newsItems = items;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load news. Make sure the backend server is running.';
          this.loading = false;
          console.error('Error loading news:', err);
        }
      });
    } catch (error) {
      this.error = 'Failed to load news';
      this.loading = false;
    }
  }

  async verifyNews(title: string): Promise<void> {
    try {
      this.loading = true;
      this.error = null;
      this.newsService.verifyNews(title).subscribe({
        next: (result) => {
          this.verificationResults.set(title, result);
          this.loading = false;
        },
        error: (err) => {
          this.error = `Failed to verify news: ${err.message}`;
          this.loading = false;
          console.error('Error verifying news:', err);
        }
      });
    } catch (error) {
      this.error = 'Failed to verify news';
      this.loading = false;
    }
  }

  getVerificationResult(title: string): VerificationResult | undefined {
    return this.verificationResults.get(title);
  }

  hasVerificationResult(title: string): boolean {
    return this.verificationResults.has(title);
  }

  getWikiLink(result: VerificationResult): string {
    return result.wiki.content_urls?.desktop?.page || '#';
  }
}

