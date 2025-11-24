import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    NewsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

