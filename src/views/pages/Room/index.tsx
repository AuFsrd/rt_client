import { Link, useParams } from "react-router-dom";
import { PageContainer } from "views/components";
import { useState, useEffect, useContext } from "react";
import { Socket, io } from "socket.io-client";
import { ClientEvents as ce, ServerEvents as se } from "data/api";
import RoomScreen from "./screens/room";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { UserCtx } from "App";
import * as process from "process";

const RoomPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserCtx);

  const [socket, setSocket] =
    useState<Socket>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_SERVER!, {
      query: { 
        username: user.username,
        avatar: user.avatar
      },
    });    

    socketInstance.on(se.CONNECT, () => {});

    socketInstance.on(se.CONNECT_ERROR, (_error) => {
      setError("Une erreur est survenue");
      setLoading(false);
    });

    socketInstance.on(se.ROOM_JOINED, () => {
      setLoading(false);
    });

    socketInstance.on(se.ROOM_NOT_FOUND, () => {
      setError("Ce salon n'existe pas");
      setLoading(false);
    });

    setSocket(socketInstance);
    socketInstance.emit(ce.JOIN, id);

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  return (
    <PageContainer>
      {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
      {error && !loading != null && (
        <Box display="flex" gap={2} flexDirection="column" alignItems="center">
          <Typography textAlign="center" variant="h3">
            {error} :(
          </Typography>
          <Link to="/">
            <Button variant="contained">Retour à l'accueil</Button>
          </Link>
        </Box>
      )}
      {socket && id && !error && !loading && (
        <RoomScreen room={id} socket={socket} />
      )}
    </PageContainer>
  );
};
export default RoomPage;
