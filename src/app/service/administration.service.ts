import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../entity/room";
import {Teacher} from "../entity/teacher";
import {Student} from "../entity/student";
import {Item} from "../entity/item";
import {Timetable} from "../entity/timetable";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public requestTeacher(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.host}/administration/getTeachers`);
  }

  public requestItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.host}/administration/getItems`);
  }

  public addTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(`${this.host}/administration/addTeacher`, teacher);
  }

  public addItem(item: Item): Observable<Item>{
    return this.http.post<Item>(`${this.host}/administration/addItem`, item);
  }

  public addStudent(student: Student, classId: number): Observable<Student>{
    return this.http.post<Student>(`${this.host}/administration/addStudent/${classId}`, student);
  }

  public addTimetables(formData: FormData): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`${this.host}/administration/addTimetables`, formData);
  }

  public addRoom(room: Room): Observable<Room>{
    return this.http.post<Room>(`${this.host}/administration/addRoom`, room);
  }

  public requestClasses(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.host}/administration/getClasses`);
  }

  public requestStudent(numberRoom: string): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.host}/rooms/students/${numberRoom}`);
  }

  public getFormForTimetable(timetables: Timetable[]): FormData{
    const formData = new FormData();
    formData.append('timetables', JSON.stringify(timetables));
    return formData;
  }

}
