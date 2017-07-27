import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageSliderModule }    from 'ng2-page-slider';
import { MasonryModule } from 'angular2-masonry';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { SliderComponent } from './slider.component';
import { AboutUsComponent } from './about-us.component';
import { GalleryComponent } from './gallery.component';
import { GalleryInteriorComponent } from './gallery-interior.component';
import { GalleryExteriorComponent } from './gallery-exterior.component';
import { PartnershipComponent } from './partnership.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    AboutUsComponent,
    GalleryComponent,
    GalleryInteriorComponent,
    GalleryExteriorComponent,
    PartnershipComponent
  ],
  imports: [
    BrowserModule,
    PageSliderModule,
    FormsModule,
    MasonryModule,
    InfiniteScrollModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SliderComponent
      },
      {
        path: 'about',
        component: AboutUsComponent
      },
      {
        path: 'projects',
        component: GalleryComponent
      },
      {
        path: 'projects/interior',
        component: GalleryInteriorComponent
      },
      {
        path: 'projects/exterior',
        component: GalleryExteriorComponent
      },
      {
        path: 'partnership',
        component: PartnershipComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
