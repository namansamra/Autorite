import QuillEditor from '@/components/Editor/Quill';
import { getDetailedArticle } from '@/services/common';
import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { TbPlugConnected } from 'react-icons/tb';
import parse from 'html-react-parser';

function makeHtmlContent(data) {
  // let title  = `<h1> ${data.data.title? data.data.title :"" } </h1>`
  let htmlContent = ``;

  if (data.title || data.keyword) {
    htmlContent += `<h1>${data.title || data.keyword}</h1>`;
    htmlContent += '<br/>';
  }

  if (data.introduction_paragraph) {
    htmlContent += `<h1>Introduction</h1>`;
    htmlContent += `<h3>${data.introduction_paragraph}</h3>`;
    htmlContent += '<br/>';
  }

  if (data.headings_paragraph) {
    htmlContent += `<h1>Headings</h1>`;
    data.headings_paragraph.forEach((item) => {
      htmlContent += `<h3>${item.heading}</h3>`;
      htmlContent += `<p>${item.paragraph}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.conclusion_paragraph) {
    htmlContent += `<h1>Conclusion</h1>`;
    htmlContent += `<h3>${data.conclusion_paragraph}</h3>`;
    htmlContent += '<br/>';
  }

  if (data.quora_questions) {
    htmlContent += `<h1>Quora Questions</h1>`;
    data.quora_questions.forEach((item) => {
      htmlContent += `<h4>${item.question}</h4>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.ai_questions) {
    htmlContent += `<h1>AI Questions</h1>`;
    data.quora_questions.forEach((item) => {
      htmlContent += `<h4>${item.question}</h4>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }

  if (data.related_questions) {
    htmlContent += `<h1>Related Questions</h1>`;
    data.quora_questions.forEach((item) => {
      htmlContent += `<h4>${item.question}</h4>`;
      htmlContent += `<p>${item.answer}</p>`;
      htmlContent += '<br/>';
    });
  }
  console.log(htmlContent);
  return htmlContent;
}

function DetailedArticle() {
  const { id }: { id: any } = useParams();
  const [articleData, setArticleData] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [articleFormated, setArticleFormated] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fun = async () => {
      setLoading(true);
      const res = await getDetailedArticle(id);
      console.log(res);
      setArticleData(res.data.articleInfo);
      setLoading(false);
    };
    fun();
  }, [id]);

  useEffect(() => {
    if (articleData) {
      let value = makeHtmlContent(articleData);
      setArticleFormated(value);
      setValue(value);
    }
  }, [articleData]);

  const Article = () => {
    return (
      <div className="w-full flex flex-col gap-2 p-4 border-2 ">
        <div className="flex flex-col gap-2 w-full bg-white shadow-md rounded-md p-8">
          {parse(articleFormated)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full  h-full bg-grey-200 text-grey-800 pr-4">
      <div className="flex items-center gap-[20px] justify-between px-4 py-6 sticky top-0 bg-grey-200 z-10  shadow-md border-[#ababab]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{articleData.keyword}</h1>
          <p className="text-sm">{articleData.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button rightIcon={<TbPlugConnected />} onClick={() => {}}>
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
      {step == 1 ? (
        <Article />
      ) : (
        <div className="w-full flex flex-col gap-2 p-4 border-2 ">
          <QuillEditor
            articleData={articleData}
            value={value}
            setValue={setValue}
          />
        </div>
      )}
    </div>
  );
}

export default DetailedArticle;
