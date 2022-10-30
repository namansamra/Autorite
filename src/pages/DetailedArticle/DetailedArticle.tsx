import QuillEditor from '@/components/Editor/Quill';
import { getDetailedArticle, saveArticle } from '@/services/common';
import { Button, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { TbPlugConnected } from 'react-icons/tb';
import parse from 'html-react-parser';
import Publisher from './Publisher';
import { debounce } from 'lodash';

function makeHtmlContent(data) {
  // let title  = `<h1> ${data.data.title? data.data.title :"" } </h1>`
  let htmlContent = ``;

  if (data.title || data.keyword) {
    htmlContent += `<h1>${data.title || data.keyword}</h1>`;
    htmlContent += '<br/>';
  }

  if (data.introduction_paragraph) {
    htmlContent += `<h3>${data.introduction_paragraph}</h3>`;
    htmlContent += '<br/>';
  }

  if (data.headings_paragraph) {
    data.headings_paragraph.forEach((item) => {
      htmlContent += `<h2>${item.heading}</h2>`;
      htmlContent += `<p >${item.paragraph}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.quora_questions) {
    data.quora_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.ai_questions) {
    data.quora_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.related_questions) {
    data.quora_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.conclusion_paragraph) {
    htmlContent += `<h2>Conclusion</h2>`;
    htmlContent += `<h4>${data.conclusion_paragraph}</h4>`;
    htmlContent += '<br/>';
  }
  return htmlContent;
}

function DetailedArticle() {
  const { id }: { id: any } = useParams();
  const [articleData, setArticleData] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [articleFormated, setArticleFormated] = useState('');
  const [value, setValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fun = async () => {
      setLoading(true);
      const res = await getDetailedArticle(id);
      setArticleData(res.data.articleInfo);
      setLoading(false);
    };
    fun();
  }, [id]);

  useEffect(() => {
    if (articleData) {
      let value = makeHtmlContent(articleData);
      setArticleFormated(value);
      setValue(articleData.html_content ? articleData.html_content : value);
    }
  }, [articleData]);

  const Article = () => {
    return (
      <div className="w-full h-full flex flex-col grow gap-2 border-2 overflow-y-scroll">
        <div className="flex flex-col gap-2 w-full bg-white shadow-md rounded-md p-8 whitespace-pre-wrap">
          {parse(articleFormated)}
        </div>
      </div>
    );
  };
  const saveDataHandler = async (htmlContent: string) => {
    try {
      await saveArticle({ htmlContent: htmlContent, articleId: id });
    } catch (error) {
      console.log(error);
    }
  };

  const saveDataDebounced = useCallback(debounce(saveDataHandler, 3000), []);
  return (
    <div className="w-full  h-full bg-grey-200 text-grey-800 pr-4">
      <div className="flex items-center gap-[20px] justify-between p-4 sticky top-0 bg-grey-200 z-10  shadow-md border-[#ababab]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{articleData.keyword}</h1>
          <p className="text-sm">{articleData.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            rightIcon={<TbPlugConnected />}
            onClick={() => {
              onOpen();
            }}
          >
            Publish Article
          </Button>
          <Button
            rightIcon={<AiOutlineEdit />}
            onClick={() => setStep((s) => (s == 1 ? 2 : 1))}
          >
            {step == 2 ? 'See Article' : 'Edit Article'}
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-5 p-4 h-[calc(100vh-6rem)]">
        {step == 1 ? (
          <Article />
        ) : (
          <div className="w-full flex flex-col gap-2 border-2 whitespace-pre-wrap">
            <QuillEditor
              articleData={articleData}
              value={value}
              setValue={setValue}
              articleId={id}
              saveEditorData={saveDataDebounced}
            />
          </div>
        )}
        <Publisher isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}

export default DetailedArticle;
