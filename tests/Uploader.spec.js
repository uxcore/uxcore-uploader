import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import React from 'react';
import Picker from '../src/Picker';
import File from './mocks/File';
import { Core, Status, Events } from 'uploadcore';
import Uploader from '../src';
import DefaultFileItem from '../src/DefaultFileItem';

Enzyme.configure({ adapter: new Adapter() });

describe('Uploader', () => {
  let handleChange;
  let fileList;
  let core;
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
    handleChange = sinon.spy();
    fileList = [
      {
        name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
        fileType: 'image/jpeg',
        type: 'upload',
        response: {
          success: true,
          data: {
            url: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png',
            canRemove: true, // 是否可以删除，可选
            downloadUrl: 'http://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png', // 下载 URL，可选
          },
        },
      }, {
        ext: 'jpg',
        name: 'TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
        size: 16387,
        fileType: 'image/jpeg',
        type: 'upload',
        response: {
          success: true,
          data: {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg',
            canRemove: true, // 是否可以删除，可选
            downloadUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502095774427&di=3897e137b04c575ac0f6e84c51e3bb46&imgtype=0&src=http%3A%2F%2Fs3.lvjs.com.cn%2Ftrip%2Foriginal%2F20140818131532_2090993967.jpg', // 下载 URL，可选
          },
        },
      },

    ];
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
      />
    );
    expect(wrapper.children().hasClass('kuma-uploader')).to.be(true);
  });

  it('should render disabled', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        disabled
      />
    );
    expect(wrapper.children().hasClass('kuma-uploader')).to.be(true);
  });

  it('should not render picker and tips when readOnly is true', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
      />
    );
    expect(wrapper.find(Picker).length).to.be(1);
    expect(wrapper.find('.kuma-upload-tip').length).to.be(1);

    wrapper.setProps({ readOnly: true });
    expect(wrapper.find(Picker).length).to.be(0);
    expect(wrapper.find('.kuma-upload-tip').length).to.be(0);
  });

  it('should handle stat change', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
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

  it('should rerender when file upload starts', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
      />
    );
    const instance = wrapper.instance();
    sinon.spy(instance, 'render');
    const file = core.getFiles()[0];
    file.setStatus(Status.PROGRESS);
    core.emit(Events.FILE_UPLOAD_START, file);
    expect(instance.render.calledOnce).to.be(true);
  });

  it('should call onChange when file upload succeeds', () => {
    mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
        actionOnQueueLimit={'cover'}
      />
    );
    const file = core.getFiles()[0];
    file.setStatus(Status.SUCCESS);
    core.emit(Events.FILE_UPLOAD_SUCCESS, file);
    expect(handleChange.calledOnce).to.be(true);
  });

  it('should call onChange when file upload is cancelled', () => {
    mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
      />
    );
    const file = core.getFiles()[0];
    file.setStatus(Status.CANCELLED);
    core.emit(Events.FILE_CANCEL, file);
    expect(handleChange.calledOnce).to.be(true);
  });

  it('should allow cancel', () => {
    const handleCancel = sinon.spy();
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
        onCancel={handleCancel}
      />
    );
    wrapper.find(DefaultFileItem).at(0).find('.remove-action').simulate('click');
    expect(handleCancel.calledOnce).to.be(true);
  });

  it('should prevent duplication', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        preventDuplicate
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
      />
    );
    const addable = new File('foo');
    addable.type = 'image/svg+xml';
    addable.response = {
      getJson() {
        return {
          content: {
            downloadUrl,
            previewUrl,
          },
        };
      },
    };
    core.add(addable);
    addable.setStatus(Status.PROGRESS);
    wrapper.update();
    expect(wrapper.state('total')).to.be(3);

    const unaddable = new File(fileList[0].name);
    unaddable.type = 'upload';
    unaddable.size = fileList[0].size;
    unaddable.response = {
      getJson() {
        return {
          content: {
            downloadUrl,
            previewUrl,
          },
        };
      },
    };
    core.add(unaddable);
    unaddable.setStatus(Status.PROGRESS);
    wrapper.update();
    expect(wrapper.state('total')).to.be(3);
  });

  it('should stop listen when unmounted', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
      />
    );
    const instance = wrapper.instance();
    wrapper.unmount();
    // Spies must be created after unmount,
    // or listeners can not be removed.
    sinon.spy(instance, 'statchange');
    sinon.spy(instance, 'fileuploadsuccess');
    sinon.spy(instance, 'filecancel');
    core.emit(Events.QUEUE_STAT_CHANGE);
    core.emit(Events.FILE_UPLOAD_SUCCESS);
    core.emit(Events.FILE_CANCEL);
    expect(instance.statchange.notCalled).to.be(true);
    expect(instance.fileuploadsuccess.notCalled).to.be(true);
    expect(instance.filecancel.notCalled).to.be(true);
  });

  // Todo: remove this when getCore and reset are removed since they're not used
  it('should improve coverage', () => {
    const wrapper = mount(
      <Uploader
        autoPending
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        isOnlyImg={false}
        name="file"
        isVisual={false}
        url="http://eternalsky.me:8122/file/upload"
        tips={'tips'}
        core={core}
      />
    );
    const instance = wrapper.instance();
    instance.getCore();
    instance.reset();
  });
});
