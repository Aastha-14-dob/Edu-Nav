import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  lastLogin: string; // ISO date string
};

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: '1', name: 'Super Admin', email: 'admin@demo.com', role: 'super_admin', lastLogin: '2024-03-15T00:00:00Z' },
    { id: '2', name: 'John Doe', email: 'john@edunav.com', role: 'admin', lastLogin: '2024-03-14T00:00:00Z' },
    { id: '3', name: 'Jane Smith', email: 'jane@edunav.com', role: 'moderator', lastLogin: '2024-03-13T00:00:00Z' },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('admin');
  // lastLogin is auto-set to today's date on create

  const handleDelete = (id: string) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) return;
    const iso = new Date().toISOString();
    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      lastLogin: iso,
    };
    setAdmins(prev => [newAdmin, ...prev]);
    setName('');
    setEmail('');
    setRole('admin');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Administrators</h1>
        <p className="text-muted-foreground">Manage admin users for the platform</p>
      </div>

      {/* New Admin Form */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>New Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as AdminUser['role'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">Create Admin</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Admin List */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant={admin.role === 'super_admin' ? 'default' : 'secondary'}>
                      {admin.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(admin.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(admin.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


