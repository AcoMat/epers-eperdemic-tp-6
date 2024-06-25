import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

export const Background = ({children, style, className = ''}) => {
  const theme = useTheme();

  return (
    <Box className={className} style={{...style}} bgcolor={theme.palette.background.default} >
        {children}
    </Box>
  )
};
