# Student Enrollment Form

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Illustrations](#illustrations)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Release History](#release-history)
- [Sources](#sources)
- [Other Information](#other-information)

## Description
This project is a micro web application that provides a fully functional, highly aesthetic Student Enrollment Form. The application interfaces securely with **JsonPowerDB** (JPDB) to perform CRUD operations (Create, Read, Update). It features a modern Glassmorphism UI, interactive elements, and frontend validation. 

## Benefits of using JsonPowerDB
JsonPowerDB is a Real Time, High Performance, Lightweight and Simple to Use, Rest API based Multi-mode DBMS. Its benefits include:
- **Fastest Data Retrieval:** Nimble indexing engine allows blazing fast query performance.
- **Serverless Architecture:** Eliminates the need for backend servers for database operations.
- **Developer Friendly:** Requires minimal coding, drastically reducing development time.
- **Multi-Mode Database:** Operates seamlessly across Document, Key-Value, and RDBMS modes.
- **Low Maintenance:** Built-in web server and easy JSON configurations mean lower dev-ops costs.

## Illustrations
*(Add screenshots of the UI here)*
- **Blank Form:** The initial state with the primary key field enabled.
- **Data Entry:** Form fields enabled for a new entry.
- **Update Mode:** Existing data loaded for modification.

## Scope of Functionalities
- **Data Persistence:** Save new student records to JPDB.
- **Data Retrieval:** Automatically fetch existing student data using their Roll Number.
- **Data Modification:** Update an existing student's details safely.
- **Validation:** Frontend validation to ensure no fields are left empty before data submission.
- **Security:** Token-based authentication using environment files to protect database credentials.

## Examples of Use
1. **New Student:** A user enters a new Roll-No. The system queries the DB, finds no match, and enables the form for the user to input the student's details and click **Save**.
2. **Existing Student:** A user enters an existing Roll-No. The system fetches the student's data, populates the fields, and enables the **Update** button.

## Project Status
Completed - Ready for deployment.

## Release History
* v1.0.0 (Current) - Initial Release: Complete UI, AJAX integration with JPDB, and Environment variable security.

## Sources
- [JsonPowerDB Documentation](http://login2explore.com/work/tech/jpdb/api.html)
- [jQuery AJAX](https://api.jquery.com/jquery.ajax/)

## Other Information
To run this project locally, ensure you create an `env.js` file in the root directory formatted as follows:
```javascript
const ENV = {
    CONN_TOKEN: "YOUR_JSONPOWERDB_CONNECTION_TOKEN"
};
```
