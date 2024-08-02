export const SESSION_RELOAD_POLL_INTERVAL = 45 * 1000; // in msec

export const VOTINGMODES = {
  score: {
    ballotcomponent: "SlideVoteSelect",
    displaycomponent: "",
    resultcomponent: "",
  },
  school_de: {
    ballotcomponent: "SchoolDeVoteSelect",
    displaycomponent: "",
    resultcomponent: "",
  },
  school_de_noplusminus: {
    ballotcomponent: "SchoolDeNoPlusminusVoteSelect",
    displaycomponent: "",
    resultcomponent: "",
  },
  school_us: {
    ballotcomponent: "SchoolUsVoteSelect",
    displaycomponent: "",
    resultcomponent: "",
  },
};
