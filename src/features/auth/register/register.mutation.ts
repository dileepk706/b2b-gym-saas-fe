import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuthContext } from '@auth/hooks/use-auth-context';
import { User } from 'entities/user/user.entity';
import { TRegisterUser } from './register.types';

export function useRegisterMutation(
  options: Partial<UseMutationOptions<User, DefaultError, TRegisterUser, unknown>> = {}
) {
  const { register } = useAuthContext();
  const { mutationKey = [], onMutate, onError, onSettled, onSuccess } = options;

  return useMutation({
    mutationKey: ['session', 'register-user', ...mutationKey],
    mutationFn: async (registerUserData: TRegisterUser) => {
      const data = await register(registerUserData);
      return data;
    },
    onMutate,
    onSuccess: async (data, variables, context) => {
      onSuccess?.(data, variables, context);
    },
    onError,
    onSettled,
  });
}
