# history

---
## 3.7.4
* `CHANGED` 新增语言包&locale key (#90)

## 3.7.2
* `FIXED` fix bug

## 3.7.1
* `FIXED` fix bug about prop onlineEdit

## 3.7.0
* `CHANGED` add new prop onlineEdit
  
## 3.6.0
* `CHANGED` support disabled props

## 3.5.1
* `FIXED` fix a less path error

## 3.5.0

* `CHANGED` add 'onDownloadFile' hook for custom download behavior

## 3.4.2

* `CHANGED` add 'showButton' of the Album's config

## 3.4.1

* `FIXED` bugfix: 'onShowFile' hook for all file

## 3.4.0

* `CHANGED` add 'onShowFile' hook for custom preview behavior

## 3.3.10

* `CHANGED` change the struct requirements of prop.fileList, see README for details
* `CHANGED` add id,url to value pass to upper level by onChange(value) event

## 3.3.9

* `FIXED` fix a stupid bug

## 3.3.8 

* `FIXED` fix locale problem(issue #65)

## 3.3.7 

* `FIXED` fix classnames dependency

## 3.3.6 

* `FIXED` fix uploadcore import (issue #81)

## 3.3.5 

* `FIXED` fix visual-picker css bug in safari

## 3.3.4 

* `CHANGED` copy Uploader.less from index.less

## 3.3.3 

* `CHANGED` support js style export

## 3.3.2 

* `CHANGED` modify picker position when isVisual

## 3.3.1 

* `CHANGED` show download icon when readonly

## 3.2.2 

* `CHANGED` add new prop 'hideUploadIcon'

## 3.2.1 

* `CHANGED` hidepicker when isVisual and over queueCapcity

## 3.2.0

* `CHANGED` upgrade react to v16

## 3.1.11

* `CHANGED` show image with album if click image

## 3.1.10

* `CHANGED` fix button style (issue #66)
* `CHANGED` fix mutable props (issue #71)

## 3.1.9

* `CHANGED` fix some wrong style

## 3.1.8

* `CHANGED` replace preview icon

## 3.1.7
* `FIXED` merge pull request #63

## 3.1.6
* `FIXED` issue #58 #61

## 3.1.5
* `CHANGED` update react to ver 15.x
* `CHANGED` eslint

## 3.1.4
* `FIXED` shown photo index is always 0

## 3.1.3
* `FIXED` more robust getUrl

## 3.1.2
* `FIXED` compatible with access to the previewUrl and downloadUrl

## 3.1.1
* `FIXED` default image cant preview

## 3.1.0
* `CHANGED` add album show image if only image

## 3.0.5
* `FIXED` readonly style

## 3.0.4
* `FIXED` clear float

## 3.0.3
* `FIXED` Visual reduction

## 3.0.2
* `FIXED` remove old style and fix new style

## 3.0.1
* `FIXED` add preview button
* `FIXED` update readonly style

## 3.0.0
* `CHANGED` new style
* `FIXED` true percentage
* `NEW` add readOnly prop

## 2.1.5
* `FIXED` Fix image uploader filename overflow styles
* `FIXED` Add filename title attribute

## 2.1.4

* `CHANGED` upgrade scaffold 
* `FIXED` render an empty container if tips is empty
* `CHANGED` eslint `uploader.js` (70%), `locale.js` (100%)

## 2.1.3

* `FIXED` filename overflow style bug

## 2.1.2

* `FIXED` missing `action-remove` in some remove button

## 2.1.1

* `FIXED` `reset` method fails to work

## 2.1.0

* `CHANGED` use `uxcore-button` for default trigger

## 2.0.0

* `CHANGED` new style

## 1.6.1

* `FIXED` uploading progress can not show

## 1.6.0

* `FIXED` autoPending fail to work
* `FIXED` FileList component still render when Files are all deleted

## 1.5.9

* `FIXED` throw error when queueCapacity is 0

## 1.5.8

* `FIXED` fix file.response.getJson bug when upload fails.

## 1.5.7

* `FIXED` fix `preventDuplicate`

## 1.5.6

* `NEW` add polish support. 

## 1.5.5

* `CHANGED` cancel icon style fix (#24)

## 1.5.4

* `CHANGED` add download property in download link
* `FIX` fix response process bug.

## 1.5.3

* `CHANGED` remove Progress.isSupport
* `NEW` add server render support

## 1.5.2

* `CHANGED` add className for download & preview button

## 1.5.1

* `FIX` fix issue #15 #16 #17

## 1.5.0

* `CHANGED` queueCapacity will concern props.fileList

## 1.4.1

* `FIX` fix style bug in file list mode.

## 1.4.0

* `CHANGED` prop `fileList` format change
* `CHANGED` change to controlled mode.

## 1.3.5

* `FIX` fix typo

## 1.3.4

* `CHANGED` filecancel will not be fired when reset.

## 1.3.3

* `FIX` fix componentWillReceiveProps bug

## 1.3.2

* `CHANGED` add a new file type 'delete'

## 1.3.1

* `FIX` fix events hijack bug.

## 1.3.0

* `NEW` add props `fileList`, `onChange` & `onCancel`

## 1.2.2

* `FIX` fix style when upload fails
* `CHANGED` add response support like {content: {url: xxx}} or {content: {data: {url: xxx}}}

## 1.2.1

* `NEW` new style
* `FIX` fix issue #5

## 1.1.10

`NEW` i18n support

## 1.1.9

`CHANGED` update scaffold
