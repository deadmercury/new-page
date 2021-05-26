import Head from 'next/head';
import Feed from '../components/Feed';
import SearchBar from '../components/SearchBar';
import Weather from '../components/Weather';
import styles from '../styles/index.module.css';

export default function Index({ hnPosts, time, redditPosts, weather }) {
  console.log(`Last Updated at ${time}`);
  return (
    <>
      <Head>
        <title>New tab</title>
        <meta name="description" content="Custom new tab page" />
      </Head>
      <main className={styles.main}>
        <Weather weather={weather} />
        <SearchBar />
        <div className={styles.feed}>
          <Feed data={hnPosts} />
          <Feed data={redditPosts} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const time = new Date().toLocaleTimeString('en-in', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  const filterObject = (object, properties) => {
    return Object.keys(object)
      .filter((key) => properties.includes(key))
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
  };

  const fetchHN = async () => {
    const data = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    ); //returns array of top post story ids
    let posts = [];
    const postId = (await data.json()).slice(0, 10);
    for (let i = 0; i < postId.length; ++i) {
      const postData = await (
        await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${postId[i]}.json`
        )
      ).json();
      posts = posts.concat(postData);
    }
    const name = 'Hacker News';
    const properties = ['title', 'url', 'postURL'];
    posts = posts.map((post) => {
      post.postURL = `https://news.ycombinator.com/item?id=${post['id']}`;
      return filterObject(post, properties);
    });
    return { name, posts };
  };

  const fetchReddit = async () => {
    // list of subreddits. one is chosen at random.
    const subreddits = [
      'piracy',
      'crackwatch',
      'showerthoughts',
      'askreddit',
      'nostupidquestions',
      'cricket',
      'pune',
      'webdev',
      'web_design',
    ];
    const data = await (
      await fetch(
        `https://www.reddit.com/r/${
          subreddits[Math.round(Math.random() * subreddits.length)]
        }.json`
      )
    ).json();
    // reddit api is bloated
    let posts = data.data.children.map((child) => child.data);
    // filter out stickied posts
    posts = posts.filter((post) => !post.stickied);
    // take out first 10 posts
    posts = posts.slice(0, 10);
    // list of interested properties
    const properties = ['url', 'title', 'postURL'];
    // name of subreddit
    const name = posts[0]['subreddit'];
    // clean jsondata
    posts = posts.map((post) => {
      post.postURL = `https:reddit.com${post['permalink']}`;
      return filterObject(post, properties);
    });
    return { name, posts };
  };

  const fetchWeather = async () => {
    const key = process.env.OWP_API;
    const city = 'pune';
    const data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      )
    ).json();
    const properties = ['weather', 'main'];
    const weather = filterObject(data, properties);
    return weather;
  };

  const hnPosts = await fetchHN();
  const redditPosts = await fetchReddit();
  const weather = await fetchWeather();
  return {
    props: {
      hnPosts,
      redditPosts,
      weather,
      time,
    },
    revalidate: 1800,
  };
}
