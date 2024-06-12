//import axios from "axios";

const state = {
  session: {
    id: "4711",
    votings: [
      {
        id: "1",
        title: "",
        description: "",
        imgUrl: "",
        votes: [
          {
            userId: "0815",
            vote: "5",
          },
        ],
      },
    ],
    users: [
      {
        id: "0815",
        name: "Heinz",
        imgUrl: "",
      },
    ],
  },
};

const mutations = {
  castVote(state, payload) {
    //state.products = payload;
    console.log(state);
    console.log(payload);
  },
};
const actions = {
  fetchVoting(context) {
    console.log(context);
    /*
    const token = context.rootState.auth.token;
    axios
      .get(
        `https://vue-3-shop-backend-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`
      )
      .then((response) => {
        const productsDO = [];
        for (const id in response.data) {
          productsDO.push({
            id: id,
            ...response.data[id],
          });
        }
        context.commit("setProducts", productsDO);
      })
      .catch((error) => {
        console.log(error);
      });*/
  },
};
const getters = {
  voting: (state) => state.voting,
  vote: (state) => (sessionId, votingId, userId) => {
    const session = state.session.find((session) => session.id === sessionId);
    return session.votings
      .find((v) => v.id === votingId)
      .find((vo) => vo.userId === userId);
  },
};

const votingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default votingModule;
