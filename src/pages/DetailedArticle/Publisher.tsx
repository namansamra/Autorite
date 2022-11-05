import { useGlobalStore } from '@/store/store';
import React, { useRef, useState } from 'react';
import DropDown from '@/components/DropDown/DropDown';
import { BsWordpress } from 'react-icons/bs';
import { Button, Checkbox, Input } from '@chakra-ui/react';
import Select from 'react-select';
import { publishArticle } from '@/services/common';
import { IoIosClose } from 'react-icons/io';

/* 

{
    "title": "Elon Musk's Huge Twitter Takeover: What It Means For You",
    "publish_status": 2,
    "author": [
        {
            "id": 1,
            "name": "Mahadev",
            "slug": "mahadev",
            "avatar": {
                "24": "https://secure.gravatar.com/avatar/a43405051a9572371383e159b169a06e?s=24&d=mm&r=g",
                "48": "https://secure.gravatar.com/avatar/a43405051a9572371383e159b169a06e?s=48&d=mm&r=g",
                "96": "https://secure.gravatar.com/avatar/a43405051a9572371383e159b169a06e?s=96&d=mm&r=g"
            }
        }
    ],
    "crd_id": 250,
    "app_id": 4,
    "publish_type": "posts",
    "date": "2022-11-04T12:20:08",
    "iso_time": "2022-11-04T12:20:08.584Z",
    "report_id": "d06d8c92-8184-45a4-8752-37b3185d5297",
    "tags": [
        {
            "id": 799,
            "name": "would an advertising agency use job order or process costing? what about a cell phone manufacturer?",
            "slug": "would-an-advertising-agency-use-job-order-or-process-costing-what-about-a-cell-phone-manufacturer",
            "value": "would an advertising agency use job order or process costing? what about a cell phone manufacturer?",
            "label": "would an advertising agency use job order or process costing? what about a cell phone manufacturer?"
        },
        {
            "id": 117,
            "name": "why won't snapchat download on my phone",
            "slug": "why-wont-snapchat-download-on-my-phone",
            "value": "why won't snapchat download on my phone",
            "label": "why won't snapchat download on my phone"
        }
    ],
    "categories": [
        {
            "id": 1,
            "name": "Uncategorized",
            "slug": "uncategorized",
            "value": "Uncategorized",
            "label": "Uncategorized"
        },
        {
            "id": 2,
            "name": "Phone",
            "slug": "phone",
            "value": "Phone",
            "label": "Phone"
        }
    ],
    "comment_status": "open",
    "ping_status": "open",
    "featured_media": [
        {}
    ],
    "slug": "Elon-Musks-Huge-Twitter-Takeover-What-It-Means-For-You",
    "content": "<p><br></p><p>Twitter has always been a platform for social communication, but the recent twitter takeover deal by Elon Musk has raised eyebrows and questions. The twitter takeover deal is the sale of twitter to twitter employees and WELL capital for a price of $26 billion. This deal was met with skepticism from many users as it was not announced officially, and the sudden changes made to twitter have people worried. In this blog post, we will discuss the twitter takeover deal, how it will affect users, the changes that Elon Musk plans for twitter, and the controversy surrounding content moderation and high-profile account reinstatements.</p><p><br></p><h2>What is the Twitter takeover deal?</h2><p>Elon Musk's Twitter takeover has captured the world's attention. The goal of the deal is to promote his latest project - Neuralink Corporation - on Twitter. Some people are concerned that this could be a ploy to increase stock prices for Tesla and SpaceX, but others see it as an opportunity to learn more about one of the world's most innovative entrepreneurs. In the meantime, don't forget to check out the posts tagged #elonmusk on Twitter for all the latest news and updates on the Tesla and SpaceX CEO's latest venture.</p><p><br></p><h2>How will the Twitter takeover affect users?</h2><p>Twitter has always been a valuable communication tool for businesses and individuals alike. However, the CEO's takeover of the platform proves that the company is focusing on its users more than ever. In a recent interview, he said that he wants Twitter to be \"the best public platform in the world.\" This means that updates will be more frequent, and user feedback will be taken into account. This is a big move for the platform, as it shows that Twitter is committed to being a valuable communication tool for everyone. As a result of this, businesses can expect to see more engagement and interaction with their followers, as well as better visibility for their tweets. On a personal level, users will benefit from more timely updates and access to CEO musk's thoughts and ideas.</p><p><br></p><h3>Will old users who were banned be reinstated?</h3><p>As of September 7th, 2017, Elon Musk's Twitter account had over 33 million followers. This means that any old tweets he has posted will be coming across the platform more frequently - a fact which some people are concerned about. At this point it is yet to be confirmed whether or not your old tweets from when you were banned will still appear in search results. However, if they don't and you want them to reappear then the best way to achieve this is by contacting Twitter directly.</p><p><br></p><h2>What are the changes that Elon Musk plans for twitter in future?</h2><p>Twitter is changing - and not just in the sense that it's getting a new CEO. Formerly quiet CEO Elon Musk has announced plans to takeover the platform with new features that will make it more user-friendly. Among the changes being planned are simplifying the interface, increasing the speed of responses to tweets, and adding more transparency around company data sharing. This could mean a brighter future for social media platforms like Twitter, which means better opportunities for you as a customer. Be on the lookout for these changes, and don't be afraid to give Musk's new platform a try - you might just love it!</p><p><br></p><h2>Elon Musk has seized the memes of production</h2><p>Elon Musk is one of the most influential businessmen of our time. His insights on the business world and the tech world are invaluable, and his tweets about production are no exception. In case you haven't been watching, his latest tweets about the subject matter have taken over the internet. If you're interested in business or tech, you need to be following him. His insights are valuable, and will help you better understand the industry in which you work. The takeaway? Keep your eyes open for brilliant ideas from one of today's most influential businessmen.</p><p><br></p><h3>Is it real?</h3><p>There is no doubt that the takeover of Twitter by CEO Elon Musk has generated a lot of excitement and speculation. Some people are sceptical about whether it's actually real, but if it is, there are numerous implications for businesses and marketing. For example, this could mean more engagement with customers as social media becomes an even more powerful communication tool. Additionally, selling products/services in a new way - through storytelling instead of sales pitches - might become popular. What's more, anything is possible when it comes to what Mr Musk will announce next! So don't miss out on any updates - you never know who or what might be next!</p><p><br></p><h2>Second woman says Herschel Walker pressured her to have an abortion</h2><p>As social media reactions continue to pour in following reports that Herschel Walker pressured the first woman to have an abortion, it's important to be cautious about what you say online. Even if you think no one will see it, things can still get messy. This is why it's important to be careful about the words you use, the jokes you tell, and the opinions you express. With the second woman coming forward to share her story, it's clear that social media can be a dangerous place - especially for those who don't have the best reputation. So, be smart and think twice before posting anything online that could potentially damage your reputation or credibility.</p><p><br></p><h2>Content moderation and high-profile account reinstatement</h2><p>Twitter CEO Jack Dorsey reinstated Elon Musk's access to the platform last week after a series of tweetstorm. This is a huge win for Musk and shows that he can still reach a large audience on Twitter even if he doesn't follow traditional journalistic ethics. While this may be good news for Musk, it could also have negative consequences for other high-profile accounts that violate Twitter's rules. As social media users, it's important to be aware of these risks and act accordingly when considering whether or not to share an account on social media. If you're unsure about an account's credibility or whether it's worth sharing, reach out to friends and family for their opinion.</p><p><br></p><p><br></p><h3>Conclusion</h3><p>Twitter takeover deal by Elon Musk has everyone talking. The changes that he plans to make to the Twitter platform have the internet abuzz with speculation. Here's what you need to know: -The twitter takeover deal will give Elon Musk more control over the Twitter platform and its content. -This will allow him to make changes to the platform that will benefit users, such as increasing the speed of tweets and making it easier to tweet photos. -He has also announced plans to reintroduce content moderation and high-profile account reinstatement. While the second woman's story hasn't been verified, it has sparked a lot of conversation on social media.</p>"
}


*/

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
}) => {
  const wordPressInfo = useGlobalStore((state) => state.appState.wordPressInfo);

  return (
    <div className="flex flex-col gap-6 py-4 border-1 border-primary-900 w-full">
      <div className="flex justify-between items-center border-b-[1px] pb-4">
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
      <div className="flex justify-between items-center border-b-[1px] pb-4">
        <DropDown
          label="Visibility"
          currentState={visibility.label}
          onClickItem={(item) => setVisibility(item)}
          menuItems={visibilityArr}
          itemKey="label"
        />
        <DropDown
          label="Schedule"
          currentState={schedule}
          onClickItem={setSchedule}
          isTypeDate={true}
        />
      </div>
      <div className="flex flex-col justify-between gap-2 border-b-[1px] pb-4">
        <div className="text-bold text-sm font-semibold">Title</div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col justify-between gap-2  border-b-[1px] pb-4">
        <div className="text-bold text-sm font-semibold">Slug</div>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
        />
      </div>

      <div className="flex flex-col justify-between gap-2 border-b-[1px] pb-4">
        <div className="text-bold text-sm font-semibold">Featured Image</div>
        <label
          className="h-[200px] w-full bg-grey-100 p-4 rounded-md border-[1px] flex justify-center items-center text-lg text-grey-300 cursor-pointer"
          placeholder="Upload file"
        >
          <Input
            onChange={(e) => {
              console.log(e);
            }}
            placeholder="Upload Image"
            type={'file'}
            onClick={() => {}}
            hidden
          />
          Upload Image
        </label>
      </div>

      <div className="flex flex-col justify-between gap-2  border-b-[1px] pb-4">
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
      <div className="flex flex-col justify-between gap-2  border-b-[1px] pb-4">
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
      <div className="flex flex-col justify-between gap-2  border-b-[1px] pb-4">
        <div className="text-bold text-sm font-semibold">Discussion</div>
        <div className="flex items-center justify-between">
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

  const handleSubmit = async (code) => {
    let payload = {
      title,
      slug,
      author,
      tags,
      categories,
      comment_status: allowComment,
      ping_status: allowPingback,
      content: htmlContent,
      publish_type: 'posts',
      article_id: articleData.article_id,
      w_id: wordPressInfo.w_id,
      publish_status: code,
      featured_media: [{}],
    };
    try {
      const res = await publishArticle(payload);
    } catch (error) {
      console.log(error);
    }
  };
  return isOpen ? (
    <div className="flex flex-col p-4 bg-white shadow-lg h-full w-[600px] rounded-md gap-2 relative max-w-md">
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
          Publish or schedule article to WordPress directly from AutoRite.
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
        />
      </div>
      <div className="shadow-md text-grey w-full h-20 p-4 pr-[30px] absolute bottom-0 left-0 right-0 z-10 bg-grey-50 flex items-center justify-between">
        <Button
          variant={'outline'}
          className="min-w-[180px] py-4"
          onClick={() => handleSubmit(1)}
        >
          Draft
        </Button>
        <Button
          variant={'primary'}
          className="min-w-[180px] ] py-4"
          onClick={() => handleSubmit(2)}
        >
          Publish
        </Button>
      </div>
    </div>
  ) : null;
}

export default Publisher;
