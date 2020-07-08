### HTML 문서 특정 부분을 PDF로 변경하는 업무
: html2canvas.js와 jspdf.js를 사용하면 된다.\
=> 따로 만들어서 돌렸을 경우 잘 작동하는데 업무 코드에 넣으면 자꾸 그 전 페이지로 돌아갔다.\
=> 간간히 이미지가 저장이 되었는데 왜 되는지 그리고 안되는지 이유를 몰랐음.
#### 이유
: 어떤 funtion에 의해서 전페이지로 강제 이동이 되었다.\
=> but 왜 강제로 이동이 되는지 모르겠고 어떻게 하면 이동되지 않는지 모르겠다
> chrome devtools를 이용해서 하나하나 작동시킨 덕에 하루종일 못 찾던걸 드디어 찾았다 . . .
``` js
function shouldWrapAPIs()
  {
    try
    {
      return !(browser.storage.local.get([]) instanceof Promise);
    }
    catch (error)
    {
    }

    return true;
  }
```
``` js
  if (shouldWrapAPIs())
  {
    // Unlike Firefox, Chrome doesn't have a "browser" object, but provides
    // the extension API through the "chrome" namespace (non-standard).
    if (typeof browser == "undefined")
      self.browser = chrome;

    for (let [api, ...testArgs] of maybeAsyncAPIs)
    {
      let wrappables = getAPIWrappables(api);

      if (!wrappables)
        continue;

      let {func} = wrappables;

      (acceptsCallback(func, testArgs) ? asyncAPIs : syncAPIs).push(api);
    }

    for (let api of asyncAPIs)
      wrapAsyncAPI(api);

    for (let api of syncAPIs)
      wrapSyncAPI(api);

    wrapRuntimeOnMessage();
  }
}
```
> 이게 뭔데 10덕아 . . .. ...   . 오늘 하루종일 이거 해야겠누