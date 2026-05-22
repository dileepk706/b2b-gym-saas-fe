/* eslint-disable no-nested-ternary */
import { Box, CircularProgress, ListItemText, Typography, TypographyProps } from '@mui/material';
import { memo } from 'react';
import { formatCamelCase } from '@utils/helperFunctions';
import Iconify from '../iconify';
// import ImagePopup from '../image-popup/ImagePopup';

type Props = TypographyProps & {
  apiHandler: () => void;
  loading: boolean;
  value?: number | string;
  imageUrl?: string;
};
function ViewButton({ apiHandler, imageUrl, loading, value, ...other }: Props) {
  return (
    <ListItemText
      primary={
        <>
          {!loading ? (
            !value && value !== 0 ? (
              <Iconify
                icon="iconoir:eye"
                onClick={apiHandler}
                sx={{
                  cursor: 'pointer',
                  '&:active': {
                    transform: 'scale(1.3)',
                  },
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* {imageUrl && <ImagePopup imageUrl={imageUrl} />} */}
                <Typography variant="body2" noWrap {...other}>
                  {formatCamelCase(value ? value.toString() : '')}
                </Typography>
              </Box>
            )
          ) : (
            <CircularProgress size={20} color="secondary" />
          )}
        </>
      }
      primaryTypographyProps={{ noWrap: true, variant: 'body2' }}
    />
  );
}

export default memo(ViewButton);
