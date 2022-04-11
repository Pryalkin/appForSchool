import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';
import { RoomsComponent } from './rooms/rooms.component';
import {RoomService} from "./service/room.service";
import {HttpClientModule} from "@angular/common/http";
import { AdministrationComponent } from './administration/administration.component';
import { TeacherFormComponent } from './administration/teacher-form/teacher-form.component';
import { StudentFormComponent } from './administration/student-form/student-form.component';
import { RoomFormComponent } from './administration/room-form/room-form.component';
import { TimetableFormComponent } from './administration/timetable-form/timetable-form.component';
import {FormsModule} from "@angular/forms";
import {AdministrationService} from "./service/administration.service";
import {NotificationService} from "./service/notification.service";
import {NotificationModule} from "./notification.module";
import { StudentsComponent } from './rooms/students/students.component';
import { InfoComponent } from './info/info.component';
import { ItemComponent } from './administration/item/item.component';
import { StudentComponent } from './rooms/students/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    RoomsComponent,
    AdministrationComponent,
    TeacherFormComponent,
    StudentFormComponent,
    RoomFormComponent,
    TimetableFormComponent,
    StudentsComponent,
    InfoComponent,
    ItemComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotificationModule
  ],
  providers: [NotificationService, RoomService, AdministrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
