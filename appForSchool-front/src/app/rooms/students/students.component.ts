import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Student} from "../../entity/student";
import {RoomService} from "../../service/room.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students: Student[] = new Array<Student>();
  private subscriptions: Subscription[] = [];
  numberRoom!: string;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClassNumberFromUrl();
  }

  private requestStudent(): void{
    this.subscriptions.push(
      this.roomService.requestStudent(this.numberRoom).subscribe((response: Student[]) => {
        this.students = response;
        console.log(response);
      })
    );
  }

  private getClassNumberFromUrl() {
    this.route.params.subscribe((params: Params) => {
      this.numberRoom = params['room'];
      this.requestStudent();
    });
  }
}
