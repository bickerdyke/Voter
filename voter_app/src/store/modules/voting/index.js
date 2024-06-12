//import axios from "axios";

const state = {
  session: {
    id: "4711",
    title: "Testing-Session",
    subtitle: "Testing-Session vom 11.11.2011",
    description: `Anwesend waren alle stimmberechtigten Personen. lorem Ipsum und so weiter...
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
       dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
       Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
       Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut 
       labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
       Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
    imgUrl: "https://picsum.photos/300",
    //imgUrl: "",
    votings: [
      {
        id: "1",
        title: "Test-Subjekt 1",
        description: `Lorem Ipsum und so weiter...
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
        imgUrl: "https://picsum.photos/350",
        votes: [
          {
            userId: "0815",
            vote: "1",
          },
          {
            userId: "0816",
            vote: "2",
          },
          {
            userId: "jl7as",
            vote: "4",
          },
          {
            userId: "abc",
            vote: "3",
          },
        ],
      },
      {
        id: "2",
        title:
          "testdings mit sehr langen Namen der vielleicht umbrechen sollte",
        description: "hier nur kurzer Text",
        imgUrl: "https://picsum.photos/50/90",
        votes: [
          {
            userId: "0815",
            vote: "1",
          },
          {
            userId: "0816",
            vote: "2",
          },
          {
            userId: "abc",
            vote: "3",
          },
        ],
      },
      {
        id: "A",
        title: "Test 3",
        description: "",
        imgUrl: "https://placeholder.com/50/100",
        votes: [
          {
            userId: "0816",
            vote: "2",
          },
          {
            userId: "jl7as",
            vote: "4",
          },
          {
            userId: "abc",
            vote: "3",
          },
        ],
      },
      {
        id: "z87b324",
        title: "was geheimnisvolles",
        description: "",
        imgUrl: "",
        votes: [],
      },
    ],
    users: [
      {
        id: "0815",
        name: "Heinz",
        email: "heinz@foobar.invalid",
        imgUrl: "https://picsum.photos/200",
      },
      {
        id: "0816",
        name: "Herbert",
        email: "herbert@foobar.invalid",
        imgUrl: "https://picsum.photos/100/200",
      },
      {
        id: "abc",
        name: "Marcel",
        email: "bickerdyke@gmail.com",
        imgUrl: "",
      },
      {
        id: "jl7as",
        name: "Gustav",
        email: "heinz@invalid.com",
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
  session: (state) => state.session,
  sessionIdStoreCurrent: (state) => state.session.id,
  vote: (state) => (sessionId, votingId, userId) => {
    const vote = state.session.votings
      .find((v) => v.id === votingId)
      .votes.find((vo) => vo.userId === userId);
    return vote ? vote.vote : "";
  },
};

const votingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default votingModule;
