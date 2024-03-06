import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchInput = {
  value: string;
  setValue: (newValue: string) => void;
};

const SearchInput = ({ value, setValue }: SearchInput) => (
  <div className="flex h-auto w-full bg-white text-black border border-light-gray rounded-3xl text-lg focus-within:border-france-blue">
    <div className="flex-1">
      <input
        type="text"
        className="w-full bg-transparent py-2 pl-3 pr-1 border-none focus:border-none focus:outline-0 focus:ring-0"
        placeholder="Buscar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
    <div className="pt-2 pr-3">
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#8FA0A9" }} />
    </div>
  </div>
);

export default SearchInput;
