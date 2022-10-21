import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import './styles.css';
const PaginationComponent = ({
  pageIndex,
  pageSize,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  currPage = 2,
}) => {
  return (
    <Flex
      w={'100%'}
      bgColor="#fff"
      p="10px 25px"
      alignItems="center"
      justifyContent={'space-between'}
      borderTopWidth="0.5px"
    >
      <Button
        h="34px"
        p="8px 14px"
        fontSize={'12px'}
        fontWeight="600"
        color="#344054"
        borderRadius={'4px'}
        disabled={!canPreviousPage}
        onClick={() => previousPage()}
        backgroundColor="#fff"
        border={'1px solid #E4E7EC'}
        leftIcon={<ArrowBackIcon />}
      >
        Previous
      </Button>
      <Flex alignItems={'center'} gap="20px">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={(data) => {
            gotoPage(data.selected);
          }}
          containerClassName="pagination-custom"
          activeClassName="active-custom"
          pageLinkClassName="page-link-custom"
          breakLinkClassName="page-link-custom"
          nextLinkClassName="page-link-custom"
          previousLinkClassName="page-link-custom"
          pageClassName="page-item-custom"
          breakClassName="page-item-custom"
          nextClassName="next-custom"
          previousClassName="prev-custom"
          forcePage={pageIndex}
        />
      </Flex>

      <Button
        h="34px"
        p="8px 14px"
        fontSize={'12px'}
        fontWeight="600"
        color="#344054"
        borderRadius={'4px'}
        disabled={!canNextPage}
        onClick={() => {
          nextPage();
        }}
        backgroundColor="#fff"
        border={'1px solid #E4E7EC'}
        rightIcon={<ArrowForwardIcon />}
      >
        Next
      </Button>
    </Flex>
  );
};

export default PaginationComponent;
