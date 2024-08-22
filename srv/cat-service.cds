using {vejay as dbTables} from '../db/data-model';

service school {
    entity Students  as projection on dbTables.students;
    entity Stud_Mark as projection on dbTables.studentsMarks;
    entity stud_Fees as projection on dbTables.studentsFees;
    entity Logs      as projection on dbTables.Logs;

    entity Employee  as projection on dbTables.Employee;
    entity EmployeeAccess  as projection on dbTables.EmployeeAccess;
    entity EmployeeAttendance  as projection on dbTables.EmployeeAttendance;

    entity EveryDayLunch as projection on dbTables.EveryDayLunch;

    entity CompleteStudentInfo as projection on dbTables.CompleteStudentInfo;

    entity staff as projection on dbTables.staff;

    entity SalesOrderheader as projection on dbTables.SalesOrderheader;
    entity SalesOrderItem as projection on dbTables.SalesOrderItem;
}
