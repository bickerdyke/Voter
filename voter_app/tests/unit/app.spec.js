import { expect } from "chai";
//import { shallowMount } from "@vue/test-utils";
//import App from "@/App.vue";

describe("App.vue", () => {
  it("initializes the testing framework", () => {
    expect(true).to.be.true;
  });
  /*it("includes animate css", () => {
    const wrapper = shallowMount(App, {});
    expect(wrapper.text()).to.include(
      '@import "~animate.css / animate.min.css";'
    );
  });*/
  // läuft noch nicht da zuerst noch ein Mock-Store mit Mock-Gettern aufgesetzt erweden muss
  // https://stackoverflow.com/questions/56385464/how-to-access-namespaced-vuex-getters-in-mocha-unit-test
});
