import { Box, IconButton, SelectChangeEvent } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { ISafeUser } from "models/interfaces";
import { AvatarName, avatar } from "constants/avatars";
import Image from "mui-image";
import {
  StyledPaper,
  StyledSelect,
  StyledMenuItem,
  StyledInputBase,
} from "./styledComponents";

interface IProps {
  formData: ISafeUser;
  setFormData: Dispatch<SetStateAction<ISafeUser>>;
  selfSubmit?: boolean;
  onSubmit?: (data: Partial<ISafeUser>) => boolean;
}

const UserDataForm = ({ onSubmit, setFormData, formData, selfSubmit = true }: IProps) => {

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(true);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, username: event.target.value }));
    setHasSubmitted(false);
  };

  const handleAvatarChange = (event: SelectChangeEvent<any>) => {
    setFormData((prev) => ({ ...prev, avatar: event.target.value }));
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      const success = onSubmit({ username: formData.username, avatar: formData.avatar });
      setHasSubmitted(success);
    }
  };

  return (
    <StyledPaper>
      <StyledSelect
        defaultValue={formData.avatar}
        inputProps={{ IconComponent: () => null }}
        onChange={handleAvatarChange}
      >
        {Object.values(AvatarName).map((a) => (
          <StyledMenuItem key={a} value={a}>
            <Image width={75} duration={0} src={avatar(a)} />
          </StyledMenuItem>
        ))}
      </StyledSelect>
      <StyledInputBase
        size="small"
        defaultValue={formData.username}
        onChange={handleUsernameChange}
        inputProps={{ maxLength: 16 }} 
      />
      <Box width={75} display="flex" justifyContent="center">
      {selfSubmit && <IconButton
      size="large"
        disabled={
          hasSubmitted ||
          formData.username === ""
        }
        onClick={handleSubmit}
      >
        {hasSubmitted ||
        formData.username === "" ? (
          <CheckRoundedIcon />
        ) : (
          <SaveRoundedIcon />
        )}
      </IconButton>}
      </Box>
    </StyledPaper>
  );
};
export default UserDataForm;
