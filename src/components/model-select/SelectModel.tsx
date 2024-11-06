import React, { FC } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const SelectModel: FC = () => {
  const [model, setModel] = React.useState<string>("multimodel");

  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-model-label">Select Model</InputLabel>
      <Select
        labelId="select-model-label"
        id="select-model"
        value={model}
        label="Select Model"
        onChange={handleChange}
      >
        <MenuItem value="multimodel">Multimodel</MenuItem>
        <MenuItem value="documentSearch">Document Search</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectModel;
