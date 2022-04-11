import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  navigate: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  actionsToNavigate(i: number): void{
    this.navigate = i;
  }

}
