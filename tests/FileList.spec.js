import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import Album from 'uxcore-album';
import FileList from '../src/FileList';
import FileItem from '../src/FileItem';
import DefaultFileItem from '../src/DefaultFileItem';
import Picker from '../src/Picker';
import File from './mocks/File';
import { Core, Status } from 'uploadcore';


Enzyme.configure({ adapter: new Adapter() });

describe('FileList', () => {
  let core;
  let fileList;
  const removeFileFromList = () => {};
  const downloadUrl = '//downloadUrl';
  const previewUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

  beforeEach(() => {
    core = new Core({
      capcity: 3,
    });
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
    fileList = ['c', 'd', 'e'].map((name) => {
      const file = new File(name);
      file.response = {
        downloadUrl,
        previewUrl,
        name: 'bar',
      };
      file.type = 'image/svg+xml';
      return file;
    });
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <FileList
        locale={'en'}
        core={core}
        fileList={fileList}
        showErrFile={false}
        removeFileFromList={removeFileFromList}
      />
    );
    expect(wrapper.find('.kuma-upload-filelist').length).to.be(1);
    expect(wrapper.find(DefaultFileItem).length).to.be(3);
    expect(wrapper.find(FileItem).length).to.be(2);
  });

  it('should handle stat change', () => {
    const wrapper = mount(
      <FileList
        locale={'en'}
        core={core}
        fileList={fileList}
        showErrFile={false}
        removeFileFromList={removeFileFromList}
      />
    );
    expect(wrapper.find(FileItem).length).to.be(2);
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
    expect(wrapper.find(FileItem).length).to.be(3);
  });

  it('should render Picker when isVisual', () => {
    const wrapper = mount(
      <FileList
        locale={'en'}
        core={core}
        fileList={fileList}
        showErrFile={false}
        removeFileFromList={removeFileFromList}
      />
    );
    const getPicker = () => wrapper.find('.inner').children().filter(Picker);
    expect(getPicker().length).to.be(0);
    // picker是children，外部的变量
    wrapper.setProps({ isVisual: true });
    expect(getPicker().length).to.be(0);
  });

  it('should use Album.show to preview when isOnlyImg is true', () => {
    sinon.spy(Album, 'show');
    const wrapper = mount(
      <FileList
        locale={'en'}
        core={core}
        fileList={fileList}
        showErrFile={false}
        removeFileFromList={removeFileFromList}
        isOnlyImg
        mode={'nw'}
      />
    );
    wrapper.find(DefaultFileItem).find('.preview-action').at(0).simulate('click');
    expect(Album.show.calledOnce).to.be(true);
  });
});
