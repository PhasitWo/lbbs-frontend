import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const EditBook = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:8000/book')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiData => {
        
        const mappedData = apiData.docs.map(book => ({
          ID: book.book_id, 
          UniqueID: book.book_id, 
        }));
        
        
        setData(mappedData);
      })
      .catch(error => {
        console.error('There was a problem fetching data:', error);
      });
  }, []); 

  const columns = useMemo(
    () => [
      {
        accessorKey: 'ID', // Access nested data with dot notation
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'UniqueID',
        header: 'UniqueID',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, // Use the memoized and stable data state
  });

  return <MaterialReactTable table={table} />;
};

export default EditBook;
