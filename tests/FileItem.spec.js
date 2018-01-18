import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import React from 'react';
import FileItem from '../src/FileItem';
import Progress from '../src/Progress';
import File from './mocks/File';

Enzyme.configure({ adapter: new Adapter() });

describe('FileItem', () => {
  let file;

  beforeEach(() => {
    file = new File('foo');
    sinon.spy(file, 'pending');
    sinon.spy(file, 'cancel');
  });

  it('should set url correctly if file is an image', (done) => {
    const url = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';
    file.url = url;
    file.setType('image/svg+xml');
    const wrapper = mount(<FileItem locale={'en'} file={file} />);
    setTimeout(() => {
      expect(wrapper.state().url).to.be(url);
      done();
    }, 50);
  });

  it('should handle file status change', () => {
    const wrapper = mount(<FileItem locale={'en'} file={file} />);
    file.setStatus('error');
    const state = wrapper.state();
    expect(state.status).to.be(file.getStatusName());
    expect(state.percentage).to.be(0);
  });

  it('should handle file progress change', () => {
    const wrapper = mount(<FileItem locale={'en'} file={file} />);
    file.setProgress(50);
    const state = wrapper.state();
    expect(state.percentage).to.be(50);
  });

  describe('icon mode', () => {
    it('should render correctly', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      expect(wrapper.find('.action-remove').length).to.be(1);
      expect(wrapper.find('.filepreview').length).to.be(1);
      expect(wrapper.find('.filename').length).to.be(1);
    });

    it('should allow cancel', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.find('.action-remove').simulate('click');
      expect(file.cancel.calledOnce).to.be(true);
    });

    it('should allow retry', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'error' });
      wrapper.find('.action-retry').simulate('click');
      expect(file.pending.calledOnce).to.be(true);
    });

    it('should render correctly when status is error', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'error' });
      expect(wrapper.find('.action-retry').length).to.be(1);
      expect(wrapper.find('.action-upload').length).to.be(0);
      expect(wrapper.find(Progress).length).to.be(0);
      expect(wrapper.find('.status-success').length).to.be(0);
      expect(wrapper.find('.status-error').length).to.be(2);
    });

    it('should render correctly when status is success', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'success' });
      expect(wrapper.find('.action-retry').length).to.be(0);
      expect(wrapper.find('.action-upload').length).to.be(0);
      expect(wrapper.find(Progress).length).to.be(0);
      expect(wrapper.find('.status-success').length).to.be(2);
      expect(wrapper.find('.status-error').length).to.be(0);
    });

    it('should render correctly when status is queued', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'queued' });
      expect(wrapper.find('.action-retry').length).to.be(0);
      expect(wrapper.find('.action-upload').length).to.be(1);
      expect(wrapper.find(Progress).length).to.be(0);
      expect(wrapper.find('.status-success').length).to.be(0);
      expect(wrapper.find('.status-error').length).to.be(0);
    });

    it('should render correctly when status is progress or pending', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'progress' });
      expect(wrapper.find('.action-retry').length).to.be(0);
      expect(wrapper.find('.action-upload').length).to.be(0);
      expect(wrapper.find(Progress).length).to.be(1);
      expect(wrapper.find('.status-success').length).to.be(0);
      expect(wrapper.find('.status-error').length).to.be(0);

      wrapper.setState({ status: 'pending' });
      expect(wrapper.find('.action-retry').length).to.be(0);
      expect(wrapper.find('.action-upload').length).to.be(0);
      expect(wrapper.find(Progress).length).to.be(1);
      expect(wrapper.find('.status-success').length).to.be(0);
      expect(wrapper.find('.status-error').length).to.be(0);
    });

    it('should render correctly when status is something else', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'icon'} />);
      wrapper.setState({ status: 'foo' });
      expect(wrapper.find('.action-retry').length).to.be(0);
      expect(wrapper.find('.action-upload').length).to.be(0);
      expect(wrapper.find(Progress).length).to.be(0);
      expect(wrapper.find('.status-success').length).to.be(0);
      expect(wrapper.find('.status-error').length).to.be(0);
    });
  });

  describe('nw mode', () => {
    it('should render correctly', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'nw'} />);
      expect(wrapper.find('.kuma-upload-fileitem').length).to.be(1);
    });

    it('should render correctly when isOnlyImg is true', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'nw'} isOnlyImg />);
      expect(wrapper.find('.field-image-info').length).to.be(1);
    });

    it('should render correctly when isOnlyImg is true and isVisual is true', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'nw'} isOnlyImg isVisual />);
      expect(wrapper.find(Progress).is({ isVisual: true })).to.be(true);
    });

    it('should render the correct link for download and preview when status is success', () => {
      const downloadUrl = '//downloadUrl';
      const previewUrl = '//previewUrl';
      file.response = {
        getJson() {
          return {
            content: {
              downloadUrl,
              previewUrl,
            },
          };
        },
      };
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'nw'} />);
      file.setStatus('success');
      wrapper.update();
      expect(wrapper.find({ href: downloadUrl }).length).to.be(1);
      expect(wrapper.find({ href: previewUrl }).length).to.be(1);
    });
  });

  describe('other modes', () => {
    it('should render correctly', () => {
      const wrapper = mount(<FileItem locale={'en'} file={file} mode={'foo'} />);
      expect(wrapper.find('.kuma-upload-fileitem').length).to.be(1);
    });
  });
});
