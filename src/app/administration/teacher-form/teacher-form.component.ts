import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../entity/teacher";
import {Subscription} from "rxjs";
import {AdministrationService} from "../../service/administration.service";
import {NotificationType} from "../../enum/notification-type.enum";
import {NotificationService} from "../../service/notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-education-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private administrationService: AdministrationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }


  public onTeacher(teacher: Teacher){
    this.subscriptions.push(
      this.administrationService.addTeacher(teacher).subscribe(
        (response: Teacher) => {
          this.showLoading = false;
          let form: HTMLFormElement = <HTMLFormElement> document.getElementById('teacher');
          form.reset();
          this.notificationService.notify(NotificationType.SUCCESS, `Преподователь ${response.firstName} ${response.lastName} успешно добавлен в систему.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          let form: HTMLFormElement = <HTMLFormElement> document.getElementById('teacher');
          form.reset();
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        })
    );
  }
}
