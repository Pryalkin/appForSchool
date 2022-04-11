import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Room} from "../../entity/room";
import {map, Subscription} from "rxjs";
import {RoomService} from "../../service/room.service";
import {AdministrationService} from "../../service/administration.service";
import {NotificationService} from "../../service/notification.service";
import {Item} from "../../entity/item";
import {Teacher} from "../../entity/teacher";
import {NotificationType} from "../../enum/notification-type.enum";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {TimetableComponent} from "../../timetable/timetable.component";
import {Timetable} from "../../entity/timetable";

@Component({
  selector: 'app-timetable-form',
  templateUrl: './timetable-form.component.html',
  styleUrls: ['./timetable-form.component.css']
})
export class TimetableFormComponent implements OnInit {
  showLoading: boolean = false;
  rooms: Room[] = new Array<Room>();
  items: Item[] = new Array<Item>();
  teachers: Teacher[] = new Array<Teacher>();
  private subscriptions: Subscription[] = [];
  public timetablesPreview: Timetable[] = new Array<Timetable>();
  private timetables: Timetable[] = new Array<Timetable>();
  private timetable: Timetable = new Timetable();
  i: number = 0;

  constructor(
    private roomService: RoomService,
    private administrationService: AdministrationService,
    private notificationService: NotificationService
  )
  { }

  ngOnInit(): void {
    this.requestСlasses();
    this.requestItems();
    this.requestTeacher();
  }

  public addTimetable(formTimetable: NgForm): void{
    let itemArray = this.conversionOfValuesReceivedFromTheForm(formTimetable.form.value.item);
    let roomArray = this.conversionOfValuesReceivedFromTheForm(formTimetable.form.value.room);
    let classroomTeacherArray = this.conversionOfValuesReceivedFromTheForm(formTimetable.form.value.classroomTeacher);
    this.addToArrayTimetablesPreview(itemArray[1], roomArray[1], classroomTeacherArray[1], formTimetable.form.value.date);
    this.addToArrayTimetables(+itemArray[0], +roomArray[0], +classroomTeacherArray[0], formTimetable.form.value.date);
    this.resetForm();
    this.i = this.timetables.length;
  }

  private resetForm() {
    let form: HTMLFormElement = <HTMLFormElement> document.getElementById('timetable');
    form.reset();
    let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById('classroomTeacher');
    select.value = "";
    select = <HTMLSelectElement>document.getElementById('item');
    select.value = "";
    select = <HTMLSelectElement>document.getElementById('room');
    select.value = "";
  }

  public onTimetable(): void{
    const formData = this.administrationService.getFormForTimetable(this.timetables);
    this.subscriptions.push(
      this.administrationService.addTimetables(formData).subscribe(
        (response: HttpResponse<any>) => {
          this.proceduresAfterSendingToTheServer();
          this.notificationService.notify(NotificationType.SUCCESS, `Расписание успешно добавлено в систему.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.proceduresAfterSendingToTheServer();
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        })
    );
  }

  public check(){
    // console.log(this.timetables);
  }

  private proceduresAfterSendingToTheServer() {
    this.showLoading = false;
    this.i = 0;
    this.timetables = new Array<Timetable>();
    this.timetablesPreview = new Array<Timetable>();
    this.resetForm();
  }

  private requestTeacher(): void{
    this.subscriptions.push(
      this.administrationService.requestTeacher().subscribe((response: Teacher[]) => {
        this.teachers = response;
      })
    );
  }

  private requestСlasses(): void{
    this.subscriptions.push(
      this.roomService.requestClasses().subscribe((response: Room[]) => {
        this.rooms = response;
      })
    );
  }

  private requestItems() {
    this.subscriptions.push(
      this.administrationService.requestItems().subscribe((response: Item[]) => {
        this.items = response;
      })
    );
  }

  private conversionOfValuesReceivedFromTheForm(str: string): string[] {
    let i = str.indexOf(' ');
    let strId = str.substring(0, i);
    let strStr = str.substring(++i);
    let strArray: string[] = [strId, strStr];
    return strArray;
  }

  private addToArrayTimetablesPreview(itemStr: string, roomStr: string, classroomTeacherStr: string, date: Date) {
    this.timetable.item.name = itemStr;
    const roomArray: string[] = this.choiceOfNumberAndLetter(roomStr);
    this.timetable.room.classNumber = +roomArray[0];
    this.timetable.room.classLetter = roomArray[1];
    const classroomTeacherArray: string[] = this.choiceOfLastNameAndFirstName(classroomTeacherStr);
    this.timetable.teacher.firstName = classroomTeacherArray[0];
    this.timetable.teacher.lastName = classroomTeacherArray[1];
    this.timetable.date = date;
    this.timetablesPreview.push(this.timetable);
    this.timetable = new Timetable();
  }

  private addToArrayTimetables(itemId: number, roomId: number, classroomTeacherId: number, date: Date) {
    this.timetable.item.id = itemId;
    this.timetable.room.id = roomId;
    this.timetable.teacher.id = classroomTeacherId;
    this.timetable.date = date;
    this.timetables.push(this.timetable);
    this.timetable = new Timetable();
  }

  private choiceOfNumberAndLetter(roomStr: string): string[] {
    const regex = new RegExp('[А-Д]');
    let i = roomStr.search(regex);
    let roomArray: string[] = [roomStr.substring(0, i), roomStr.substring(i)];
    return roomArray;
  }

  private choiceOfLastNameAndFirstName(classroomTeacherStr: string): string[]  {
    let i = classroomTeacherStr.indexOf(' ');
    let classroomTeacherFirstName = classroomTeacherStr.substring(0, i);
    let classroomTeacherLastName = classroomTeacherStr.substring(++i);
    let classroomTeacherArray: string[] = [classroomTeacherFirstName, classroomTeacherLastName];
    return classroomTeacherArray;
  }
}
