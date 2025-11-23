import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface DataDisplayTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  caption?: string;
  pageSize?: number;
}

function DataDisplayTable<T extends object>({
  data,
  columns,
  caption,
  pageSize = 10,
}: DataDisplayTableProps<T>) {
  const [sorting, setSorting] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true, // Enable manual pagination
  });

  const pageCount = Math.ceil(data.length / pageSize);
  useEffect(() => {
    // Keep page index within bounds when data changes
    if (pageIndex >= pageCount && pageCount > 0) {
        setPageIndex(pageCount - 1);
    }

    table.setPageIndex(pageIndex);
  }, [data, pageSize, pageIndex, pageCount, table]);
  

  return (
    <div className="w-full">
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-medium">
                    {header.isSortable ? (
                      <Button
                        variant="ghost"
                        onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
                        className="flex items-center gap-1"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : null}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Page {pageIndex + 1} of {pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              disabled={pageIndex === 0}
              onClick={() => setPageIndex(0)}
            >
              First
            </Button>
            <Button
              variant="outline"
              disabled={pageIndex === 0}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={pageIndex === pageCount - 1}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </Button>
            <Button
              variant="outline"
              disabled={pageIndex === pageCount - 1}
              onClick={() => setPageIndex(pageCount - 1)}
            >
              Last
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataDisplayTable;