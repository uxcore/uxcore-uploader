import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import React from 'react';
import Picker from '../src/Picker';
import File from './mocks/File';
import { Core, Status } from 'uploadcore';
import Dropzoom from '../src/Dropzoom';


Enzyme.configure({ adapter: new Adapter() });

describe('Dropzoom', () => {
  let core;
  let fileList;
  const downloadUrl = '//downloadUrl';
  const previewUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

  beforeEach(() => {
    core = new Core();
    ['a', 'b'].map((name) => {
      const file = new File(name);
      file.type = 'image/svg+xml';
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
      return file;
    }).forEach((file) => {
      core.add(file);
      file.setStatus(Status.PROGRESS);
    });
    fileList = [];
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Dropzoom
        locale={'en'}
        core={core}
        fileList={fileList}
      />
    );
    expect(wrapper.find('.kuma-upload-dropzoom').length).to.be(1);
  });

  it('should render the picker when completed', () => {
    const wrapper = mount(
      <Dropzoom
        locale={'en'}
        core={core}
        fileList={fileList}
      />
    );
    expect(wrapper.find(Picker).length).to.be(0);
    wrapper.setState({ total: 0 });
    expect(wrapper.find(Picker).length).to.be(1);
  });

  it('should handle stat change', () => {
    const wrapper = mount(
      <Dropzoom
        locale={'en'}
        core={core}
        fileList={fileList}
      />
    );
    expect(wrapper.state('total')).to.be(2);
    const file = new File('foo');
    file.type = 'image/svg+xml';
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
    core.add(file);
    file.setStatus(Status.PROGRESS);
    wrapper.update();
    expect(wrapper.state('total')).to.be(3);
  });

  it('should allow custom class name', () => {
    const wrapper = mount(
      <Dropzoom
        locale={'en'}
        core={core}
        fileList={fileList}
        className={'foo bar'}
      />
    );
    expect(wrapper.children().is('.foo.bar')).to.be(true);
  });

  describe('dnd events', () => {
    let wrapper;
    let node;
    let dndArea;

    beforeEach(() => {
      wrapper = mount(
        <Dropzoom
          locale={'en'}
          core={core}
          fileList={fileList}
        />
      );
      node = wrapper.getDOMNode();
      dndArea = wrapper.instance().dndArea;
    });

    it('should blink when dnd starts', () => {
      expect(wrapper.state('blink')).to.be(0);
      dndArea.emit('start');
      wrapper.update();
      expect(wrapper.state('blink')).to.be(1);
    });

    it('should highlight when dragged inside the area', () => {
      dndArea.emit('start');
      wrapper.update();
      expect(wrapper.state('highlight')).to.be(0);

      dndArea.emit('response', { target: node });
      wrapper.update();
      expect(wrapper.state('highlight')).to.be(1);
    });

    it('should not highlight when dragged outside the area', () => {
      dndArea.emit('start');
      wrapper.update();
      expect(wrapper.state('highlight')).to.be(0);

      dndArea.emit('response', { target: node.parentNode });
      wrapper.update();
      expect(wrapper.state('highlight')).to.be(0);
    });

    it('should reset when dnd ends', () => {
      dndArea.emit('start');
      dndArea.emit('response', { target: node });
      wrapper.update();
      expect(wrapper.state('blink')).to.be(1);
      expect(wrapper.state('highlight')).to.be(1);

      dndArea.emit('end');
      wrapper.update();
      expect(wrapper.state('blink')).to.be(0);
      expect(wrapper.state('highlight')).to.be(0);
    });
  });
});
