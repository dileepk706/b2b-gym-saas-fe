import React from 'react';
import { InputAdornment, TextField as MuiTextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps & {
  errorMessage?: any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  //   disableErrorHandler:()=>void
};

const TextField = React.forwardRef<HTMLDivElement, Props>(
  ({ errorMessage, size = 'small', startIcon, endIcon, ...other }, ref) => (
    <MuiTextField
      ref={ref}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      error={!!errorMessage}
      helperText={errorMessage}
      InputProps={{
        ...(startIcon && {
          startAdornment: (
            <InputAdornment position="start">
              {/* <Iconify icon={startIcon} /> */}
              {startIcon}
            </InputAdornment>
          ),
        }),
        ...(endIcon && {
          endAdornment: (
            <InputAdornment position="end">
              {/* <Iconify icon={endIcon} /> */}
              {endIcon}
            </InputAdornment>
          ),
        }),
      }}
      size={size}
      {...other}
    />
  )
);

TextField.displayName = 'TextField';

export default TextField;
