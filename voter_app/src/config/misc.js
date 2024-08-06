export const SESSION_RELOAD_POLL_INTERVAL = 30 * 1000; // in msec

export const VOTINGMODES = {
  score: {
    ballotcomponent: "SlideVoteSelect",
    displaycomponent: "VoteDisplay",
    resultcomponent: "VoteAverage",
  },
  school_de: {
    ballotcomponent: "SchoolDeVoteSelect",
    displaycomponent: "GradeDisplay",
    resultcomponent: "VoteAverage",
  },
  school_de_noplusminus: {
    ballotcomponent: "SchoolDeNoPlusminusVoteSelect",
    displaycomponent: "GradeDisplay",
    resultcomponent: "VoteAverage",
  },
  school_us: {
    ballotcomponent: "SchoolUsVoteSelect",
    displaycomponent: "GradeUsDisplay",
    resultcomponent: "VoteAverage",
  },
  thumbs: {
    ballotcomponent: "ThumbsVoteSelect",
    displaycomponent: "ThumbsDisplay",
    resultcomponent: "ThumbsResult",
  },
};
