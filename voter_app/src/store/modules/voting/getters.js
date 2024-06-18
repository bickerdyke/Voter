export const getters = {
  currentSessionId: (state) => state.currentSessionId,
  currentSessionData: (state) => state.currentSessionData,
  isSessionLoaded: (state) => {
    return (
      state.currentSessionId &&
      state.currentSessionData &&
      state.currentSessionId === state.currentSessionData.id
    );
  },

  voting: (state) => (votingId) => {
    const voting = state.currentSessionData.votings.find(
      (v) => v.id === votingId
    );

    if (!voting) {
      console.error(`Incorrect voting Id ${votingId}`);
      return null;
    }

    return voting;
  },

  votes: (_, getters) => (votingId) => {
    const voting = getters.voting(votingId);

    if (!voting) {
      return null;
    }

    if (!voting.votes || voting.votes.length == 0) {
      console.log(`No votes available for voting Id ${votingId}`);
      return null;
    }
    return voting.votes.map((v) => v.vote);
  },

  vote: (_, getters) => (votingId, userId) => {
    const voting = getters.voting(votingId);

    if (!voting) {
      return null;
    }

    if (!voting.votes || voting.votes.length == 0) {
      console.log(`No votes available for voting Id ${votingId}`);
      return null;
    }

    const vote = voting.votes.find((vo) => vo.userId === userId);
    return vote ? vote.vote : "";
  },
};
