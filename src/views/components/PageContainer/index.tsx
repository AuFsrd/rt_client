import { Container } from "@mui/material";

const PageContainer = (props: any) => (
  <Container
    maxWidth="sm"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "95vh",
      gap: "0.5rem",
    }}
  >
    {props.children}
  </Container>
);

export default PageContainer;