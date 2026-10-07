const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/routes/modules/staffs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('roleListRoute')) {
  content = content.replace(
    "import { staffUpdateRoute } from '@pages/staff/update/staff-update.route';",
    `import { staffUpdateRoute } from '@pages/staff/update/staff-update.route';

import { roleListRoute } from '@pages/roles/list/role-list.route';
import { roleCreateRoute } from '@pages/roles/create/role-create.route';
import { roleUpdateRoute } from '@pages/roles/update/role-update.route';
`
  );

  content = content.replace(
    "children: [staffListRoute, staffCreateRoute, staffUpdateRoute],",
    `children: [
    staffListRoute, 
    staffCreateRoute, 
    staffUpdateRoute,
    {
      path: 'roles',
      children: [
        roleListRoute,
        roleCreateRoute,
        roleUpdateRoute
      ]
    }
  ],`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done connecting routes');
