import {Student} from "./student";
import {Teacher} from "./teacher";

export class Room{
  id!: number;
  classNumber: number;
  classLetter: string;
  students: Student[];
  classroomTeacher: Teacher;

  constructor() {
    this.classNumber = -1;
    this.classLetter = '';
    this.students = new Array<Student>();
    this.classroomTeacher = new Teacher;
  }
}
