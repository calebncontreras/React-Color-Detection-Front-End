import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <p className="f4 code --washed-blue bb w-third tc">
        {name} your score is {entries} entries.
      </p>
    </div>
  );
};

export default Rank;
