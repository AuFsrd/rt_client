import {
  Button,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { UserCtx } from "App";
import { createRoom, retrieveRoom } from "data/http";
import { PageContainer, UserDataForm } from "views/components";
import { ISafeUser } from "models/interfaces";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserCtx);

  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [codeError, setCodeError] = useState<string|null>(null);

  const defaultUserData: ISafeUser = {
    username: user.username,
    avatar: user.avatar,
  };
  const [userFormData, setUserFormData] = useState<ISafeUser>(defaultUserData);
  const [roomCode, setRoomCode] = useState<string>("");

  const onCreateRoom = async () => {
    setCreateLoading(true);
    setUser(prev => ({ ...prev, ...userFormData })); // Updates user data
    try {      
      const { data } = await createRoom();
      navigate(`/${data.roomCode}`);
    } catch (error) {
      /* todo Gestion */
      console.log("error");
    } finally {
      setCreateLoading(false);
    }
  };

  const onJoinRoom = async () => {
    setJoinLoading(true);
    setUser(prev => ({ ...prev, ...userFormData }));
    try {
      const { status } = await retrieveRoom(roomCode);
      if (status === 200) {
        navigate(`/${roomCode}`);
      }
    } catch (error) {
      setCodeError("Ce salon n'existe pas.")
    } finally {
      setJoinLoading(false);
    }
  };

  const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
    if (codeError != null) {
      setCodeError(null);
    }
  };

  return (
    <PageContainer>
      <UserDataForm
        formData={userFormData}
        setFormData={setUserFormData}
        selfSubmit={false}
      />
      <Button
        disabled={createLoading}
        variant="contained"
        onClick={onCreateRoom}
      >
        {createLoading ? (
          <CircularProgress size={20} />
        ) : (
          "Créer un salon"
        )}
      </Button>
      <Box maxWidth="100%" display="flex" gap={1}>
        <Button
          disabled={roomCode === "" || joinLoading}
          variant="contained"
          color="secondary"
          onClick={onJoinRoom}
          sx={{ flexGrow: 1 }}
        >
          {joinLoading ? (
            <CircularProgress size={20} />
          ) : (
            "Rejoindre"
          )}
        </Button>
        <TextField
        sx={{ ".MuiFormHelperText-root": {position: "absolute", top: "100%" }}}
          size="small"
          error={codeError != null}
          helperText={codeError}
          placeholder="Code du salon"
          onChange={handleRoomCodeChange}
        />
      </Box>
    </PageContainer>
  );
};
export default HomePage;
