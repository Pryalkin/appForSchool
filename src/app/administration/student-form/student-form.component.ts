import { Component, OnInit } from '@angular/core';
import {Student} from "../../entity/student";
import {Room} from "../../entity/room";
import {Subscription} from "rxjs";
import {RoomService} from "../../service/room.service";
import {Teacher} from "../../entity/teacher";
import {NotificationType} from "../../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {AdministrationService} from "../../service/administration.service";
import {NotificationService} from "../../service/notification.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  showLoading: boolean = false;
  rooms: Room[] = new Array<Room>();
  private subscriptions: Subscription[] = [];
  private student: Student = new Student();

  constructor(
    private roomService: RoomService,
    private administrationService: AdministrationService,
    private notificationService: NotificationService
  )
  { }

  ngOnInit(): void {
    this.requestСlasses();
  }

  public requestСlasses(): void{
    this.subscriptions.push(
      this.administrationService.requestClasses().subscribe((response: Room[]) => {
        this.rooms = response;
      })
    );
  }

  public onStudent(formStudent: NgForm): void{
      this.student.firstName = formStudent.form.value.firstName;
      this.student.lastName = formStudent.form.value.lastName;
      let classId: number = +formStudent.form.value.room;
      this.subscriptions.push(
        this.administrationService.addStudent(this.student, classId).subscribe(
          (response: Student) => {
            this.proceduresAfterSendingToTheServer();
            this.notificationService.notify(NotificationType.SUCCESS, `Студент ${response.firstName} ${response.lastName} успешно добавлен в систему.`);
          },
          (errorResponse: HttpErrorResponse) => {
            this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          })
      );
    }

  private proceduresAfterSendingToTheServer() {
    this.showLoading = false;
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('student');
    form.reset();
    let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById('room');
    select.value = "";

  }
}
