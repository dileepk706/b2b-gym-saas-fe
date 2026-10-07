const fs = require('fs');
const path = require('path');

const replaceInFile = (file, from, to) => {
  const p = path.join(__dirname, file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(from, to);
    fs.writeFileSync(p, content, 'utf8');
  }
};

// Remove sonner from mutations
const m1 = 'src/features/roles/create/role.create.mutation.ts';
replaceInFile(m1, "import { toast } from 'sonner';", "");
replaceInFile(m1, "toast.success('Role created successfully');", "");
replaceInFile(m1, "toast.error('Failed to create role');", "");

const m2 = 'src/features/roles/update/role.update.mutation.ts';
replaceInFile(m2, "import { toast } from 'sonner';", "");
replaceInFile(m2, "toast.success('Role updated successfully');", "");
replaceInFile(m2, "toast.error('Failed to update role');", "");

const m3 = 'src/features/roles/delete/role.delete.mutation.ts';
replaceInFile(m3, "import { toast } from 'sonner';", "");
replaceInFile(m3, "toast.success('Role deleted successfully');", "");
replaceInFile(m3, "toast.error('Failed to delete role');", "");

// Fix breadcrumbs
const b1 = 'src/pages/roles/create/role-create.page.ui.tsx';
replaceInFile(b1, "import { Breadcrumbs } from 'shared/ui/breadcrumbs';", "import CustomBreadcrumbs from 'shared/ui/custom-breadcrumbs';");
replaceInFile(b1, "<Breadcrumbs", "<CustomBreadcrumbs");

const b2 = 'src/pages/roles/update/role-update.page.ui.tsx';
replaceInFile(b2, "import { Breadcrumbs } from 'shared/ui/breadcrumbs';", "import CustomBreadcrumbs from 'shared/ui/custom-breadcrumbs';");
replaceInFile(b2, "<Breadcrumbs", "<CustomBreadcrumbs");

// Fix FactoryButton
const f1 = 'src/pages/roles/list/role-list.page.ui.tsx';
replaceInFile(f1, "component={RouterLink}", "component={RouterLink as any}");

console.log('Fixed typescript errors');
