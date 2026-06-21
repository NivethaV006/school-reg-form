const CONN_TOKEN = ENV.CONN_TOKEN; // Loaded from env.js
const DB_NAME = "SCHOOL-DB";
const RELATION_NAME = "STUDENT-TABLE";
const BASE_URL = "http://api.login2explore.com:5577";
const IML_END_POINT = "/api/iml";
const IRL_END_POINT = "/api/irl";

function showMessage(msg, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.innerText = msg;
    msgDiv.className = `alert ${type}`;
    setTimeout(() => {
        msgDiv.className = 'alert';
        msgDiv.innerText = '';
    }, 4000);
}

function initForm() {
    document.getElementById('rollNo').value = "";
    document.getElementById('fullName').value = "";
    document.getElementById('class').value = "";
    document.getElementById('birthDate').value = "";
    document.getElementById('address').value = "";
    document.getElementById('enrollmentDate').value = "";

    document.getElementById('rollNo').disabled = false;
    document.getElementById('fullName').disabled = true;
    document.getElementById('class').disabled = true;
    document.getElementById('birthDate').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById('enrollmentDate').disabled = true;

    document.getElementById('saveBtn').disabled = true;
    document.getElementById('updateBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;

    document.getElementById('rollNo').focus();
}

function resetForm() {
    initForm();
}

function validateData() {
    const rollNo = document.getElementById('rollNo').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const className = document.getElementById('class').value.trim();
    const birthDate = document.getElementById('birthDate').value.trim();
    const address = document.getElementById('address').value.trim();
    const enrollmentDate = document.getElementById('enrollmentDate').value.trim();

    if (rollNo === "") { showMessage("Roll-No is required", "error"); document.getElementById('rollNo').focus(); return ""; }
    if (fullName === "") { showMessage("Full-Name is required", "error"); document.getElementById('fullName').focus(); return ""; }
    if (className === "") { showMessage("Class is required", "error"); document.getElementById('class').focus(); return ""; }
    if (birthDate === "") { showMessage("Birth-Date is required", "error"); document.getElementById('birthDate').focus(); return ""; }
    if (address === "") { showMessage("Address is required", "error"); document.getElementById('address').focus(); return ""; }
    if (enrollmentDate === "") { showMessage("Enrollment-Date is required", "error"); document.getElementById('enrollmentDate').focus(); return ""; }

    const jsonStrObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": className,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}



let currentRecordNo = null;

function getStudent() {
    const rollNo = document.getElementById('rollNo').value.trim();
    if (rollNo === "") return;

    const getReqStr = createGET_BY_KEYRequest(CONN_TOKEN, DB_NAME, RELATION_NAME, JSON.stringify({ "Roll-No": rollNo }));
    
    jQuery.ajaxSetup({async: false});
    const resObj = executeCommandAtGivenBaseUrl(getReqStr, BASE_URL, IRL_END_POINT);
    jQuery.ajaxSetup({async: true});

    if (resObj.status === 400) {
        // Data not found, new record
        document.getElementById('saveBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;

        document.getElementById('fullName').disabled = false;
        document.getElementById('class').disabled = false;
        document.getElementById('birthDate').disabled = false;
        document.getElementById('address').disabled = false;
        document.getElementById('enrollmentDate').disabled = false;

        document.getElementById('fullName').focus();
    } else if (resObj.status === 200) {
        // Data found
        const data = JSON.parse(resObj.data).record;
        currentRecordNo = JSON.parse(resObj.data).rec_no;

        document.getElementById('rollNo').disabled = true;
        document.getElementById('fullName').value = data["Full-Name"];
        document.getElementById('class').value = data["Class"];
        document.getElementById('birthDate').value = data["Birth-Date"];
        document.getElementById('address').value = data["Address"];
        document.getElementById('enrollmentDate').value = data["Enrollment-Date"];

        document.getElementById('fullName').disabled = false;
        document.getElementById('class').disabled = false;
        document.getElementById('birthDate').disabled = false;
        document.getElementById('address').disabled = false;
        document.getElementById('enrollmentDate').disabled = false;

        document.getElementById('updateBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;

        document.getElementById('fullName').focus();
    } else {
        showMessage("Error communicating with DB", "error");
    }
}

function saveData() {
    const jsonStr = validateData();
    if (jsonStr === "") return;

    const putReqStr = createPUTRequest(CONN_TOKEN, jsonStr, DB_NAME, RELATION_NAME);

    jQuery.ajaxSetup({async: false});
    const resObj = executeCommandAtGivenBaseUrl(putReqStr, BASE_URL, IML_END_POINT);
    jQuery.ajaxSetup({async: true});

    if (resObj.status === 200) {
        showMessage("Data saved successfully", "success");
        resetForm();
    } else {
        showMessage("Failed to save data: " + resObj.message, "error");
    }
}

function updateData() {
    const jsonStr = validateData();
    if (jsonStr === "") return;

    const updateReqStr = createUPDATERecordRequest(CONN_TOKEN, jsonStr, DB_NAME, RELATION_NAME, currentRecordNo);

    jQuery.ajaxSetup({async: false});
    const resObj = executeCommandAtGivenBaseUrl(updateReqStr, BASE_URL, IML_END_POINT);
    jQuery.ajaxSetup({async: true});

    if (resObj.status === 200) {
        showMessage("Data updated successfully", "success");
        resetForm();
    } else {
        showMessage("Failed to update data: " + resObj.message, "error");
    }
}

// Initialize form on window load
window.onload = initForm;
