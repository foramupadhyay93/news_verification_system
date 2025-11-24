import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source?: string;
}

export interface VerificationResult {
  title: string;
  credibility: number;
  wiki: {
    extract?: string;
    description?: string;
    content_urls?: {
      desktop?: {
        page?: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getNews(source: string = 'bbc'): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.apiUrl}/news?source=${source}`);
  }

  verifyNews(title: string): Observable<VerificationResult> {
    const encodedTitle = encodeURIComponent(title);
    return this.http.get<VerificationResult>(`${this.apiUrl}/verify?title=${encodedTitle}`);
  }
}

