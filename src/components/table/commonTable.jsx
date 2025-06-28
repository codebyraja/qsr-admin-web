// import Table from "../../pagination/datatable";
import { Table } from "antd";

const CommonTable = ({ columns, data, Loading }) => {
  return (
    <div className="card-body">
      <div className="table-responsive">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CommonTable;
