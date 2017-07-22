import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div id="logo">
        <!--<img src="css/icons/logo.png" id="logoImg">
        <img src="css/icons/logoHover.png" id="logoImgH">-->
      </div>
    	<ul>
    	  <li class="headerLi" id="partner"><a routerLink="partnership" (click)="updatePage()">PARTNERSHIP</a></li>
    	  <li class="headerLi" id="projects"><a routerLink="projects" (click)="updatePage()">PROJECTS</a>
          <div id="projectsBar">
            <ul>
              <li class="headerBarLi"><a routerLink="projects/exterior" (click)="updatePage()">Exterior</a></li>
              <li class="headerBarLi"><a routerLink="projects/interior" (click)="updatePage()">Interior</a></li>
            </ul>
          </div>
        </li>
    	  <li class="headerLi" id="about"><a routerLink="about" (click)="updatePage()">ABOUT US</a></li>
    	  <li class="headerLi" id="main"><a routerLink="" (click)="updatePage()">HOME</a></li>
     	</ul>
    </header>
  `,
  styleUrls: ['css/header.css']
})

export class HeaderComponent {
  updatePage() {
    location.reload();
  }
}
