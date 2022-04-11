import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {AdministrationComponent} from "./administration/administration.component";
import {TeacherFormComponent} from "./administration/teacher-form/teacher-form.component";
import {RoomFormComponent} from "./administration/room-form/room-form.component";
import {StudentFormComponent} from "./administration/student-form/student-form.component";
import {TimetableFormComponent} from "./administration/timetable-form/timetable-form.component";
import {StudentsComponent} from "./rooms/students/students.component";
import {InfoComponent} from "./info/info.component";
import {ItemComponent} from "./administration/item/item.component";
import {Student} from "./entity/student";
import {StudentComponent} from "./rooms/students/student/student.component";

const itemRoutes: Routes = [
  { path: 'itemForm', component: ItemComponent},
  { path: 'teacherForm', component: TeacherFormComponent},
  { path: 'roomForm', component: RoomFormComponent},
  { path: 'studentForm', component: StudentFormComponent},
  { path: 'timetableForm', component: TimetableFormComponent}
];

const item2RoutesChildren: Routes = [
  { path: ':id', component: StudentComponent},
];

const item2Routes: Routes = [
  { path: ':room', component: StudentsComponent, children: item2RoutesChildren},
];

const routes: Routes = [
  {path: 'rooms', component: RoomsComponent, children: item2Routes},
  {path: 'rooms', component: RoomsComponent},
  {path: '', component: InfoComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'administration', component: AdministrationComponent, children: itemRoutes},
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
