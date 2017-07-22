import { Component } from '@angular/core';

@Component({
  selector: 'slider-page',
  templateUrl: './templates/slider.html',
  styleUrls: [
    './css/slider.css'
  ],
})

export class SliderComponent {
  public pageNumber : number = 0;
  public pageCount : number = 0;
  public pages = [
		{
			image:"https://just2guys.github.io/iwon-app/assets/slider/1.jpg"
		},
		{
			image:"https://just2guys.github.io/iwon-app/assets/slider/2.jpg"
		},
		{
			image:"https://just2guys.github.io/iwon-app/assets/slider/3.jpg"
		},
		{
			image:"https://just2guys.github.io/iwon-app/assets/slider/4.jpg"
		},
		{
			image:"https://just2guys.github.io/iwon-app/assets/slider/5.jpg"
		}
	];

  }
