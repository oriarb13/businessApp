import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import { styled } from "@mui/material/styles";
import { ReactNode, useEffect, useMemo } from "react";
import { useUser } from "@/context/UserContext";

const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  width: "100%",
}));

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();

  const noNav = useMemo(() => ["/login", "/signup", "/"], []);

  const { checkTokenValidity } = useUser();

  useEffect(() => {
    if (!noNav.includes(location.pathname)) {
      const validate = async () => {
        await checkTokenValidity(); // Check token validity
      };
      validate();
    }
  }, [checkTokenValidity, location.pathname, noNav]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      {!noNav.includes(location.pathname) && (
        <>
          <NavBar />
          <Offset sx={{ width: "100%" }} />
        </>
      )}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
