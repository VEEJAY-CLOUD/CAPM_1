using {vejay as dbTables} from '../db/data-model';

service school {
    entity Students as projection on dbTables.students;
    entity Stud_Mark as projection on dbTables.studentsMarks;
}
