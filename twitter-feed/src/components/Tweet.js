import React from 'react';

const Tweet = (props) => {

  let dateObj = new Date(+(props.data.timestamp_ms));
  let month = dateObj.toLocaleString("en-us", { month:"short" });
  let date = `${month} ${dateObj.getDate()}`

  //Color for retweets
  let retweetColor = null;
  if (props.data.retweeted) {
    retweetColor = "green"
  }

  //Color for Favorited
  let favoriteColor = null;
  if (props.data.favorited) {
    favoriteColor = "red"
  }


  let isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  let media = null;
  let tweetText = props.data.text;
  if (!(isEmpty(props.data.entities))) {
    props.data.entities.media.map(url => {
      tweetText = props.data.text.replace(url.display_url,"")
      return(
        media = <img src={url.media_url}></img>
      )
    });

  }

  return(
    <li className="callout secondary row">
      <div className="medium-2 columns text-center">
        <img src={props.data.user.profile_image_url} alt="Picture of User"></img>
      </div>

      <div className="medium-10 columns">
        <div>
          <span>{props.data.user.name}</span>
          <span className="grey">@{props.data.user.screen_name} · {date}</span>
        </div>

        <div>
          {tweetText}
        </div>

        <div>
          {media}
        </div>

        <div className="text-left">
          <button type="button" onClick={props.handleReply}><i className="fa fa-reply" aria-hidden="true"></i></button>
          <button className={retweetColor} type="button" onClick={props.handleRetweet}><i className="fa fa-retweet" aria-hidden="true"></i>{props.data.retweet_count}</button>
          <button className={favoriteColor} type="button" onClick={props.handleFavorite}><i className="fa fa-heart" aria-hidden="true"></i>{props.data.favorite_count}</button>
          <button type="button" onClick={props.handleMore}><i className="fa fa-ellipsis-h" aria-hidden="true"></i></button>
        </div>

      </div>

    </li>

  );



};



export default Tweet;
