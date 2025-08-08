const ProductTable = ({ products = [], onQtyChange, onDelete }) => {
  return (
    <div className="modal-body-table">
      <div className="table-responsive">
        <table className="table datanew">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Purchase Price(₹)</th>
              <th>Discount(₹)</th>
              <th>Tax(%)</th>
              <th>Tax Amount(₹)</th>
              <th>Unit Cost(₹)</th>
              <th>Total Cost(₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.purchasePrice}</td>
                <td>{item.discount}</td>
                <td>{item.tax}</td>
                <td>{item.taxAmount}</td>
                <td>{item.unitCost}</td>
                <td>{item.totalCost}</td>
                <td>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
