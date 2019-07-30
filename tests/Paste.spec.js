import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import Picker from '../src/Picker';
import Paste from '../src/Paste';
import { Core } from 'uploadcore';

Enzyme.configure({ adapter: new Adapter() });

describe('Paste', () => {
  let core;
  beforeEach(() => {
    core = new Core();
  });

  it('should render correctly when isPaste is not true', () => {
    const wrapper = mount(<Picker core={core} prefixCls={'kuma-upload'}><span className="foo" /></Picker>);
    const root = wrapper.children();
    expect(root.hasClass('kuma-upload-picker')).to.be(true);
    expect(root.children().hasClass('foo')).to.be(true);
  });

  it('should render correctly when isPaste is true', () => {
    const wrapper = mount(<Paste core={core} prefixCls={'kuma-upload'} isVisual><span className="foo" /></Paste>);
    const root = wrapper.children();
    expect(root.hasClass('kuma-upload-paste-section')).to.be(true);
    expect(root.children().first().hasClass('kuma-upload-paste-picker')).to.be(true);
    expect(root.children().at(1).hasClass('kuma-upload-paste-text')).to.be(true);
  });

  it('should add area when mounted', () => {
    sinon.spy(core.getPickerCollector(), 'addArea');
    const wrapper = mount(<Paste core={core} />);
    const { addArea } = core.getPasteCollector();
    expect(addArea.calledOnce).to.be(true);
    expect(addArea.calledWith(wrapper.getDOMNode())).to.be(true);
  });

  it('should destroy area when unmounted', () => {
    const wrapper = mount(<Paste core={core} />);
    const { area } = wrapper.instance();
    sinon.spy(area, 'destroy');
    wrapper.unmount();
    expect(area.destroy.calledOnce).to.be(true);
  });
});
