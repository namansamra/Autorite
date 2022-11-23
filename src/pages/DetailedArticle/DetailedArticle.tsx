import QuillEditor from '@/components/Editor/Quill';
import { getDetailedArticle, saveArticle } from '@/services/common';
import { Button, Skeleton, useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { TbPlugConnected } from 'react-icons/tb';
import parse from 'html-react-parser';
import Publisher from './Publisher';
import { debounce } from 'lodash';

function makeHtmlContent(data, setSubInfo) {
  // let title  = `<h1> ${data.data.title? data.data.title :"" } </h1>`
  const subInfo = {
    word_count: 0,
    keyword_density: 0,
    grade: 0,
  };
  if (data.html_content) {
    let stringData = data.html_content.replaceAll('<.*?>', '');
    subInfo.word_count += stringData.split(' ').length;
    subInfo.keyword_density += +(
      ((stringData.toLowerCase().split(data.keyword.toLowerCase()).length - 1) /
        subInfo.word_count) *
      100
    ).toFixed(2);
    setSubInfo({ ...subInfo });
    return data.html_content;
  }
  let htmlContent = ``;

  if (data.introduction_paragraph) {
    htmlContent += `<p>${data.introduction_paragraph}</p>`;
    htmlContent += '<br/>';
    subInfo.word_count += data.introduction_paragraph.split(' ').length;
    subInfo.keyword_density +=
      data.introduction_paragraph.split(data.keyword).length - 1;
  }

  if (data.featured_image) {
    const { large, medium, small } = data.featured_image;
    htmlContent += `<img src=${
      medium || small
    } className="max-w-[80%] mx-auto max-h-[600px]"/>`;
    htmlContent += '<br/>';
  }

  if (data.headings_paragraph) {
    data.headings_paragraph.forEach((item) => {
      htmlContent += `<h2>${item.heading}</h2>`;
      htmlContent += `<p >${item.paragraph.replace(
        /(^|\n)[*]\s/gm,
        '\n• '
      )}</p>`;
      htmlContent += '<br/>';
      subInfo.word_count += item.paragraph.split(' ').length;
      subInfo.keyword_density +=
        item.paragraph.toLowerCase().split(data.keyword.toLowerCase()).length -
        1;
    });
  }

  if (data.quora_questions) {
    data.quora_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer.replace(/(^|\n)[*]\s/gm, '\n• ')}</p>`;
      htmlContent += '<br/>';
      subInfo.word_count += item.answer.split(' ').length;
      subInfo.keyword_density +=
        item.answer.toLowerCase().split(data.keyword.toLowerCase()).length - 1;
    });
  }

  if (data.ai_questions) {
    data.ai_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer.replace(/(^|\n)[*]\s/gm, '\n• ')}</p>`;
      htmlContent += '<br/>';
      subInfo.word_count += item.answer.split(' ').length;
      subInfo.keyword_density +=
        item.answer.toLowerCase().split(data.keyword.toLowerCase()).length - 1;
    });
  }

  if (data.related_questions) {
    data.related_questions.forEach((item) => {
      htmlContent += `<h2>${item.question}</h2>`;
      htmlContent += `<p>${item.answer.replace(/(^|\n)[*]\s/gm, '\n• ')}</p>`;
      htmlContent += '<br/>';
      subInfo.word_count += item.answer.split(' ').length;
      subInfo.keyword_density +=
        item.answer.toLowerCase().split(data.keyword.toLowerCase()).length - 1;
    });
  }

  if (data.conclusion_paragraph) {
    htmlContent += `<h2>Conclusion</h2>`;
    htmlContent += `<h4>${data.conclusion_paragraph}</h4> `;
    htmlContent += '<br/>';
    subInfo.word_count += data.conclusion_paragraph.split(' ').length;
    subInfo.keyword_density +=
      data.conclusion_paragraph.toLowerCase().split(data.keyword.toLowerCase())
        .length - 1;
  }
  //replaces any *
  // console.log(htmlContent);
  //https://regex101.com/

  subInfo.keyword_density = +(
    (subInfo.keyword_density / subInfo.word_count) *
    100
  ).toFixed(2);
  setSubInfo({ ...subInfo });
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
  const [savingData, setSavingData] = useState(false);
  const [subInfo, setSubInfo] = useState({
    word_count: 0,
    keyword_density: 0,
    grade: 0,
  });

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
    console.log(articleData);
    if (articleData) {
      let value = makeHtmlContent(articleData, setSubInfo);
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
    setSavingData(true);
    try {
      await saveArticle({ htmlContent: htmlContent, articleId: id });
    } catch (error) {
      console.log(error);
    } finally {
      setSavingData(false);
    }
  };

  const saveDataDebounced = useCallback(debounce(saveDataHandler, 2000), []);
  if (loading) {
    return (
      <div className="w-full  h-full bg-grey-200 text-grey-800 pr-4">
        <div className="flex h-screen items-center gap-[20px] justify-between p-4 sticky top-0 bg-grey-200 z-10  shadow-md border-[#ababab]">
          <div className="flex flex-col gap-4 w-full">
            <Skeleton h="200px" w={'100%'} />
            <Skeleton h="200px" w={'100%'} />
            <Skeleton h="200px" w={'100%'} />
          </div>
        </div>
      </div>
    );
  }
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
              saveEditorDataDebounce={saveDataDebounced}
              articleFormated={articleFormated}
              savingData={savingData}
              instantSaveData={saveDataHandler}
              setSubInfo={setSubInfo}
            />
          </div>
        )}
        <div className="flex flex-col gap-5 p-4 bg-white shadow-lg min-w-[200px] max-w-[100px] rounded-lg justify-center">
          <div className="text-md w-full bg-primary-700 rounded-lg shadow-lg p-2 py-4 text-white text-center">
            <h4 className="!font-bold">Word Count</h4>
            <span>{subInfo.word_count}</span>
          </div>
          <div className="text-md w-full bg-primary-700 rounded-lg shadow-lg p-2 py-4 text-white text-center">
            <h4 className="!font-bold">Readability Score</h4>
            <span>{subInfo.grade}</span>
          </div>
          <div className="text-md w-full bg-primary-700 rounded-lg shadow-lg p-2 py-4 text-white text-center">
            <h4 className="!font-bold">Keyword Density</h4>
            <span>{subInfo.keyword_density}%</span>
          </div>
        </div>

        <Publisher
          isOpen={isOpen}
          onClose={onClose}
          articleData={articleData}
          htmlContent={value}
        />
      </div>
    </div>
  );
}

export default DetailedArticle;
