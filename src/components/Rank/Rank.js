import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="center">
      <p className=" pa3 f4 code --washed-blue bb">
        {name} your score is {entries}.
      </p>
    </div>
  );
};

export default Rank;
