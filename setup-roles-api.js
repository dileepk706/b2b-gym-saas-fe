const fs = require('fs');
const path = require('path');

// 1. api.contracts.ts
const apiContractsPath = path.join(__dirname, 'src/shared/api/api.contracts.ts');
let apiContracts = fs.readFileSync(apiContractsPath, 'utf8');
// check if CreateRoleDtoSchema already exists to avoid duplication
if (!apiContracts.includes('CreateRoleDtoSchema')) {
  // remove the corrupted UTF-16 stuff if it was added
  apiContracts = apiContracts.replace(/e\0x\0p\0o\0r\0t.*/g, '');
  apiContracts += `\nexport const CreateRoleDtoSchema = z.object({ name: z.string().min(1) });`;
  fs.writeFileSync(apiContractsPath, apiContracts, 'utf8');
}

// 2. api.types.ts
const apiTypesPath = path.join(__dirname, 'src/shared/api/api.types.ts');
let apiTypes = fs.readFileSync(apiTypesPath, 'utf8');
if (!apiTypes.includes('CreateRoleDtoSchema')) {
  // modify imports
  apiTypes = apiTypes.replace('UpdateUserDtoSchema,', 'UpdateUserDtoSchema,\n  CreateRoleDtoSchema,');
  apiTypes += `\nexport type CreateRoleDto = z.infer<typeof CreateRoleDtoSchema>;\n`;
  fs.writeFileSync(apiTypesPath, apiTypes, 'utf8');
}

// 3. api.services.ts
const apiServicesPath = path.join(__dirname, 'src/shared/api/api.services.ts');
let apiServices = fs.readFileSync(apiServicesPath, 'utf8');
if (!apiServices.includes('getRoleById')) {
  apiServices = apiServices.replace('CreateStaffDtoSchema,', 'CreateStaffDtoSchema,\n  CreateRoleDtoSchema,');
  apiServices = apiServices.replace('UpdateUserDto,', 'UpdateUserDto,\n  CreateRoleDto,');
  apiServices += `
export function getRoleById(id: string, config?: AxiosRequestConfig) {
  return api.get<ApiResponse<Role>>(\`/roles/\${id}\`, config);
}

export function createRole(dto: CreateRoleDto, config?: AxiosRequestConfig) {
  const data = CreateRoleDtoSchema.parse(dto);
  return api.post('/roles', data, config);
}

export function updateRole(id: string, dto: CreateRoleDto, config?: AxiosRequestConfig) {
  const data = CreateRoleDtoSchema.parse(dto);
  return api.put(\`/roles/\${id}\`, data, config);
}

export function deleteRoleById(id: string, config?: AxiosRequestConfig) {
  return api.delete(\`/roles/\${id}\`, config);
}
`;
  fs.writeFileSync(apiServicesPath, apiServices, 'utf8');
}

console.log("Done modifying shared API layer");
