import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdateModel } from "../../Components/updateModel";
import "./dashboard.css";

export const DashBoard = () => {
  const [state, setState] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [addUserData, setAddUserData] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpate] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    axios.get("http://localhost:3005/AuthUser").then((data) => {
      setState(data?.data);
    });
  };

  const updateEle = (ele) => {
    setIsUpate(true);
    setUpdateData(ele);
  };
  const closeModel = () => {
    setIsUpate(false);
    setAddUserData(false);
    setIsDelete(false);
  };
  const deleteModel = (id) => {
    setIsDelete(true);
    setDeleteId(id);
  };
  const deleteEle = async () => {
    await axios.delete(`http://localhost:3005/AuthUser/${deleteId}`);
    let newState = state?.filter((ele) => ele?.id != deleteId);
    setState(newState);
    setIsDelete(false);
  };
  const addUser = async () => {
    setAddUserData(true);
  };
  return (
    <>
      <div className="dashboard">
        <div className="title">
          <h2>DashBoard</h2>
        </div>
        <div className="add-userBtn">
          <button className="btn btn-primary" onClick={addUser}>
            {" "}
            Add New User{" "}
          </button>
        </div>
        {console.log(state)}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state
              ? state?.map((ele, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{ele?.name}</td>
                    <td>{ele?.email}</td>
                    <td>{ele?.gender}</td>
                    <td>{ele?.status}</td>
                    <td>
                      <button className="m-1" onClick={() => updateEle(ele)}>
                        {" "}
                        +{" "}
                      </button>
                      <button
                        className="m-1"
                        onClick={() => deleteModel(ele?.id)}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      {isUpdate ? (
        <UpdateModel
          data={updateData}
          closeModel={closeModel}
          getUserData={getUserData}
        />
      ) : (
        ""
      )}
      {addUserData ? (
        <UpdateModel closeModel={closeModel} getUserData={getUserData} />
      ) : (
        ""
      )}
      {isDelete ? (
        <div className="deleteModel">
          <h4>Are you sure you want to delete this ?</h4>
          <button className="btn btn-danger" onClick={deleteEle}>
            {" "}
            Delete
          </button>
          <button className="btn btn-secondary" onClick={closeModel}>
            {" "}
            Cancle
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
