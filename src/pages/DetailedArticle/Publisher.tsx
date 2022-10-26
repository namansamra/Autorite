import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import React from 'react';

function Publisher({ isOpen, onClose }) {
  return isOpen ? (
    <div className="flex flex-col p-4 sticky bg-white shadow-lg h-full w-[550px] top-[0px] right-0 rounded-md gap-2 overflow-y-auto">
      <div className="text-lg font-bold sticky top-0 bg-white py-2">
        WordPress Publisher
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-sm text-grey-400 ">
          Publish or schedule article to WordPress directly from AutoRite.
        </div>
      </div>
    </div>
  ) : null;
}

export default Publisher;
