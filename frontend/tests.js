import React from 'react';
import About from './src/components/about/About.js';
import BookInstance from './src/components/instances/BookInstance.js';
import MovieInstance from './src/components/instances/MovieInstance.js';
import MusicInstance from './src/components/instances/MusicInstance.js';
import TopicInstance from './src/components/instances/TopicInstance.js';
import Model from './src/components/model/Model.js';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import {URLSearchParams} from 'url';

global.URLSearchParams = URLSearchParams

//Mocha Tests
describe('Test About Component', () => {
  const wrapper = shallow(<About />);
  it('exists', () => {
    expect(wrapper.find('.spacing-div').exists()).to.eql(true);
  });
});

describe('Test BookInstance Component', () => {
  const wrapper = shallow(<BookInstance match={{isExact: true, params: {id: "YiHHnV08ebkC"}, path: "/books/:id", url: "/books/YiHHnV08ebkC"}}/>);
  it('exists', () => {
    expect(wrapper.find('.spacing-div').exists()).to.eql(true);
  });
});

describe('Test MovieInstance Component', () => {
  const wrapper = shallow(<MovieInstance match={{isExact: true, params: {id: "300668"}, path: "/movies/:id", url: "/movies/300668"}}/>);
  it('exists', () => {
    expect(wrapper.find('.spacing-div').exists()).to.eql(true);
  });
});

describe('Test MusicInstance Component', () => {
  const wrapper = shallow(<MusicInstance match={{isExact: true, params: {id: "08YEGpKt2LHJ0URCXKHEie"}, path: "/music/:id", url: "/music/08YEGpKt2LHJ0URCXKHEie"}}/>);
  it('exists', () => {
    expect(wrapper.find('.spacing-div').exists()).to.eql(true);
  });
});

describe('Test Model Component', () => {
  const wrapper = mount(
      <BrowserRouter>
        <Model type="Movies"/>
      </BrowserRouter>,
    );
  
  it('exists', () => {
    expect(wrapper.find('.spacing-div-model').exists()).to.eql(true);
  });
});