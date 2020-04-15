import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';



@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
