import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../entity/room";
import {Student} from "../entity/student";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public requestClasses(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.host}/rooms/all`);
  }

  public requestStudent(numberRoom: string): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.host}/rooms/students/${numberRoom}`);
  }

}
