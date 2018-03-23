import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'isomorphic-fetch';

Enzyme.configure({adapter: new Adapter()});

import About from '../src/components/about/About.js';
import BookInstance from '../src/components/book/BookInstance.js';
import MovieInstance from '../src/components/movie/MovieInstance.js';
import MusicInstance from '../src/components/music/MusicInstance.js';
import TopicInstance from '../src/components/topic/TopicInstance.js';
import Model from '../src/components/model/Model.js';

//Mocha Tests
describe('Test About Component', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<About />);
    it('exists', () => {
      expect(wrapper.find('#about').exists()).to.eql(true);
    });
});

describe('Test BookInstance Component', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<BookInstance />);
    it('exists', () => {
      expect(wrapper.find('#bookInstance').exists()).to.eql(true);
    });
});

describe('Test MovieInstance Component', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<MovieInstance />);
    it('exists', () => {
      expect(wrapper.find('#movieInstance').exists()).to.eql(true);
    });
});

describe('Test MusicInstance Component', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<MusicInstance />);
    it('exists', () => {
      expect(wrapper.find('#musicInstance').exists()).to.eql(true);
    });
});

describe('Test Model Component', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<Model />);
    it('exists', () => {
      expect(wrapper.find('#model').exists()).to.eql(true);
    });
});