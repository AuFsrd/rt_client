import {
  Paper,
  InputBase, MenuItem,
  Select
} from "@mui/material";
import styled from "@emotion/styled";

export const StyledPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledSelect = styled(Select)`
  box-shadow: none;
  .MuiOutlinedInput-input {
    padding: 0;
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding-right: 0;
  }
`;
export const StyledMenuItem = styled(MenuItem)`
  &.MuiButtonBase-root {
    padding: 0;
  }
`;
export const StyledInputBase = styled(InputBase)`
  margin-left: 1px;
  flex: 1;
  font-size: 2rem;
  .MuiInputBase-input {
    text-align: center;
  }  
`;
