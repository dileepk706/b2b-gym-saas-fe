import React from 'react';
import { Autocomplete, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getRolesQueryOptions } from 'entities/roles/roles.api';
import { TextField } from 'shared/ui/text-field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { formatCamelCase } from '@utils/format-text';

interface RoleSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function RoleSelect<T extends FieldValues>({
  name,
  control,
  label = 'Role',
  placeholder = 'Select a role',
  disabled,
}: RoleSelectProps<T>) {
  const { data: roles = [], isLoading } = useQuery(getRolesQueryOptions());

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        const selectedRole = roles.find((role) => role.id === value) || null;

        return (
          <Autocomplete
            options={roles}
            getOptionLabel={(option) => formatCamelCase(option.name)}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            value={selectedRole}
            onChange={(_, newValue) => {
              onChange(newValue ? newValue.id : '');
            }}
            onBlur={onBlur}
            disabled={disabled || isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                errorMessage={error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
