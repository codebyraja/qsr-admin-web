// components/purchases/PurchasesList.jsx
import React, { useState } from "react";
import TransactionList from "../../components/Transaction/TransactionList";
import TransactionFormModal from "../../components/Transaction/TransactionFormModal";
import { purchaseslist } from "../../core/json/purchaselistdata";
import { Link } from "react-router-dom";
import ImportPurchases from "../../core/modals/purchases/importpurchases";
import {
  CustomerName,
  OrderStatus,
  PaymentType,
  Supplier,
} from "../../core/common/selectOption/selectOption";
import useLocationData from "../../hooks/useLocationData";

const initialState = {
  date: new Date(),
  customer: "",
  product: "",
  quantity: "",
  price: "",
  status: "",
};

const PurchasesList = () => {
  const datasource = purchaseslist;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialState);
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedState, setSelectedState] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);

  // const { data: countries, loading: loadingCountries } =
  //   useLocationData("countries");
  // const { data: states, loading: loadingStates } = useLocationData("states", {
  //   countryId: selectedCountry?.value,
  // });
  // const { data: cities, loading: loadingCities } = useLocationData("cities", {
  //   stateId: selectedState?.value,
  // });

  // const countryOptions = toSelectOptions(countries);
  // const stateOptions = toSelectOptions(states);
  // const cityOptions = toSelectOptions(cities);

  // <Select
  //   isLoading={loadingCountries}
  //   options={countryOptions}
  //   value={selectedCountry}
  //   onChange={(selected) => {
  //     setSelectedCountry(selected);
  //     setSelectedState(null); // Reset state and city
  //     setSelectedCity(null);
  //   }}
  //   placeholder="Select Country"
  // />;
  const toSelectOptions = (data) => {
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  const handleChange = (key, value) => {
    // if (key === "removeProduct") {
    //   const updated = [...formData.products];
    //   updated.splice(value, 1);
    //   setFormData({ ...formData, products: updated });
    // } else {
    //   setFormData({ ...formData, [key]: value });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // post data
    setShowModal(false);
  };

  const columns = [
    {
      title: "SupplierName",
      dataIndex: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      sorter: (a, b) => a.reference.length - b.reference.length,
    },

    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
            text === "Pending"
              ? "badge-pending"
              : text === "Pending"
              ? "bg-warning"
              : ""
          }`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "GrandTotal",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "Due",
      dataIndex: "due",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "Payment Status",
      dataIndex: "createdBy",
      render: (text) => (
        <span
          className={`p-1 pe-2 rounded-1  fs-10 ${
            text === "Paid"
              ? "text-success bg-success-transparent"
              : text === "Overdue"
              ? "text-warning bg-warning-transparent "
              : "text-danger bg-danger-transparent "
          }`}
        >
          <i className="ti ti-point-filled me-1 fs-11"> </i> {text}
        </span>
      ),
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to="#">
              <i data-feather="eye" className="feather-eye"></i>
            </Link>
            <Link
              className="me-2 p-2"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="#"
            >
              <i data-feather="trash-2" className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const productModalIsOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <TransactionList
        title="Purchase"
        subtitle="Manage Your purchase"
        dataSource={datasource}
        columns={columns}
        productModalIsOpen={productModalIsOpen}
        modalId="edit-purchase-modal"
        importModalId="view-notes"
        addLabel="Add Purchase"
        importLabel="Import Purchase"
      />

      {/* <TransactionFormModal
        modalId="edit-purchase-modal"
        title="Edit Purchase"
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        customers={[
          { value: "Apex", label: "Apex Computers" },
          { value: "Dazzle", label: "Dazzle Shoes" },
        ]}
        productList={[
          { value: "Shoe", label: "Shoe" },
          { value: "Mobile", label: "Mobile" },
        ]}
        statusList={[
          { value: "choose", label: "Choose" },
          { value: "received", label: "Received" },
          { value: "pending", label: "Pending" },
        ]}
      /> */}
      <TransactionFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Entry"
        type="purchase"
        customers={CustomerName}
        productList={Supplier}
        statusList={OrderStatus}
        selectedDate={formData.date}
        onDateChange={(date) => setFormData({ ...formData, date })}
        transactionData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ImportPurchases />
    </>
  );
};

export default PurchasesList;
