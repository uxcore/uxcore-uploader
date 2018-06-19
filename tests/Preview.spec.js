import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Preview from '../src/Preview';
import File from './mocks/File';

Enzyme.configure({ adapter: new Adapter() });

describe('Preview', () => {
  it('should render correctly for images', (done) => {
    const src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';
    const file = new File();
    file.url = src;
    file.type = 'image/svg+xml';
    file.ext = 'svg';
    const wrapper = mount(<Preview file={file} />);
    setTimeout(() => {
      const img = wrapper.update().find('img');
      expect(img.is({ src })).to.be(true);
      done();
    }, 100);
  });

  it('should render correctly for non-images', () => {
    const file = new File();
    file.ext = 'json';
    file.type = 'application/json';
    const wrapper = mount(<Preview file={file} />);
    const i = wrapper.find('i');
    expect(i.is({
      className: 'kuma-upload-fileicon',
      'data-ext': file.ext,
      'data-type': file.type,
    })).to.be(true);
  });
});
