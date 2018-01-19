import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import React from 'react';
import Picker from '../src/Picker';
import { Core } from 'uploadcore';
import Icon from 'uxcore-icon';

Enzyme.configure({ adapter: new Adapter() });

describe('Picker', () => {
  let core;
  beforeEach(() => {
    core = new Core();
  });

  it('should render correctly when isVisual is not true', () => {
    const wrapper = mount(<Picker core={core}><span className="foo" /></Picker>);
    const root = wrapper.children();
    expect(root.hasClass('kuma-upload-picker')).to.be(true);
    expect(root.children().hasClass('foo')).to.be(true);
  });

  it('should render correctly when isVisual is true', () => {
    const wrapper = mount(<Picker core={core} isVisual><span className="foo" /></Picker>);
    const root = wrapper.children();
    expect(root.hasClass('kuma-upload-picker-visual')).to.be(true);
    expect(root.children().first().hasClass('foo')).to.be(true);
    expect(root.children().at(1).is(Icon)).to.be(true);
  });

  it('should add area when mounted', () => {
    sinon.spy(core.getPickerCollector(), 'addArea');
    const wrapper = mount(<Picker core={core} />);
    const { addArea } = core.getPickerCollector();
    expect(addArea.calledOnce).to.be(true);
    expect(addArea.calledWith(wrapper.getDOMNode())).to.be(true);
  });

  it('should destroy area when unmounted', () => {
    const wrapper = mount(<Picker core={core} />);
    const { area } = wrapper.instance();
    sinon.spy(area, 'destroy');
    wrapper.unmount();
    expect(area.destroy.calledOnce).to.be(true);
  });
});
