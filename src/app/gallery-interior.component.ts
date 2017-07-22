import { Component } from '@angular/core';

import { GALLERY_IMGS, IMG_LOAD_AMOUNT } from './mock-gallery-imgs';

@Component({
  selector: 'gallery-page',
  template: `
      <masonry [useImagesLoaded]="true"class="masonry_main" id="masonry_main"
        infinite-scroll [infiniteScrollDistance]="scrollDistance" [infiniteScrollThrottle]="throttle" (scrolled)="onScrollDown()">
        <masonry-brick class="masonry-brick" *ngFor="let item of items" (click)="slider_open(item.id)">
          <div class="gallery-item">
            <img src={{item.image}} class="gallery-img" (load)="masonryImgLoaded()">
          </div>
        </masonry-brick>
      </masonry>
    <div id="slider">
      <div id="slider_blur" (click)="slider_close()"></div>
      <div class="button_prev" (click)="prev()"></div>
      <img [src]="slider_img_left" id="slider_img_left">
      <img [src]="slider_img_center" id="slider_img_center" (click)="next()" (mouseover)="sliderImgMouseOver()" (mouseleave)="sliderImgMouseLeave()">
      <img [src]="slider_img_right" id="slider_img_right">
      <div id="button_next" (click)="next()" (mouseover)="sliderImgMouseOver()" (mouseleave)="sliderImgMouseLeave()"></div>
    </div>
  `,
  styleUrls: [
    'css/gallery.css',
    'css/gallery-slider.css'
  ]
})

export class GalleryInteriorComponent {
  img_type='interior';
  img_amount_total=1;
  img_load_amount=IMG_LOAD_AMOUNT;
  slider_position=1;
  slider_maxposition;
  img_amount=0;
  throttle = 300;
  scrollDistance = 0.6;
  slider_img_left;
  slider_img_center;
  slider_img_right;
  slider_img_element_left;
  slider_img_element_center;
  slider_img_element_right;
  slider_img_element_left_active;
  slider_img_element_center_active;
  slider_img_element_right_active;
  slider_img_element_left_overflow;
  slider_img_element_right_overflow;
  slider_element;
  autoload_element;
  slider_next_button_element;
  document_height_standart;
  document_height;
  layoutsComplete=0;
  public img_array=[];
  public items=[];
  constructor() {
    this.document_height_standart = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    this.img_array=GALLERY_IMGS;
    for (let i = 0; this.items.length < this.img_load_amount; i++ ) {
      if(this.img_array[i].type === this.img_type) {
        this.items.push(this.img_array[i]);
      }
      this.img_amount_total++;
    }
    this.slider_maxposition=this.items.length;
    this.onScrollDown();
    this.createSlider();
    window.onload = ()=>{
      this.slider_img_element_left=document.getElementById("slider_img_left");
      this.slider_img_element_center=document.getElementById("slider_img_center");
      this.slider_img_element_right=document.getElementById("slider_img_right");
      this.slider_element=document.getElementById("slider");
      this.autoload_element=document.getElementById("autoload_indicator");
      this.slider_next_button_element=document.getElementById("button_next");
    }
  }
  createSlider() {
    if(this.slider_position-1<1) {
      this.slider_img_left=this.items[this.slider_maxposition+this.slider_position-2].image;
    }else{this.slider_img_left=this.items[this.slider_position-2].image;}

    this.slider_img_center=this.items[this.slider_position-1].image;

    if(this.slider_position+1>this.slider_maxposition) {
      this.slider_img_right=this.items[0].image;
    }else{this.slider_img_right=this.items[this.slider_position].image;}
  }
  next() {
    this.slider_img_element_left.id="slider_img_left_overflow";
    this.slider_img_element_center.id="slider_img_center_active";
    this.slider_img_element_right.id="slider_img_right_active";
    this.slider_img_element_left_overflow=document.getElementById("slider_img_left_overflow");
    this.slider_img_element_center_active=document.getElementById("slider_img_center_active");
    this.slider_img_element_right_active=document.getElementById("slider_img_right_active");
    this.slider_img_element_left_overflow.style.left="150%";
    this.slider_img_element_center_active.style.left="-50%";
    this.slider_img_element_right_active.style.left="50%";
    setTimeout(()=>{
      this.slider_img_element_left_overflow.id="slider_img_right";
      this.slider_img_element_center_active.id="slider_img_left";
      this.slider_img_element_right_active.id="slider_img_center";
      this.slider_img_element_left_overflow.style.left="-50%";
      this.slider_img_element_center_active.style.left="50%";
      this.slider_img_element_right_active.style.left="150%";
      this.slider_position+=1;
      if(this.slider_position > this.slider_maxposition) {this.slider_position=1}
      this.createSlider();
    },201);
  }
  prev() {
    this.slider_img_element_left.id="slider_img_left_active";
    this.slider_img_element_center.id="slider_img_center_active";
    this.slider_img_element_right.id="slider_img_right_overflow";
    this.slider_img_element_left_active=document.getElementById("slider_img_left_active");
    this.slider_img_element_center_active=document.getElementById("slider_img_center_active");
    this.slider_img_element_right_overflow=document.getElementById("slider_img_right_overflow");
    this.slider_img_element_left_active.style.left="50%";
    this.slider_img_element_center_active.style.left="150%";
    this.slider_img_element_right_overflow.style.left="-50%";
    setTimeout(()=>{
      this.slider_img_element_left_active.id="slider_img_center";
      this.slider_img_element_center_active.id="slider_img_right";
      this.slider_img_element_right_overflow.id="slider_img_left";
      this.slider_img_element_left_active.style.left="-50%";
      this.slider_img_element_center_active.style.left="50%";
      this.slider_img_element_right_overflow.style.left="150%";
      this.slider_position-=1;
      if(this.slider_position === 0) {this.slider_position=this.slider_maxposition}
      this.createSlider();
    },201);
  }
  onScrollDown() {
    if(this.img_amount+1 != this.img_array.length){
      if(this.img_amount === 0){
        for (let i = 0; i < this.img_load_amount; i++) {
          this.items[i].id=i+1;
        }
        this.img_amount=this.img_load_amount;
      }else{
        let img_amount_for = this.img_amount+this.img_load_amount;
        for ( ; this.img_amount < img_amount_for; this.img_amount_total++) {
          if(this.img_array[this.img_amount_total].type === this.img_type) {
            this.items.push(this.img_array[this.img_amount_total]);
            this.items[this.img_amount].id=this.img_amount+1;
            this.slider_maxposition=this.items.length;
            this.img_amount++;
          }
          if(this.img_amount_total+1 === this.img_array.length) break;
        }
      }
    }
  }
  slider_open(id) {
    this.slider_position=id;
    this.createSlider();
    this.slider_element.style.display="block";
    setTimeout(()=>{
      this.slider_element.style.opacity="1";
    },1);
  }
  slider_close() {
    this.slider_element.style.opacity="0";
    setTimeout(()=>{
      this.slider_element.style.display="none";
    },201);
  }
  sliderImgMouseOver() {
    this.slider_next_button_element.style.opacity="0.3";
  }
  sliderImgMouseLeave() {
    this.slider_next_button_element.style.opacity="0";
  }
  masonryImgLoaded() {
    this.layoutsComplete+=1;
    if(this.layoutsComplete%this.img_load_amount === 0 && this.layoutsComplete!=1) {
      this.document_height=Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      if(this.document_height === this.document_height_standart) {
        setTimeout(()=>{
          this.onScrollDown();
        },300);
      }
    }
  }
}



// document_height_standart;
// document_height;
// document_height_last=0;
// constructor(){
//   this.document_height_standart = Math.max(
//     document.body.scrollHeight, document.documentElement.scrollHeight,
//     document.body.offsetHeight, document.documentElement.offsetHeight,
//     document.body.clientHeight, document.documentElement.clientHeight
//   );
// }
// onScrollDownTest() {
//   this.document_height = Math.max(
//     document.body.scrollHeight, document.documentElement.scrollHeight,
//     document.body.offsetHeight, document.documentElement.offsetHeight,
//     document.body.clientHeight, document.documentElement.clientHeight
//   );
//   if(this.document_height-window.pageYOffset-100<this.document_height_standart){
//     this.onScrollDown();
//   }
// }
// onScrollDown(){
//   if(this.document_height_last != this.document_height){
//     this.document_height_last=this.document_height;
//   }
// }
