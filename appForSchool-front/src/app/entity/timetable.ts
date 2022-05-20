import {Room} from "./room";
import {Item} from "./item";
import {Teacher} from "./teacher";

export class Timetable{
  id!: number;
  room: Room;
  item: Item;
  teacher: Teacher;
  date: Date;

  constructor() {
    this.room = new Room();
    this.item = new Item();
    this.teacher = new Teacher();
    this.date = new Date();
  }
}
