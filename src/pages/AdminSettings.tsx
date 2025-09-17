import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Users, 
  Palette, 
  AlertTriangle, 
  Plus, 
  Trash2,
  Eye,
  Settings
} from 'lucide-react';

export default function AdminSettings() {
  const [adminTheme, setAdminTheme] = useState('light');
  
  const mockAdmins = [
    { id: '1', name: 'Super Admin', email: 'admin@demo.com', role: 'super_admin', lastLogin: '2024-03-15' },
    { id: '2', name: 'John Doe', email: 'john@edunav.com', role: 'admin', lastLogin: '2024-03-14' },
    { id: '3', name: 'Jane Smith', email: 'jane@edunav.com', role: 'moderator', lastLogin: '2024-03-13' },
  ];

  const mockFailedLogins = [
    { id: '1', email: 'suspicious@email.com', attempts: 5, lastAttempt: '2024-03-15 10:30 AM', blocked: true },
    { id: '2', email: 'test@hack.com', attempts: 3, lastAttempt: '2024-03-15 09:15 AM', blocked: false },
    { id: '3', email: 'wrong@password.com', attempts: 2, lastAttempt: '2024-03-14 08:45 PM', blocked: false },
  ];

  const systemSettings = [
    { key: 'maintenance_mode', label: 'Maintenance Mode', description: 'Put the system in maintenance mode', enabled: false },
    { key: 'user_registration', label: 'User Registration', description: 'Allow new user registrations', enabled: true },
    { key: 'email_notifications', label: 'Email Notifications', description: 'Send system email notifications', enabled: true },
    { key: 'quiz_analytics', label: 'Quiz Analytics', description: 'Collect quiz performance analytics', enabled: true },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">Manage system configuration and administrative settings</p>
      </div>

      {/* Admin Management */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Admin Management
          </CardTitle>
          <CardDescription>Manage administrator accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Current Administrators</h3>
            <Button asChild variant="hero" size="sm">
              <a href="/admin/settings/admins">
                <Plus className="mr-2 h-4 w-4" />
                New Admin
              </a>
            </Button>
          </div>
          
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
              {mockAdmins.map((admin) => (
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
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <a href="/admin/settings/admins" className="flex items-center">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security & Failed Logins */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Failed Logins
          </CardTitle>
          <CardDescription>Monitor security events and failed login attempts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-destructive">24</div>
              <p className="text-sm text-muted-foreground">Failed logins today</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <p className="text-sm text-muted-foreground">Blocked IPs</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.8%</div>
              <p className="text-sm text-muted-foreground">System uptime</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Failed Login Attempts</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Last Attempt</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFailedLogins.map((login) => (
                  <TableRow key={login.id}>
                    <TableCell className="font-medium">{login.email}</TableCell>
                    <TableCell>
                      <Badge variant={login.attempts >= 5 ? 'destructive' : 'secondary'}>
                        {login.attempts} attempts
                      </Badge>
                    </TableCell>
                    <TableCell>{login.lastAttempt}</TableCell>
                    <TableCell>
                      <Badge variant={login.blocked ? 'destructive' : 'default'}>
                        {login.blocked ? 'Blocked' : 'Active'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Theme & System Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Admin Panel Theme
            </CardTitle>
            <CardDescription>Customize the admin panel appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Theme Selection</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${adminTheme === 'light' ? 'border-primary' : 'border-muted'}`}
                  onClick={() => setAdminTheme('light')}
                >
                  <div className="w-full h-20 bg-white border rounded mb-2"></div>
                  <p className="text-sm font-medium">Light Theme</p>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${adminTheme === 'dark' ? 'border-primary' : 'border-muted'}`}
                  onClick={() => setAdminTheme('dark')}
                >
                  <div className="w-full h-20 bg-slate-900 border rounded mb-2"></div>
                  <p className="text-sm font-medium">Dark Theme</p>
                </div>
              </div>
            </div>
            <Button className="w-full">Apply Theme Changes</Button>
          </CardContent>
        </Card>

        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{setting.label}</Label>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch 
                  checked={setting.enabled}
                  onCheckedChange={() => {
                    // Handle setting toggle
                    console.log(`Toggle ${setting.key}`);
                  }}
                />
              </div>
            ))}
            <Separator />
            <Button variant="outline" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}