


import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  darken,
  lighten,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Catalog, Book, } from "./makeData.tsx";
const Example = () => {
  const [creatingRowIndex, setCreatingRowIndex] = useState<number | undefined>();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
 
  const columns = useMemo<MRT_ColumnDef<Catalog>[]>(
    () => [
      {
        accessorKey: 'book_id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'title',
        header: 'title',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: 'author',
        header: 'Author',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.author,
          helperText: validationErrors?.author,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              author: undefined,
            }),
        },
      },
      
      {
        accessorKey: 'genre',
        header: 'genre',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.genre,
          helperText: validationErrors?.genre,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              genre: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  const {
    data: fetchedCatalog = [],
    isError: isLoadingCatalogError,
    isFetching: isFetchingCatalog,
    isLoading: isLoadingCatalog,
  } = useGetCatalogs();

  const { mutateAsync: createCatalog, isPending: isCreatingCatalog } =
    useCreateCatalog();
  const { mutateAsync: updateCatalog, isPending: isUpdatingCatalog } =
    useUpdateCatalog();
  const { mutateAsync: deleteCatalog, isPending: isDeletingCatalog } =
    useDeleteCatalog();
  const { mutateAsync: createBook, isPending: isCreatingBook } =
    useCreateBook();
  const { mutateAsync: deleteBook, isPending: isDeletingBook } =
    useDeleteBook();

  const handleCreateCatalog: MRT_TableOptions<Catalog>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateCatalog(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createCatalog(values);
      table.setCreatingRow(null);
    };

  const handleSaveCatalog: MRT_TableOptions<Catalog>['onEditingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateCatalog(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      console.log(values)
      //await updateCatalog(values);
      const response = await fetch("http://127.0.0.1:8000/edit-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: parseInt(values.book_id),
          title: values.title,
          genre: values.genre,
          author: values.author,
          detail: null,
        }),
      });
      console.log(response.status)
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = async (row: MRT_Row<Catalog>) => {
    if (window.confirm('Are you sure you want to delete this catalog?')) {
      await deleteCatalog(row.original.ID);
      queryClient.invalidateQueries('Catalog');
    }
  };

  const handleCreateBook = async (book_id: number) => {
    await createBook(book_id);
    queryClient.invalidateQueries('Catalog');
  };

  const handleDeleteBook = async (book_id: number, bookUniqueId: string) => {
    await deleteBook(book_id, bookUniqueId);
    queryClient.invalidateQueries('Catalog');
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedCatalog,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    
    positionCreatingRow: creatingRowIndex,
    getRowId: (row) => {
      console.log(row.book_id)
      return row.ID},
    onCreatingRowSave: handleCreateCatalog,
    onEditingRowSave: handleSaveCatalog,
    renderRowActions: ( {row} ) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <a href={`fidUnique/${row.id}`}><Tooltip title="Add Book">
          <IconButton>
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip></a>
      </Box>
    ),
    // renderSubRow: ({ row }) => {
    //   const subRows = row.original.Books?.map((book) => (
    //     <div key={book.uniqueID}>
    //       {book.uniqueID}{' '}
    //       <IconButton
    //         color="error"
    //         onClick={() => handleDeleteBook(row.original.ID, book.uniqueID)}
    //         disabled={isDeletingBook}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     </div>
    //   ));
    //   return subRows || null; // Return null if row.original.Books is falsy
    // },
    // renderTopToolbarCustomActions: ({ table }) => ( 
    //   < a href='fidUnique'><Button
    //     startIcon={<PersonAddAltIcon />}
    //     variant="contained"
    //   >
    //     Create New Book
    //   </Button></a>
    // ),
    
    
  });

  return <MaterialReactTable table={table} />;
};

function useCreateCatalog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (catalog: Catalog) => {
      console.info('create catalog', catalog);
      // Send API create request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake API call
      return Promise.resolve();
    },
    onMutate: (newCatalogInfo: Catalog) => {
      queryClient.setQueryData(['catalogs'], (_prevCatalogs: Catalog[]) => {
        const prevCatalogs: Catalog[] = JSON.parse(JSON.stringify(_prevCatalogs));
        prevCatalogs.push(newCatalogInfo);
        return [...prevCatalogs];
      });
    },
  });
}

function useUpdateCatalog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (catalog: Catalog) => {
      console.info('update catalog', catalog);

      const response = await fetch("http://127.0.0.1:8000/edit-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: catalog.book_id,
          title: catalog.title,
          genre: catalog.genre,
          author: catalog.author,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update catalog');
      }

      const data = await response.json();
      return data;
    },
    onMutate: (updatedCatalogInfo: Catalog) => {
      queryClient.setQueryData(['catalogs'], (prevCatalogs: any) => {
        const updatedCatalogs = prevCatalogs.map((catalog: Catalog) =>
          catalog.book_id === updatedCatalogInfo.book_id ? updatedCatalogInfo : catalog
        );
        return updatedCatalogs;
      });
    },
    onError: (error: Error, variables, context) => {
      console.error('Update error:', error);
      queryClient.setQueryData(['catalogs'], context?.prevCatalogs);
    },
    onSuccess: (data, variables, context) => {
      console.log('Update success:', data);
      queryClient.invalidateQueries('catalogs');
    },
  });
}



function useDeleteCatalog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (book_id: string) => {
      console.info('delete catalog', book_id);
      // Send API delete request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake API call
      return Promise.resolve();
    },
    onMutate: (deletedbook_id: string) => {
      queryClient.setQueryData(['catalogs'], (prevCatalogs: any) =>
        prevCatalogs.filter((catalog: Catalog) => catalog.ID !== deletedbook_id)
      );
    },
  });
}
function useGetCatalogs() {
  return useQuery<Catalog[], Error>({
    queryKey: ['catalogs'],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data.docs;
    },
    refetchOnWindowFocus: false,
  });
}

function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBook: Book, book_id: number) => {
      console.info('create book', newBook);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake API call
      // Send API create request here
      return Promise.resolve();
    },
    onMutate: (newBook: Book, book_id: number) => {
      queryClient.setQueryData(['catalogs'], (prevCatalogs: Catalog[]) => {
        const updatedCatalogs = prevCatalogs.map((catalog: Catalog) =>
          catalog.ID === book_id
            ? { ...catalog, Books: [...catalog.Books, newBook] }
            : catalog
        );
        return updatedCatalogs;
      });
    },
  });
}

function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uniqueID: string, book_id: number) => {
      console.info('delete book', uniqueID);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake API call
      // Send API delete request here
      return Promise.resolve();
    },
    onMutate: (uniqueID: string, book_id: string) => {
      queryClient.setQueryData(['catalogs'], (prevCatalogs: Catalog[]) => {
        const updatedCatalogs = prevCatalogs.map((catalog: Catalog) =>
          catalog.ID === book_id
            ? {
                ...catalog,
                Books: catalog.Books.filter((book) => book.uniqueID !== uniqueID),
              }
            : catalog
        );
        return updatedCatalogs;
      });
    },
  });
}

// renderSubRow: ({ row }) => {
//   const subRows = row.original.Books.map((book) => (
//     <div key={book.uniqueID}>
//       {book.uniqueID}{' '}
//       <IconButton
//         color="error"
//         onClick={() => handleDeleteBook(row.original.ID, book.uniqueID)}
//         disabled={isDeletingBook}
//       >
//         <DeleteIcon />
//       </IconButton>
//     </div>
//   ));
//   return subRows;
// }
const queryClient = new QueryClient();
const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;
const validateRequired = (value: string) => !!value.length;

function validateCatalog(catalog: Catalog) {
  return {
    title: !validateRequired(catalog.title) ? 'Name is Required' : '',
    author: !validateRequired(catalog.author) ? 'Author is Required' : '',
    genre: !validateRequired(catalog.genre) ? 'Publisher is Required' : '',
    
  };
}


function findCatalogInTree(managerId: string | null, Catalogs: Catalog[]): Catalog | null {
  for (let i = 0; i < Catalogs.length; i++) {
    if (Catalogs[i].id === managerId) {
      return Catalogs[i];
    }
    if (Catalogs[i].subRows) {
      const found = findCatalogInTree(managerId, Catalogs[i].subRows!);
      if (found) return found;
    }
  }
  return null;
}
