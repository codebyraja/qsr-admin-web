import { Calendar } from "react-feather";
import { DatePicker } from "antd";

const DateInput = ({ label = "Date", value, onChange }) => (
  <div className="input-blocks">
    <label>{label}</label>
    <div className="input-groupicon calender-input">
      <Calendar className="info-img" />
      <DatePicker
        selected={value}
        onChange={onChange}
        className="form-control filterdatepicker"
        // className="form-control datetimepicker"
        dateFormat="dd-MM-yyyy"
        placeholder="Choose Date"
      />
    </div>
  </div>
);

export default DateInput;
