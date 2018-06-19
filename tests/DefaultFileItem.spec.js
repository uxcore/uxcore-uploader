import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import DefaultFileItem from '../src/DefaultFileItem';
import File from './mocks/File';

Enzyme.configure({ adapter: new Adapter() });

describe('DefaultFileItem', () => {
  let file;
  let onCancel;
  let onShowFile;
  const downloadUrl = '//downloadUrl';
  const previewUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

  beforeEach(() => {
    file = new File('foo');
    onCancel = sinon.spy();
    onShowFile = sinon.spy();
    file.response = {
      downloadUrl,
      previewUrl,
      name: 'bar',
    };
  });

  describe('icon mode', () => {
    it('should render correctly', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'icon'} onCancel={onCancel} />
      );
      expect(wrapper.find('.remove-action').length).to.be(1);
      expect(wrapper.find('img').is({ src: previewUrl })).to.be(true);
      expect(wrapper.find('.filename').text()).to.be('bar');
    });
  });

  describe('nw mode', () => {
    it('should render correctly', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'nw'} onCancel={onCancel} />
      );
      expect(wrapper.find('.filename').text()).to.be(file.name);
    });

    it('should not allow download when readOnly is true', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'nw'} onCancel={onCancel} />
      );
      expect(wrapper.find('.download-action').length).to.be(1);
      wrapper.setProps({ readOnly: true });
      expect(wrapper.find('.download-action').length).to.be(0);
    });

    it('should allow callback when click on the preview area', () => {
      const wrapper = mount(
        <DefaultFileItem
          locale={'en'}
          file={file}
          mode={'nw'}
          onCancel={onCancel}
          onShowFile={onShowFile}
        />
      );
      wrapper.find('.preview-action').simulate('click');
      wrapper.update();
      expect(onShowFile.calledOnce).to.be(true);
      expect(onShowFile.calledWith(file, previewUrl)).to.be(true);
    });

    it('should allow cancel', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'nw'} onCancel={onCancel} />
      );
      wrapper.find('.remove-action').simulate('click');
      expect(onCancel.calledOnce).to.be(true);
      expect(onCancel.calledWith(file)).to.be(true);
    });

    it('should not allow cancel if readOnly is true', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'nw'} onCancel={onCancel} />
      );
      expect(wrapper.find('.remove-action').length).to.be(1);
      wrapper.setProps({ readOnly: true });
      expect(wrapper.find('.remove-action').length).to.be(0);
    });

    it('should render correctly when isOnlyImg is true and isVisual is true', () => {
      const wrapper = mount(
        <DefaultFileItem
          locale={'en'}
          file={file}
          mode={'nw'}
          onCancel={onCancel}
          isOnlyImg
          isVisual
        />
      );
      expect(wrapper.find('.download-action').length).to.be(0);
      expect(wrapper.find('.field-image-name').length).to.be(0);
    });

    it('should render correctly when isOnlyImg is true and isVisual is false', () => {
      const wrapper = mount(
        <DefaultFileItem locale={'en'} file={file} mode={'nw'} onCancel={onCancel} isOnlyImg />)
      ;
      expect(wrapper.find('.download-action').length).to.be(1);
      expect(wrapper.find('.field-image-name').length).to.be(1);
    });
  });

  describe('other modes', () => {
    it('should render correctly', () => {
      file.ext = 'png';
      file.fileType = 'image';
      const wrapper = mount(<DefaultFileItem locale={'en'} file={file} mode={'foo'} />);
      expect(wrapper.find('.kuma-upload-fileicon').is({
        'data-ext': 'png',
        'data-type': 'image',
      })).to.be(true);
      expect(wrapper.find('.filename').text()).to.be(file.response.name);
      expect(wrapper.find('.remove-action').length).to.be(1);
    });

    it('should not allow cancel when readOnly is true', () => {
      file.ext = 'png';
      file.fileType = 'image';
      const wrapper = mount(<DefaultFileItem locale={'en'} file={file} mode={'foo'} readOnly />);
      expect(wrapper.find('.remove-action').length).to.be(0);
    });
  });
});
