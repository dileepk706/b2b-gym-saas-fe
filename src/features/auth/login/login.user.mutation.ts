import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuthContext } from '@auth/hooks/use-auth-context';
import { User } from 'entities/user/user.entity';
import { LoginUser } from './login.types';

export function useLoginMutation(
  options: Partial<UseMutationOptions<User, DefaultError, LoginUser, unknown>> = {}
) {
  const { login } = useAuthContext();
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ['session', 'login-user', ...mutationKey],
    mutationFn: async (loginUserData: LoginUser) => {
      const data = await login(loginUserData);
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
