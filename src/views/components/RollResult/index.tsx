import { Box, Card, Typography } from "@mui/material";
import { IRoll } from "models/interfaces";
import { Image } from "mui-image";
import { sign } from "utils/formatter";

interface IProps {
  draw: IRoll;
}

const RollResult = ({ draw }: IProps) => {
  const glowColor = "180,180,180";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          perspective: "2000px",
          transformStyle: "preserve-3d",
          zIndex: (theme) => theme.zIndex.drawer + 2,
          userSelect: "none",
        }}
      >
        <Card
          sx={{
            "@keyframes draw": {
              "0%": {
                transform: "rotateX(0deg) translateZ(0rem) scale(1)",
              },
              "50%": {
                transform:
                  "rotateX(40deg) translateY(20rem) translateZ(1rem) scale(1)",
              },
              "85%": {
                transform:
                  "rotateX(180deg) translateY(0rem) translateZ(5rem) scale(1.1)",
              },
              "100%": {
                transform:
                  "rotateX(180deg) translateY(0rem) translateZ(5rem) scale(1.1)",
              },
            },
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            margin: "0.5rem",
            backfaceVisibility: "hidden",
            animation: "draw 1.5s ease-in-out forwards",
          }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/deck-back.png`}
            width={200}
            duration={0}
          />
        </Card>
        <Card
          sx={{
            "@keyframes draw-back": {
              "0%": {
                transform: "rotateX(180deg) translateZ(0rem)",
              },
              "50%": {
                transform:
                  "rotateX(220deg) translateY(-20rem) translateZ(-1rem) scale(1)",
              },
              "85%": {
                transform:
                  "rotateX(360deg) translateY(0rem) translateZ(-5rem) scale(1.1)",
                boxShadow: `0px 0px 0px 0px white, 0px 0px 100px 0px rgba(${glowColor},0)`,
              },
              "90%": {
                transform:
                  "rotateX(360deg) translateY(0rem) translateZ(0rem) scale(1.2)",
                boxShadow: `0px 0px 20px 10px white, 0px 0px 100px 50px rgba(${glowColor},0.5)`,
              },
              "100%": {
                transform:
                  "rotateX(360deg) translateY(0rem) translateZ(0rem) scale(1.2)",
                boxShadow: `0px 0px 100px 0px white, 0px 0px 500px 500px rgba(${glowColor},0.5)`,
              },
            },
            "@keyframes glow": {
              "0%": {
                transform:
                  "rotateX(360deg) translateY(0rem) translateZ(0rem) scale(1.2)",
                boxShadow: `0px 0px 100px rgba(255,255,255,1), 0px 0px 500px 500px rgba(${glowColor},0.25)`,
              },
              "90%": {
                transform:
                  "rotateX(360deg) translateY(0rem) translateZ(0rem) scale(1.2)",
                boxShadow: `0px 0px 100px rgba(255,255,255,0), 0px 0px 100px 1000px rgba(${glowColor},0)`,
                opacity: 1,
              },
              "100%": {
                transform:
                  "rotateX(360deg) translateY(2rem) translateZ(0rem) scale(1.2)",
                boxShadow: "0px 0px 100px rgba(255,255,255,0)",
                opacity: 0,
              },
            },
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            margin: "0.5rem",
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
            perspectiveOrigin: "center center",
            animation:
              "draw-back 1.5s ease-in-out forwards, glow 1.5s ease-out 1.5s forwards",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: (theme) => theme.zIndex.drawer + 2,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                  color: "#00001b",
                }}
              >
                {sign(draw.result)}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                  fontWeight: 900,
                  color: "#00001b",
                }}
              >
                {Math.abs(draw.result)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                rotate: "180deg",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                  color: "#00001b",
                }}
              >
                {sign(draw.result)}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                  fontWeight: 900,
                  color: "#00001b",
                }}
              >
                {Math.abs(draw.result)}
              </Typography>
            </Box>
          </Box>
          <Image
            src={`${process.env.PUBLIC_URL}/images/deck-front.png`}
            width={200}
            duration={0}
          />
        </Card>
      </Box>
    </>
  );
};
export default RollResult;
