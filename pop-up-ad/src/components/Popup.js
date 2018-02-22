import React from 'react';

const Popup = props => {

  let artist = props.message;

  let handleExit = () => {
    confirm(`Are you sure you don't want to see ${artist}?`)
    console.log("Form Submitted");
    popup = "shit";
  }

  // let handleSubmit = () => {
  //   preventDefault();
  //   console.log("Form Submitted");
  // }


  let popup = `You have won tickets to see ${artist}` ;

  return(
    <div className="columns callout secondary">

      <div>
        <i onClick={handleExit} className="fa fa-times" aria-hidden="false"></i>
      </div>

      <div className="text-center">
        <h3>{popup}</h3>
        <p>Please enter your email so we can send you the tickets</p>
      </div>


      <div className="text-center">

        <form>

          <div>
            <div className="small-12 medium-6 large-9 columns">

              <input type="text" placeholder="Your email here"></input>

            </div>
            <div className="small-12 medium-6 large-3 columns">
              {/* <input type="submit" placeholder="CLAIM YOUR PRIZE"></input> */}
              <button onClick={e => {e.preventDefault(); console.log("HIHIHIHIHIHI");}} className="button">CLAIM YOUR PRIZE</button>
            </div>
          </div>

        </form>

      </div>

    </div>
  );
};

export default Popup;
