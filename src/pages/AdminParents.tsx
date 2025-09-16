import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Eye, Edit, Ban } from 'lucide-react';
import { mockParents } from '@/data/adminMockData';

export default function AdminParents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [parents] = useState(mockParents);

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, parentId: string) => {
    console.log(`${action} action for parent ${parentId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Management</h1>
          <p className="text-muted-foreground">Manage and monitor parent accounts</p>
        </div>
        <Button variant="hero">Add New Parent</Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Search Parents</CardTitle>
          <CardDescription>Find parents by name or email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Parents Table */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Parents ({filteredParents.length})</CardTitle>
          <CardDescription>Complete list of registered parents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Linked Students</TableHead>
                <TableHead>ROI Calculations</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParents.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">{parent.name}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {parent.linkedStudents.map((student, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {student}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {parent.roiCalculations} calculations
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(parent.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={parent.status === 'active' ? 'default' : 'destructive'}>
                      {parent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('view', parent.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('edit', parent.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('block', parent.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          {parent.status === 'active' ? 'Block' : 'Unblock'} User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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