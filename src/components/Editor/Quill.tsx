import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module-react';
import VideoResize from 'quill-video-resize-module2';
import { ImUndo } from 'react-icons/im';
import { FiSave } from 'react-icons/fi';
import 'react-quill/dist/quill.snow.css';
Quill.register('modules/VideoResize', VideoResize);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
import './styles.css';
import { Button, Checkbox } from '@chakra-ui/react';
let BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];
class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);
var quill = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ direction: 'rtl' }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      // outdent/indent
      // text direction

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ['image', 'video', 'link'],
      ['clean'], // remove formatting button
    ],
    imageDrop: true,
    imageResize: {
      parchment: Quill.import('parchment'),
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
    VideoResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
      tagName: 'iframe', // iframe | video
    },

    history: {
      delay: 2000,
      maxStack: 500,
    },
  },
};

var Font = Quill.import('formats/font');

// We do not add Aref Ruqaa since it is the default
Font.whitelist = [
  'open-sans',
  'noto-sans',
  'inter',
  'poppins',
  'roboto',
  'gluten',
  'fleur-de-leah',
  'serif',
  'sans-serif',
];

Quill.register(Font, true);

var SizeStyle = Quill.import('attributors/style/size');

SizeStyle.whitelist = [
  '8px',
  '9px',
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '36px',
  '48px',
  '72px',
];

Quill.register(SizeStyle, true);

const getPosValueV = (value) => {
  let top = value;
  let reverse = false;
  if (value < 100) {
    top = value + 100;
    reverse = true;
  }

  return {
    top,
    reverse,
  };
};

let interval = null;
let timeout1 = null;
let timeout = null;

let docu: any = document;

function QuillEditor({
  access = true,
  saveEditorDataDebounce = (value: string) => {},
  getEditorData = () => {},
  articleData,
  htmlContent = '',
  value = '',
  setValue = (val: any) => {},
  articleId = '',
  articleFormated = '',
  savingData = false,
  instantSaveData = (val: any) => {},
  setSubInfo = (val: any) => {},
}) {
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);
  useEffect(() => {
    if (ref.current) {
      docu.mounted = true;
      docu.quill = ref.current;
      docu.quill?.editor.disable();
      (async () => {
        await getEditorData();
        setLoading(false);
        if (docu?.quill?.editor) {
          access && docu.quill.editor.enable();
          docu.quill.editor.cursor = docu.quill.editor.getText().length;
          docu.quill.focus();
        }
      })();
    }
    return () => {
      let currVal = docu?.quill?.editor?.root?.innerHTML;
      if (currVal && (currVal != '\n' || currVal != '<br/>')) {
        docu.mounted = false;
        instantSaveData(currVal);
      }
    };
  }, []);
  return (
    <>
      <div className="flex flex-grow relative flex-col" id="editor-bound">
        <div className="flex gap-4 items-center bg-whiteSmoke shadow-md w-full px-4 py-2 justify-between">
          <Checkbox
            isChecked={isAutoSave}
            onChange={(e) => setIsAutoSave(e.target.checked)}
          >
            Auto Save
          </Checkbox>

          <div className="flex gap-4 items-center">
            <Button
              variant={'primary'}
              onClick={() => {
                setValue(articleFormated);
              }}
              className="h-[25px]"
              rightIcon={<ImUndo />}
            >
              Paste Original Article
            </Button>
            {!isAutoSave && (
              <Button
                variant={'primary'}
                onClick={() => {
                  instantSaveData(value);
                }}
                className="h-[25px]"
                rightIcon={<FiSave />}
                isLoading={savingData}
              >
                Save
              </Button>
            )}
          </div>
        </div>
        <ReactQuill
          ref={ref as React.MutableRefObject<any>}
          onChange={(value) => {
            setValue(value);
            const subInfo = {
              word_count: 0,
              keyword_density: 0,
              grade: 0,
            };
            let p = value.replaceAll(/(<([^>]+)>)/gi, '');
            subInfo.word_count += p.split(' ').length;
            subInfo.keyword_density = +(
              ((p.split(articleData.keyword).length - 1) / subInfo.word_count) *
              100
            ).toFixed(2);
            setSubInfo(subInfo);
            if (isAutoSave) {
              saveEditorDataDebounce(value);
            }
          }}
          theme={quill.theme}
          modules={quill.modules}
          bounds={'#editor-bound'}
          value={value}
          className="bg-white min-h-[600px]"
        />
      </div>
    </>
  );
}

export default QuillEditor;
