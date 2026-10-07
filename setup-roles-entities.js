const fs = require('fs');
const path = require('path');

const rolesApiPath = path.join(__dirname, 'src/entities/roles/roles.api.ts');
let rolesApi = fs.readFileSync(rolesApiPath, 'utf8');

if (!rolesApi.includes('getRoleByIdQueryOptions')) {
  rolesApi = rolesApi.replace("import { getRoles }", "import { getRoles, getRoleById }");
  rolesApi += `
export const getRoleByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['role', id],

    queryFn: async ({ signal }): Promise<Role> => {
      const { data } = await getRoleById(id, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Role>(['role', id]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['role', id])?.dataUpdatedAt,
  });
`;
  fs.writeFileSync(rolesApiPath, rolesApi, 'utf8');
}
console.log('Modified roles.api.ts');
