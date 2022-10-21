import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Flex, Box, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import PaginationComponent from './PaginationComponent';

const useCombinedRefs = (...refs) => {
  const targetRef = useRef();
  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef(function CheckBox(
  { indeterminate, ...rest },
  ref
) {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={combinedRef} {...rest} />
    </>
  );
});

const CustomTable = ({ columns, tableRows, rowsPerPage = 6 }) => {
  const history = useHistory();
  const getRowId = useCallback((row, relativeIndex, parent) => {
    const id = row.id;
    return id;
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: tableRows,
      initialState: { pageIndex: 0, pageSize: rowsPerPage },
      getRowId: getRowId,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => {
            return (
              <Flex alignItems={'center'}>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </Flex>
            );
          },
          Cell: ({ row }) => {
            return (
              <Flex alignItems={'center'}>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </Flex>
            );
          },
        },
        ...columns,
      ]);
    }
  );

  return (
    <Box bgColor={'#FEFEFF'} p="8px" borderRadius={'0 0 8px 8px'}>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <Th
                  fontSize="12px"
                  fontWeight="normal"
                  fontFamily="inherit"
                  color="#B3B3B3"
                  textTransform={'capitalize'}
                  paddingRight={i == 0 ? '5px' : '24px'}
                  paddingLeft={i == 1 ? '5px' : '24px'}
                  key={i}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr
                cursor="pointer"
                {...row.getRowProps()}
                key={i}
                _hover={{ backgroundColor: '#F6F9FF' }}
                onClick={() => {
                  console.log('hello here');
                  history.push(`/dashboard/${row.id}`);
                }}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <Td
                      fontSize="12px"
                      {...cell.getCellProps()}
                      borderBottom="none !important"
                      color={'#F6F9FF !important'}
                      paddingRight={i == 0 ? '5px' : '24px'}
                      paddingLeft={i == 1 ? '5px' : '24px'}
                      key={i}
                    >
                      {cell.render('Cell', {
                        history: history,
                      })}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <PaginationComponent
        page={page}
        pageIndex={pageIndex}
        pageSize={pageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

export default CustomTable;
