import React, { useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  chakra,
  Button,
  useDisclosure,
  Input,
  Switch,
  Select,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useOutsideClick } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const DropDown = ({
  label = '',
  currentState = '',
  onClickItem = (item: any) => {},
  menuItems = [],
  closeOnSelect = false,
  itemKey = '',
  isTypeDate = false,
}: any) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const ref = useRef<any>();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  console.log(currentState);
  return (
    <>
      {isTypeDate ? (
        <Menu
          closeOnSelect={closeOnSelect}
          isOpen={isOpen}
          isLazy={true}
          lazyBehavior="keepMounted"
          flip={false}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="text-bold text-sm font-medium">{label}</div>
            <MenuButton
              as={Button}
              onClick={() => {
                isOpen ? onClose() : onOpen();
              }}
              className="h-8 rounded-sm  border-[1px] border-[#d0d5dd] bg-[#fefefe] text-md font-semibold p-4 text-grey-700 min-w-[120px] w-full text-left"
              // sx={{
              //   'span:first-of-type': {
              //     overflow: 'hidden',
              //     maxWidth: '240px',
              //     textOverflow: 'ellipsis',
              //   },
              // }}
              rightIcon={<FiChevronDown />}
              position="relative"
            >
              <chakra.span>
                {currentState?.date?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}{' '}
                ,
                <span>
                  {currentState?.time?.hr}:{currentState?.time?.min}
                </span>
              </chakra.span>
            </MenuButton>
          </div>
          <MenuList maxH={'400px'} overflow="scroll" ref={ref}>
            <div className="flex flex-col gap-4 p-2 items-start">
              <DatePicker
                selected={currentState.date}
                onChange={(date) =>
                  onClickItem((prev: any) => {
                    return {
                      date: date,
                      time: prev.time,
                    };
                  })
                }
                inline
                clearIcon={null}
              />
              <div className="flex items-center gap-1">
                <NumberInput
                  pattern="^(1[0-2]|0?[0-9])"
                  value={currentState.time.hr}
                  min={0}
                  max={12}
                  onChange={(val) =>
                    onClickItem((prev: any) => {
                      return {
                        date: prev.date,
                        time: {
                          hr: parseInt(val ? val : '0'),
                          min: prev.time.min,
                          indication: prev.time.indication,
                        },
                      };
                    })
                  }
                  className="max-w-[80px]"
                >
                  <NumberInputField />
                </NumberInput>
                <span>:</span>
                <NumberInput
                  pattern="([0-5]?[0-9])"
                  value={currentState.time.min}
                  min={0}
                  max={59}
                  onChange={(val) =>
                    onClickItem((prev: any) => {
                      console.log(val);
                      return {
                        date: prev.date,
                        time: {
                          hr: prev.time.hr,
                          min: parseInt(val ? val : '0'),
                          indication: prev.time.indication,
                        },
                      };
                    })
                  }
                  className="max-w-[80px]"
                >
                  <NumberInputField />
                </NumberInput>
                {/* <Input
                  className="w-[30px] h-[30px]"
                  type={'number'}
                  pattern="^(1[0-2]|0?[0-9])"
                  value={currentState.time.hr}
                  min={1}
                  max={12}
                  onChange={(e) =>
                    onClickItem((prev: any) => {
                      return {
                        date: prev.date,
                        time: {
                          hr: parseInt(e.target.value),
                          min: prev.time.min,
                          indication: prev.time.indication,
                        },
                      };
                    })
                  }
                />
                <span>:</span>
                <Input
                  className="w-[30px] h-[30px]"
                  type={'number'}
                  pattern="([0-5]?[0-9])"
                  value={currentState.time.min}
                  min={0}
                  max={59}
                  onChange={(e) =>
                    onClickItem((prev: any) => {
                      return {
                        date: prev.date,
                        time: {
                          hr: prev.time.hr,
                          min: parseInt(e.target.value),
                          indication: prev.time.indication,
                        },
                      };
                    })
                  }
                /> */}
                <Select
                  className="text-sm h-[40px]"
                  maxW={'80px'}
                  onChange={(e) => {
                    console.log(e);
                    onClickItem((prev: any) => {
                      return {
                        date: prev.date,
                        time: {
                          hr: prev.time.hr,
                          min: prev.time.min,
                          indication: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Select>
              </div>
            </div>
          </MenuList>
        </Menu>
      ) : (
        <Menu closeOnSelect={closeOnSelect} isOpen={isOpen} matchWidth>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-bold text-sm font-medium">{label}</div>
            <MenuButton
              as={Button}
              onClick={() => {
                isOpen ? onClose() : onOpen();
              }}
              className="h-8 rounded-sm  border-[1px] border-[#d0d5dd] bg-[#fefefe] text-md font-semibold p-4 text-grey-700 min-w-[120px] text-start py-5"
              // sx={{
              //   'span:first-of-type': {
              //     overflow: 'hidden',
              //     maxWidth: '240px',
              //     textOverflow: 'ellipsis',
              //   },
              // }}
              rightIcon={<FiChevronDown />}
            >
              <chakra.span>{currentState}</chakra.span>
            </MenuButton>
          </div>

          <MenuList maxH={'400px'} overflow="scroll">
            {menuItems.map((item, i) => (
              <MenuItemOption
                value={item}
                key={typeof item == 'string' ? item : item[itemKey]}
                fontSize="16px"
                onClick={() => {
                  onClickItem(item);
                  onClose();
                }}
              >
                {typeof item == 'string' ? item : item[itemKey]}
              </MenuItemOption>
            ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default DropDown;
