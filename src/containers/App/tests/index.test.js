/*eslint no-unused-vars: "off"*/
import React from "react";
import { shallow, mount } from "enzyme";
import App from "../index";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
   shallow(<App />);
});

it("renders welcome message", () => {
   const wrapper = mount(<App />);
   const welcome = <span locale="en">Welcome to the dashboard</span>;
   expect(wrapper.contains(welcome)).toEqual(true);
});
