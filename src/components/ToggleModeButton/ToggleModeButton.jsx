import React, { useContext } from 'react'
import ColorModeContext from '../../theme/ColorModeContext';
import { IconButton } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

const ToggleModeButton = () => {
const { mode, toggleMode } = useContext(ColorModeContext);

  return (
    <IconButton onClick={toggleMode}>
        {mode === "light" ? (
          <DarkModeOutlined color="primary" />
        ) : (
          <LightModeOutlined color="secondary" />
        )}
      </IconButton>
  )
}

export default ToggleModeButton