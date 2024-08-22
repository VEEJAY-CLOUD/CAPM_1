const cds = require('@sap/cds'); //Importing required Libraries
const { select } = require('@sap/cds/libx/_runtime/hana/execute');

//If we use module.exports, then only the custom logic will be public for all other files 
//or else it will be a private variable & can't be used by other files.
module.exports = cds.service.impl(async function () {
    //============================================================================= 
    //FOR STUNDENT table, I have requirement to check
    //one table --> one before / one after (ALL REQUIREMNTS for STUDENT TABLE)
    //=============================================================================
    //before, select query and request / reject
    this.before('CREATE', 'Students', async req => {
        let student_idFromUser = req.data.student_id;
        let hasStudentPaidTheFees = await SELECT.from('vejay_studentsFees').where({ student_id: student_idFromUser });
        if (hasStudentPaidTheFees.length > 0 && hasStudentPaidTheFees[0].fees_paid == 1) {
        }
        else {
            req.reject({
                code: 500,
                message: 'Please pay the fees before creating record in the students table'
            });
        }
    });
    //after event
    this.after('CREATE', 'Students', async req => {
        let student_id = req.student_id;
        let payloadForInsert = {
            student_id: student_id,
            message: "Successfully Created Student"
        }
        let finalResult = await INSERT.into('vejay_Logs').entries(payloadForInsert);
        console.log(finalResult);
    });
    //=================================================================================== 
    //FOR EMPLOYEEATTENDANCE table, I have requirement to check
    //one table --> one before / one after (ALL REQUIREMNTS for EMPLOYEEATTENDANCE TABLE)
    //===================================================================================
    this.before('CREATE', 'EmployeeAttendance', async req => {
        let employee_id = req.data.employee_id;
        let employee_has_access = await SELECT.from('vejay_EmployeeAccess').where({ employee_id: employee_id })
        employee_has_access = employee_has_access[0].access_present;
        if (!employee_has_access) {
            req.reject({
                code: '500',
                message: "Access Denied, Please contact Administrator"
            });
        }
    });

    this.after('CREATE', 'EmployeeAttendance', async req => {
        let employee_id = req.employee_id;
        let payloadForInsert = {
            employee_id: employee_id,
            todaysdate: new Date().toISOString().split('T')[0]
        }
        await INSERT.into('vejay_EveryDayLunch').entries(payloadForInsert)

    });

    this.on('READ', 'CompleteStudentInfo', async req => {
        let student_idFromUser = req.params[0].student_id;
        let StudentName = await SELECT.from('vejay_students').where({ student_id: student_idFromUser })
        StudentName = StudentName[0].student_name

        let StudentMarks = await SELECT.from('vejay_studentsMarks').where({ student_id: student_idFromUser })

        let StudentFees = await SELECT.from('vejay_studentsFees').where({ student_id: student_idFromUser })
        StudentFees = StudentFees[0].fees_paid;

        let response = {
            student_id: student_idFromUser,
            student_name: StudentName,
            Marks: StudentMarks,
            fees_paid: StudentFees
        }
        req.reply(response);
    });
});