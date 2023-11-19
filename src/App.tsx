import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "views/pages/Home";
import RoomPage from "views/pages/Room";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createContext, useState } from "react";
import { IUser } from "models/interfaces";
import { AvatarName } from "constants/avatars";
import { getRandomName } from "utils/userDataRandomizer";

const defaultUserData: IUser = {
  username: getRandomName(),
  avatar: AvatarName.RED_PANDA,
  id: "",
};

export const UserCtx = createContext<{
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}>({ user: defaultUserData, setUser: () => {} });

function App() {
  const [user, setUser] = useState<IUser>(defaultUserData);

  return (
      <>
        <CssBaseline />
        <GlobalStyles
            styles={{
              body: {
                background:
                    "radial-gradient(circle, #dfdfdf 10%, #6b5b95 50%, black)",
              },
            }}
        />
        <UserCtx.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<RoomPage />} />
            </Routes>
          </BrowserRouter>
        </UserCtx.Provider>
      </>
  );
}

export default App;
