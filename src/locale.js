const locale = {
  'en-us': {
    download: 'download',
    preview: 'preview',
    edit: 'edit',
    remove: 'remove',
    retry: 'retry',
    upload: 'upload',
    uploading: 'uploading',
    upload_failed: 'upload failed',
    upload_files: 'upload files',
    upload_files_img: 'upload images',
  },
  'zh-hk': {
    download: '下載',
    preview: '預覽',
    edit: '編輯',
    remove: '移除',
    retry: '重傳',
    upload: '上傳',
    uploading: '上傳中',
    upload_failed: '上傳失敗',
    upload_files: '添加文件',
    upload_files_img: '上傳圖片',
  },
  'pl-pl': {
    download: 'pobierz',
    preview: 'podgląd',
    edit: 'edytuj',
    remove: 'usuń',
    retry: 'powtórz',
    upload: 'wyślij',
    uploading: 'wysyłanie',
    upload_failed: 'wysyłka nieudana',
    upload_files: 'wyślij pliki',
    upload_files_img: 'wyślij zdjęcie',
  },
  'zh-cn': {
    download: '下载',
    preview: '预览',
    edit: '编辑',
    remove: '移除',
    retry: '重传',
    upload: '上传',
    uploading: '上传中',
    upload_failed: '上传失败',
    upload_files: '添加文件',
    upload_files_img: '上传图片',
  },
};

locale.en = locale['en-us'];
locale.pl = locale['pl-pl'];
locale['en_US'] = locale['en-us'];
locale['zh_CN'] = locale['zh-cn'];

export default locale;
