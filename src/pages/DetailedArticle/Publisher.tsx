import { useGlobalStore } from '@/store/store';
import React, { useRef, useState } from 'react';
import DropDown from '@/components/DropDown/DropDown';
import { BsWordpress } from 'react-icons/bs';
import { Button, Checkbox, Input } from '@chakra-ui/react';
import Select from 'react-select';
import { publishArticle } from '@/services/common';
import { IoIosClose } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import { GiGlassCelebration } from 'react-icons/gi';
const visibilityArr = [
  {
    label: 'Public',
  },
  {
    label: 'Private',
  },
];
const PublisherForm = ({
  domain,
  setDomain,
  author,
  setAuthor,
  title,
  setTitle,
  schedule,
  setSchedule,
  visibility,
  setVisibility,
  slug,
  setSlug,
  tags,
  setTags,
  categories,
  setCategories,
  allowComment,
  setAllowComment,
  allowPingback,
  setAllowPingback,
  featureImage,
  setFeaturedImage,
}) => {
  const wordPressInfo = useGlobalStore((state) => state.appState.wordPressInfo);

  return (
    <div className="flex flex-col gap-6 py-4 border-1 border-primary-900 w-full">
      <div className="flex flex-col gap-4 justify-between items-start">
        <DropDown
          label="Domain"
          currentState={domain}
          onClickItem={(item) => setDomain(item)}
          menuItems={[domain]}
        />
        <DropDown
          label="Author"
          currentState={author.name}
          onClickItem={(item) => setAuthor(item)}
          menuItems={wordPressInfo?.users}
          itemKey="name"
        />
      </div>
      <div className="flex flex-col gap-4 justify-between items-start">
        <DropDown
          label="Visibility"
          currentState={visibility.label}
          onClickItem={(item) => setVisibility(item)}
          menuItems={visibilityArr}
          itemKey="label"
        />
        {/* <DropDown
          label="Schedule"
          currentState={schedule}
          onClickItem={setSchedule}
          isTypeDate={true}
        /> */}
      </div>
      <div className="flex flex-col justify-between gap-2">
        <div className="text-bold text-sm font-semibold">Title</div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="rounded-sm border-[1px] border-[#d0d5dd]"
        />
      </div>
      {/* <div className="flex flex-col justify-between gap-2">
        <div className="text-bold text-sm font-semibold">Slug</div>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
        />
      </div> */}

      <div className="flex flex-col justify-between gap-2  border-b-[1px]">
        <div className="text-bold text-sm font-semibold">Categories</div>
        <Select
          placeholder="Select Categories"
          isMulti
          name="colors"
          options={wordPressInfo?.categories}
          className="basic-multi-select"
          classNamePrefix="select"
          getOptionValue={(option: any) => {
            return option.name;
          }}
          getOptionLabel={(option: any) => option.name}
          onChange={(val: any) => {
            setCategories(val);
          }}
        />
      </div>
      <div className="flex flex-col justify-between gap-2 ">
        <div className="text-bold text-sm font-semibold">Tags</div>
        <Select
          placeholder="Select tags"
          isMulti
          name="colors"
          options={wordPressInfo?.tags}
          className="basic-multi-select"
          classNamePrefix="select"
          getOptionValue={(option: any) => {
            return option.name;
          }}
          getOptionLabel={(option: any) => option.name}
          onChange={(val: any) => {
            setTags(val);
          }}
        />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="text-bold text-sm font-semibold">Featured Image</div>
        <label
          className="h-[100px] w-full bg-grey-100 p-4 rounded-md flex justify-center items-center text-lg text-grey-300 cursor-pointer"
          placeholder="Upload file"
        >
          <Input
            onChange={(e) => {
              console.log(e);
            }}
            placeholder="Upload Image"
            type={'file'}
            onClick={(e) => {
              console.log(e.target);
              setFeaturedImage(e.target);
            }}
            hidden
          />
          Upload Image
        </label>
      </div>

      <div className="flex flex-col justify-between gap-2 ">
        <div className="text-bold text-sm font-semibold">Discussion</div>
        <div className="flex flex-col gap-4 items-start justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              isChecked={allowComment}
              onChange={(e) => setAllowComment(e.target.checked)}
            >
              Allow Comments
            </Checkbox>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              isChecked={allowPingback}
              onChange={(e) => setAllowPingback(e.target.checked)}
            >
              Allow Pingback
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

function Publisher({ isOpen, onClose, articleData, htmlContent }) {
  const wordPressInfo = useGlobalStore((state) => state.appState.wordPressInfo);
  const [domain, setDomain] = useState(wordPressInfo?.domain);
  const [author, setAuthor] = useState(
    wordPressInfo?.users?.length > 0 ? wordPressInfo?.users[0] : {}
  );
  const [visibility, setVisibility] = useState(visibilityArr[0]);
  const [schedule, setSchedule] = useState({
    date: new Date(),
    time: {
      hr: 10,
      min: 30,
      indication: 'AM',
    },
  });
  const [title, setTitle] = useState(articleData.title);
  const [slug, setSlug] = useState(articleData.slug);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [allowComment, setAllowComment] = useState(true);
  const [allowPingback, setAllowPingback] = useState(true);
  const [featureImage, setFeaturedImage] = useState('');
  const [publishedArticleLink, setPublishedArticleLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let payload = {
      title,
      // slug,
      author,
      tags,
      categories,
      comment_status: allowComment ? 'open' : 'closed',
      ping_status: allowPingback ? 'open' : 'closed',
      content: htmlContent,
      publish_type: 'posts',
      article_id: articleData.article_id,
      w_id: wordPressInfo.w_id,
      publish_status: visibility.label == 'Public' ? '1' : '2',
      featured_media: [{}],
    };
    try {
      const res = await publishArticle(payload);
      setPublishedArticleLink(res.data.link);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return isOpen ? (
    <div className="flex flex-col p-4 bg-white shadow-lg h-full w-[600px] rounded-md gap-2 relative max-w-md ">
      {publishedArticleLink ? (
        <div className="flex flex-col gap-5 items-center py-10">
          <GiGlassCelebration className="h-[150px] w-[150px] text-primary-700" />
          <div className="text-lg text-grey-600 font-bold">
            Congratulations!! Your article is published!
          </div>
          <a
            href={publishedArticleLink}
            target="_blank"
            className="text-md hover:underline text-primary-700 cursor-pointer"
          >
            Click here to view article
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-center text-lg font-bold sticky top-[-18px] bg-white py-3 z-10">
            <BsWordpress className="h-[20px] w-[20px] text-primary-800 inline-block mr-2" />{' '}
            WordPress Publisher
          </div>
          <IoIosClose
            className="absolute text-grey-400 right-[10px] top-[10px] hover:text-grey-600 h-[30px] w-[30px] z-10 cursor-pointer"
            onClick={() => onClose()}
          />
          <div className="flex flex-col gap-4  overflow-y-auto pb-[300px] pr-[20px]  relative">
            <div className="text-sm text-grey-400">
              Publish article to WordPress instantly from AutoRite.
            </div>
            <PublisherForm
              domain={domain}
              setDomain={setDomain}
              author={author}
              setAuthor={setAuthor}
              title={title}
              setTitle={setTitle}
              schedule={schedule}
              setSchedule={setSchedule}
              visibility={visibility}
              setVisibility={setVisibility}
              slug={slug}
              setSlug={setSlug}
              tags={tags}
              setTags={setTags}
              categories={categories}
              setCategories={setCategories}
              allowComment={allowComment}
              setAllowComment={setAllowComment}
              allowPingback={allowPingback}
              setAllowPingback={setAllowPingback}
              featureImage={featureImage}
              setFeaturedImage={setFeaturedImage}
            />
          </div>
          <div className="shadow-lg text-grey w-full h-20 p-4 pr-[30px] absolute bottom-0 left-0 right-0 z-10 bg-grey-50 flex items-center justify-between">
            {/* <Button
          variant={'outline'}
          className="min-w-[170px] py-4 bg-white"
          onClick={() => handleSubmit(1)}
        >
          Draft
        </Button> */}
            <Button
              variant={'primary'}
              className="min-w-[170px] ] py-4 w-full bg-primary-800"
              onClick={handleSubmit}
              rightIcon={<FiSend className="h-[20px] w-[20px]" />}
              isLoading={isLoading}
            >
              Publish Article
            </Button>
          </div>
        </>
      )}
    </div>
  ) : null;
}

export default Publisher;
