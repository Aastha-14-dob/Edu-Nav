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
import { Search, MoreHorizontal, Eye, Edit, Trash2, ExternalLink, Plus, Calendar } from 'lucide-react';
import { mockScholarships } from '@/data/adminMockData';

export default function AdminScholarships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarships] = useState(mockScholarships);

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, scholarshipId: string) => {
    console.log(`${action} action for scholarship ${scholarshipId}`);
  };

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'Expired', variant: 'destructive' as const };
    if (diffDays <= 7) return { status: 'Urgent', variant: 'destructive' as const };
    if (diffDays <= 30) return { status: 'Soon', variant: 'secondary' as const };
    return { status: 'Active', variant: 'default' as const };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scholarship Management</h1>
          <p className="text-muted-foreground">Manage scholarships and their details</p>
        </div>
        <Button variant="hero">
          <Plus className="mr-2 h-4 w-4" />
          Add New Scholarship
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Search Scholarships</CardTitle>
          <CardDescription>Find scholarships by title, eligibility, or provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Export List</Button>
          </div>
        </CardContent>
      </Card>

      {/* Scholarships Table */}
      <Card className="shadow-hover">
        <CardHeader>
          <CardTitle>Scholarships ({filteredScholarships.length})</CardTitle>
          <CardDescription>Complete list of available scholarships</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScholarships.map((scholarship) => {
                const deadlineInfo = getDeadlineStatus(scholarship.deadline);
                return (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium max-w-48">
                      <div className="truncate">{scholarship.title}</div>
                    </TableCell>
                    <TableCell>{scholarship.provider}</TableCell>
                    <TableCell className="max-w-32 truncate">{scholarship.eligibility}</TableCell>
                    <TableCell className="font-medium text-primary">{scholarship.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={deadlineInfo.variant}>
                        {deadlineInfo.status}
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
                          <DropdownMenuItem onClick={() => handleAction('view', scholarship.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('edit', scholarship.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Scholarship
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(scholarship.applyLink, '_blank')}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Application
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleAction('delete', scholarship.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Scholarship
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}