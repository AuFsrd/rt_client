import { UserList, UserDataForm, RollResult } from "layouts/components";
import { useState, useEffect, useContext, useCallback } from "react";
import { Socket } from "socket.io-client";
import { IRoll, ISafeUser, IUser } from "models/interfaces";
import { ClientEvents, ServerEvents } from "models/api";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  Popover,
  Typography,
} from "@mui/material";
import { Image } from "mui-image";
import { Link } from "react-router-dom";
import { UserCtx } from "App";

interface IProps {
  room: string;
  socket: Socket;
}

const RoomScreen = ({ room, socket }: IProps) => {
  const { user, setUser } = useContext(UserCtx);
  const [roomUsers, setRoomUsers] = useState<IUser[]>([user]);
  const [rolls, setRolls] = useState<IRoll[]>([]);
  const [rolling, setRolling] = useState<IRoll | undefined>();
  const [userFormData, setUserFormData] = useState<ISafeUser>({
    username: user.username,
    avatar: user.avatar,
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLButtonElement>();

  const roll = () => {
    socket.emit(ClientEvents.ROLL, room, {sides: 3, offset: -1, times: 4});
  };

  const updateUserData = useCallback((newData: Partial<ISafeUser>) => {
    setUser((prev) => ({ ...prev, ...newData }));
    socket.emit(ClientEvents.UPDATE_USER, newData);
    return true;
  }, [setUser, socket]);

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(room);
    setAnchor(event.currentTarget);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    socket.on(ServerEvents.RESULT, (roll: IRoll) => {
      setRolls((prev) => [...prev, roll]);
      setRolling(roll);
      setTimeout(() => {
        setRolling(undefined);
      }, 3000);
    });

    socket.on(ServerEvents.USERS, (users: IUser[]) => {
      // Updates room users list
      setRoomUsers(users);
      // Get user's info and updates the state if necessary
      const me = users.find((u) => u.id === socket.id);
      if (me) {
        setUser(me);
      }
    });

    setUser((prev) => {
      const identifiedUser = { ...prev, id: socket.id };
      updateUserData(identifiedUser);
      return identifiedUser;
    });

    console.log("Rendrer to test dependencies. More than 1 is issue")

  }, [socket, setUser, updateUserData]);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          userSelect: "none",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={rolling !== undefined}
      >
        {rolling && (
          <Typography
            sx={{
              position: "absolute",
              top: "10vh",
              zIndex: (theme) => theme.zIndex.drawer + 3,
            }}
            color="white"
            variant="h4"
          >
            {rolling.user.username} tire une carte...
          </Typography>
        )}
      </Backdrop>
      <UserDataForm
        formData={userFormData}
        setFormData={setUserFormData}
        onSubmit={updateUserData}
      />
      <Box
        sx={{
          mx: "auto",
        }}
      >
        {rolling && <RollResult draw={rolling} />}
        <Button
          disabled={rolling !== undefined}
          onClick={roll}
          sx={{ width: "min-content", mx: "auto" }}
        >
          <Card
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={`${process.env.PUBLIC_URL}/images/deck-back.png`}
              width={200}
              duration={0}
            />
          </Card>
        </Button>
      </Box>

      {roomUsers.length > 0 && <UserList users={roomUsers} />}
      <Box display={"flex"} justifyContent={"center"} gap={1}>
        <Button
          variant="contained"
          size="small"
          onClick={copyToClipboard}
          disabled={copied}
          color="primary"
        >
          Copier le code du salon
        </Button>
        <Popover
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={copied}
        >
          <Alert sx={{ py: 0 }} variant="filled" severity="success">
            Code copié dans le presse-papier
          </Alert>
        </Popover>
        <Link to="/">
          <Button variant="contained" color="error" size="small">
            Quitter le salon
          </Button>
        </Link>
      </Box>
    </>
  );
};
export default RoomScreen;
