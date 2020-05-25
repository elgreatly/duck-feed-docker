import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DuckFeedService } from './modules/duck-feed-form/services/duck-feed.service';
import { DuckFeedFormModule } from './modules/duck-feed-form/duck-feed-form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DuckFeedFormModule
  ],
  providers: [DuckFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
