export const categoryColumn = [
  {
    title: "Category",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Print Name",
    dataIndex: "printName",
    sorter: (a, b) => a.printName.localeCompare(b.printName),
  },
  {
    title: "Created On",
    dataIndex: "createdon",
    sorter: (a, b) => new Date(a.createdon) - new Date(b.createdon),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (val) => (
      <span
        className={`badge ${val === "Active" ? "bg-success" : "bg-danger"}`}
      >
        {val}
      </span>
    ),
  },
  {
    type: "actions",
    actions: ["edit", "delete"],
  },
];

export const unitColumn = [
  {
    title: "Unit",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Print Name",
    dataIndex: "printName",
    sorter: (a, b) => a.printName.localeCompare(b.printName),
  },
  {
    title: "Created On",
    dataIndex: "createdon",
    sorter: (a, b) => new Date(a.createdon) - new Date(b.createdon),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (val) => (
      <span
        className={`badge ${val === "Active" ? "bg-success" : "bg-danger"}`}
      >
        {val}
      </span>
    ),
  },
  {
    type: "actions",
    actions: ["edit", "delete"],
  },
];
