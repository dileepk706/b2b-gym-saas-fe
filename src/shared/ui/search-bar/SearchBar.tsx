import { useEffect, useRef, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  sx?: object;
}

/**
 * Reusable debounced search bar.
 * Fires `onChange` after the user stops typing (default 400ms).
 */
export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search…',
  debounceMs = 400,
  sx,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(newVal);
    }, debounceMs);
  };

  const handleClear = () => {
    setInputValue('');
    if (timerRef.current) clearTimeout(timerRef.current);
    onChange('');
  };

  return (
    <TextField
      size="small"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      sx={{ width: 280, ...sx }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: inputValue ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} edge="end" aria-label="clear search">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
