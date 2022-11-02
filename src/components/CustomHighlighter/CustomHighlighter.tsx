import React, { useEffect, useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';

const HighLighter = ({ value = 'PENDING' }) => {
  const [text, setText] = useState({
    textColor: '#E0781D',
    backgroundColor: '#FFFAEB',
    value: 'In Progress',
  });

  useEffect(() => {
    let color;
    let bgColor;
    let textValue;
    if (value == 'completed') {
      color = '#027948';
      bgColor = '#ECFDF3';
      textValue = 'Successful';
    } else if (value == 'failed') {
      color = '#D92D20';
      bgColor = '#FEF3F2';
      textValue = 'Failed';
    } else if (value == 'pending') {
      color = '#4B7AFF';
      bgColor = '#EDF1FF';
      textValue = 'Invited';
    } else {
      color = '#E0781D';
      bgColor = '#FFFAEB';
      textValue = 'In Progress';
    }
    setText({
      textColor: color,
      backgroundColor: bgColor,
      value: textValue,
    });
  }, [value]);

  return (
    <Flex
      p="4px 16px 4px 8px"
      borderRadius="16px"
      fontWeight={'500'}
      fontSize="12px"
      backgroundColor={text.backgroundColor}
      color={text.textColor}
      width="max-content"
      textTransform={'capitalize'}
      alignItems="center"
    >
      <Icon as={GoPrimitiveDot} w={3} h={3} style={{ marginRight: 5 }} />
      {text.value}
    </Flex>
  );
};

export default HighLighter;
