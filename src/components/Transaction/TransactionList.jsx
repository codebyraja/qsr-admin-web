// Now in your TransactionList.jsx
import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionTable from "../common/DataTable";

const TransactionList = ({
  title,
  subtitle,
  columns,
  dataSource,
  productModalIsOpen,
  modalId,
  importModalId,
  addLabel,
  importLabel,
}) => (
  <>
    <div className="page-wrapper">
      <div className="content">
        <TransactionHeader
          title={title}
          subtitle={subtitle}
          productModalIsOpen={productModalIsOpen}
          modalId={modalId}
          importModalId={importModalId}
          addLabel={addLabel}
          importLabel={importLabel}
        />
        <TransactionTable columns={columns} dataSource={dataSource} />
      </div>
    </div>
  </>
);

export default TransactionList;
