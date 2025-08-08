const TotalSummary = ({ totals = {} }) => {
  const labels = [
    "Sub Total",
    "Order Tax",
    "Discount",
    "Shipping",
    "Grand Total",
  ];
  return (
    <div className="total-order w-100 max-widthauto m-auto mb-4">
      <ul className="border-1 rounded-2">
        {labels.map((label) => (
          <li key={label} className="border-bottom">
            <h4 className="border-end">{label}</h4>
            <h5>₹ {totals[label] || "0.00"}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalSummary;
