namespace vejay;

using {
    cuid,
    managed
} from '@sap/cds/common';

//Aspect
aspect ParentNameAspect {
    key parent_name   : String(20);
    parent_occupation : String(5);
}

//Table Creation

entity students : ParentNameAspect {
    key student_id   : String; //5000
        student_name : String;
        parent_id    : String(10);
}

entity studentsMarks {
    key student_id : String; //5000
    key subject    : String;
        Marks      : Integer;
}

entity studentsFees : ParentNameAspect {
    key student_id : String; //5000
        fees_paid  : Boolean;
        parent_id  : String(10);
}

entity Logs {
    key student_id : String; //5000
        message    : String;
}

//First Employee Table to store employee information
entity Employee {
    key employee_id : String(15);
}

entity EmployeeAccess {
    key employee_id    : String(15);
        access_present : Boolean;
}

entity EmployeeAttendance {
    key employee_id : String(15);
    key todaysdate  : Date; //yyyy-mm-dd
}

entity EveryDayLunch {
    key employee_id : String(15);
    key todaysdate  : Date; //yyyy-mm-dd
}

type studentsMarkstype {
    student_id : String;
    subject    : String;
    Marks      : Integer;
}

entity CompleteStudentInfo {
    key student_id   : String; //5000
        student_name : String;
        Marks        : array of studentsMarkstype;
        fees_paid    : Boolean;
}

entity staff : cuid, managed {
    staff_name : String;
}

entity SalesOrderheader {
    key order_id            : String(10);
        ordered_person_name : String;
        to_SalesOrderItem: Composition of  many SalesOrderItem on to_SalesOrderItem.order_id = $self.order_id;
}

entity SalesOrderItem {
    key order_id        : String(10);
    key ordered_item_id : String(10);
        item_name       : String(10);
        to_OrderHeader: Association to SalesOrderheader on to_OrderHeader.order_id = $self.order_id;
        //to_OrderHeader: Association to one SalesOrderheader on to_OrderHeader.order_id = $self.order_id;
}
