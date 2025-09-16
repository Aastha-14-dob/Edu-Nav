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
import { Search, MoreHorizontal, Eye, Edit, Trash2, ExternalLink, Plus } from 'lucide-react';
import { mockColleges } from '@/data/adminMockData';

export default function AdminColleges() {
  const [searchQuery, setSearchQuery] = useState('');
  const [colleges] = useState(mockColleges);

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, collegeId: string) => {
    console.log(`${action} action for college ${collegeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Management</h1>
          <p className="text-muted-foreground">Manage colleges and their information</p>
        </div>
        <Button variant="hero">
          <Plus className="mr-2 h-4 w-4" />
          Add New College
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Search Colleges</CardTitle>
          <CardDescription>Find colleges by name, location, or type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Type</Button>
            <Button variant="outline">Import CSV</Button>
          </div>
        </CardContent>
      </Card>

      {/* Colleges Table */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Colleges ({filteredColleges.length})</CardTitle>
          <CardDescription>Complete list of colleges in database</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Cutoff %</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredColleges.map((college) => (
                <TableRow key={college.id}>
                  <TableCell className="font-medium max-w-48">
                    <div className="truncate">{college.name}</div>
                  </TableCell>
                  <TableCell>{college.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {college.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={college.cutoff >= 95 ? "default" : "secondary"}>
                      {college.cutoff}%
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{college.fees}</TableCell>
                  <TableCell>
                    <a 
                      href={college.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('view', college.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('edit', college.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit College
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(college.website, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleAction('delete', college.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete College
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