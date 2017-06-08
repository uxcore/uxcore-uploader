const locale = {
  'en-us': {
    download: 'download',
    preview: 'preview',
    remove: 'remove',
    retry: 'retry',
    upload: 'upload',
    uploading: 'uploading',
    upload_failed: 'upload failed',
    upload_files: 'upload files',
  },
  'pl-pl': {
    download: 'pobierz',
    preview: 'podgląd',
    remove: 'usuń',
    retry: 'powtórz',
    upload: 'wyślij',
    uploading: 'wysyłanie',
    upload_failed: 'wysyłka nieudana',
    upload_files: 'wyślij pliki',
  },
  'zh-cn': {
    download: '下载',
    preview: '预览',
    remove: '移除',
    retry: '重传',
    upload: '上传',
    uploading: '上传中',
    upload_failed: '上传失败',
    upload_files: '添加文件',
  },
};

locale.en = locale['en-us'];
locale.pl = locale['pl-pl'];

module.exports = locale;
