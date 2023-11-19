import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { avatar } from "constants/avatars";
import { IUser } from "models/interfaces";
import { useEffect } from "react";

interface IProps {
  users: IUser[];
}

const UserList = ({ users }: IProps) => {
  useEffect(() => {}, [users]);

  return (
    <Grid container spacing={1}>
      {users.length > 0 &&
        users.map((u, ix) => {
          return (
            <Grid
              item
              xs={12}
              sm={ix % 2 === 0 && ix === users.length - 1 ? 12 : 6}
              key={`${u.username}-griditem`}
            >
              <Card key={`${u.username}-card`}>
                <ListItem key={`${u.username}-item`}>
                  <ListItemAvatar key={`${u.username}-avatar`}>
                    <Avatar
                      alt={`Avatar de ${u.username}`}
                      src={avatar(u.avatar)}
                      sx={{ width: 50, height: 50 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    key={`${u.username}-text`}
                    primary={u.username}
                    sx={{
                      ".MuiTypography-root": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                </ListItem>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};
export default UserList;
