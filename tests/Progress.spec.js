import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import React from 'react';
import Progress from '../src/Progress';
import { Line } from 'uxcore-progress';
import File from './mocks/File';

Enzyme.configure({ adapter: new Adapter() });

describe('Progress', () => {
  let file;

  beforeEach(() => {
    file = new File();
  });

  it('should handle progress change', () => {
    const wrapper = mount(<Progress file={file} />);
    file.setProgress(50);
    expect(wrapper.state('percentage')).to.be(50);
  });

  describe('visual mode', () => {
    let onCancel;
    let onPending;

    beforeEach(() => {
      onCancel = sinon.spy();
      onPending = sinon.spy();
    });

    it('should render correctly', () => {
      const wrapper = mount(<Progress isVisual file={file} onCancel={onCancel} />);
      wrapper.setState({ percentage: 10 });
      expect(wrapper.children().hasClass('visual-progress-box')).to.be(true);
      expect(wrapper.find(Line).is({ percent: 10 })).to.be(true);
      expect(wrapper.find('.delete-progress').length).to.be(1);
    });

    it('should allow cancel', () => {
      const wrapper = mount(<Progress isVisual file={file} onCancel={onCancel} />);
      wrapper.find('.delete-progress').simulate('click');
      expect(onCancel.calledOnce).to.be(true);
    });

    it('should support error status', () => {
      const wrapper = mount(
        <Progress isVisual file={file} status={'error'} onCancel={onCancel} onPending={onPending} />
      );
      expect(wrapper.find('.re-upload').length).to.be(1);
    });

    it('should allow retry when in error status', () => {
      const wrapper = mount(
        <Progress isVisual file={file} status={'error'} onCancel={onCancel} onPending={onPending} />
      );
      wrapper.find('.re-upload').simulate('click');
      expect(onPending.calledOnce).to.be(true);
    });
  });

  describe('non visual mode', () => {
    it('should render correctly', () => {
      const wrapper = mount(<Progress file={file} />);
      expect(wrapper.children().hasClass('progress-box')).to.be(true);
    });
  });
});
