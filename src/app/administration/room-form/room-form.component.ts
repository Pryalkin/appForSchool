import {Component, OnInit} from '@angular/core';
import {Room} from "../../entity/room";
import {Teacher} from "../../entity/teacher";
import {Subscription} from "rxjs";
import {AdministrationService} from "../../service/administration.service";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  showLoading: boolean = false;
  teachers: Teacher[] = new Array<Teacher>();
  private subscriptions: Subscription[] = [];
  private room: Room = new Room();

  constructor(private administrationService: AdministrationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.requestTeacher();
  }

  public requestTeacher(): void{
      this.subscriptions.push(
        this.administrationService.requestTeacher().subscribe((response: Teacher[]) => {
          this.teachers = response;
        })
      );
  }

  public onRoom(formRoom: NgForm){
    if (this.validateClassNumberAndClassLetter(formRoom.form.value.classNumber, formRoom.form.value.classLetter)){
      this.createNewRoom(formRoom);
      this.subscriptions.push(
        this.administrationService.addRoom(this.room).subscribe(
          (response: Room) => {
            this.proceduresAfterSendingToTheServer();
            this.notificationService.notify(NotificationType.SUCCESS, `Класс ${response.classNumber}${response.classLetter} успешно добавлен в систему.`);
          },
          (errorResponse: HttpErrorResponse) => {
            this.proceduresAfterSendingToTheServer();
            this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
          })
      );
    } else {

    }
  }

  private createNewRoom(formRoom: NgForm) {
    this.room.classNumber = formRoom.form.value.classNumber;
    this.room.classLetter = formRoom.form.value.classLetter.toUpperCase();
    this.room.classroomTeacher.id = formRoom.form.value.classroomTeacher;
  }

  private validateClassNumberAndClassLetter(classNumber: number, classLetter: string): boolean {
    if (classNumber > 0 && classNumber < 12){
      const regex = new RegExp('[А-Д]');
      if (regex.test(classLetter)){
        return true;
      } else {
        this.notificationService.notify(NotificationType.ERROR, "Буква класса должна быть от А по Д.");
      }
    } else {
      this.notificationService.notify(NotificationType.ERROR, "Номер класса должен быть от 1 по 11");
    }
    return false;
  }

  private proceduresAfterSendingToTheServer() {
    this.showLoading = false;
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('room');
    form.reset();
    let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById('classroomTeacher');
    select.value = "";
  }
}
