namespace vejay;

//Table Creation

entity students{
    key student_id: String;     //5000
        student_name: String;
}

entity studentsMarks{
    key student_id: String;     //5000
    key subject: String;
        Marks:Integer;
}

entity studentsFees{
    key student_id: String;     //5000
        fees_paid: Boolean;
}

entity Logs{
    key student_id: String;     //5000
        message: String;
}