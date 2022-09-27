const FormTypesSelect = ({ data, piggyBankType, setPiggyBankType }) => {
  const renderOptions = Object.entries(data).map((entry) => (
    <option value={entry[0]} key={entry[0]}>
      {entry[1].title}
    </option>
  ));

  return (
    <div>
      <label htmlFor="countries" className="block text-3xl text-pink-500">
        Select a type Piggy Bank
      </label>
      <select
        value={piggyBankType}
        onChange={(e) => setPiggyBankType(e.target.value)}
        id="countries"
        className="my-2 block w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {renderOptions}
      </select>
    </div>
  );
};

export default FormTypesSelect;
