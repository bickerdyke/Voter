export const getters = {
  sessionIdStoreCurrent: (state) => state.session.id,

  session: (state) => state.session,

  vote: (state) => (sessionId, votingId, userId) => {
    if (!state.session || state.session.id !== sessionId) {
      console.error(`Incorrect session Id ${sessionId}`);
      return null;
    }
    const voting = state.session.votings.find((v) => v.id === votingId);

    if (!voting) {
      console.error(`Incorrect voting Id ${votingId} for session ${sessionId}`);
      return null;
    }

    if (!voting.votes || voting.votes.length == 0) {
      console.log(
        `No votes available for voting Id ${votingId} in session ${sessionId}`
      );
    }

    const vote = voting.votes.find((vo) => vo.userId === userId);
    return vote ? vote.vote : "";
  },

  voting: (state) => (sessionId, votingId) => {
    if (!state.session || state.session.id !== sessionId) {
      console.error(`Incorrect session Id ${sessionId}`);
      return null;
    }
    const voting = state.session.votings.find((v) => v.id === votingId);

    if (!voting) {
      console.error(`Incorrect voting Id ${votingId} for session ${sessionId}`);
      return null;
    }

    return voting;
  },
  votes: (_, getters) => (sessionId, votingId) => {
    const voting = getters.voting(sessionId, votingId);

    if (!voting) {
      return null;
    }

    if (!voting.votes || voting.votes.length == 0) {
      console.log(
        `No votes available for voting Id ${votingId} in session ${sessionId}`
      );
    }
    return voting.votes.map((v) => v.vote);
  },
};
