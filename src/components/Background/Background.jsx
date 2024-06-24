import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export const Background = ({children, style}) => {
  const theme = useTheme();

  return (
    <Box style={style} bgcolor={theme.palette.background.default} >
        {children}
    </Box>
  )
};
