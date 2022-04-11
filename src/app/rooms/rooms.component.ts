import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from "../entity/room";
import {Subscription} from "rxjs";
import {RoomService} from "../service/room.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent{
  public rooms: Room[] = new Array<Room>();
  private subscriptions: Subscription[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.requestСlasses();
  }

  public requestСlasses(): void{
    this.subscriptions.push(
      this.roomService.requestClasses().subscribe((response: Room[]) => {
        this.rooms = response;
      })
    );
  }

  public showStudents(roomId: number):void{

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
