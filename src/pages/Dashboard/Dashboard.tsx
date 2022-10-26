import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineSearch,
  AiOutlineFileAdd,
  AiFillThunderbolt,
} from 'react-icons/ai';
import { ImSad } from 'react-icons/im';
import { ImStack } from 'react-icons/im';
import { BsImageFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { getAllArticles, getWordpressInfo } from '@/services/common';
import TextShortner from '@/components/form/TextShotner';
import CustomTable from '@/components/CustomTable/CustomTable';
import { useGlobalStore } from '@/store/store';
const buttons = [
  {
    id: 0,
    text: 'Create [Simple Mode]',
    icon: <AiOutlineFileAdd />,
    link: '/create-simple',
    available: true,
  },
  {
    id: 1,
    text: 'Create [Advanced Mode]',
    icon: <AiFillThunderbolt />,
    link: '/create-advanced',
    available: false,
  },
  {
    id: 2,
    text: 'Create [Bulk Mode]',
    icon: <ImStack />,
    link: '/creat-bulk',
    available: false,
  },
  {
    id: 3,
    text: 'Create AI Image',
    icon: <BsImageFill />,
    link: '/create-image',
    available: false,
  },
];
const columns = [
  {
    Header: 'Keyword',
    accessor: 'keyword',
    Cell: ({ value, row, histoty, ...rest }) => {
      return (
        <>
          <Box
            fontSize="12px"
            fontWeight={'600'}
            lineHeight="14px"
            color="#344054"
            flexDir="column"
          >
            <Flex _hover={{ textDecor: 'underline' }}>
              <TextShortner text={value} limit={25} textStyle={{ mr: '5px' }} />
            </Flex>
          </Box>
        </>
      );
    },
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
    Cell: ({ value }) => {
      return (
        <>
          <Box fontSize="12.64px" lineHeight="14px" color="#344054">
            {new Date(value).toDateString()}
          </Box>
        </>
      );
    },
  },
  {
    Header: 'Location',
    accessor: 'location',
    Cell: ({ value }) => {
      return (
        <>
          <Box fontSize="12.64px" lineHeight="14px" color="#344054">
            {value}
          </Box>
        </>
      );
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => {
      return (
        <>
          <Box fontSize="12.64px" lineHeight="14px" color="#344054">
            {value}
          </Box>
        </>
      );
    },
  },
];

function Dashboard() {
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const setWordPressInfo = useGlobalStore(
    (state) => state.actions.setWordPressInfo
  );

  useEffect(() => {
    const fun = async () => {
      setLoading(true);
      const res = await getAllArticles();
      setArticles(res.data.articles.reverse());
      setLoading(false);
    };

    fun();
  }, []);

  useEffect(() => {
    const fun = async () => {
      try {
        const { data } = await getWordpressInfo();
        setWordPressInfo(data.response);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fun();
  }, []);

  return (
    <div className="w-full  h-screen bg-grey-200 text-grey-800">
      <div className="w-full h-full flex flex-col gap-5 p-4 border-2 ">
        <h1 className="font-bold text-3xl">Article List</h1>
        <h2>Search for articles</h2>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch color="gray.300" />}
          />
          <Input
            onChange={() => {}}
            width="400px"
            placeholder="Search for the articles"
            bgColor={'#fff'}
          />
        </InputGroup>
        <div className="flex items-center gap-4">
          {buttons.map((btn) => (
            <Button
              key={btn.id}
              onClick={() => {
                console.log(btn.link);
                history.push(btn.link);
              }}
              leftIcon={btn.icon}
              variant="primary"
              className="bg-primary-700 disabled:hover:bg-primary-200"
              disabled={!btn.available}
            >
              {btn.text}
            </Button>
          ))}
        </div>

        <div className="my-6 flex flex-col gap-2 w-full bg-white shadow-md rounded-md p-4">
          {articles.length > 0 ? (
            <CustomTable columns={columns} tableRows={articles} />
          ) : (
            <div className="flex flex-col gap-10  p-5 rounded-sm shadow-sm bg-white justify-center items-center text-grey-500">
              <ImSad className="h-[100px] w-[100px] text-grey-100" />
              <div>No articles found! Please create one from above</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
