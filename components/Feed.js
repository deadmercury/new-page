import styles from '../styles/Feed.module.css';

// posts => {title, url, postURL}
export default function Feed({ data }) {
  return (
    <article className={styles.container}>
      <h1 className={styles.name}>{data.name}</h1>
      <div className={styles.posts}>
        {data.posts.map((post, i) => {
          post.url = new URL(post.url);
          return (
            <div className={styles.item} key={i}>
              <a
                className={styles.title}
                href={post.postURL}
                target="_blank"
                rel="noopener"
              >
                {post.title}
              </a>
              <a
                className={styles.url}
                href={post.url.href}
                target="_blank"
                rel="noopener"
              >
                ({post.url.hostname})
              </a>
            </div>
          );
        })}
      </div>
    </article>
  );
}
