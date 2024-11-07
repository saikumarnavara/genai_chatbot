import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType } from "../../redux/slices/search-type-slice";

const SelectModel: FC = () => {
  const dispatch = useDispatch();
  const { searchType } = useSelector((state: any) => state.search_type);

  const handleChange = (event: any) => {
    dispatch(setSearchType(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-model-label">Select Model</InputLabel>
      <Select
        labelId="select-model-label"
        id="select-model"
        value={searchType}
        label="Select Model"
        onChange={handleChange}
      >
        <MenuItem value="textsearch">Text Search</MenuItem>
        <MenuItem value="multimodel">Multimodel</MenuItem>
        <MenuItem value="documentsearch">Document Search</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectModel;
