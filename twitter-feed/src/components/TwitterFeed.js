import React from 'react';
import Tweet from './Tweet';

const TwitterFeed = (props) => {

  let handleReply = () => {
    alert('Reply')
  };
  let handleRetweet = () => {
    alert('Retweet')
  };
  let handleFavorite = () => {
    alert('Favorite')
  };
  let handleMore = () => {
    alert('More')
  };

  let twitterData = props.data.map((data) => (
    <Tweet
      key={data.id_str}
      data={data}
      handleReply={handleReply}
      handleRetweet={handleRetweet}
      handleFavorite={handleFavorite}
      handleMore={handleMore}
    />
  ));

  return(
    <ul className="no-bullet">
      {twitterData}
    </ul>
  );


};


export default TwitterFeed;
