import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeForm = ({ additionalInfo, setAdditionalInfo }) => {
  return (
    <div>
      <label className="block text-3xl text-pink-500" htmlFor="date">
        Enter end date in uts:
      </label>
      <br />
      <div className="focus:shadow-outline appearance-none rounded border py-4 px-6 font-bold leading-tight text-gray-500 shadow focus:outline-none">
        <DatePicker
          className="w-80 text-xl"
          selected={additionalInfo.date || new Date()}
          onChange={(date) => setAdditionalInfo({ ...additionalInfo, date })}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
};

export default TimeForm;
