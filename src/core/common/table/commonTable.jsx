import Table from "../../pagination/datatable";

const CommonTable = ({ columns, data }) => (
  <div className="card-body">
    <div className="table-responsive">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);

export default CommonTable;
