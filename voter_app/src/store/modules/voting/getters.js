export const getters = {
  currentSessionId: (state) => state.currentSessionId,
  currentSessionData: (state) => state.currentSessionData,
  isSessionLoaded: (state) => {
    const status =
      state.loadComplete &&
      state.currentSessionId &&
      state.currentSessionData &&
      state.currentSessionData.votings;
    return status;
  },

  voting: (state) => (votingId) => {
    const { [votingId]: voting } = state.currentSessionData.votings;

    if (!voting) {
      console.error(`Incorrect voting Id ${votingId}`);
      return null;
    }

    return {
      ...voting,
      id: votingId,
    };
  },

  votes: (_, getters) => (votingId) => {
    const voting = getters.voting(votingId);

    if (!voting) {
      return null;
    }

    if (!voting.votes || Object.keys(voting.votes).length == 0) {
      console.log(`No votes available for voting Id ${votingId}`);
      return null;
    }
    const voteValues = [];
    for (var key in voting.votes) {
      voteValues.push(voting.votes[key].vote);
    }

    return voteValues;
  },

  vote: (_, getters) => (votingId, userId) => {
    const voting = getters.voting(votingId);

    if (!voting) {
      return null;
    }

    if (!voting.votes || Object.keys(voting.votes).length == 0) {
      console.log(`No votes available for voting Id ${votingId}`);
      return null;
    }

    return voting.votes[userId] ? voting.votes[userId].vote : null;
  },
};
