const cds = require('@sap/cds'); //Importing required Libraries
const { select } = require('@sap/cds/libx/_runtime/hana/execute');

//If we use module.exports, then only the custom logic will be public for all other files 
//or else it will be a private variable & can't be used by other files.
module.exports = cds.service.impl(async function () {

    this.before('CREATE', 'Students', async req => {
        let student_idFromUser = req.data.student_id;
        let hasStudentPaidTheFees = await SELECT.from('vejay_studentsFees').where({ student_id: student_idFromUser });
        if (hasStudentPaidTheFees.length > 0 & hasStudentPaidTheFees[0].fees_paid == 1) {
        }
        else {
            req.reject({
                code: 500,
                message: 'Please pay the fees before creating record in the students table'
            });
        }
    });

});