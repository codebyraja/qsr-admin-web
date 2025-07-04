import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "../core/pagination/datatable";
import AddUsers from "../components/modals/addusers";

const Users = () => {
  const dataSource = useSelector((state) => state.rootReducer.userlist_data);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <span className="userimgname">
          {/* <Link to="#" className="userslist-img bg-img">
            <ImageWithBasePath alt="" src={record.img} />
          </Link> */}
          <div>
            <Link to="#">{text}</Link>
          </div>
        </span>
      ),
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Created On",
      dataIndex: "createdon",
      sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white ${
            text === `Active` ? `bg-success` : `bg-danger`
          } fs-10`}
        >
          {" "}
          <i className="ti ti-point-filled me-1 fs-11"></i>
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#">
              <i
                data-feather="eye"
                className="feather feather-eye action-eye"
              ></i>
            </Link>
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
              ></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>User List</h4>
                <h6>Manage Your Users</h6>
              </div>
            </div>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                // data-bs-toggle="modal"
                // data-bs-target="#add-units_ii"
                onClick={() => setShowModal(true)}
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add New User
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set"></div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Active
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Inactive
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <AddUsers
        showModal={showModal}
        onClose={() => setShowModal(false)}
        mode="add" // or "modify"
        record={null} // or pass user record for edit
        onSubmitSuccess={() => {
          setShowModal(false);
          // reload data or show notification
        }}
      />
    </div>
  );
};

export default Users;
