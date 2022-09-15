import React, { useState } from "react";
import axios from "axios";


const Employeezone = () => {
    const localPath = "http://localhost:4000/employeezone/";
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeOrg, setEmployeeOrg] = useState("");
    const [employeeLoc, setEmployeeLoc] = useState("");
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [btnName, setBtnName] = useState("SAVE");



    const insertEmployeedetails = () => {
        if(btnName==="UPDATE"){
            updateEmployeedetails();
        }
        else{
            axios
                .post(localPath + "create-employee", {
                    "employeeName": employeeName,
                    "employeeOrg": employeeOrg,
                    "employeeLoc": employeeLoc
                }, {
                })
                .then(response => {
                    if (!response["data"].isError) {
                        alert("Saved successfully");
                        setShouldUpdate(true);
                    }
                });
        }
    }

    const updateEmployeedetails = () => {
        axios
            .post(localPath + "update-employee", {
                "employeeId": employeeId,
                "employeeName": employeeName,
                "employeeType": employeeOrg,
                "employeeLocation": employeeLoc
            }, {
            })
            .then(response => {
                if (!response["data"].isError) {
                    alert("Updated successfully");
                    setShouldUpdate(true);
                }
            });
    }

    const updateEmployee = (...employeeDetails) =>{
        setBtnName('UPDATE')
        setEmployeeId(employeeDetails[0]);
        setEmployeeName(employeeDetails[1]);
        setEmployeeOrg(employeeDetails[2]);
        setEmployeeLoc(employeeDetails[3]);
    }

    const getEmployeedetails = () => {
        axios.get(localPath + 'get-all-employees')
            .then(response => {
                if (!response["data"].isError) {
                    setEmployeeDetails(response["data"]["details"]);
                }
            });
    }



    const deleteEmployeedetails = (VmId) => {
        axios
            .post(localPath + "delete-employee", {
                employeeId: VmId
            }, {
            })
            .then(response => {
                if (!response["data"].isError) {
                    alert("Deleted successfully");
                    setShouldUpdate(true);
                }
            });
    }




    React.useEffect(() => {
        getEmployeedetails();
    }, [shouldUpdate]);


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name
        if(name==="employee-id"){
            setEmployeeId(value);
        }
        name === "employee-name" ? setEmployeeName(value) : name === "employee-org" ? setEmployeeOrg(value) : setEmployeeLoc(value);
    }





    return (
        <main id="mainContent">
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <h4>Fill up Employee details</h4>
                </div>
                <div className="row justify-content-center form-inline">
                    <form>
                        <input type="hidden" name="employee-id" value={employeeId} onChange={handleChange}/>
                        <input type="text" className="form-control mr-1" name="employee-name"  placeholder="Enter Employee Name" value={employeeName} onChange={handleChange} />
                        <input type="text" className="form-control mr-1" name="employee-org"  placeholder="Enter Employee Organization" value={employeeOrg} onChange={handleChange} />
                        <input type="text" className="form-control mr-1" name="employee-loc" placeholder="Enter Employee Location"  value={employeeLoc} onChange={handleChange} />
                        <button type="button" className=" btn btn-primary" onClick={insertEmployeedetails}>{btnName}</button>
                    </form>
                </div>
                <br /><br />
                <div className="row justify-content-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Employee Organization</th>
                                <th>Employee Location</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeDetails.length > 0 && employeeDetails.map(eachEmployee => (
                                <tr key={eachEmployee.employeeId}>
                                    <td>{eachEmployee.employeeId}</td>
                                    <td>{eachEmployee.employeeName}</td>
                                    <td>{eachEmployee.employeeOrg}</td>
                                    <td>{eachEmployee.employeeLoc}</td>
                                    <td>
                                        <button className="btn btn-warning"
                                        onClick={()=>updateEmployee(eachEmployee.employeeId,eachEmployee.employeeName,eachEmployee.employeeOrg,eachEmployee.employeeLoc)}>
                                            Edit
                                        </button>{" "}
                                         <button className="btn btn-danger" onClick={()=>deleteEmployeedetails(eachEmployee.employeeId)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>

    );
}

export default Employeezone;