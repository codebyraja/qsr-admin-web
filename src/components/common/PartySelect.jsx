import Select from "react-select";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import { Link } from "react-router-dom";

const PartySelect = ({ label, options, onChange }) => {
  return (
    <div className="input-blocks add-product">
      <label>{label}</label>
      <div className="row">
        <div className="col-10">
          <Select
            options={options}
            onChange={onChange}
            classNamePrefix="react-select"
            placeholder="Choose"
          />
        </div>
        <div className="col-2 ps-0">
          <div className="add-icon tab">
            <Link to="#">
              <PlusCircle className="feather-plus-circles" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartySelect;
