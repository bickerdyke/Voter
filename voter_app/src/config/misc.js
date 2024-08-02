export const SESSION_RELOAD_POLL_INTERVAL = 45 * 1000; // in msec

export const VOTINGMODES = {
  score: {
    ballotcomponent: "SlideVoteSelect",
    displaycomponent: "VoteDisplay",
    resultcomponent: "",
  },
  school_de: {
    ballotcomponent: "SchoolDeVoteSelect",
    displaycomponent: "GradeDisplay",
    resultcomponent: "",
  },
  school_de_noplusminus: {
    ballotcomponent: "SchoolDeNoPlusminusVoteSelect",
    displaycomponent: "GradeDisplay",
    resultcomponent: "",
  },
  school_us: {
    ballotcomponent: "SchoolUsVoteSelect",
    displaycomponent: "GradeUsDisplay",
    resultcomponent: "",
  },
};
